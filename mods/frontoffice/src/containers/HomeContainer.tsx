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
import { HomePage } from "~components/home/HomePage";
import { useAuth } from "~authentication";
import { useLogger } from "~logger";
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

  const { client, signOut, isSignedIn, isAdmin } = useAuth();
  const logger = useLogger();

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
        logger.error("error getting current user", err);
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
        logger.error("error getting workspaces", { err });
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
      isAdmin={isAdmin(defaultWorkspaceId!)}
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
