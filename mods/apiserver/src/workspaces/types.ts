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
import { z } from "zod";
import {
  updateWorkspaceSchema,
  createWorkspaceSchema,
  addWorkspaceMemberSchema
} from "./validation";

export enum WorkspaceMemberStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING"
}

export enum WorkspaceMemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER"
}

export enum Day {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday"
}

export type WeeklyHoursType = {
  [key in Day]: { from: string; to: string };
};

export type Workspace = {
  id: string;
  name: string;
  hoursOfOperation: WeeklyHoursType;
  enabled: boolean;
  timezone: string;
  calendarUrl: string;
  createdAt: Date;
  shopifyAccount?: {
    storeDomain: string;
    accessToken: string;
  };
};

export type WorkspaceStatus = {
  workspaceId: string;
  isOpen: boolean;
  isEnabled: boolean;
};

export type Member = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: WorkspaceMemberRole;
  status: WorkspaceMemberStatus;
  createdAt: Date;
};

export type UpdateWorkspaceRequest = z.infer<typeof updateWorkspaceSchema>;

export type CreateWorkspaceRequest = z.infer<typeof createWorkspaceSchema>;

export type AddWorkspaceMemberRequest = z.infer<
  typeof addWorkspaceMemberSchema
>;

export type GetMembersResponse = {
  members: Member[];
};
