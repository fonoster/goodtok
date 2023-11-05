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
import { TRPCError } from "@trpc/server";
import { GetQueueResponse } from "./types";
import { Context } from "../context";
import { getLogger } from "@fonoster/logger";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function getQueueByWorkspaceId(
  ctx: Context,
  request: { workspaceId: string }
): Promise<GetQueueResponse> {
  const { workspaceId } = request;

  logger.verbose(`get queue by workspace id ${workspaceId}`, { workspaceId });

  const workspace = await ctx.prisma.workspace.findUnique({
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

  const queue = await Promise.all(
    workspace.queue.map(async (queueEntry) => {
      const customer = await ctx.getCustomerById(ctx, {
        workspaceId: workspace.id,
        customerId: queueEntry.customerId
      });

      return {
        customerId: queueEntry.customerId,
        createdAt: queueEntry.createdAt,
        updatedAt: queueEntry.updatedAt,
        registeredAt: queueEntry.registeredAt,
        status: queueEntry.status,
        workspaceId: queueEntry.workspaceId,
        aor: queueEntry.aor,
        customer: {
          id: customer.id,
          name: customer.name,
          avatar: customer.avatar,
          note: customer.note
        }
      };
    })
  );

  return {
    queue
  };
}
