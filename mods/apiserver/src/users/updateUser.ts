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
import { PrismaClient } from "@prisma/client";
import { User } from "./types";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "../utils";

const prisma = new PrismaClient();

export async function updateUser(
  id: string,
  data: Partial<User>
): Promise<User> {
  const userFromDB = await prisma.user.findUnique({
    where: {
      id
    }
  });

  if (!userFromDB) throw new TRPCError({ code: "NOT_FOUND" });

  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      ...data,
      password: data.password ? hashPassword(data.password) : undefined,
      updatedAt: new Date()
    }
  });

  return {
    id: updatedUser.id,
    username: updatedUser.username,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt
  };
}
