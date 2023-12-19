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
import { QueueEntryStatus } from "@prisma/client";
import { Context } from "../context";

const logger = getLogger({ service: "apiserver", filePath: __filename });

// Q rules:
// 1. Don't apply any upsert if the entry is marked as DEQUEUED
// 2. If there is an entry for customerId let's do an update to mark the
//    entry as ONLINE but only if the entry is not DEQUEUED or IN_PROGRESS
// 3. If it is IN_PROGRESS only update the registeredAt field
export async function updateQueueEntry(
  ctx: Context,
  request: {
    customerId: string;
    workspaceId: string;
    expires: number;
    metadata: Record<string, string>;
  }
) {
  const { customerId, workspaceId, expires } = request;

  logger.verbose("update queue entry", {
    customerId,
    workspaceId,
    expires
  });

  const currentEntry = await ctx.prisma.queueEntry.findFirst({
    where: {
      customerId: customerId,
      status: {
        not: QueueEntryStatus.DEQUEUED
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  logger.verbose("updating queue entry", { currentEntry });

  if (currentEntry && currentEntry.status === QueueEntryStatus.DEQUEUED) {
    return currentEntry;
  }

  if (!currentEntry) {
    return ctx.prisma.queueEntry.create({
      data: {
        customerId: customerId,
        status:
          expires > 0 ? QueueEntryStatus.ONLINE : QueueEntryStatus.OFFLINE,
        workspaceId: workspaceId,
        metadata: request.metadata
      }
    });
  } else {
    const status =
      currentEntry.status === QueueEntryStatus.IN_PROGRESS
        ? QueueEntryStatus.IN_PROGRESS
        : expires > 0
        ? QueueEntryStatus.ONLINE
        : QueueEntryStatus.OFFLINE;
    return ctx.prisma.queueEntry.update({
      where: {
        id: currentEntry.id
      },
      data: {
        status,
        registeredAt: new Date(),
        metadata: request.metadata
      }
    });
  }
}
