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
import { CreateWorkspaceRequest, WeeklyHoursType, Workspace } from "./types";
import { Context } from "../context";
import { customAlphabet } from "nanoid";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function createWorkspace(
  ctx: Context,
  request: CreateWorkspaceRequest
): Promise<Workspace> {
  logger.verbose("creating workspace");

  const createData = {
    ownerId: ctx.userId,
    id: `g-${customAlphabet("1234567890abcdef", 10)()}`,
    name: request.name,
    timezone: request.timezone,
    enabled: request.enabled,
    calendarUrl: request.calendarUrl,
    hoursOfOperation: request?.hoursOfOperation || {
      Monday: { from: "09:00", to: "17:00" },
      Tuesday: { from: "09:00", to: "17:00" },
      Wednesday: { from: "09:00", to: "17:00" },
      Thursday: { from: "09:00", to: "17:00" },
      Friday: { from: "09:00", to: "17:00" },
      Saturday: {},
      Sunday: {}
    },
    shopifyAccount: {}
  };

  if (request.shopifyAccount) {
    createData.shopifyAccount = {
      create: {
        accessToken: request.shopifyAccount.accessToken,
        storeDomain: request.shopifyAccount.storeDomain
      }
    };
  }

  const workspace = await ctx.prisma.workspace.create({
    data: createData,
    include: {
      shopifyAccount: true
    }
  });

  return {
    id: workspace.id,
    name: workspace.name,
    timezone: workspace.timezone,
    calendarUrl: workspace.calendarUrl,
    enabled: workspace.enabled,
    createdAt: workspace.createdAt,
    shopifyAccount: workspace.shopifyAccount,
    hoursOfOperation: workspace.hoursOfOperation as WeeklyHoursType
  };
}
