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
import dotenv from "dotenv";

if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: join(__dirname, "..", "..", "..", ".env") });
}

assertEnvsAreSet([
  "APP_URL",
  "SMTP_HOST",
  "CLOAK_ENCRYPTION_KEY",
  "SIGNALING_HOST"
]);

const e = process.env;

// API server configurations
export const APISERVER_BIND_PORT = e.APISERVER_BIND_PORT ?? "6789";

// Front Office configurations
export const APP_URL = e.APP_URL;

// Security and Encryption
export const OWNER_EMAIL = e.OWNER_EMAIL;
export const OWNER_PASSWORD = e.OWNER_PASSWORD ?? "admin";
export const CLOAK_ENCRYPTION_KEY = e.CLOAK_ENCRYPTION_KEY;
export const JWT_SECURITY_SALT = e.JWT_SECURITY_SALT ?? CLOAK_ENCRYPTION_KEY;
export const JWT_SIGN_OPTIONS = e.JWT_SIGN_OPTIONS
  ? JSON.parse(e.JWT_SIGN_OPTIONS)
  : { expiresIn: "24h" };

// PeerJS server configurations
export const SIGNALING_HOST = e.SIGNALING_HOST;
export const SIGNALING_PORT = e.SIGNALING_PORT ?? "443";

// SMTP configurations
export const SMTP_HOST = e.SMTP_HOST;
export const SMTP_PORT = e.SMTP_PORT ? parseInt(e.SMTP_PORT) : 587;
export const SMTP_SECURE = e.SMTP_SECURE ?? true;
export const SMTP_AUTH_USER = e.SMTP_AUTH_USER;
export const SMTP_AUTH_PASS = e.SMTP_AUTH_PASS;
export const SMTP_SENDER = e.SMTP_SENDER;
