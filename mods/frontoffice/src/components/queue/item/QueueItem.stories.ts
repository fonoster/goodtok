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

const meta = {
  title: "FrontOffice/QueueItem",
  component: QueueItem,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof QueueItem>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of a queue item with an odd index
 */
export const QueueItemExampleOdd: Story = {
  args: {
    isOdd: false,
    isOnline: true,
    userName: "John Doe",
    note: "Prefers monthly newsletters",
    time: "10m"
  }
};

/**
 * Example of a queue item with an even index
 */
export const QueueItemExampleEven: Story = {
  args: {
    isOdd: true,
    isOnline: false,
    userName: "John Doe",
    note: "A super long example of customer note treatment showing that we truncate after a certain point",
    time: "2m"
  }
};
