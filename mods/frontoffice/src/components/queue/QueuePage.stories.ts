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
import { QueuePage } from "./QueuePage";

/**
 * This component holds the queue page which is displayed when the staff is accepting calls.
 */
const meta = {
  title: "FrontOffice/QueuePage",
  component: QueuePage,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  argTypes: {
    userName: {
      name: "User Name",
      description: "The name of the user for the queue page",
      control: "text"
    },
    avatar: {
      name: "Avatar",
      description: "The avatar of the user for the queue page",
      control: "text"
    },
    storeURL: {
      name: "Store URL",
      description: "The store URL of the user for the queue page",
      control: "text"
    },
    workspaceName: {
      name: "Workspace Name",
      description: "The workspace name of the user for the queue page",
      control: "text"
    },
    isAuthenticated: {
      name: "Is Authenticated",
      description: "Whether the user is authenticated",
      control: "boolean"
    },
    avgWaitTime: {
      name: "Average Wait Time",
      description: "The average wait time for the queue",
      control: "text"
    },
    data: {
      name: "Data",
      description: "The data for the queue",
      control: "object"
    },
    onQueueEntrySelect: {
      name: "On Queue Entry Select",
      description:
        "The callback to be called when the user clicks on a queue entry",
      action: "clicked"
    },
    onSignOut: {
      name: "On Sign Out",
      description:
        "The callback to be called when the user clicks the sign out button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof QueuePage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Queue page example with empty queue.
 */
export const QueuePageExampleWithEmptyQueue: Story = {
  args: {
    workspaceId: "1",
    avatar: "https://mui.com/static/images/avatar/3.jpg",
    avgWaitTime: "",
    userName: "Jane Doe",
    storeURL: "quickstart-43c62e3b.myshopify.com",
    workspaceName: "Demo Workspace",
    isAuthenticated: true,
    isEnabled: true,
    isAdmin: true,
    data: []
  }
};

/**
 * Queue page example with queue data.
 */
export const QueuePageExampleWithQueueData: Story = {
  args: {
    workspaceId: "1",
    userName: "Jane Doe",
    avatar: "https://mui.com/static/images/avatar/3.jpg",
    storeURL: "quickstart-43c62e3b.myshopify.com",
    workspaceName: "Demo Workspace",
    isAuthenticated: true,
    avgWaitTime: "5m",
    isEnabled: true,
    isAdmin: true,
    data: [
      {
        id: "1",
        name: "John Doe",
        aor: "sip:1@sip.goodtok.io",
        note: "Prefers monthly newsletter",
        time: "10m",
        status: "OFFLINE"
      },
      {
        id: "2",
        name: "Peter Doe",
        aor: "sip:2@sip.goodtok.io",
        note: "A super long example of customer note treatment showing that we truncate after a certain point",
        time: "2m",
        status: "ONLINE"
      }
    ]
  }
};
