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
import { getToken } from "./utils";
import { ContextOptions, ContextOptionsWithUrl } from "./types";
import {
  SIP_DOMAIN,
  SIP_DOMAIN_REF,
  SIP_USER_AGENT_PRIVACY,
  SIP_SIGNALING_SERVER,
  SECURITY_PRIVATE_KEY,
  JWT_SIGN_OPTIONS,
  JWT_SECURITY_SALT
} from "./envs";
import jwt from "jsonwebtoken";

/**
 * This function creates a new context for each request to the API.
 *
 * @param {ContextOptions} opts - Context options
 * @return {Context} A new context with all the required dependencies
 */
export async function createContext(opts: ContextOptions) {
  const { req } = opts as ContextOptionsWithUrl;

  const token = getToken({ req });

  const payload = (token ? jwt.decode(token) : null) as {
    sub: string;
  };

  return {
    prisma,
    token,
    userId: payload?.sub,
    getCustomerById,
    config: {
      jwtSecuritySalt: JWT_SECURITY_SALT,
      jwtSignOptions: JWT_SIGN_OPTIONS,
      securityPrivateKey: SECURITY_PRIVATE_KEY,
      sipDomain: SIP_DOMAIN,
      sipDomainRef: SIP_DOMAIN_REF,
      sipUserAgentPrivacy: SIP_USER_AGENT_PRIVACY,
      sipSignalingServer: SIP_SIGNALING_SERVER
    }
  };
}

export type Context = {
  prisma?: typeof prisma;
  token?: string;
  userId?: string;
  getCustomerById?: typeof getCustomerById;
  config?: {
    jwtSecuritySalt: string;
    jwtSignOptions: jwt.SignOptions;
    securityPrivateKey: string;
    sipDomain: string;
    sipDomainRef: string;
    sipUserAgentPrivacy: string;
    sipSignalingServer: string;
  };
};
