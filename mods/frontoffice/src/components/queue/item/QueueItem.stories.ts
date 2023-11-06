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
import { QueueItem } from "./QueueItem";

/**
 * This component holds the queue item which is displayed on the queue list. By itself, the component doesn't
 * do much. It's meant to be used as a child of the QueueList component.
 */
const meta = {
  title: "FrontOffice/QueueItem",
  component: QueueItem,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      name: "ID",
      description: "The ID of the queue item",
      control: "text"
    },
    aor: {
      name: "AOR",
      description: "The Address Of Record(AOR) of the queue item",
      control: "text"
    },
    name: {
      name: "Name",
      description: "The customer name of the queue item",
      control: "text"
    },
    isOnline: {
      name: "Is Online",
      description: "Whether the queue item is online",
      control: "boolean"
    },
    note: {
      name: "Note",
      description: "The note of the queue item",
      control: "text"
    },
    time: {
      name: "Time",
      description: "The time the queue item was added",
      control: "text"
    },
    isOdd: {
      name: "Is Odd",
      description: "Whether the queue item is odd for styling purposes",
      control: "boolean"
    },
    onClick: {
      name: "On Click",
      description: "Triggered when the queue item is clicked",
      action: "clicked"
    }
  }
} satisfies Meta<typeof QueueItem>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of a queue item with an odd index
 */
export const QueueItemExampleOdd: Story = {
  args: {
    id: "1",
    name: "John Doe",
    aor: "sip:1@sip.goodtok.io",
    note: "Prefers monthly newsletters",
    isOnline: true,
    time: "10m",
    isOdd: false
  }
};

/**
 * Example of a queue item with an even index
 */
export const QueueItemExampleEven: Story = {
  args: {
    id: "1",
    name: "John Doe",
    aor: "sip:1@sip.goodtok.io",
    note: "A super long example of customer note treatment showing that we truncate after a certain point",
    isOnline: false,
    time: "2m",
    isOdd: true
  }
};
