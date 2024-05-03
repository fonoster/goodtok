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
import { WorkspaceMemberStatus } from "@prisma/client";
import { Context } from "../context";
import { verifyToken } from "../utils";

export async function acceptInvite(ctx: Context, request: { token: string }) {
  const { token } = request;

  const { email, workspaceId } = verifyToken({
    token,
    jwtSecuritySalt: ctx.config.jwtSecuritySalt,
    jwtSignOptions: ctx.config.jwtSignOptions
  }) as { email: string; workspaceId: string };

  const user = await ctx.prisma.user.findUnique({
    where: {
      email
    }
  });

  if (user) {
    await ctx.prisma.workspaceMember.updateMany({
      where: {
        userId: user.id,
        workspaceId
      },
      data: {
        status: WorkspaceMemberStatus.ACTIVE
      }
    });
  }
}
