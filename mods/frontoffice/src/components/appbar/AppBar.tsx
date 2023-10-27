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
import { Avatar, IconButton } from "@mui/material";
import { GoodtokLogo } from "./GoodtokLogo";
import { 
  StyledAppBar, 
  StyledContainer, 
  StyledMenu, 
  StyledMenuItem,
  StyledMenuUser, 
  StyledToolbar 
} from "./styles";
import React from "react";

type AppBarProps = {
  isAuthenticated?: boolean;
  avatar?: string;
  userName?: string;
};

export const AppBar: React.FC<AppBarProps> = ({
  userName = "",
  avatar = "",
  isAuthenticated = false,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <StyledAppBar {...props} isAuthenticated={isAuthenticated} position="static">
      <StyledContainer maxWidth={false}>
        <StyledToolbar isAuthenticated={isAuthenticated} >
          <GoodtokLogo />
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
                  <Avatar
                    alt={userName}
                    src={avatar}
                  >
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
                  <StyledMenuItem>Personal Settings</StyledMenuItem>
                  <StyledMenuItem>Workspace Settings</StyledMenuItem>
                  <StyledMenuItem>Workspace Members</StyledMenuItem>
                  <StyledMenuItem>Documentation</StyledMenuItem>
                  <StyledMenuItem>Sign Out</StyledMenuItem>
                </StyledMenu>
              </div>
            </>
          )}
        </StyledToolbar>
      </StyledContainer>
    </StyledAppBar>
  );
};
