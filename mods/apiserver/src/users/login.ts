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
import { TRPCError } from "@trpc/server";
import { generateToken } from "../utils";
import { Context } from "../context";
import { getLogger } from "@fonoster/logger";
import { getMemberships } from "./getMemberships";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function login(
  ctx: Context,
  input: { email: string; password: string }
): Promise<string> {
  const { email, password } = input;

  logger.verbose("new user login", { email });

  const { user, workspaces } = await getMemberships(ctx, { email });

  if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

  if (user.password !== password) throw new TRPCError({ code: "UNAUTHORIZED" });

  return generateToken({
    user,
    jwtSecuritySalt: ctx.config.jwtSecuritySalt,
    jwtSignOptions: ctx.config.jwtSignOptions,
    workspaces
  });
}
