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

export type Workspace = {
  id: string;
  name: string;
};

export const updateWorkspaceSchema = z.object({
  id: z.string().min(1),
  name: z.string().optional()
});

export type UpdateWorkspaceRequest = z.infer<typeof updateWorkspaceSchema>;

export type Member = {
  userId: string;
  name: string;
  status: string;
  avatar: string;
};

export type Customer = {
  name: string;
  avatar: string;
};

export type QueueEntry = {
  customerId: string;
  registeredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  workspaceId: string;
  customer: Customer;
  aor: string;
};
