/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
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
import { watchNats } from "../nats";
import { getLogger } from "@fonoster/logger";
import { NATS_URL } from "../envs";
import { updateQueueEntry } from "./updateQueueEntry";
import { getCustomerById } from "../customers/getCustomerById";
import { prisma } from "../db";
import { natsObservers } from "./observers";

const logger = getLogger({ service: "apiserver", filePath: __filename });

watchNats(NATS_URL, async (event) => {
  const { aor, extraHeaders } = event;
  const ctx = { prisma, getCustomerById };

  const customerId = extraHeaders["X-Customer-Id"];
  const workspaceId = extraHeaders["X-Workspace-Id"];

  logger.verbose("customerId and workspaceId", { customerId, workspaceId });

  const entry = await updateQueueEntry(ctx, { customerId, aor, workspaceId });

  logger.verbose("entry updated", { entry });

  const customer = await getCustomerById(ctx, { workspaceId, customerId });

  if (!customer) {
    logger.warn("customer not found", { customerId, workspaceId });
    return;
  }

  const entryWithCustomer = {
    ...entry,
    customer: {
      id: customer.id,
      name: customer.name,
      avatar: customer.avatar,
      note: customer.note
    }
  };

  // Notify all observers
  natsObservers.forEach((emit) => emit(entryWithCustomer));
});
