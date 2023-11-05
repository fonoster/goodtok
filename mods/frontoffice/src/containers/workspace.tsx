import * as SDK from "@goodtok/sdk";
import { useParams } from "react-router-dom";
import { useAuth } from "~authentication";
import { QueuePage } from "~components/queue/QueuePage";
import React, { useEffect } from "react";
import moment from "moment";

const mapQueueEntry = (entry: {
  customerId: string;
  customer: {
    name: string;
    note: string;
  };
  createdAt: string;
  status: string;
}) => {
  return {
    id: entry.customerId,
    name: entry.customer.name,
    note: entry.customer.note,
    time: moment(entry.createdAt).fromNow(),
    isOnline: entry.status === "ONLINE"
  };
};

function WorkspaceContainer() {
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [storeURL, setStoreURL] = React.useState("");
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [avgWaitTime, setAvgWaitTime] = React.useState("");
  const [peopleList, setPeopleList] = React.useState<any[]>([]);
  const [isOnline, setIsOnline] = React.useState(false);
  
  let { id } = useParams();

  const { client, signOut, isSignedIn } = useAuth();

  if (!client) {
    signOut();
    return;
  }

  useEffect(() => {
    const users = new SDK.Users(client);
    users
      .getCurrentUser()
      .then((user) => {
        setName(user.name);
        setAvatar(user.avatar);
      })
      .catch((err) => {
        // TODO: Handle error
      });
  });

  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    const workspaces = new SDK.Workspaces(client);
    workspaces
      .getWorkspaceById(id!)
      .then((workspace) => {
        setStoreURL(workspace.shopifyAccount?.storeDomain!);
        setWorkspaceName(workspace.name);
      })
      .catch((err) => {
        // TODO: Handle error
      });

    workspaces
      .getQueueByWorkspaceId(id!)
      .then((response: { queue: SDK.QueueEntry[] }) => {
        setPeopleList(response.queue.map((entry: any) => mapQueueEntry(entry)));
      })
      .catch((err: any) => {
        console.log({ err });
        // TODO: Handle error
      });

    workspaces.watchQueue(id!, (error, person) => {
      if (error) {
        console.error("Failed to watch queue:", error);
        return;
      }

      setPeopleList((peopleList) => {
        const newPeopleList = peopleList.filter(
          (p) => p.id !== person?.customerId
        );
        return [...newPeopleList, mapQueueEntry(person as any)];
      });
    });
  }, [client]);

  useEffect(() => {
    const workspaces = new SDK.Workspaces(client);
    workspaces.watchWorkspaceStatus(id!, (error, status) => {
      if (error) {
        console.error("Failed to watch workspace status:", error);
        return;
      }

      setIsOnline(status?.online!);
    });
  });

  const handleQueueEntrySelect = (id: string) => {
    window.location.href = `/session/${id}`;
  };

  const handleOnlineChange = (newOnlineStatus: boolean) => {
    const workspaces = new SDK.Workspaces(client);
    const status = newOnlineStatus ? "ONLINE" : "OFFLINE";
    workspaces.updateWorkspace({ id: id!, status });
    setIsOnline(newOnlineStatus);
  };

  return (
    <QueuePage
      userName={name}
      avatar={avatar}
      storeURL={storeURL}
      workspaceName={workspaceName}
      avgWaitTime={avgWaitTime}
      data={peopleList}
      isAuthenticated={true}
      isOnline={isOnline}
      onQueueEntrySelect={handleQueueEntrySelect}
      onOnlineStatusChange={handleOnlineChange}
      onSignOut={signOut}
    />
  );
}

export default WorkspaceContainer;
