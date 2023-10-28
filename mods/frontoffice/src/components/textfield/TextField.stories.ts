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
import { TextField } from "./TextField";

/**
 * This story is for the TextField component which is a wrapper around the MUI TextField component.
 */
const meta = {
  title: "FrontOffice/TextField",
  component: TextField,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "goodtok-light",
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
    placeholder: {
      name: "Placeholder",
      description: "Placeholder to be displayed inside the input",
      control: { type: "text" },
      defaultValue: { summary: "Placeholder" }
    },
    type: {
      name: "Type",
      description: "Type of the input",
      control: { type: "select", options: ["text", "password", "email"] },
      defaultValue: { summary: "text" }
    }
  }
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic usage of the TextField component.
 */
export const TextFieldExample: Story = {
  args: {
    helperText: "Please enter your email address",
    label: "Email Address",
    placeholder: "john@example.com"
  }
};

/**
 * TextField component with type password.
 */
export const TextFieldPassword: Story = {
  args: {
    helperText: "Please enter your password",
    label: "Password",
    type: "password",
    placeholder: "*********"
  }
};
