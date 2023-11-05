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
  tags: ["autodocs"]
} satisfies Meta<typeof QueuePage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Queue page example with empty queue.
 */
export const QueuePageExampleWithEmptyQueue: Story = {
  args: {
    avatar: "https://mui.com/static/images/avatar/3.jpg",
    avgWaitTime: "",
    userName: "Jane Doe",
    storeURL: "quickstart-43c62e3b.myshopify.com",
    workspaceName: "Demo Workspace",
    isAuthenticated: true,
    data: []
  }
};

/**
 * Queue page example with queue data.
 */
export const QueuePageExampleWithQueueData: Story = {
  args: {
    userName: "Jane Doe",
    avatar: "https://mui.com/static/images/avatar/3.jpg",
    storeURL: "quickstart-43c62e3b.myshopify.com",
    workspaceName: "Demo Workspace",
    isAuthenticated: true,
    avgWaitTime: "5m",
    data: [
      {
        userId: "1",
        userName: "John Doe",
        isOnline: true,
        note: "Prefers monthly newsletter",
        time: "10m"
      },
      {
        userId: "2",
        isOnline: false,
        userName: "Peter Doe",
        note: "A super long example of customer note treatment showing that we truncate after a certain point",
        time: "2m"
      }
    ]
  }
};
