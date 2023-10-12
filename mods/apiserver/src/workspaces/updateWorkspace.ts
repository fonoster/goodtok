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
import { PrismaClient } from "@prisma/client";
import { UpdateWorkspaceRequest } from "./types";

const prisma = new PrismaClient();
const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function updateWorkspace(request: UpdateWorkspaceRequest) {
  logger.debug("updating workspace", { workspaceId: request.id });
  const workspace = await prisma.workspace.update({
    where: {
      id: request.id
    },
    data: request
  });
  return workspace;
}
