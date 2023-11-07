import * as SDK from "@goodtok/sdk";
import { useAuth } from "~authentication";
import { SettingsPage } from "~components/settings/SettingsPage";
import { HBarSection } from "~components/settings/hbar/types";
import { useParams } from "react-router-dom";
import { UserSettingsType } from "~components/settings/user/types";
import { WorkspaceSettingsType } from "~components/settings/workspace/types";
import React, { useEffect } from "react";

function SettingsContainer() {
  const [userSettings, setUserSettings] = React.useState<UserSettingsType>();
  const [workspaceSettings, setWorkspaceSettings] =
    React.useState<WorkspaceSettingsType>();

  const { id: workspaceId, section } = useParams();
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

  const { client, signOut } = useAuth();

  if (!client) {
    signOut();
    return;
  }

  useEffect(() => {
    const users = new SDK.Users(client!);
    users
      .getCurrentUser()
      .then((user) => {
        console.log(user);
        setUserSettings({
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar
        });
      })
      .catch((err) => {
        // TODO: Handle error
        console.log(err);
      });
  }, [client]);

  useEffect(() => {
    const workspaces = new SDK.Workspaces(client!);
    workspaces
      .getWorkspaceById(workspaceId!)
      .then((workspace) => {
        setWorkspaceSettings({
          name: workspace.name,
          timezone: workspace.timezone,
          shopifyStoreUrl: workspace.shopifyAccount?.storeDomain!,
          calendarUrl: workspace.calendarUrl,
          hoursOfOperation: workspace.hoursOfOperation
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [client]);

  const handleOnUserSettingsSave = (name: string, password: string) => {
    const currentUserSettings = userSettings;
    const users = new SDK.Users(client!);

    users
      .updateUser({
        id: client.getCurrentUserId(),
        name: name
      })
      .then(() => {
        setUserSettings({
          ...currentUserSettings!,
          name: name
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOnWorkspaceSettingsSave = (settings: WorkspaceSettingsType) => {
    const workspaces = new SDK.Workspaces(client!);
    workspaces
      .updateWorkspace({
        id: workspaceId!,
        name: settings.name!,
        timezone: settings.timezone!,
        shopifyAccount: {
          storeDomain: settings.shopifyStoreUrl!,
          accessToken: settings.shopifyStoreAPIkey!
        },
        calendarUrl: settings.calendarUrl!,
        hoursOfOperation: settings.hoursOfOperation!
      })
      .then(() => {
        console.log("updated workspace");
      });
  };

  const handleOnMemberDelete = () => {};

  const handleOnInvite = () => {};

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
        workspaceId={workspaceId!}
        currentSection={currentSection}
        members={[]}
        userSettings={userSettings}
        workspaceSettings={workspaceSettings}
        onSignOut={signOut}
        onMemberDelete={handleOnMemberDelete}
        onInvite={handleOnInvite}
        onUserSettingsSave={handleOnUserSettingsSave}
        onWorkspaceSettingsSave={handleOnWorkspaceSettingsSave}
        onSectionChange={handleOnSectionChange}
      />
    )
  );
}

export default SettingsContainer;
