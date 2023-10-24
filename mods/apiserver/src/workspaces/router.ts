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
import { router, protectedProcedure, publicProcedure } from "../trpc";
import { getMembersByWorkspaceId } from "./getMembersByWorkspaceId";
import { getQueueByWorkspaceId } from "./getQueueByWorkspaceId";
import { watchQueue } from "./watchQueue";
import { getWorkspaceById } from "./getWorkspaceById";
import { updateWorkspaceSchema } from "./types";
import { updateWorkspace } from "./updateWorkspace";
import { watchWorkspaceStatus } from "./watchWorkspaceStatus";

export const workspacesRouter = router({
  getMembersByWorkspaceId: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      getMembersByWorkspaceId(ctx, { workspaceId: input })
    ),

  getQueueByWorkspaceId: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      getQueueByWorkspaceId(ctx, { workspaceId: input })
    ),

  watchQueue: protectedProcedure
    .input(z.string())
    .subscription((req) => watchQueue(req.input)),

  watchWorkspaceStatus: publicProcedure
    .input(z.string())
    .subscription((req) => watchWorkspaceStatus(req.input)),

  getWorkspaceById: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => getWorkspaceById(ctx, { workspaceId: input })),

  updateWorkspace: protectedProcedure
    .input(updateWorkspaceSchema)
    .mutation(({ ctx, input }) => updateWorkspace(ctx, input))
});
