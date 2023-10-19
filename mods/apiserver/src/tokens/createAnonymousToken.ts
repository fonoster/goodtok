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
import { Context } from "../context";
import { ConnectionObject, CreateAnonymousTokenInput, Method } from "./types";
import jwt from "jsonwebtoken";

// Anonymous tokens only have access to REGISTER method
export async function createAnonymousToken(
  ctx: Context,
  request: CreateAnonymousTokenInput
): Promise<ConnectionObject> {
  const claims = {
    ref: request.ref,
    // Use the same ref as the customerId (only for annonymous users)
    customerId: request.ref,
    domainRef: ctx.config.sipDomainRef,
    aor: request.aor,
    aorLink: request.aorLink,
    domain: ctx.config.sipDomain,
    privacy: ctx.config.sipUserAgentPrivacy,
    allowedMethods: [Method.REGISTER],
    signalingServer: ctx.config.sipSignalingServer
  };

  const token = jwt.sign(
    claims,
    ctx.config.securityPrivateKey,
    ctx.config.jwtSignOptions
  );

  return {
    aor: request.aor,
    aorLink: request.aorLink,
    token,
    signalingServer: ctx.config.sipSignalingServer
  };
}
