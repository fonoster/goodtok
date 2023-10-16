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
import { ConnectionObject, CreateTokenInput } from "./types";
import jwt from "jsonwebtoken";

export async function createToken(
  input: CreateTokenInput
): Promise<ConnectionObject> {
  const claims = {
    ref: input.ref,
    customerId: input.customerId,
    domainRef: GOODTOK_SIP_DOMAIN_REF,
    aor: input.aor,
    aorLink: input.aorLink,
    domain: GOODTOK_SIP_DOMAIN,
    privacy: USER_AGENT_PRIVACY,
    allowedMethods: input.methods,
    signalingServer: GOODTOK_SIGNALING_SERVER
  };

  const token = jwt.sign(claims, PRIVATE_KEY, SIGN_OPTIONS);

  return {
    aor: input.aor,
    aorLink: input.aorLink,
    token,
    signalingServer: GOODTOK_SIGNALING_SERVER
  };
}
