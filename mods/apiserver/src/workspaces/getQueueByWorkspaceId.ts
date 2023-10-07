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
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { QueueEntry } from "./types";
import { getCustomerById } from "../customers/getCustomerById";

const prisma = new PrismaClient();

export async function getQueueByWorkspaceId(
  workspaceId: string
): Promise<QueueEntry[]> {
  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId
    },
    include: {
      queue: {
        where: {
          status: {
            in: ["ONLINE", "OFFLINE"]
          }
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });

  if (!workspace) throw new TRPCError({ code: "NOT_FOUND" });

  const queueEntries = await Promise.all(
    workspace.queue.map(async (queueEntry) => {
      const customer = await getCustomerById(queueEntry.customerId);

      return {
        customerId: queueEntry.customerId,
        createdAt: queueEntry.createdAt,
        updatedAt: queueEntry.updatedAt,
        registeredAt: queueEntry.registeredAt,
        status: queueEntry.status.toString(),
        workspaceId: queueEntry.workspaceId,
        customer: {
          id: customer.id,
          name: customer.name,
          avatar: customer.avatar
        }
      };
    })
  );

  return queueEntries;
}
