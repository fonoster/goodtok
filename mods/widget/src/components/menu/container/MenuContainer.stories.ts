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
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CameraIcon } from "../../icons/CameraIcon";
import { MenuContainer } from "./MenuContainer";
import { MenuItem } from "../item/MenuItem";
import { PhoneIcon } from "../../icons/PhoneIcon";

/**
 * This story covers the MenuContainer component which is the base component for the Menu component. The MenuContainer
 * component is meant to be used as a fixed container on the bottom right corner of the screen. The container remains
 * hidden until the user clicks on the GoodtokButton component which triggers the MenuContainer component. To hide the
 * MenuContainer component the user can click on the GoodtokButton component again or click anywhere outside the container.
 */
const meta = {
  title: "Widget/MenuContainer",
  component: MenuContainer,
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
    children: {
      name: "Menu Items",
      description: "Menu items to be rendered",
      control: { type: "object" },
      defaultValue: { summary: "[]" }
    }
  }
} satisfies Meta<typeof MenuContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * Example of a MenuContainer component with MenuItems as children.
 */
export const ComponentWithChildren: Story = {
  args: {
    online: false,
    isOpen: true,
    // Render two MenuItem components as children
    children: [
      React.createElement(MenuItem, {
        isTopElement: true,
        label: "Request video session",
        onClick: () => {
          console.log("Clicked");
        },
        Icon: CameraIcon
      }),
      React.createElement(MenuItem, {
        label: "Request audio session",
        onClick: () => {
          console.log("Clicked");
        },
        Icon: PhoneIcon
      })
    ]
  }
};
