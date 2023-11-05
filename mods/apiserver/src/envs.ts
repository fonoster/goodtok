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
import { assertEnvsAreSet } from "./utils";
import { join } from "path";
import crypto from "crypto";
import fs from "fs";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: join(__dirname, "..", "..", "..", ".env") });
}

assertEnvsAreSet(["SIP_SIGNALING_SERVER", "NATS_URL", "CLOAK_ENCRYPTION_KEY"]);

const e = process.env;
const defaultSignOptions = { expiresIn: "24h", algorithm: "RS256" };

// NATS configurations
export const NATS_URL = e.NATS_URL;

// API server configurations
export const APISERVER_BIND_PORT = e.APISERVER_BIND_PORT ?? "6789";

// Security and Encryption
export const CLOAK_ENCRYPTION_KEY = e.CLOAK_ENCRYPTION_KEY;
export const JWT_SECURITY_SALT = e.JWT_SECURITY_SALT ?? CLOAK_ENCRYPTION_KEY;
export const JWT_SIGN_OPTIONS = e.JWT_SIGN_OPTIONS
  ? JSON.parse(e.JWT_SIGN_OPTIONS)
  : defaultSignOptions;
export const SECURITY_PATH_TO_KEYS = e.SECURITY_PATH_TO_KEYS ?? "/keys";
export const SECURITY_PRIVATE_KEY = fs.readFileSync(
  join(SECURITY_PATH_TO_KEYS, "private.key"),
  "utf8"
);

// SIP configurations
export const SIP_DOMAIN = e.SIP_DOMAIN ?? "sip.goodtok.io";
export const SIP_DOMAIN_REF = e.SIP_DOMAIN_REF ?? "default";
export const SIP_SIGNALING_SERVER =
  e.SIP_SIGNALING_SERVER ?? "wss://sip.goodtok.io:5063";
export const SIP_USER_AGENT_PRIVACY = e.SIP_USER_AGENT_PRIVACY ?? "PRIVATE";
