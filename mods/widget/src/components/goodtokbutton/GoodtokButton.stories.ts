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

import { GoodtokButton } from "./GoodtokButton";

/**
 * This story is for the GoodtokButton component which triggers the Goodtok widget. The GoodtokButton component is
 * is meant to be used as a floating button on the bottom right corner of the screen. The button remains visible
 * even when the user scrolls the page and during the call.
 */
const meta = {
  title: "Widget/GoodtokButton",
  component: GoodtokButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    online: {
      name: "Goodtok Menu Trigger",
      description: "Indicates if the remote is accepting calls",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    onClick: {
      name: "On Click",
      description: "Triggered when the button is clicked",
      action: "clicked"
    }
  }
} satisfies Meta<typeof GoodtokButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Indicates that the remote is not accepting calls
 */
export const ButtonExample: Story = {
  args: {
    online: false
  }
};
