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
import { Avatar, IconButton, Toolbar } from "@mui/material";
import { ExternalLinkIcon } from "../common/ExternalLinkIcon";
import { GoodtokLogo } from "./GoodtokLogo";
import {
  StyledAppBar,
  StyledContainer,
  StyledMenu,
  StyledMenuItem,
  StyledMenuItemSignout,
  StyledMenuUser,
  StyledToolbar
} from "./AppBarStyles";
import React from "react";

type AppBarProps = {
  workspaceId: string;
  userName: string;
  avatar: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  onSignOut: () => void;
};

export const AppBar: React.FC<AppBarProps> = ({
  workspaceId,
  userName,
  avatar,
  isAuthenticated = false,
  isAdmin = false,
  onSignOut,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnPersonalSettingsSelect = () => {
    window.location.href = `/workspace/${workspaceId}/settings/personal`;
  };

  const handleOnWorkspaceSettingsSelect = () => {
    window.location.href = `/workspace/${workspaceId}/settings/workspace`;
  };

  const handleOnWorkspaceMembersSelect = () => {
    window.location.href = `/workspace/${workspaceId}/settings/members`;
  };

  const handleOnDocumentationSelect = () => {
    window.open("https://docs.goodtok.io", "_blank");
  };

  const handleOnSignOutSelect = () => {
    onSignOut();
  };

  return (
    <>
      <StyledAppBar
        {...props}
        isAuthenticated={isAuthenticated}
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <StyledContainer maxWidth={false}>
          <StyledToolbar isAuthenticated={isAuthenticated}>
            <GoodtokLogo onClick={() => (window.location.href = "/")} />
            {isAuthenticated && (
              <>
                <div style={{ flexGrow: 1 }} />
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar alt={userName} src={avatar}>
                      {userName[0]}
                    </Avatar>
                  </IconButton>
                  <StyledMenu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <StyledMenuUser>Hi {userName}!</StyledMenuUser>
                    <StyledMenuItem onClick={handleOnPersonalSettingsSelect}>
                      Personal Settings
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleOnWorkspaceSettingsSelect}>
                      Workspace Settings
                    </StyledMenuItem>
                    {isAdmin && (
                      <StyledMenuItem onClick={handleOnWorkspaceMembersSelect}>
                        Workspace Members
                      </StyledMenuItem>
                    )}
                    <StyledMenuItem onClick={handleOnDocumentationSelect}>
                      Documentation &nbsp; <ExternalLinkIcon />
                    </StyledMenuItem>
                    <StyledMenuItemSignout onClick={handleOnSignOutSelect}>
                      Sign Out
                    </StyledMenuItemSignout>
                  </StyledMenu>
                </div>
              </>
            )}
          </StyledToolbar>
        </StyledContainer>
      </StyledAppBar>
      <Toolbar />
    </>
  );
};
