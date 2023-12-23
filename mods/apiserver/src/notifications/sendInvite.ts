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
import { APP_URL, SMTP_SENDER } from "../envs";
import { sendEmail } from "./sender";
import { createInviteBody } from "./createInviteBody";
import { createInviteToken } from "./createInviteToken";

type SendInviteInput = {
  recipient: string;
  oneTimePassword: string;
  workspaceId: string;
  workspaceName: string;
};

export async function sendInvite(request: SendInviteInput) {
  const { recipient, oneTimePassword, workspaceId, workspaceName } = request;

  const token = await createInviteToken({
    workspaceId,
    email: recipient
  });

  await sendEmail({
    from: SMTP_SENDER,
    to: recipient,
    subject: "Invite to join a Goodtok workspace",
    html: createInviteBody({
      workspaceName,
      oneTimePassword,
      inviteUrl: `${APP_URL}/accept-invite?token=${token}`
    })
  });
}
