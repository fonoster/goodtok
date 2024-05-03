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
import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPage } from "./SettingsPage";
import { Role, Status } from "./members/types";
import { HBarSection } from "./hbar/types";

/**
 * This components holds the settings screens for the Front Office including the UserSettings, WorkspaceSettings,
 * and InviteMember components.
 */
const meta = {
  title: "FrontOffice/SettingsPage",
  component: SettingsPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "goodtok-gray"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    userSettings: {
      name: "User Settings",
      description: "The user settings to be displayed in the user settings form"
    },
    workspaceSettings: {
      name: "Workspace Settings",
      description:
        "The workspace settings to be displayed in the workspace settings form"
    },
    members: {
      name: "Members",
      description: "The members to be displayed in the members section"
    },
    currentSection: {
      name: "Current Section",
      description: "The current section to be displayed",
      control: {
        type: "select",
        options: Object.values(HBarSection)
      }
    },
    onSignOut: {
      name: "On Sign Out",
      description: "The callback to be called when the user clicks sign out",
      action: "clicked"
    },
    onUserSettingsSave: {
      name: "On User Settings Save",
      description:
        "The callback to be called when the user clicks the save button in the user settings",
      action: "clicked"
    },
    onWorkspaceSettingsSave: {
      name: "On Workspace Settings Save",
      description:
        "The callback to be called when the user clicks the save button in the workspace settings",
      action: "clicked"
    },
    onInvite: {
      name: "On Invite",
      description:
        "The callback to be called when the user clicks the invite button",
      action: "clicked"
    },
    onMemberDelete: {
      name: "On Member Delete",
      description:
        "The callback to be called when the user clicks the delete button in the members section",
      action: "clicked"
    }
  }
} satisfies Meta<typeof SettingsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Settings page story. This story is used to showcase the SettingsPage component.
 */
export const SettingsPageExample: Story = {
  args: {
    workspaceId: "1",
    userSettings: {
      id: "1",
      name: "Jane Doe",
      email: "jane@example.com",
      avatarUrl: "https://mui.com/static/images/avatar/3.jpg",
      createdAt: new Date("2021-01-01T00:00:00Z")
    },
    workspaceSettings: {
      name: "My Workspace",
      timezone: "America/New_York",
      shopifyStoreUrl: "quickstart-43c62e3b.myshopify.com",
      calendarUrl: "https://cal.com/some-calendar",
      hoursOfOperation: {
        Monday: {
          from: "09:00",
          to: "17:00"
        },
        Tuesday: {
          from: "09:00",
          to: "17:00"
        },
        Wednesday: {
          from: "09:00",
          to: "17:00"
        },
        Thursday: {
          from: "09:00",
          to: "17:00"
        },
        Friday: {
          from: "09:00",
          to: "17:00"
        },
        Saturday: {
          from: "",
          to: ""
        },
        Sunday: {
          from: "",
          to: ""
        }
      }
    },
    members: [
      {
        id: "1",
        userId: "101",
        name: "John Doe",
        email: "john@example.com",
        role: Role.ADMIN,
        status: Status.ACTIVE,
        createdAt: new Date("2021-01-01T00:00:00Z")
      },
      {
        id: "2",
        userId: "102",
        name: "Lisa Smith",
        email: "lisa.smith@service.com",
        role: Role.MEMBER,
        status: Status.PENDING,
        createdAt: new Date("2020-08-15T14:25:36Z")
      },
      {
        id: "3",
        userId: "103",
        name: "Omar Ahmad",
        email: "omar.ahmad@mysite.net",
        role: Role.MEMBER,
        status: Status.ACTIVE,
        createdAt: new Date("2022-03-22T10:42:00Z")
      },
      {
        id: "4",
        userId: "104",
        name: "Emily Johnson",
        email: "emilyj@corporate.org",
        role: Role.ADMIN,
        status: Status.PENDING,
        createdAt: new Date("2021-11-05T19:33:27Z")
      },
      {
        id: "5",
        userId: "105",
        name: "Raj Patel",
        email: "raj.patel@exampleshop.com",
        role: Role.MEMBER,
        status: Status.ACTIVE,
        createdAt: new Date("2019-12-01T08:00:00Z")
      }
    ],
    currentSection: HBarSection.PERSONAL_SETTINGS
  }
};
