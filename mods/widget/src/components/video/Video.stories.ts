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
import { Video } from "./Video";

/**
 * This story covers the Video component.
 */
const meta = {
  title: "Widget/Video",
  component: Video,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    isCustomerVideoMuted: {
      name: "Customer Video Muted",
      description: "Mute or unmute the video",
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
    }
  }
} satisfies Meta<typeof Video>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * Example of a MenuContainer component with MenuItems as children.
 */
export const VideoExample: Story = {
  args: {
    isOpen: true,
    onClose: null,
    isCustomerVideoMuted: false
  },
  play: () => {
    const video = document.querySelector(
      ".goodtok-video__staff"
    ) as HTMLVideoElement;
    video.src =
      "https://storage.googleapis.com/fn01/videos/demo_call_staff.mp4";
    video.loop = true;
    video.muted = true;
    video.play();

    // goodtok-video__customer
    const videoCustomer = document.querySelector(
      ".goodtok-video__customer"
    ) as HTMLVideoElement;
    videoCustomer.src =
      "https://storage.googleapis.com/fn01/videos/demo_call_customer.mp4";
    videoCustomer.loop = true;
    videoCustomer.muted = true;
    videoCustomer.play();
  }
};
