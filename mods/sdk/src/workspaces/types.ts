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
  Member,
  QueueEntry,
  DayPreferences,
  WeeklyHoursType,
  Workspace,
  UpdateWorkspaceRequest,
  GetMembersResponse,
  GetQueueResponse,
  Days
} from "@goodtok/apiserver";

export type WorkspacesClient = {
  getDefaultWorkspaceId: () => string;
  getDefaultWorkspace: () => Promise<Workspace>;
  getDefaultWorkspaceMembers: () => Promise<GetMembersResponse>;
  getDefaultWorkspaceQueue: () => Promise<GetQueueResponse>;
  getWorkspaceById: (id: string) => Promise<Workspace>;
  getMembersByWorkspaceId: (id: string) => Promise<GetMembersResponse>;
  getQueueByWorkspaceId(id: string): Promise<GetQueueResponse>;
  updateWorkspace: (request: UpdateWorkspaceRequest) => Promise<Workspace>;
  getWorkspaces: () => Promise<Workspace[]>;
  watchQueue: (
    id: string,
    callback: (error: Error, data?: QueueEntry) => void
  ) => void;
};

export { Member, QueueEntry, Days, WeeklyHoursType, DayPreferences, Workspace };
