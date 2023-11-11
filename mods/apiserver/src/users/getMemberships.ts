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
import { Context } from "../context";
import { getLogger } from "@fonoster/logger";
import { WorkspaceMemberRole } from "../workspaces/types";
import { UserWithWorkspaces } from "../types";

const logger = getLogger({ service: "apiserver", filePath: __filename });

type GetMembershipsResponse = {
  user: UserWithWorkspaces;
  workspaces: { id: string; role: WorkspaceMemberRole }[];
};

export async function getMemberships(
  ctx: Context,
  input: { email: string }
): Promise<GetMembershipsResponse> {
  const { email } = input;

  logger.verbose("get memberships for user", { email });

  const user = await ctx.prisma.user.findUnique({
    where: {
      email
    },
    include: {
      ownedWorkspaces: true
    }
  });

  const workspaces: { id: string; role: WorkspaceMemberRole }[] = [];

  // Create a list of owned workspaces
  user?.ownedWorkspaces?.forEach((workspace) => {
    workspaces.push({
      id: workspace.id,
      role: WorkspaceMemberRole.OWNER
    });
  });

  // Find all the workspaces where the user is a member
  const memberships = await ctx.prisma.workspaceMember.findMany({
    where: {
      userId: user?.id
    }
  });

  memberships?.forEach((membership) => {
    workspaces.push({
      id: membership.workspaceId,
      role: membership.role as unknown as WorkspaceMemberRole
    });
  });

  return {
    user,
    workspaces
  };
}
