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
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export function hashPassword(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

export function generateToken(user: User, salt: string): string {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    // Fix hardcode values
    workspaces: [
      { id: "252", role: "owner" },
      { id: "324", role: "member" }
    ]
  };

  return jwt.sign(payload, salt, { expiresIn: "1h" });
}
