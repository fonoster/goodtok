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
import { Prisma } from "@prisma/client";
import { IncomingHttpHeaders } from "http";

// Input type for the Context
export type ContextOptions = {
  req: {
    headers: IncomingHttpHeaders;
  };
};

// TRPC doesn't support the `url` property in the request object
// This type is a workaround for that
export type ContextOptionsWithUrl = ContextOptions & {
  req: {
    url: string;
  };
};

// Type to expand User type with the ownedWorkspaces property
export type UserWithWorkspaces = Prisma.UserGetPayload<{
  include: {
    ownedWorkspaces: true;
  };
}>;

// The register event is sent by clients to the server to register
export type RegisterEvent = {
  registeredAt: Date;
  expires: number;
  // During the registration process endpoints are required to send the
  // X-Customer-Id and X-Workspace-Id headers. These headers are
  // used to associate an endpoint with a workspace.
  extraHeaders: Record<string, string>;
};

export type RegisterEventCallback = (registerEvent: RegisterEvent) => void;
