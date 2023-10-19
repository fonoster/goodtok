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
import { TRPCError } from "@trpc/server";
import { generateToken, hashPassword } from "../utils";
import { Context } from "../context";

export async function login(
  ctx: Context,
  input: { username: string; password: string; salt: string }
): Promise<string> {
  const { username, password } = input;
  const hashedPassword = hashPassword(password);

  const user = await ctx.prisma.user.findUnique({
    where: {
      username
    },
    include: {
      ownedWorkspaces: true
    }
  });

  if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

  if (user.password !== hashedPassword)
    throw new TRPCError({ code: "UNAUTHORIZED" });

  return generateToken({
    user,
    salt: input.salt,
    signOptions: ctx.config.signOptions
  });
}
