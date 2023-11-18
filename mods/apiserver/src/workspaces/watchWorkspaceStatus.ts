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
import { observable } from "@trpc/server/observable";
import { getLogger } from "@fonoster/logger";
import { workspaceStatusObservers } from "./observers";
import { WorkspaceStatus } from "./types";
import { prisma } from "../db";
import { WorkspaceStatus as WorkspaceStatusFromPrisma } from "@prisma/client";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export function watchWorkspaceStatus(workspaceId: string) {
  logger.verbose("new observer added to watchWorkspaceStatus", {
    workspaceId,
    totalObservers: workspaceStatusObservers.length
  });

  return observable<WorkspaceStatus>((emit) => {
    const emitStatusUpdate = (status: WorkspaceStatus) => {
      if (status.workspaceId !== workspaceId) return;
      emit.next(status);
    };

    workspaceStatusObservers.push(emitStatusUpdate);

    // Emit the initial status immediately upon subscription
    prisma.workspace
      .findUnique({
        where: {
          id: workspaceId
        }
      })
      .then((workspace) => {
        if (!workspace) return;

        const initialMessage: WorkspaceStatus = {
          workspaceId,
          online: workspace.status === WorkspaceStatusFromPrisma.ONLINE
        };
        emitStatusUpdate(initialMessage);
      });

    // Remove the observer's emit function when the client unsubscribes
    return () => {
      const index = workspaceStatusObservers.indexOf(emitStatusUpdate);
      if (index !== -1) {
        workspaceStatusObservers.splice(index, 1);
      }

      logger.verbose("observer removed from workspaceStatusObservers", {
        workspaceId,
        totalObservers: workspaceStatusObservers.length
      });
    };
  });
}
