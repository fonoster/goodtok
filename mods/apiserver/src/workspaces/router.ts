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
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";
import { getMembersByWorkspaceId } from "./getMembersByWorkspaceId";
import { getWorkspaceById } from "./getWorkspaceById";
import { updateWorkspace } from "./updateWorkspace";
import { watchWorkspaceStatus } from "./watchWorkspaceStatus";
import { getWorkspaces } from "./getWorkspaces";
import { createWorkspace } from "./createWorkspace";
import { addWorkspaceMember } from "./addWorkspaceMember";
import { removeWorkspaceMember } from "./removeWorkspaceMember";
import { resendWorkspaceMemberInvite } from "./resendWorkspaceMemberInvite";
import { removeWorkspace } from "./removeWorkspace";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
  addWorkspaceMemberSchema
} from "./validation";

export const workspacesRouter = router({
  getMembersByWorkspaceId: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      getMembersByWorkspaceId(ctx, { workspaceId: input })
    ),

  getWorkspaces: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => getWorkspaces(ctx, { userId: input })),

  watchWorkspaceStatus: publicProcedure
    .input(z.string())
    .subscription((req) => watchWorkspaceStatus(req.input)),

  getWorkspaceById: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => getWorkspaceById(ctx, { workspaceId: input })),

  createWorkspace: protectedProcedure
    .input(createWorkspaceSchema)
    .mutation(({ ctx, input }) => createWorkspace(ctx, input)),

  updateWorkspace: protectedProcedure
    .input(updateWorkspaceSchema)
    .mutation(({ ctx, input }) => updateWorkspace(ctx, input)),

  addWorkspaceMember: protectedProcedure
    .input(addWorkspaceMemberSchema)
    .mutation(({ ctx, input }) => addWorkspaceMember(ctx, input)),

  removeWorkspaceMember: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => removeWorkspaceMember(ctx, input)),

  resendWorkspaceMemberInvite: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => resendWorkspaceMemberInvite(ctx, input)),

  removeWorkspace: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => removeWorkspace(ctx, input))
});
