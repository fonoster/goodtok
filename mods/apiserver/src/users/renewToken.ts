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
import { generateToken, verifyToken } from "../utils";
import { Context } from "../context";
import { getLogger } from "@fonoster/logger";
import { getMemberships } from "./getMemberships";
import { jwtDecode } from "jwt-decode";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function renewToken(
  ctx: Context,
  input: { token: string }
): Promise<string> {
  const { token } = input;
  const { username, sub: userId } = jwtDecode(token) as {
    sub: string;
    username: string;
  };

  logger.verbose("renew user token", { userId });

  verifyToken({
    token: ctx.token,
    jwtSecuritySalt: ctx.config.jwtSecuritySalt,
    jwtSignOptions: ctx.config.jwtSignOptions
  });

  const { user, workspaces } = await getMemberships(ctx, { username });

  return generateToken({
    user,
    jwtSecuritySalt: ctx.config.jwtSecuritySalt,
    jwtSignOptions: ctx.config.jwtSignOptions,
    workspaces
  });
}
