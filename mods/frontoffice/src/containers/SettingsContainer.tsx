import * as SDK from "@goodtok/sdk";
import { useAuth } from "~authentication";
import { SettingsPage } from "~components/settings/SettingsPage";
import { HBarSection } from "~components/settings/hbar/types";
import { useParams } from "react-router-dom";
import { UserSettingsType } from "~components/settings/user/types";
import { WorkspaceSettingsType } from "~components/settings/workspace/types";
import { InviteInfo, Member, Role, Status } from "~components/settings/members/types";
import React, { useEffect } from "react";

function SettingsContainer() {
  const [members, setMembers] = React.useState<Member[]>([]);
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

  const { client, signOut, isSignedIn } = useAuth();

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
    const users = new SDK.Users(client!);
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
        // TODO: Handle error
        console.error(err);
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

  useEffect(() => {
    const workspaces = new SDK.Workspaces(client!);
    workspaces.
      getMembersByWorkspaceId(workspaceId!)
      .then((response) => {
        const newMembers = response.members.map((member) => {
          console.log(member);

          return {
            id: member.id,
            name: member.name,
            email: member.email,
            role: member.role,
            status: member.status,
            createdAt: new Date(member.createdAt)
          };
        });

        const ownerMember = {
          id: userSettings!.id,
          name: userSettings!.name,
          email: userSettings!.email,
          role: Role.OWNER,
          status: Status.ACTIVE,
          createdAt: userSettings!.createdAt
        };
        setMembers([ownerMember, ...newMembers] as unknown as Member[]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [client, userSettings]);

  const handleOnUserSettingsSave = (name: string, password: string) => {
    const currentUserSettings = userSettings;
    const users = new SDK.Users(client!);

    users
      .updateUser({
        name: name,
        password: password
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

  const handleOnMemberDelete = (id: string) => {
    console.log("delete = ", id);
  };

  const handleOnInvite = (info: InviteInfo) => {
    console.log("invite", { info });
  };

  const handleResendInvite = (id: string) => {
    console.log("resend invite", { id });
  }

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
        members={members}
        userSettings={userSettings}
        workspaceSettings={workspaceSettings}
        onSignOut={signOut}
        onMemberDelete={handleOnMemberDelete}
        onInvite={handleOnInvite}
        onResendInvite={handleResendInvite}
        onUserSettingsSave={handleOnUserSettingsSave}
        onWorkspaceSettingsSave={handleOnWorkspaceSettingsSave}
        onSectionChange={handleOnSectionChange}
      />
    )
  );
}

export default SettingsContainer;
