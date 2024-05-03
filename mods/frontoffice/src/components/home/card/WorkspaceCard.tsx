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
import React from "react";
import {
  StyledWorkspaceCard,
  StyledWorkspaceCardCircle,
  StyledWorkspaceCardCircleText,
  StyledWorkspaceCardDate,
  StyledWorkspaceCardName,
  StyledWorkspaceCardNameContainer
} from "./WorkspaceCardStyles";

type WorkspaceCardProps = {
  id: string;
  name: string;
  createdAt: Date;
  onClick: (id: string) => void;
};

function getInitials(name: string): string {
  const words = name.split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  } else {
    return (
      words[0].substring(0, 1).toUpperCase() +
      words[1].substring(0, 1).toUpperCase()
    );
  }
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  id,
  name,
  createdAt,
  onClick,
  ...props
}) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric"
  };

  const formattedDate = createdAt.toLocaleDateString("en-US", options);

  return (
    <StyledWorkspaceCard {...props} onClick={() => onClick(id)}>
      <StyledWorkspaceCardCircle>
        <StyledWorkspaceCardCircleText>
          {getInitials(name)}
        </StyledWorkspaceCardCircleText>
      </StyledWorkspaceCardCircle>

      <StyledWorkspaceCardNameContainer>
        <StyledWorkspaceCardName>{name}</StyledWorkspaceCardName>
        <StyledWorkspaceCardDate>{formattedDate}</StyledWorkspaceCardDate>
      </StyledWorkspaceCardNameContainer>
    </StyledWorkspaceCard>
  );
};
