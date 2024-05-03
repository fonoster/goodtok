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
import { observable } from "@trpc/server/observable";
import { getLogger } from "@fonoster/logger";
import { workspaceStatusObservers } from "./observers";
import { WeeklyHoursType, WorkspaceStatus } from "./types";
import { prisma } from "../db";
import { isOpenNow } from "../utils";

const logger = getLogger({ service: "apiserver", filePath: __filename });

/**
 * Use this function to watch the status of a workspace (queue).
 * The function returns an observable that emits a WorkspaceStatus object every time the
 * status of the workspace changes. The WorkspaceStatus object contains the following
 * properties:
 *
 * - workspaceId: The id of the workspace
 * - isOpen: A boolean indicating if the workspace is open or closed
 * - isEnabled: A boolean indicating if the workspace is enabled or disabled
 *
 * The function also registers the observable in the workspaceStatusObservers array.
 * This array is used by the workspaceStatusObserver function to emit the status
 * changes to all the observers.
 *
 * @param {string} workspaceId
 * @return {Observable<WorkspaceStatus>}
 */
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

        const timezone = workspace.timezone;
        const hoursOfOperation = workspace.hoursOfOperation as WeeklyHoursType;
        const isOpen = isOpenNow(timezone, hoursOfOperation);

        const initialMessage: WorkspaceStatus = {
          workspaceId,
          isOpen,
          isEnabled: workspace.enabled
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
