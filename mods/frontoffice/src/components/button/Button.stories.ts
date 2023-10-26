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
import { Button } from "./Button";
import { GoogleIcon } from "./GoogleIcon";
import React from "react";

/**
 * This story is for the regular Button component based on Material UI.
 */
const meta = {
  title: "FrontOffice/Button",
  component: Button,
  parameters: {
    layout: "padded"
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      name: "Variant",
      description: "The variant to use",
      control: { type: "select", options: ["contained", "outlined"] },
      defaultValue: { summary: "contained" }
    },
    children: {
      name: "Label",
      description: "The content of the button",
      control: { type: "text" }
    },
    disabled: {
      name: "Disabled",
      description: "If true, the button will be disabled",
      control: { type: "boolean" },
      defaultValue: { summary: false }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Primary Button with a label and contained variant.
 */
export const PrimaryButtonContainedExample: Story = {
  args: {
    variant: "contained",
    children: "Log In",
    disabled: false,
    color: "primary"
  }
};

/**
 * Primary Button with a label, icon and outlined variant.
 */
export const PrimaryButtonOutlinedExample: Story = {
  args: {
    variant: "outlined",
    children: [React.createElement(GoogleIcon), "Log In With Google"]
  }
};

/**
 * Secondary Button with a label and contained variant.
 */
export const SecondaryButtonContainedExample: Story = {
  args: {
    variant: "contained",
    color: "secondary",
    children: "Create a Goodtok Account"
  }
};

/**
 * Secondary Button with a label and outlined variant.
 */
export const SecondaryButtonOutlineExample: Story = {
  args: {
    variant: "outlined",
    color: "secondary",
    children: "Create a Goodtok Account"
  }
};
