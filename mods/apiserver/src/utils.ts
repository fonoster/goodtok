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
import { ContextOptionsWithUrl, UserWithWorkspaces } from "./types";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";

export function generateToken(request: {
  user: UserWithWorkspaces;
  salt: string;
  signOptions: jwt.SignOptions;
}): string {
  const { user, salt } = request;
  const workspaces = user.ownedWorkspaces?.map((w) => ({
    id: w.id,
    role: "owner"
  }));

  const claims = {
    sub: user.id,
    username: user.username,
    workspaces: workspaces
  };

  // Fixme: Allow passing expiration time
  return jwt.sign(claims, salt, { expiresIn: "24h" });
}

// Fixme: Need to compare the claims with the requested resource
export function verifyToken(request: {
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
