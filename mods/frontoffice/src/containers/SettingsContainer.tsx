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
import { useAuth } from "~authentication";
import { SettingsPage } from "~components/settings/SettingsPage";
import { HBarSection } from "~components/settings/hbar/types";
import { UserSettingsType } from "~components/settings/user/types";
import { WorkspaceSettingsType } from "~components/settings/workspace/types";
import { useSnackbar } from "~snackbar";
import { useParams } from "react-router-dom";
import {
  InviteInfo,
  Member,
  Role,
  Status
} from "~components/settings/members/types";
import { useLogger } from "~logger";
import React, { useEffect } from "react";

function SettingsContainer() {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [userSettings, setUserSettings] =
    React.useState<UserSettingsType | null>(null);
  const [workspaceSettings, setWorkspaceSettings] =
    React.useState<WorkspaceSettingsType>();

  const { id: workspaceId, section } = useParams() as {
    id: string;
    section: string;
  };

  let hbarSection = HBarSection.PERSONAL_SETTINGS;

  switch (section) {
    case "personal":
      hbarSection = HBarSection.PERSONAL_SETTINGS;
      break;
    case "workspace":
      hbarSection = HBarSection.WORKSPACE_SETTINGS;
      break;
    case "members":
      hbarSection = HBarSection.MEMBERS;
      break;
    default:
      hbarSection = HBarSection.PERSONAL_SETTINGS;
      break;
  }

  const [currentSection] = React.useState<HBarSection>(hbarSection);

  const { client, signOut, renewToken, isSignedIn, isAdmin } = useAuth();
  const { showSnackbar, showErrorSnackbar } = useSnackbar();
  const logger = useLogger();

  if (!client) {
    signOut();
    return;
  }

  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    const users = new SDK.Users(client);

    users
      .getCurrentUser()
      .then((user) => {
        setUserSettings({
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar,
          createdAt: new Date(user.createdAt)
        });
      })
      .catch((err) => {
        logger.error("error creating workspace", err);
      });
  }, [client]);

  useEffect(() => {
    const workspaces = new SDK.Workspaces(client);

    workspaces
      .getWorkspaceById(workspaceId)
      .then((workspace) => {
        setWorkspaceSettings({
          name: workspace.name,
          timezone: workspace.timezone,
          shopifyStoreUrl: workspace.shopifyAccount?.storeDomain as string,
          calendarUrl: workspace.calendarUrl,
          hoursOfOperation: workspace.hoursOfOperation
        });
      })
      .catch((err) => {
        logger.error("error getting workspace", err);
      });
  }, [client, workspaceId]);

  useEffect(() => {
    if (userSettings === null) {
      return;
    }

    const workspaces = new SDK.Workspaces(client);

    // Initialize members with owner data
    const ownerMember = {
      id: userSettings.id,
      userId: userSettings.id,
      name: userSettings.name,
      email: userSettings.email,
      role: Role.OWNER,
      status: Status.ACTIVE,
      createdAt: new Date(userSettings.createdAt)
    };

    setMembers([ownerMember]); // set initial state with only the owner

    workspaces
      .getMembersByWorkspaceId(workspaceId)
      .then((response) => {
        const newMembers = response.members.map((member) => ({
          id: member.id,
          userId: member.userId,
          name: member.name,
          email: member.email,
          role: member.role as unknown as Role,
          status: member.status as unknown as Status,
          createdAt: new Date(member.createdAt)
        }));

        setMembers((prevMembers) => [prevMembers[0], ...newMembers]);
      })
      .catch((err) => {
        logger.error("error getting workspace members", err);
      });
  }, [client, workspaceId, userSettings]);

  const handleOnUserSettingsSave = (name: string, password: string) => {
    const currentUserSettings = userSettings;
    const users = new SDK.Users(client);

    users
      .updateUser({
        name: name,
        password: password
      })
      .then(() => {
        showSnackbar("Settings saved");
        setUserSettings({
          ...currentUserSettings!,
          name: name
        });
      })
      .catch((err) => {
        showErrorSnackbar(err.message);
        logger.error("error updating user", err);
      });
  };

  const handleOnWorkspaceSettingsSave = (settings: WorkspaceSettingsType) => {
    const workspaces = new SDK.Workspaces(client);
    workspaces
      .updateWorkspace({
        id: workspaceId,
        name: settings.name,
        timezone: settings.timezone,
        shopifyAccount: {
          storeDomain: settings.shopifyStoreUrl,
          accessToken: settings.shopifyStoreAPIkey
        },
        calendarUrl: settings.calendarUrl,
        hoursOfOperation: settings.hoursOfOperation
      })
      .then(() => {
        showSnackbar("Settings saved");
      })
      .catch((err) => {
        showErrorSnackbar(err.message);
        logger.error("error updating workspace", err);
      });
  };

  const handleOnWorkspaceDelete = () => {
    const workspaces = new SDK.Workspaces(client);

    workspaces
      .removeWorkspace(workspaceId)
      .then(async function () {
        await renewToken();
        window.location.href = "/";
      })
      .catch((err) => {
        logger.error("error deleting workspace", err);
      });
  };

  const handleOnMemberDelete = (id: string) => {
    const workspaces = new SDK.Workspaces(client);

    workspaces
      .removeWorkspaceMember(id)
      .then(() => {
        showSnackbar("Member removed");
        setMembers(members.filter((member) => member.id !== id));
      })
      .catch((err) => {
        logger.error("error removing workspace member", err);
      });
  };

  const handleOnInvite = (info: InviteInfo) => {
    const workspaces = new SDK.Workspaces(client);

    workspaces
      .addWorkspaceMember({
        workspaceId: workspaceId,
        name: info.name,
        email: info.email,
        role: info.role
      })
      .then(() => {
        showSnackbar("Invite sent");
      })
      .catch((err) => {
        logger.error("error adding workspace member", err);
      });
  };

  const handleResendInvite = (id: string) => {
    const workspaces = new SDK.Workspaces(client);

    workspaces
      .resendWorkspaceMemberInvite(id)
      .then(() => {
        showSnackbar("Invite resent");
      })
      .catch((err) => {
        logger.error("error resending workspace member invite", err);
      });
  };

  const handleOnSectionChange = (section: HBarSection) => {
    switch (section) {
      case HBarSection.PERSONAL_SETTINGS:
        window.location.href = `/workspace/${workspaceId}/settings/personal`;
        break;
      case HBarSection.WORKSPACE_SETTINGS:
        window.location.href = `/workspace/${workspaceId}/settings/workspace`;
        break;
      case HBarSection.MEMBERS:
        window.location.href = `/workspace/${workspaceId}/settings/members`;
        break;
    }
  };

  return (
    userSettings &&
    workspaceSettings && (
      <SettingsPage
        isAdmin={isAdmin(workspaceId)}
        workspaceId={workspaceId}
        currentSection={currentSection}
        members={members}
        userSettings={userSettings}
        workspaceSettings={workspaceSettings}
        onSignOut={signOut}
        onMemberDelete={handleOnMemberDelete}
        onInvite={handleOnInvite}
        onResendInvite={handleResendInvite}
        onUserSettingsSave={handleOnUserSettingsSave}
        onWorkspaceSettingsSave={handleOnWorkspaceSettingsSave}
        onWorkspaceDelete={handleOnWorkspaceDelete}
        onSectionChange={handleOnSectionChange}
      />
    )
  );
}

export default SettingsContainer;
