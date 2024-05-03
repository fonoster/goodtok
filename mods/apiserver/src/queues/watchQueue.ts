/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of Goodtok
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
import { observable } from "@trpc/server/observable";
import { getLogger } from "@fonoster/logger";
import { queueObservers } from "../workspaces/observers";
import { QueueEntry } from "./types";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export function watchQueue(workspaceId: string) {
  logger.verbose("new observer added to watchQueue", { workspaceId });

  return observable<QueueEntry>((emit) => {
    // Add the observer's next method to the list when a client subscribes
    queueObservers.push(emit.next.bind(emit));

    // Remove the observer's next method when the client unsubscribes
    return () => {
      const index = queueObservers.indexOf(emit.next.bind(emit));
      if (index !== -1) {
        queueObservers.splice(index, 1);
      }

      logger.verbose("observer removed from watchQueue", {
        workspaceId,
        totalObservers: queueObservers.length
      });
    };
  });
}
