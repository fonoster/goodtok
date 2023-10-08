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
import {
  DEFAULT_DOMAIN,
  DEFAULT_DOMAIN_REF,
  DEFAULT_PRIVACY,
  DEFAULT_SIGNALING_SERVER,
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
    domainRef: DEFAULT_DOMAIN_REF,
    aor: input.aor,
    aorLink: input.aorLink,
    domain: DEFAULT_DOMAIN,
    privacy: DEFAULT_PRIVACY,
    allowedMethods: [input.methods],
    signalingServer: DEFAULT_SIGNALING_SERVER
  };

  const token = jwt.sign(claims, PRIVATE_KEY, SIGN_OPTIONS);

  return {
    aor: input.aor,
    aorLink: input.aorLink,
    token,
    signalingServer: DEFAULT_SIGNALING_SERVER
  };
}
