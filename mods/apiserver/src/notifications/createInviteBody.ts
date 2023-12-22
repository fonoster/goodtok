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
import { EMAIL_TEMPLATES_DIR } from "../envs";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

enum TemplateName {
  INVITE_NEW_USER = "inviteNewUserTemplate",
  INVITE_EXISTING_USER = "inviteExistingUserTemplate"
}

function compileTemplate(templateName: string, data: Record<string, string>) {
  let filePath = path.join(EMAIL_TEMPLATES_DIR, `${templateName}.hbs`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, "templates", `${templateName}.hbs`);
  }

  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  return template(data);
}

export function createInviteBody(data: Record<string, string>) {
  if (data.oneTimePassword) {
    return compileTemplate(TemplateName.INVITE_NEW_USER, data);
  } else {
    return compileTemplate(TemplateName.INVITE_EXISTING_USER, data);
  }
}