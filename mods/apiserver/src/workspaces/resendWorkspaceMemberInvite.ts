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
import { getLogger } from "@fonoster/logger";
import { Context } from "../context";
import { sendInvite } from "../notifications/sendInvite";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function resendWorkspaceMemberInvite(
  ctx: Context,
  memberId: string
): Promise<void> {
  logger.verbose("resend workspace member invite", { memberId });

  const member = await ctx.prisma.workspaceMember.findUnique({
    where: {
      id: memberId
    },
    include: {
      user: true,
      workspace: true
    }
  });

  sendInvite({
    recipient: member.user.email,
    oneTimePassword: member.user.password,
    workspaceId: member.workspaceId,
    workspaceName: member.workspace.name
  }).catch((err) => {
    logger.error(err);
  });

  return;
}
