/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
import { TRPCError } from "@trpc/server";
import { Workspace } from "./types";
import { getLogger } from "@fonoster/logger";
import { Context } from "../context";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function getWorkspaceById(
  ctx: Context,
  request: { workspaceId: string }
): Promise<Workspace> {
  const { workspaceId } = request;

  logger.verbose("get workspace by id", { workspaceId });

  const workspace = await ctx.prisma.workspace.findUnique({
    where: {
      id: workspaceId
    },
    include: {
      shopifyAccount: true
    }
  });

  if (!workspace) throw new TRPCError({ code: "NOT_FOUND" });

  return workspace as unknown as Workspace;
}
