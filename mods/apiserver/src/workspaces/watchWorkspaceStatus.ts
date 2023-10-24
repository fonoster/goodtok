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
  logger.verbose("new observer added to watchWorkspaceStatus", { workspaceId });

  return observable<WorkspaceStatus>((emit) => {
    // Add the observer's next method to the list when a client subscribes
    workspaceStatusObservers.push(emit.next.bind(emit));

    // TODO: Update this to use ctx.prisma
    prisma.workspace
      .findUnique({
        where: {
          id: workspaceId
        }
      })
      .then((workspace) => {
        if (!workspace) return;

        const initialMessage: WorkspaceStatus = {
          online: workspace.status === WorkspaceStatusFromPrisma.ONLINE
        };
        emit.next(initialMessage);
      });

    // Remove the observer's next method when the client unsubscribes
    return () => {
      const index = workspaceStatusObservers.indexOf(emit.next.bind(emit));
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
