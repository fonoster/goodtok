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
import { AddWorkspaceMemberRequest, Member } from "./types";
import { Context } from "../context";
import { getLogger } from "@fonoster/logger";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function addWorkspaceMember(
  ctx: Context,
  input: AddWorkspaceMemberRequest
): Promise<Member> {
  // LOGIC
  // 1. See if the user exists
  // 2. See if the user is alredy a member
  // 3. If not, add the user to Goodtok
  // 4. Add the user to the workspace
  // 6. Send an email to the owner of the workspace
  // 7. Send an email to the admin of the workspace
  // 8. Send an email to the member of the workspace
  // 8. If the it is a new user consider sending a one time password

  logger.verbose("input", { input });
  return null;
}
