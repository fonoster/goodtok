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
import { ContextOptionsWithUrl } from "./types";
import { TRPCError } from "@trpc/server";
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
    username: user.username,
    workspaces: [
      { id: "252", role: "owner" },
      { id: "324", role: "member" }
    ]
  };

  return jwt.sign(payload, salt, { expiresIn: "1h" });
}

// Fixme: Need to compare the claims with the requested resource
export async function verifyToken(request: {
  token: string;
  salt: string;
  signOptions: jwt.SignOptions;
}) {
  const { token, salt, signOptions } = request;

  try {
    jwt.verify(token, salt, signOptions);
  } catch (e) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
  }
}

export function getToken(request: ContextOptionsWithUrl): string | null {
  if (request.req.url?.includes("token=")) {
    const urlParams = new URLSearchParams(request.req.url.split("?")[1]);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      return tokenFromUrl;
    }
  }

  const authHeader = request.req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const [tokenType, authToken] = authHeader.split(" ");
  if (tokenType !== "Bearer") {
    return null;
  }
 
  return authToken;
}
