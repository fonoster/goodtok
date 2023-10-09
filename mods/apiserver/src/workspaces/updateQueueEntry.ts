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
import { PrismaClient, QueueEntryStatus } from "@prisma/client";

const prisma = new PrismaClient();
const logger = getLogger({ service: "apiserver", filePath: __filename });

// Q rules:
// 1. Don't apply any upsert if the entry is marked as DEQUEUED
// 2. If there is an entry for customerId let's do an update to mark the
//    entry as ONLINE but only if the entry is not DEQUEUED or IN_PROGRESS
// 3. If it is IN_PROGRESS only update the registeredAt field
export async function updateQueueEntry(
  customerId: string,
  aor: string,
  workspaceId: string
) {
  const currentEntry = await prisma.queueEntry.findFirst({
    where: {
      customerId: customerId
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
    return prisma.queueEntry.create({
      data: {
        customerId: customerId,
        status: QueueEntryStatus.ONLINE,
        aor,
        workspaceId: workspaceId
      }
    });
  } else {
    const status =
      currentEntry.status === QueueEntryStatus.IN_PROGRESS
        ? QueueEntryStatus.IN_PROGRESS
        : QueueEntryStatus.ONLINE;
    return prisma.queueEntry.update({
      where: {
        id: currentEntry.id
      },
      data: {
        status,
        registeredAt: new Date()
      }
    });
  }
}
