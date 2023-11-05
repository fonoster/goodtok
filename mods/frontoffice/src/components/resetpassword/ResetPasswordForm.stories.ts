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
import { ResetPasswordForm } from "./ResetPasswordForm";

/**
 * Reset Password Form component.
 */
const meta = {
  title: "FrontOffice/ResetPasswordForm",
  component: ResetPasswordForm,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    onReset: {
      name: "On Reset",
      description:
        "The callback to be called when the user clicks the reset button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof ResetPasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of a Reset Password Form.
 */
export const ResetPasswordFormExample: Story = {};
