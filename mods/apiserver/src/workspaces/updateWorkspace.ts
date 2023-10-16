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
import { UpdateWorkspaceRequest, WeeklyHoursType, Workspace } from "./types";
import { fieldEncryptionExtension } from "prisma-field-encryption";
import { CLOAK_ENCRYPTION_KEY } from "../envs";

const prisma = !CLOAK_ENCRYPTION_KEY
  ? new PrismaClient()
  : new PrismaClient().$extends(
      fieldEncryptionExtension({
        encryptionKey: CLOAK_ENCRYPTION_KEY
      })
    );

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function updateWorkspace(
  request: UpdateWorkspaceRequest
): Promise<Workspace> {
  logger.verbose("updating workspace", { workspaceId: request.id });

  const updateData: any = {
    id: request.id,
    name: request.name,
    timezone: request.timezone,
    hoursOfOperation: request.hoursOfOperation
  };

  let existingShopifyAccount;

  if (request.shopifyAccount) {
    existingShopifyAccount = await prisma.shopifyAccount.findUnique({
      where: {
        workspaceId: request.id
      }
    });

    if (existingShopifyAccount) {
      updateData.shopifyAccount = {
        connect: {
          workspaceId: request.id
        },
        update: {
          accessToken: request.shopifyAccount.accessToken,
          storeId: request.shopifyAccount.storeId,
          updatedAt: new Date()
        }
      };
    } else {
      updateData.shopifyAccount = {
        create: {
          accessToken: request.shopifyAccount.accessToken,
          storeId: request.shopifyAccount.storeId
        }
      };
    }
  }

  const workspace = await prisma.workspace.update({
    where: {
      id: request.id
    },
    data: updateData
  });

  return {
    id: workspace.id,
    name: workspace.name,
    timezone: workspace.timezone,
    shopifyAccount: existingShopifyAccount ? existingShopifyAccount : undefined,
    hoursOfOperation: workspace.hoursOfOperation as WeeklyHoursType
  };
}
