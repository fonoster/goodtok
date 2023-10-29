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
import {
  StyleHomePAgeDescription,
  StyledHomePageSubTitle,
  StyledHomePageTitle
} from "./HomePageStyles";
import React from "react";

type HomePageProps = {
  userName: string;
  isAuthenticated: boolean;
  workspaces: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  onClick: (id?: string) => void;
};

export const HomePage: React.FC<HomePageProps> = ({
  userName,
  isAuthenticated,
  workspaces,
  onClick: onClick,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        mb: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <AppBar isAuthenticated={isAuthenticated} userName={userName} />
      <StyledHomePageTitle sx={{ mt: 10 }}>
        Hey {userName}, welcome to Goodtok 👋
      </StyledHomePageTitle>

      <Box sx={{ mb: 2, width: 440, textAlign: "center" }}>
        <StyledHomePageSubTitle sx={{ mt: 5 }}>
          Ready to engage your customers better and faster?
        </StyledHomePageSubTitle>
        <StyleHomePAgeDescription sx={{ mt: 1 }}>
          Create a new workspace or use an existing one to begin interacting
          your customer now. Learn more.
        </StyleHomePAgeDescription>
      </Box>

      <WorkspaceCardList workspaces={workspaces} onClick={onClick} />
    </Box>
  );
};
