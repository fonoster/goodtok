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
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";
import { login } from "./login";
import { getUserById } from "./getUserById";
import { updateUser } from "./updateUser";

export const usersRouter = router({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(({ ctx, input }) =>
      login(ctx, {
        username: input.username,
        password: input.password
      })
    ),

  getUserById: protectedProcedure
    .input((val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query(({ ctx, input }) => getUserById(ctx, { id: input })),

  updateUser: protectedProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(({ ctx, input }) =>
      updateUser(ctx, { id: input.id, data: input.data })
    )
});
