/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of GoodTok
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
import { appRouter } from "./router";
import { createContext } from "./context";
import { BIND_PORT } from "./envs";
import cors from "cors";
import express from "express";
import logger from "@fonoster/logger";

const app = express();

app.use(cors());

app.use(
  "/v1",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

app.listen(BIND_PORT);

logger.info(`⚡️[server]: Server is running at http://0.0.0.0:${BIND_PORT}`);

export type AppRouter = typeof appRouter;
