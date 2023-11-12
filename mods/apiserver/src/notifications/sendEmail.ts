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
import { Transporter } from "nodemailer";
import { getLogger } from "@fonoster/logger";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export type EmailOptions = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export function createEmailSender(transporter: Transporter) {
  return async function sendEmail(options: EmailOptions): Promise<void> {
    const info = await transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html
    });

    logger.verbose(`message sent: ${info.messageId}`);
  };
}
