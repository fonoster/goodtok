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
import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import { createContext } from "./context";
import { verifyToken } from "./utils";

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;

const enforceUserIsAuthed = t.middleware(async (opts) => {
  const { ctx, next } = opts;

  verifyToken({
    token: ctx.token,
    jwtSecuritySalt: ctx.config.jwtSecuritySalt,
    jwtSignOptions: ctx.config.jwtSignOptions
  });

  return next();
});

export const middleware = t.middleware;
export const router = t.router;

// This procedure will be executed by anyone
export const publicProcedure = t.procedure;

// This procedure will only be executed if the user is authenticated
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
