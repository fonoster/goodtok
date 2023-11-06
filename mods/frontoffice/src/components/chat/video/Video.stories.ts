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
import { FOVideo } from "./Video";

/**
 * This story covers the Video component.
 */
const meta = {
  title: "FrontOffice/FOVideo",
  component: FOVideo,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    isLocalCameraMuted: {
      name: "Customer Camera Muted",
      description: "Mute or unmute the video",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    onHangup: {
      name: "Hangup Callback",
      description: "Callback when the hangup button is clicked",
      control: {
        type: "function"
      },
      action: "clicked"
    },
    onMuteCamera: {
      name: "Mute Camera Callback",
      description: "Callback when the mute camera button is clicked",
      control: {
        type: "function"
      },
      action: "clicked"
    },
    onMuteMicrophone: {
      name: "Mute Microphone Callback",
      description: "Callback when the mute microphone button is clicked",
      control: {
        type: "function"
      },
      action: "clicked"
    },
  }
} satisfies Meta<typeof FOVideo>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * Example of a MenuContainer component with MenuItems as children.
 */
export const VideoExample: Story = {
  args: {
    isOpen: true,
    isLocalCameraMuted: false,
    isLocalMicrophoneMuted: false,
  },
  play: () => {
    const remoteVideo = document.querySelector(
      ".goodtok-video__remote"
    ) as HTMLVideoElement;
    remoteVideo.src =
      "https://storage.googleapis.com/fn01/videos/demo_call_staff.mp4";
    remoteVideo.loop = true;
    remoteVideo.muted = true;
    remoteVideo.play();

    const localVideo = document.querySelector(
      ".goodtok-video__local"
    ) as HTMLVideoElement;
    localVideo.src =
      "https://storage.googleapis.com/fn01/videos/demo_call_customer.mp4";
    localVideo.loop = true;
    localVideo.muted = true;

    localVideo.play();

    // Changed position to fit the storybook
    localVideo.style.top = "0";
    remoteVideo.style.backgroundColor = "#000";
    remoteVideo.style.top = "0px";
    remoteVideo.style.left = "-90px";
    remoteVideo.style.width = "1000px";
  }
};
