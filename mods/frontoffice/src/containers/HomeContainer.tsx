import * as SDK from "@goodtok/sdk";
import { HomePage } from "~components/home/HomePage";
import { useAuth } from "~authentication";
import React, { useEffect } from "react";

function HomeContainer() {
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [defaultWorkspaceId, setDefaultWorkspaceId] = React.useState<string>();
  const [workspaces, setWorkspaces] = React.useState<
    Array<{
      id: string;
      name: string;
      createdAt: Date;
    }>
  >([]);

  const { client, signOut, isSignedIn } = useAuth();

  if (!client) {
    signOut();
    return;
  }

  useEffect(() => {
    setDefaultWorkspaceId(client.getDefaultWorkspaceId());

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
      .getWorkspaces()
      .then((res) => {
        const workspacesList = res.map((workspace) => {
          return {
            id: workspace.id,
            name: workspace.name,
            createdAt: new Date(workspace.createdAt)
          };
        });
        setWorkspaces(workspacesList);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [client]);

  const handleWorkspaceSelect = (id?: string) => {
    if (!id) {
      window.location.href = "/new-workspace";
      return;
    }
    window.location.href = `/workspace/${id}`;
  };

  return (
    <HomePage
      workspaceId={defaultWorkspaceId!}
      isAuthenticated={true}
      avatar={avatar}
      userName={name}
      workspaces={workspaces}
      onWorkspaceSelect={handleWorkspaceSelect}
      onSignOut={signOut}
    />
  );
}

export default HomeContainer;
