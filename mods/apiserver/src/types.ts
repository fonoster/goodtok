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
