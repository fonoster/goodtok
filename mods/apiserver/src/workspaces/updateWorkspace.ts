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
import { getLogger } from "@fonoster/logger";
import { UpdateWorkspaceRequest, WeeklyHoursType, Workspace } from "./types";
import { Context } from "../context";
import { workspaceStatusObservers } from "./observers";
import { isOpenNow } from "../utils";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function updateWorkspace(
  ctx: Context,
  request: UpdateWorkspaceRequest
): Promise<Workspace> {
  logger.verbose("updating workspace", { workspaceId: request.id });

  const updateData = {
    id: request.id,
    name: request.name,
    timezone: request.timezone,
    calendarUrl: request.calendarUrl,
    enabled: request.enabled,
    hoursOfOperation: request.hoursOfOperation,
    shopifyAccount: {}
  };

  let existingShopifyAccount;

  if (request.shopifyAccount) {
    existingShopifyAccount = await ctx.prisma.shopifyAccount.findUnique({
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
          storeDomain: request.shopifyAccount.storeDomain,
          accessToken:
            request.shopifyAccount.accessToken ||
            existingShopifyAccount.accessToken,
          updatedAt: new Date()
        }
      };
    } else {
      updateData.shopifyAccount = {
        create: {
          storeDomain: request.shopifyAccount.storeDomain,
          accessToken: request.shopifyAccount.accessToken
        }
      };
    }
  }

  const workspace = await ctx.prisma.workspace.update({
    where: {
      id: request.id
    },
    data: updateData
  });

  const isOpen = isOpenNow(
    workspace.timezone,
    workspace.hoursOfOperation as WeeklyHoursType
  );

  // WARNING: We will need to optimize this later
  workspaceStatusObservers.forEach((emit) =>
    emit({
      workspaceId: workspace.id,
      isOpen,
      isEnabled: workspace.enabled
    })
  );

  return {
    id: workspace.id,
    name: workspace.name,
    timezone: workspace.timezone,
    calendarUrl: workspace.calendarUrl,
    createdAt: workspace.createdAt,
    enabled: workspace.enabled,
    shopifyAccount: existingShopifyAccount ? existingShopifyAccount : undefined,
    hoursOfOperation: workspace.hoursOfOperation as WeeklyHoursType
  };
}
