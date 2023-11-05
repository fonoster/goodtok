import * as SDK from "@goodtok/sdk";
import { useParams } from "react-router-dom";
import { useAuth } from "~authentication";
import React, { useEffect } from "react";
import { QueuePage } from "~components/queue/QueuePage";

function WorkspaceContainer() {
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [storeURL, setStoreURL] = React.useState("");
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [avgWaitTime, setAvgWaitTime] = React.useState("");
  const [peopleList, setPeopleList] = React.useState<any[]>([]);
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

    workspaces.watchQueue(id!, (error, person) => {
      if (error) {
        console.error("Failed to watch queue:", error);
        return;
      }

      const mapPerson = (person: any) => {
        return {
          userId: person.customerId,
          userName: person.customer.name,
          isOnline: person.status === "ONLINE",
          note: "Prefers monthly newsletter",
          time: "10m"
        };
      };

      setPeopleList((peopleList) => [...peopleList, mapPerson(person)]);
    });
  }, [client]);

  // const handleWorkspaceSelect = (id?: string) => {
  //   if (!id) {
  //     window.location.href = "/new-workspace";
  //     return;
  //   }
  //   window.location.href = `/workspace/${id}`;
  // };

  return (
    <QueuePage
      userName={name}
      avatar={avatar}
      storeURL={storeURL}
      workspaceName={workspaceName}
      avgWaitTime={avgWaitTime}
      data={peopleList}
      isAuthenticated={true}
      onClick={() => {}}
      onSignOut={signOut}
    />
  );
}

export default WorkspaceContainer;
