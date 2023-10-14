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
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Workspace } from "./types";
import { getLogger } from "@fonoster/logger";

const logger = getLogger({ service: "apiserver", filePath: __filename });

const prisma = new PrismaClient();

export async function getWorkspaceById(
  workspaceId: string
): Promise<Workspace> {
  logger.verbose("get workspace by id", { workspaceId });

  const workspace = await prisma.workspace.findUnique({
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
