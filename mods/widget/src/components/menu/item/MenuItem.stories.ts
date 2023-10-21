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

import { MenuItem } from "./MenuItem";
import { CameraIcon } from "../../icons/CameraIcon";
import { PhoneIcon } from "../../icons/PhoneIcon";
import { CalendarIcon } from "../../icons/CalendarIcon";

/**
 * This story covers the MenuContainer component which is the base component for the Menu component. The MenuContainer
 * component is meant to be used as a fixed container on the bottom right corner of the screen. The container remains
 * hidden until the user clicks on the GoodtokButton component which triggers the MenuContainer component. To hide the
 * MenuContainer component the user can click on the GoodtokButton component again or click anywhere outside the container.
 */
const meta = {
  title: "Widget/MenuItem",
  component: MenuItem,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      name: "Label",
      description: "The text to display",
      defaultValue: { summary: "Request video session" }
    },
    Icon: {
      name: "Icon",
      description: "The icon to display"
    },
    isTopElement: {
      name: "Is Top Element",
      description: "Indicates if the element is the first element of the menu",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    onClick: {
      name: "On Click",
      description: "Triggered when the button is clicked",
      action: "clicked"
    }
  }
} satisfies Meta<typeof MenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Shows a GoodtokMenuItem component for a video session request.
 */
export const VideoCall: Story = {
  args: {
    label: "Request video session",
    Icon: CameraIcon
  }
};

/**
 * Shows a GoodtokMenuItem component for an audio only session request.
 */
export const AudioCall: Story = {
  args: {
    label: "Request audio session",
    Icon: PhoneIcon
  }
};

/**
 * Shows a GoodtokMenuItem component for an audio only session request.
 */
export const ScheduleMeet: Story = {
  args: {
    label: "Schedule a video meet",
    Icon: CalendarIcon
  }
};
