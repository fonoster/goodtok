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
import { HBar } from "./HBar";

/**
 * The HBar component allows the user to navigate between the different settings pages.
 */
const meta = {
  title: "FrontOffice/HBar",
  component: HBar,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  argTypes: {
    userName: {
      name: "User Name",
      description: "The name of the user",
      control: {
        type: "text"
      }
    },
    onSignOut: {
      name: "On Sign Out",
      description:
        "The callback to be called when the user clicks the sign out button",
      action: "clicked"
    },
    onSectionChange: {
      name: "On Section Change",
      description:
        "The callback to be called when the user clicks the sign out button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof HBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of the HBar component.
 */
export const HBarExample: Story = {
  args: {
    userName: "John"
  }
};
