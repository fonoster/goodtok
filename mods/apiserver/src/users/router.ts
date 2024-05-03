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
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";
import { login } from "./login";
import { getUserById } from "./getUserById";
import { updateUser } from "./updateUser";
import { updateUserSchema } from "./types";
import { renewToken } from "./renewToken";
import { acceptInvite } from "./acceptInvite";

export const usersRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(({ ctx, input }) =>
      login(ctx, {
        email: input.email,
        password: input.password
      })
    ),

  renewToken: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => renewToken(ctx, { token: input })),

  getUserById: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => getUserById(ctx, input)),

  updateUser: protectedProcedure
    .input(updateUserSchema)
    .mutation(({ ctx, input }) => updateUser(ctx, input)),

  acceptInvite: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => acceptInvite(ctx, { token: input }))
});
