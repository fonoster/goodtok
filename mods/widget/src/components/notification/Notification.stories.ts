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
import { Notification } from "./Notification";

/**
 * Final implementation of the Menu component, which simply requires a JSON object with the menu items,
 * and provides a callback for when an item is clicked and the online status of the staff.
 */
const meta = {
  title: "Widget/Notification",
  component: Notification,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    online: {
      name: "Status Indicator",
      description: "Indicates if the staff is accepting calls",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    isOpen: {
      name: "Open/Close toggle",
      description: "Close or open the menu",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    onClose: {
      name: "Close Callback",
      description: "Callback when the notification is closed",
      control: {
        type: "function"
      },
      action: "clicked"
    },
    isError: {
      name: "Error Indicator",
      description: "Indicates if the notification is an error",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    }
  }
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * Example of a MenuContainer component with MenuItems as children.
 */
export const NotificationExample: Story = {
  args: {
    online: true,
    isOpen: true,
    isError: false
  }
};

/**
 * Example of an error notification.
 */
export const NotificationErrorExample: Story = {
  args: {
    online: true,
    isOpen: true,
    isError: true
  }
};
