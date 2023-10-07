/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of GoodTok
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { QueueEntry } from "./types";
import { getCustomerFromCRM } from "../crm";
import { observable } from "@trpc/server/observable";
import { watchNats } from "../nats";
import { getLogger } from "@fonoster/logger";
import { NATS_URL } from "../envs";
import { updateQueueEntry } from "./updateQueueEntry";

const logger = getLogger({ service: "apiserver", filePath: __filename });
// List to keep track of all active observers
const observers: Array<(entry: QueueEntry) => void> = [];

export function watchQ(workspaceId: string) {
  logger.debug("new observer added to watchQ", { workspaceId });

  return observable<QueueEntry>((emit) => {
    // Add the observer's next method to the list when a client subscribes
    observers.push(emit.next.bind(emit));

    // Remove the observer's next method when the client unsubscribes
    return () => {
      const index = observers.indexOf(emit.next.bind(emit));
      if (index !== -1) {
        observers.splice(index, 1);
      }
    };
  });
}

// TODO: Should take the workspaceId as a parameter
// Should save the aor as part of the db entry
watchNats(NATS_URL, async (event) => {
  logger.debug("message from nats", { event });

  const entry = await updateQueueEntry(event.customerId, "default");

  logger.debug("entry updated", { entry });

  const entryWithCustomer = {
    ...entry,
    customer: getCustomerFromCRM(entry.customerId)
  };

  // Notify all observers
  observers.forEach((emit) => emit(entryWithCustomer));
});
