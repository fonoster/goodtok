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
import { QueueList } from "./QueueList";

/**
 * This component holds the queue list which is displayed on the home page. By itself, the component doesn't
 * do much. It's meant to be used as a child of the QueuePage component.
 */
const meta = {
  title: "FrontOffice/QueueList",
  component: QueueList,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      name: "On Click",
      description: "Triggered when and item in the queue list is clicked",
      action: "clicked"
    }
  }
} satisfies Meta<typeof QueueList>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of a QueueList with two items.
 */
export const QueueListExampleWithItems: Story = {
  args: {
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
        userName: "Jane Doe",
        note: "A super long example of customer note treatment showing that we truncate after a certain point",
        time: "2m"
      }
    ]
  }
};

/**
 * Shows that while it is possible to pass in more than 8 items, the list will only display 8 items.
 */
export const QueueListExampleWithTwelveItems: Story = {
  args: {
    avgWaitTime: "5m",
    maxItems: 8,
    data: [
      {
        userId: "1",
        userName: "John Smith",
        isOnline: true,
        note: "Loves new promotions.",
        time: "15m"
      },
      {
        userId: "2",
        isOnline: false,
        userName: "Anna White",
        note: "Needs a callback regarding her last purchase.",
        time: "3m"
      },
      {
        userId: "3",
        userName: "Michael Brown",
        isOnline: true,
        note: "Requested details about upcoming products.",
        time: "9m"
      },
      {
        userId: "4",
        isOnline: false,
        userName: "Ella Davis",
        note: "Has issues with the mobile application.",
        time: "4m"
      },
      {
        userId: "5",
        userName: "Tom Wilson",
        isOnline: true,
        note: "Enquired about bulk orders.",
        time: "12m"
      },
      {
        userId: "6",
        isOnline: false,
        userName: "Jane Miller",
        note: "Seeking a refund on a damaged item.",
        time: "1m"
      },
      {
        userId: "7",
        userName: "Robert Johnson",
        isOnline: true,
        note: "Asked for a product demo.",
        time: "17m"
      },
      {
        userId: "8",
        isOnline: false,
        userName: "Mia Jones",
        note: "Needs assistance with setting up her account.",
        time: "5m"
      },
      {
        userId: "9",
        userName: "William Lee",
        isOnline: true,
        note: "Wants to collaborate for a blog post.",
        time: "14m"
      },
      {
        userId: "10",
        isOnline: false,
        userName: "Lucy Clark",
        note: "Facing issues with payment gateway.",
        time: "2m"
      },
      {
        userId: "11",
        userName: "Charlie Taylor",
        isOnline: true,
        note: "Wants to upgrade his subscription plan.",
        time: "19m"
      },
      {
        userId: "12",
        isOnline: false,
        userName: "Sophie Evans",
        note: "Has suggestions for the new UI design.",
        time: "6m"
      }
    ]
  }
};
