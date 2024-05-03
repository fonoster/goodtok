#!/usr/bin/env node
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
import * as trpcExpress from "@trpc/server/adapters/express";
import { OWNER_EMAIL, OWNER_PASSWORD, APISERVER_BIND_PORT } from "./envs";
import { appRouter } from "./router";
import { createContext } from "./context";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { getLogger } from "@fonoster/logger";
import { upsertDefaultUser } from "./users/upsertDefaultUser";
import cors from "cors";
import express from "express";

const logger = getLogger({ service: "apiserver", filePath: __filename });

// Setup express
const app = express();

app.use(cors());

app.use(
  "/v1",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

const server = app.listen(APISERVER_BIND_PORT);

// Add support for WebSocket
const wss = new WebSocketServer({ server });

applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext
});

logger.info("server started", { port: APISERVER_BIND_PORT });

if (OWNER_EMAIL) {
  upsertDefaultUser({ email: OWNER_EMAIL, password: OWNER_PASSWORD })
    .then(() => {
      logger.info("usperted default user");
    })
    .catch((err) => {
      logger.error("could not create default user", { err });
    });
}

export type AppRouter = typeof appRouter;

export type * from "./customers/types";
export type * from "./workspaces/types";
export type * from "./users/types";
export type * from "./tokens/types";
export type * from "./queues/types";
