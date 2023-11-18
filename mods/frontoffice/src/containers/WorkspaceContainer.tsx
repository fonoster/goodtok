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
import * as SDK from "@goodtok/sdk";
import { useParams } from "react-router-dom";
import { useAuth } from "~authentication";
import { QueuePage } from "~components/queue/QueuePage";
import { useLogger } from "~logger";
import React, { useEffect } from "react";
import moment from "moment";
import playAlert from "~utils/playAlert";

const mapQueueEntry = (entry: {
  customerId: string;
  customer: {
    name: string;
    note: string;
  };
  createdAt: Date;
  status: string;
  aor: string;
}) => {
  return {
    id: entry.customerId,
    name: entry.customer.name,
    note: entry.customer.note,
    time: moment(entry.createdAt).fromNow(),
    isOnline: entry.status === "ONLINE",
    aor: entry.aor
  };
};

function WorkspaceContainer() {
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [storeURL, setStoreURL] = React.useState("");
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [avgWaitTime] = React.useState("");
  // Fix this any
  const [peopleList, setPeopleList] = React.useState<any[]>([]);
  const [previousLength, setPreviousLength] = React.useState(0);
  const [isEnabled, setIsEnabled] = React.useState(false);

  const { id: workspaceId } = useParams() as { id: string };
  const { client, signOut, isSignedIn, isAdmin } = useAuth();
  const logger = useLogger();

  if (!client) {
    signOut();
    return;
  }

  useEffect(() => {
    if (peopleList.length === 1 && previousLength === 0) {
      playAlert("/bell-ringing.mp3");
    }
    setPreviousLength(peopleList.length);
  }, [peopleList.length]);

  useEffect(() => {
    const users = new SDK.Users(client);
    users
      .getCurrentUser()
      .then((user) => {
        setName(user.name);
        setAvatar(user.avatar);
      })
      .catch((err) => {
        logger.error("err getting current user", err);
      });
  });

  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    const workspaces = new SDK.Workspaces(client);
    const queues = new SDK.Queues(client);
    workspaces
      .getWorkspaceById(workspaceId)
      .then((workspace) => {
        setStoreURL(workspace.shopifyAccount?.storeDomain as string);
        setWorkspaceName(workspace.name);
      })
      .catch((err) => {
        logger.error("err getting workspace", err);
      });

    queues
      .getQueueByWorkspaceId(workspaceId)
      .then((response: { queue: SDK.QueueEntry[] }) => {
        setPeopleList(response.queue.map((entry) => mapQueueEntry(entry)));
      })
      .catch((err) => {
        logger.error("err getting queue", err);
      });

    queues.watchQueue(workspaceId, (err, queueEntry) => {
      if (err) {
        logger.error("failed to watch queue:", err);
        return;
      }

      // TODO: Fix hard coded status
      if (queueEntry?.status === "DEQUEUED") {
        setPeopleList((peopleList) => {
          // Filter out the person with the ID that matches the customerId of the dequeued entry
          return peopleList.filter((p) => p.id !== queueEntry.customerId);
        });
      } else {
        // If the status is not 'DEQUEUED', map the queueEntry to the peopleList as before
        setPeopleList((peopleList) => {
          const newPeopleList = peopleList.filter(
            (p) => p.id !== queueEntry?.customerId
          );
          return [
            ...newPeopleList,
            mapQueueEntry(queueEntry as SDK.QueueEntry)
          ];
        });
      }
    });
  }, [client, workspaceId]);

  useEffect(() => {
    const workspaces = new SDK.Workspaces(client);
    const subscription = workspaces.watchWorkspaceStatus(
      workspaceId,
      (err, status) => {
        if (err) {
          logger.error("failed to watch workspace status:", err);

          return;
        }

        setIsEnabled(status!.isEnabled);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleQueueEntrySelect = (id: string, aor: string) => {
    window.open(
      `/workspace/${workspaceId}/s/${id}/aor/${aor}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleEnabledChange = (newIsEnabled: boolean) => {
    const workspaces = new SDK.Workspaces(client);
    workspaces.updateWorkspace({ id: workspaceId, enabled: newIsEnabled });
    setIsEnabled(newIsEnabled);
  };

  return (
    <QueuePage
      workspaceId={workspaceId}
      workspaceName={workspaceName}
      userName={name}
      avatar={avatar}
      storeURL={storeURL}
      avgWaitTime={avgWaitTime}
      data={peopleList}
      isAuthenticated={true}
      isEnabled={isEnabled}
      isAdmin={isAdmin(workspaceId)}
      onQueueEntrySelect={handleQueueEntrySelect}
      onEnabledStatusChange={handleEnabledChange}
      onSignOut={signOut}
    />
  );
}

export default WorkspaceContainer;
