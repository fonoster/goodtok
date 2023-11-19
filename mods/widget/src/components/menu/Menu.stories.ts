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
import { Menu } from "./Menu";
import { CameraIcon } from "../icons/CameraIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import { CalendarIcon } from "../icons/CalendarIcon";

/**
 * Final implementation of the Menu component, which simply requires a JSON object with the menu items,
 * and provides a callback for when an item is clicked and the online status of the remote.
 */
const meta = {
  title: "Widget/Menu",
  component: Menu,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    online: {
      name: "Status Indicator",
      description: "Indicates if the remote is accepting calls",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    isOpen: {
      name: "Open/Close toggle",
      description: "Close or open the menu",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    data: {
      name: "Menu Items",
      description: "List of menu items",
      control: {
        type: "object"
      }
    },
    onItemClicked: {
      name: "Item Clicked Callback",
      description: "Callback when an item is clicked",
      control: {
        type: "function"
      },
      action: "clicked"
    }
  }
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * Example of a MenuContainer component with MenuItems as children.
 */
export const ComponentWithChildren: Story = {
  args: {
    online: true,
    isOpen: true,
    data: [
      {
        name: "VIDEO_SESSION",
        Icon: CameraIcon,
        label: "Request video session",
        requiresOnline: true
      },
      {
        name: "AUDIO_SESSION",
        Icon: PhoneIcon,
        label: "Request audio session",
        requiresOnline: true
      },
      {
        name: "SCHEDULE_SESSION",
        Icon: CalendarIcon,
        label: "Schedule a meeting"
      }
    ]
  }
};
