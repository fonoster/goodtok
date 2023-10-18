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
import type {} from "@trpc/server/adapters/standalone";
import { IncomingHttpHeaders } from "http";
import { prisma } from "./db";

export async function createContext(opts: {
  req: {
    headers: IncomingHttpHeaders;
  };
}) {
  const { req } = opts as typeof opts & { req: { url: string } };

  // Currently, this method is used for passing JWT tokens from WS clients
  const token = req.url?.split("?")[1]?.split("=")[1];

  return {
    prisma,
    token: token ? token : req.headers.authorization?.split(" ")[1]
  };
}

export type Context = {
  prisma: typeof prisma;
};
