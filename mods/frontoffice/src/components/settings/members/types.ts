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
// FIXME: This is a duplicate of the one in the backend
export enum Role {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER"
}

// FIXME: This is a duplicate of the one in the backend
export enum Status {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING"
}

// FIXME: This is a duplicate of the one in the backend
export type Member = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  createdAt: Date;
};

export type InviteInfo = {
  name: string;
  email: string;
  role: Role;
};
