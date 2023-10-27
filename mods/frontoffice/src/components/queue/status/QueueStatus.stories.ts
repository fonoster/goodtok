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
import { QueueStatus } from "./QueueStatus";

const meta = {
  title: "FrontOffice/QueueStatus",
  component: QueueStatus,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    workspaceName: {
      name: "Workspace Name",
      description: "The name of the workspace",
      control: { type: "text" }
    },
    storeURL: {
      name: "Store URL",
      description: "The URL of the store",
      control: { type: "text" }
    },
    onChange: {
      name: "On Change",
      description: "Triggered when the status of the queue changes",
      action: "clicked"
    }
  }
} satisfies Meta<typeof QueueStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const QueueStatusExample: Story = {
  args: {
    workspaceName: "Demo Workspace",
    storeURL: "quickstart-43c62e3b.myshopify.com"
  }
};
