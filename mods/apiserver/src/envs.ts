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
import { join } from "path";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: join(__dirname, "..", "..", "..", ".env") });
}

export const NATS_URL = process.env.NATS_URL;
export const BIND_PORT = process.env.BIND_PORT ?? "5000";
export const SALT = process.env.SALT ?? crypto.randomBytes(4).toString("hex");
export const PATH_TO_KEYS = process.env.PATH_TO_KEYS ?? "./.keys";
export const PATH_TO_PRIVATE_KEY = path.join(PATH_TO_KEYS, "private.key");
export const SIGN_OPTIONS = process.env.SIGN_OPTIONS
  ? JSON.parse(process.env.SIGN_OPTIONS)
  : { expiresIn: "24h", algorithm: "RS256" };

if (!fs.existsSync(path.join(PATH_TO_KEYS, "private.key"))) {
  console.error(
    "No private key found. Please run 'npm run keys:generate' first"
  );
  process.exit(1);
}

export const PRIVATE_KEY = fs.readFileSync(PATH_TO_PRIVATE_KEY);
export const DEFAULT_DOMAIN = process.env.DEFAULT_DOMAIN ?? "sip.goodtok.io";
export const DEFAULT_DOMAIN_REF = process.env.DEFAULT_DOMAIN_REF ?? "default";
export const DEFAULT_PRIVACY = process.env.DEFAULT_PRIVACY ?? "PRIVATE";
export const DEFAULT_SIGNALING_SERVER =
  process.env.DEFAULT_SIGNALING_SERVER ?? "wss://sip.goodtok.io:5063";
