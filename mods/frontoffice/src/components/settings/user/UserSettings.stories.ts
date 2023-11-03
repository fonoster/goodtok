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
import { UserSettings } from "./UserSettings";

/**
 * User settings story. This story is used to showcase the UserSettings component. We are using Gravatar to
 * show the user profile picture. As of now the component doesn't allow changing the email and the avavatar must be
 * changed from Gravatar.
 */
const meta = {
  title: "FrontOffice/UserSettings",
  component: UserSettings,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    initialName: {
      name: "Name",
      description: "The initial name of the user",
      control: {
        type: "text"
      }
    },
    email: {
      name: "Email",
      description: "The email of the user",
      control: {
        type: "text"
      }
    },
    onSave: {
      name: "On Save",
      description:
        "The callback to be called when the user clicks the save button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof UserSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example story showing the UserSettings component.
 */
export const UserSettingsExample: Story = {
  args: {
    initialName: "Jane Doe",
    email: "jane@example.com",
    avatarUrl: "https://mui.com/static/images/avatar/3.jpg"
  }
};
