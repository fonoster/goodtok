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
import { WorkspaceCardList } from "../list/WorkspaceCardList";

/**
 * This story is for the WorkspaceCardList component which displays a list of workspaces. The WorkspaceCardList
 * component is meant to be used in the home page of the front office.
 */
const meta = {
  title: "FrontOffice/WorkspaceCardList",
  component: WorkspaceCardList,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    workspaces: {
      name: "Workspaces",
      description: "List of workspaces",
      control: { type: "object" },
      defaultValue: { summary: "[]" }
    },
    onWorkspaceSelect: {
      name: "On Workspace Select",
      description:
        "The callback to be called when the user clicks the workspace",
      action: "clicked"
    }
  }
} satisfies Meta<typeof WorkspaceCardList>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of a workspace card list with no workspaces
 */
export const ExampleWithNoWorkspaces: Story = {
  args: {
    workspaces: []
  }
};

/**
 * Example of a workspace card list with one workspace
 */
export const ExampleWithOneWorkspace: Story = {
  args: {
    workspaces: [
      {
        id: "1",
        name: "Workspace 1",
        createdAt: new Date("2021-10-01")
      }
    ]
  }
};

/**
 * Example of a workspace card list with two workspaces
 */
export const ExampleWithTwoWorkspaces: Story = {
  args: {
    workspaces: [
      {
        id: "1",
        name: "Workspace 1",
        createdAt: new Date("2021-10-01")
      },
      {
        id: "2",
        name: "Workspace 2",
        createdAt: new Date("2021-10-01")
      }
    ]
  }
};

/**
 * Example of a workspace card list with three workspaces
 */
export const ExampleWithThreeWorkspaces: Story = {
  args: {
    workspaces: [
      {
        id: "1",
        name: "Workspace 1",
        createdAt: new Date("2021-10-01")
      },
      {
        id: "2",
        name: "Workspace 2",
        createdAt: new Date("2021-10-01")
      },
      {
        id: "3",
        name: "Workspace 3",
        createdAt: new Date("2021-10-01")
      }
    ]
  }
};

export const ExampleWithSixWorkspaces: Story = {
  args: {
    workspaces: [
      {
        id: "1",
        name: "Workspace 1",
        createdAt: new Date("2021-10-01")
      },
      {
        id: "2",
        name: "Workspace 2",
        createdAt: new Date("2021-10-01")
      },
      {
        id: "3",
        name: "Workspace 3",
        createdAt: new Date("2021-10-01")
      },
      {
        id: "4",
        name: "Workspace 4",
        createdAt: new Date("2021-10-01")
      },
      {
        id: "5",
        name: "Workspace 5",
        createdAt: new Date("2021-10-01")
      },
      {
        id: "6",
        name: "Workspace 6",
        createdAt: new Date("2021-10-01")
      }
    ]
  }
};
