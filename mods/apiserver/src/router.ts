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
import { workspacesRouter } from "./workspaces/router";
import { customerRouter } from "./customers/router";
import { usersRouter } from "./users/router";
import { tokensRouter } from "./tokens/router";
import { router } from "./trpc";
import { queuesRouter } from "./queues/router";

// This is the main router for the API server
export const appRouter = router({
  users: usersRouter,
  tokens: tokensRouter,
  workspaces: workspacesRouter,
  customers: customerRouter,
  queues: queuesRouter
});

export type AppRouter = typeof appRouter;
