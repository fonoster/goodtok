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
import { HBar } from "./hbar/HBar";
import { UserSettings } from "./user/UserSettings";
import { HBarSection } from "./hbar/types";
import { WorkspaceSettings } from "./workspace/WorkspaceSettings";
import { Members } from "./members/Members";
import { InviteInfo, Member } from "./members/types";
import { WorkspaceSettingsType } from "./workspace/types";
import { UserSettingsType } from "./user/types";
import React from "react";

type SettingsPageProps = {
  workspaceId: string;
  members: Member[];
  userSettings: UserSettingsType;
  workspaceSettings: WorkspaceSettingsType;
  currentSection: HBarSection;
  onSignOut: () => void;
  onUserSettingsSave: (name: string, password: string) => void;
  onWorkspaceSettingsSave: (
    settings: WorkspaceSettingsType & { shopifyStoreAPIkey: string }
  ) => void;
  onMemberDelete: (id: string) => void;
  onInvite: (info: InviteInfo) => void;
  onSectionChange: (section: HBarSection) => void;
};

export const SettingsPage: React.FC<SettingsPageProps> = ({
  workspaceId,
  userSettings,
  workspaceSettings,
  members,
  currentSection,
  onSignOut,
  onWorkspaceSettingsSave,
  onUserSettingsSave,
  onMemberDelete,
  onInvite,
  onSectionChange,
  ...props
}) => {
  return (
    <Box {...props} sx={{ background: "#F5F5F5", minHeight: "100vh" }}>
      <AppBar
        workspaceId={workspaceId}
        isAuthenticated={true}
        userName={userSettings.name || ""}
        avatar={userSettings.avatarUrl}
        onSignOut={onSignOut}
      />

      <HBar
        currentSection={currentSection}
        userName={userSettings.name}
        onSectionChange={onSectionChange}
        onSignOut={onSignOut}
      />

      <Box
        sx={{
          marginLeft: "250px",
          paddingBottom: "40px",
          paddingRight: "100px",
          paddingLeft: "100px",
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        {currentSection === HBarSection.PERSONAL_SETTINGS && (
          <UserSettings
            initialName={userSettings.name}
            email={userSettings.email}
            avatarUrl={userSettings.avatarUrl}
            onSave={(name: string, password: string) =>
              onUserSettingsSave && onUserSettingsSave(name, password)
            }
          />
        )}
        {currentSection === HBarSection.WORKSPACE_SETTINGS && (
          <WorkspaceSettings
            initialName={workspaceSettings.name}
            initialTimezone={workspaceSettings.timezone}
            initialShopifyStoreUrl={workspaceSettings.shopifyStoreUrl}
            initialCalendarUrl={workspaceSettings.calendarUrl}
            initialHoursOfOperation={workspaceSettings.hoursOfOperation}
            onSave={(
              settings: WorkspaceSettingsType & { shopifyStoreAPIkey: string }
            ) => onWorkspaceSettingsSave && onWorkspaceSettingsSave(settings)}
          />
        )}
        {currentSection === HBarSection.MEMBERS && (
          <Members
            data={members}
            onDelete={(id: string) => onMemberDelete && onMemberDelete(id)}
            onInvite={(info: InviteInfo) => onInvite && onInvite(info)}
          />
        )}
      </Box>
    </Box>
  );
};
