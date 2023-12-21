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
import { JWT_SECURITY_SALT } from "../envs";
import { getLogger } from "@fonoster/logger";
import jwt from "jsonwebtoken";

type InviteTokenClaims = {
  workspaceId: string;
  email: string;
};

export async function createInviteToken(claims: InviteTokenClaims) {
  const logger = getLogger({ service: "apiserver", filePath: __filename });

  logger.verbose("create invite token", { claims });

  return jwt.sign(claims, JWT_SECURITY_SALT, {
    expiresIn: "1d"
  });
}
