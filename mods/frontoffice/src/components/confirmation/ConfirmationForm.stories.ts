/* eslint-disable quotes */
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
import { ConfirmationForm } from "./ConfirmationForm";

/**
 * Confirmation Form story which is used to confirm actions such as deleting a workspace or a member, etc.
 * This is mean to be used in a modal.
 */
const meta = {
  title: "FrontOffice/ConfirmationForm",
  component: ConfirmationForm,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      name: "Title",
      description: "Title of the confirmation form",
      control: "text"
    },
    description: {
      name: "Description",
      description: "Description of the confirmation form",
      control: "text"
    },
    confirmationText: {
      name: "Confirmation Text",
      description: "The text to use to confirm the action",
      control: "text"
    },
    confirmationButtonText: {
      name: "Confirmation Button Text",
      description: "The text to use for the confirmation button",
      control: "text"
    },
    onConfirm: {
      name: "On Confirm",
      description: "Callback to be called when the user confirms the action",
      control: "function"
    },
    onCancel: {
      name: "On Cancel",
      description: "Callback to be called when the user cancels the action",
      control: "function"
    }
  }
} satisfies Meta<typeof ConfirmationForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of the Confirmation Form component.
 */
export const ConfirmationFormExample: Story = {
  args: {
    title: "Are you sure?",
    description:
      // eslint-disable-next-line prettier/prettier
      'To perform this action you need to type "DELETE" in the field below. This action cannot be undone.',
    confirmationText: "DELETE"
  }
};
