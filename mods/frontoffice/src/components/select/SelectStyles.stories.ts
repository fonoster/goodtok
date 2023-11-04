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
import { Select } from "./Select";

/**
 * This story is for the TextField component which is a wrapper around the MUI TextField component.
 */
const meta = {
  title: "FrontOffice/Select",
  component: Select,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    helperText: {
      name: "Helper Text",
      description: "Helper text to guide the user",
      control: { type: "text" },
      defaultValue: { summary: "This is a helper text" }
    },
    label: {
      name: "Label",
      description: "Label to be displayed on top of the input",
      control: { type: "text" },
      defaultValue: { summary: "Label" }
    },
    error: {
      name: "Error",
      description: "Whether the input should be displayed with an error",
      control: { type: "boolean" },
      defaultValue: { summary: false }
    },
    readonly: {
      name: "Readonly",
      description: "Whether the input should be readonly",
      control: { type: "boolean" },
      defaultValue: { summary: false }
    },
    onChange: {
      name: "On Change",
      description: "The callback to be called when the user selects an option",
      action: "clicked"
    }
  }
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic usage of the Select component.
 */
export const TextFieldExample: Story = {
  args: {
    helperText: "Please select a timezone",
    label: "Timezone",
    error: false,
    readonly: false,
    data: [
      { value: "America/New_York", label: "America/New_York" },
      { value: "America/Chicago", label: "America/Chicago" },
      { value: "America/Denver", label: "America/Denver" },
      { value: "America/Los_Angeles", label: "America/Los_Angeles" }
    ]
  }
};
