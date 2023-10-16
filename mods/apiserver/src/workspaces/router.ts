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
import { router, publicProcedure } from "../trpc";
import { getMembersByWorkspaceId } from "./getMembersByWorkspaceId";
import { getQueueByWorkspaceId } from "./getQueueByWorkspaceId";
import { watchQueue } from "./watchQueue";
import { getWorkspaceById } from "./getWorkspaceById";
import { updateWorkspaceSchema } from "./types";
import { updateWorkspace } from "./updateWorkspace";

export const workspacesRouter = router({
  getMembersByWorkspaceId: publicProcedure
    .input(z.string())
    .query((req) => getMembersByWorkspaceId(req.input)),

  getQueueByWorkspaceId: publicProcedure
    .input(z.string())
    .query((req) => getQueueByWorkspaceId(req.input)),

  watchQueue: publicProcedure
    .input(z.string())
    .subscription((req) => watchQueue(req.input)),

  getWorkspaceById: publicProcedure
    .input(z.string())
    .query((req) => getWorkspaceById(req.input)),

  updateWorkspace: publicProcedure
    .input(updateWorkspaceSchema)
    .mutation((req) => updateWorkspace(req.input))
});
