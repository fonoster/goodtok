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
import {
  QueueEntryStatus,
  WorkspaceStatus as WorkspaceStatusFromPrisma
} from "@prisma/client";
import { z } from "zod";

export const updateWorkspaceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  timezone: z.string().optional(),
  status: z
    .enum([WorkspaceStatusFromPrisma.ONLINE, WorkspaceStatusFromPrisma.OFFLINE])
    .optional(),
  shopifyAccount: z
    .object({
      storeDomain: z.string().min(1).optional(),
      accessToken: z.string().min(1).optional()
    })
    .optional(),
  hoursOfOperation: z
    .object({
      Monday: z
        .object({
          enabled: z.boolean().optional(),
          hours: z
            .array(
              z.object({
                start: z.string().optional(),
                end: z.string().optional()
              })
            )
            .optional()
        })
        .optional(),
      Tuesday: z
        .object({
          enabled: z.boolean().optional(),
          hours: z
            .array(
              z.object({
                start: z.string().optional(),
                end: z.string().optional()
              })
            )
            .optional()
        })
        .optional(),
      Wednesday: z
        .object({
          enabled: z.boolean().optional(),
          hours: z
            .array(
              z.object({
                start: z.string().optional(),
                end: z.string().optional()
              })
            )
            .optional()
        })
        .optional(),
      Thursday: z
        .object({
          enabled: z.boolean().optional(),
          hours: z
            .array(
              z.object({
                start: z.string().optional(),
                end: z.string().optional()
              })
            )
            .optional()
        })
        .optional(),
      Friday: z
        .object({
          enabled: z.boolean().optional(),
          hours: z
            .array(
              z.object({
                start: z.string().optional(),
                end: z.string().optional()
              })
            )
            .optional()
        })
        .optional(),
      Saturday: z
        .object({
          enabled: z.boolean().optional(),
          hours: z
            .array(
              z.object({
                start: z.string().optional(),
                end: z.string().optional()
              })
            )
            .optional()
        })
        .optional(),
      Sunday: z
        .object({
          enabled: z.boolean().optional(),
          hours: z
            .array(
              z.object({
                start: z.string().optional(),
                end: z.string().optional()
              })
            )
            .optional()
        })
        .optional()
    })
    .optional()
});

export const createWorkspaceSchema = updateWorkspaceSchema
  .omit({
    id: true
  })
  .merge(
    z
      .object({
        name: z.string(),
        calendarUrl: z.string()
      })
      .required()
  );

export type DayPreferences = {
  enabled: boolean;
  hours: { start: string; end: string }[];
};

export enum Days {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday"
}

export type WeeklyHoursType = {
  [key in Days]: DayPreferences;
};

export type Workspace = {
  id: string;
  name: string;
  hoursOfOperation: WeeklyHoursType;
  timezone: string;
  calendarUrl: string;
  createdAt: Date;
  shopifyAccount?: {
    storeDomain: string;
    accessToken: string;
  };
};

export type WorkspaceStatus = {
  online: boolean;
};

export type Member = {
  userId: string;
  name: string;
  status: string;
  avatar: string;
};

export type QueueEntry = {
  customerId: string;
  registeredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: QueueEntryStatus;
  workspaceId: string;
  customer: {
    name: string;
    avatar: string;
  };
  aor: string;
};

export type UpdateWorkspaceRequest = z.infer<typeof updateWorkspaceSchema>;

export type CreateWorkspaceRequest = z.infer<typeof createWorkspaceSchema>;

export type GetMembersResponse = {
  members: Member[];
};

export type GetQueueResponse = {
  queue: QueueEntry[];
};
