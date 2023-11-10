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
import { AppBar } from "../appbar/AppBar";
import { Box } from "@mui/material";
import { WorkspaceCardList } from "./list/WorkspaceCardList";
import { ExternalLinkIcon } from "../common/ExternalLinkIcon";
import { getFirstname } from "../../utils/getFirstname";
import {
  StyleHomePageDescription,
  StyledHomePageSubTitle,
  StyledHomePageTitle,
  StyledLink
} from "./HomePageStyles";
import React from "react";

type HomePageProps = {
  workspaceId: string;
  userName: string;
  avatar: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  workspaces: {
    id: string;
    name: string;
    createdAt: Date;
  }[];

  /**
   * Callback fired when a workspace is selected.
   * If the `id` is not provided, the create workspace flow will be triggered.
   */
  onWorkspaceSelect: (id?: string) => void;

  onSignOut: () => void;
};

export const HomePage: React.FC<HomePageProps> = ({
  workspaceId,
  userName,
  avatar,
  isAuthenticated,
  isAdmin,
  workspaces,
  onWorkspaceSelect,
  onSignOut,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        height: "100vh"
      }}
    >
      <AppBar
        workspaceId={workspaceId}
        isAuthenticated={isAuthenticated}
        avatar={avatar}
        userName={userName}
        onSignOut={onSignOut}
        isAdmin={isAdmin}
      />

      <StyledHomePageTitle sx={{ mt: 5 }}>
        Hey {getFirstname(userName)}, welcome to Goodtok 👋
      </StyledHomePageTitle>

      <Box sx={{ mb: 2, width: 440, textAlign: "center" }}>
        <StyledHomePageSubTitle sx={{ mt: 4 }}>
          Ready to engage your customers better and faster?
        </StyledHomePageSubTitle>
        <StyleHomePageDescription sx={{ mt: 2, mb: 1 }}>
          Create a new workspace or use an existing one to begin interacting
          your customer now.{" "}
          <StyledLink
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.goodtok.io"
          >
            Learn more
          </StyledLink>{" "}
          <ExternalLinkIcon />
        </StyleHomePageDescription>
      </Box>

      <WorkspaceCardList
        workspaces={workspaces}
        onWorkspaceSelect={onWorkspaceSelect}
      />
    </Box>
  );
};
