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
import type { Meta, StoryObj } from "@storybook/react";
import { HomePage } from "./HomePage";

/**
 * This component holds the home page which is displayed when the user first logs in.
 */
const meta = {
  title: "FrontOffice/HomePage",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    onWorkspaceSelect: {
      name: "On Workspace Select",
      description:
        "The callback to be called when the user clicks the workspace",
      action: "clicked"
    }
  }
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default story shows the home page with no data.
 */
export const HomePageExample: Story = {
  args: {
    userName: "John Doe",
    isAuthenticated: true,
    workspaces: []
  }
};

/**
 * The default story shows the home page with no data.
 */
export const HomePageWithOneWorkspace: Story = {
  args: {
    userName: "John Doe",
    isAuthenticated: true,
    workspaces: [
      {
        id: "1",
        name: "Workspace 1",
        createdAt: new Date("2021-10-01T00:00:00.000Z")
      }
    ]
  }
};
