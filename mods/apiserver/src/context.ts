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
import { prisma } from "./db";
import { getCustomerById } from "./customers/getCustomerById";
import { SALT, SIGN_OPTIONS } from "./envs";
import { getToken } from "./utils";
import { ContextOptions, ContextOptionsWithUrl } from "./types";
import jwt from "jsonwebtoken";

export async function createContext(opts: ContextOptions) {
  const { req } = opts as ContextOptionsWithUrl;

  const token = getToken({ req });

  return {
    prisma,
    token,
    getCustomerById,
    config: {
      salt: SALT,
      signOptions: SIGN_OPTIONS
    }
  };
}

export type Context = {
  prisma?: typeof prisma;
  token?: string;
  getCustomerById?: typeof getCustomerById;
  config?: {
    salt: string;
    signOptions: jwt.SignOptions;
  };
};
