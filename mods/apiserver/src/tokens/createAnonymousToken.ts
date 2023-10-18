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
import {
  GOODTOK_SIP_DOMAIN,
  GOODTOK_SIP_DOMAIN_REF,
  USER_AGENT_PRIVACY,
  GOODTOK_SIGNALING_SERVER,
  PRIVATE_KEY,
  SIGN_OPTIONS
} from "../envs";
import { ConnectionObject, CreateAnonymousTokenInput, Method } from "./types";
import jwt from "jsonwebtoken";

// Anonymous tokens only have access to REGISTER method
export async function createAnonymousToken(
  request: CreateAnonymousTokenInput
): Promise<ConnectionObject> {
  const claims = {
    ref: request.ref,
    // Use the same ref as the customerId (only for annonymous users)
    customerId: request.ref,
    domainRef: GOODTOK_SIP_DOMAIN_REF,
    aor: request.aor,
    aorLink: request.aorLink,
    domain: GOODTOK_SIP_DOMAIN,
    privacy: USER_AGENT_PRIVACY,
    allowedMethods: [Method.REGISTER],
    signalingServer: GOODTOK_SIGNALING_SERVER
  };

  const token = jwt.sign(claims, PRIVATE_KEY, SIGN_OPTIONS);

  return {
    aor: request.aor,
    aorLink: request.aorLink,
    token,
    signalingServer: GOODTOK_SIGNALING_SERVER
  };
}
