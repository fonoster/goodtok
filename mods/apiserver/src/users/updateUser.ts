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
import { UpdateUserRequest, User } from "./types";
import { TRPCError } from "@trpc/server";
import { Context } from "../context";
import { getLogger } from "@fonoster/logger";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function updateUser(
  ctx: Context,
  request: UpdateUserRequest
): Promise<User> {
  const { password } = request;

  logger.verbose("updating user", { id: ctx.userId });

  const userFromDB = await ctx.prisma.user.findUnique({
    where: {
      id: ctx.userId
    }
  });

  if (!userFromDB) throw new TRPCError({ code: "NOT_FOUND" });

  return await ctx.prisma.user.update({
    where: {
      id: ctx.userId
    },
    data: {
      ...request,
      password: password || userFromDB.password,
      updatedAt: new Date()
    }
  });
}
