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
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from "@mui/material";
import { StyledDrawer, StyledLink, StyledTitle } from "./HBarStyles";
import { HBarSection } from "./types";
import React from "react";

type HBarProps = {
  userName: string;
  currentSection: HBarSection;
  onSignOut: () => void;
  onSectionChange: (section: HBarSection) => void;
};

export const HBar: React.FC<HBarProps> = ({
  userName,
  currentSection,
  onSignOut,
  onSectionChange
}) => {
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    section: HBarSection
  ) => {
    onSectionChange(section);
  };

  return (
    <StyledDrawer anchor="left" variant="persistent" open={true}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <StyledTitle sx={{ p: 2 }}>
          Hello, {userName?.split(" ")[0]}!
        </StyledTitle>
        <List
          sx={{ width: 250, flexGrow: 1, overflow: "auto" }}
          component="nav"
          aria-label="user and workspace settings"
        >
          {Object.values(HBarSection).map((section) => (
            <ListItem
              key={section}
              disablePadding
              alignItems="center"
              sx={{ justifyContent: "center" }}
              selected={currentSection === section}
              onClick={(event) => handleListItemClick(event, section)}
            >
              <ListItemButton sx={{ justifyContent: "center" }}>
                <ListItemText primary={section} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 2, mb: 3 }}>
          <StyledLink onClick={() => onSignOut && onSignOut()}>
            Sign out
          </StyledLink>
        </Box>
      </Box>
    </StyledDrawer>
  );
};
