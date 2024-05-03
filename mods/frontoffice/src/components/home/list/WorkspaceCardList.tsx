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
import {
  WorkspaceCardListMultiRowWrapper,
  WorkspaceCardListWrapper
} from "./WorkspaceCardListStyles";
import { WorkspaceCard } from "../card/WorkspaceCard";
import { AddWorkspaceCard } from "../card/AddWorkspaceCard";
import React from "react";

type WorkspaceCardListProps = {
  workspaces: Array<{
    id: string;
    name: string;
    createdAt: Date;
  }>;
  onWorkspaceSelect: (id?: string) => void;
};

export const WorkspaceCardList = (props: WorkspaceCardListProps) => {
  const sortedWorkspaces = props.workspaces.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (sortedWorkspaces.length < 3) {
    return (
      <WorkspaceCardListWrapper>
        {sortedWorkspaces.map((workspace) => (
          <WorkspaceCard
            onClick={() => props.onWorkspaceSelect(workspace.id)}
            key={workspace.id}
            id={workspace.id}
            name={workspace.name}
            createdAt={workspace.createdAt}
          />
        ))}
        <AddWorkspaceCard onClick={() => props.onWorkspaceSelect()} />
      </WorkspaceCardListWrapper>
    );
  }

  return (
    <WorkspaceCardListMultiRowWrapper>
      {sortedWorkspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          id={workspace.id}
          name={workspace.name}
          createdAt={workspace.createdAt}
          onClick={() => props.onWorkspaceSelect(workspace.id)}
        />
      ))}
      <AddWorkspaceCard onClick={() => props.onWorkspaceSelect()} />
    </WorkspaceCardListMultiRowWrapper>
  );
};
