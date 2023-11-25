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
import { getLogger } from "@fonoster/logger";
import { Context } from "../context";
import { UpdateQueueEntryStatusRequest } from "./types";
import { QueueEntryStatus } from "@prisma/client";
import { natsObservers } from "../workspaces/observers";
import { getCustomerById } from "../customers/getCustomerById";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function updateQueueEntryStatus(
  ctx: Context,
  request: UpdateQueueEntryStatusRequest
) {
  const { workspaceId, customerId, status } = request;

  logger.verbose("dequeing session", { workspaceId, customerId, status });

  // Find queue entry and update status
  const queueEntry = await ctx.prisma.queueEntry.findFirst({
    where: {
      workspaceId,
      customerId,
      status: {
        not: QueueEntryStatus.DEQUEUED
      }
    }
  });

  const queueEntryUpdated = await ctx.prisma.queueEntry.update({
    where: {
      id: queueEntry.id
    },
    data: {
      status
    }
  });

  const customer = await getCustomerById(ctx, {
    workspaceId,
    customerId
  });

  if (!customer) {
    logger.warn("id not found, marking it as anonymous", {
      customerId
    });
  }

  const entryWithCustomer = {
    ...queueEntryUpdated,
    customer: customer
      ? {
          id: customerId,
          name: customer.name,
          email: customer.email,
          avatar: customer.avatar,
          note: customer.note
        }
      : {
          id: customerId,
          name: "Anonymous",
          email: null,
          avatar: null,
          note: null
        }
  };

  // Notify all observers
  natsObservers.forEach((emit) => emit(entryWithCustomer));
}
