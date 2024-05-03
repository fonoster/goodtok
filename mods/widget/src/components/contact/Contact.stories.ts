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
import { Contact } from "./Contact";

/**
 * A form for annonymous customers to contact Goodtok agents.
 */
const meta = {
  title: "Widget/Contact",
  component: Contact,
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
    onClose: {
      name: "Close Callback",
      description: "Callback when the notification is closed",
      control: {
        type: "function"
      },
      action: "clicked"
    },
    onSubmit: {
      name: "Submit Callback",
      description: "Callback when the form is submitted",
      control: {
        type: "function"
      },
      action: "clicked"
    }
  }
} satisfies Meta<typeof Contact>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * ContactFormExample is a story that shows the Contact component in action.
 */
export const ContactFormExample: Story = {
  args: {
    online: true,
    isOpen: true
  }
};
