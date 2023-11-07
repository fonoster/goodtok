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
import { Context } from "../context";
import { getLogger } from "@fonoster/logger";
import {
  GetMembersResponse,
  WorkspaceMemberRole,
  WorkspaceMemberStatus
} from "./types";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function getMembersByWorkspaceId(
  ctx: Context,
  request: { workspaceId: string }
): Promise<GetMembersResponse> {
  const { workspaceId } = request;

  logger.verbose(`get members by workspace id ${workspaceId}`, { workspaceId });

  const workspace = await ctx.prisma.workspace.findUnique({
    where: {
      id: workspaceId
    },
    include: {
      members: {
        include: {
          user: true
        }
      }
    }
  });

  if (!workspace) throw new TRPCError({ code: "NOT_FOUND" });

  const members = workspace.members.map((member) => {
    return {
      id: member.userId,
      name: member.user.name,
      email: member.user.email,
      status: member.status as unknown as WorkspaceMemberStatus,
      role: member.role as unknown as WorkspaceMemberRole,
      createdAt: member.createdAt
    };
  });

  return {
    members
  };
}
