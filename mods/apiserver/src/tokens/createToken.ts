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
import { getLogger } from "@fonoster/logger";
import { Context } from "../context";
import { CreateTokenInput } from "./types";
import jwt from "jsonwebtoken";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function createToken(
  ctx: Context,
  input: CreateTokenInput
): Promise<string> {
  const { ref, workspaceId } = input;

  logger.verbose("create token for authenticated user", {
    ref,
    workspaceId
  });

  const claims = {
    ref: ref,
    customerId: input.customerId,
    workspaceId: workspaceId,
    signalingHost: ctx.config.signalingHost,
    signalingPort: ctx.config.signalingPort
  };

  return jwt.sign(
    claims,
    ctx.config.jwtSecuritySalt,
    ctx.config.jwtSignOptions
  );
}
