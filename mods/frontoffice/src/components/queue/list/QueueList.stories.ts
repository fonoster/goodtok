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
    avgWaitTime: {
      name: "Average Wait Time",
      description: "The average wait time for the queue"
    },
    hideAvgWaitTime: {
      name: "Hide Average Wait Time",
      description: "Whether or not to hide the average wait time"
    },
    maxItems: {
      name: "Max Items",
      description:
        "The maximum number of items to display in the queue. Defaults to 8."
    },
    data: {
      name: "Data",
      description: "The data to display in the queue"
    },
    onQueueEntrySelect: {
      name: "On Queue Entry Select",
      description:
        "The callback to be called when the user clicks on a queue entry"
    }
  }
} satisfies Meta<typeof QueueList>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of an empty QueueList.
 */
export const QueueListExampleEmpty: Story = {
  args: {
    avgWaitTime: "",
    data: []
  }
};

/**
 * Example of a QueueList with two items.
 */
export const QueueListExampleWithItems: Story = {
  args: {
    avgWaitTime: "5m",
    hideAvgWaitTime: true,
    data: [
      {
        id: "1",
        name: "John Doe",
        aor: "sip:1@sip.goodtok.io",
        time: "10m",
        note: "Prefers monthly newsletter",
        status: "ONLINE"
      },
      {
        id: "2",
        name: "Jane Doe",
        aor: "sip:2@sip.goodtok.io",
        note: "A super long example of customer note treatment showing that we truncate after a certain point",
        time: "2m",
        status: "OFFLINE"
      },
      {
        id: "3",
        name: "John Smith",
        aor: "sip:3@sip.goodtok.io",
        note: "Loves new promotions.",
        time: "15m",
        status: "IN_PROGRESS"
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
    hideAvgWaitTime: false,
    maxItems: 8,
    data: [
      {
        id: "1",
        name: "John Smith",
        aor: "sip:1@sip.goodtok.io",
        note: "Loves new promotions.",
        time: "15m",
        status: "ONLINE"
      },
      {
        id: "2",
        name: "Anna White",
        aor: "sip:2@sip.goodtok.io",
        note: "Needs a callback regarding her last purchase.",
        time: "3m",
        status: "OFFLINE"
      },
      {
        id: "3",
        name: "Michael Brown",
        aor: "sip:2@sip.goodtok.io",
        note: "Requested details about upcoming products.",
        time: "9m",
        status: "ONLINE"
      },
      {
        id: "4",
        name: "Ella Davis",
        aor: "sip:4@sip.goodtok.io",
        note: "Has issues with the mobile application.",
        time: "4m",
        status: "OFFLINE"
      },
      {
        id: "5",
        name: "Tom Wilson",
        aor: "sip:5@sip.goodtok.io",
        note: "Enquired about bulk orders.",
        time: "12m",
        status: "ONLINE"
      },
      {
        id: "6",
        name: "Jane Miller",
        aor: "sip:6@sip.goodtok.io",
        note: "Seeking a refund on a damaged item.",
        time: "1m",
        status: "OFFLINE"
      },
      {
        id: "7",
        name: "Robert Johnson",
        aor: "sip:7@sip.goodtok.io",
        note: "Asked for a product demo.",
        time: "17m",
        status: "ONLINE"
      },
      {
        id: "8",
        name: "Mia Jones",
        aor: "sip:7@sip.goodtok.io",
        note: "Needs assistance with setting up her account.",
        time: "5m",
        status: "OFFLINE"
      },
      {
        id: "9",
        name: "William Lee",
        aor: "sip:9@sip.goodtok.io",
        note: "Wants to collaborate for a blog post.",
        time: "14m",
        status: "ONLINE"
      },
      {
        id: "10",
        name: "Lucy Clark",
        aor: "sip:10@sip.goodtok.io",
        note: "Facing issues with payment gateway.",
        time: "2m",
        status: "ONLINE"
      },
      {
        id: "11",
        name: "Charlie Taylor",
        aor: "sip:11@sip.goodtok.io",
        note: "Wants to upgrade his subscription plan.",
        time: "19m",
        status: "ONLINE"
      },
      {
        id: "12",
        name: "Sophie Evans",
        aor: "sip:12@sip.goodtok.io",
        note: "Has suggestions for the new UI design.",
        time: "6m",
        status: "ONLINE"
      }
    ]
  }
};
