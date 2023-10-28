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
import { ChatPage } from "./ChatPage";

/**
 * This component holds the chat page which is displayed after clicking on a queue entry.
 */
const meta = {
  title: "FrontOffice/ChatPage",
  component: ChatPage,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ChatPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of chat page with no active call
 */
export const ChatPageExample: Story = {
  args: {
    userName: "John Doe",
    isAuthenticated: true,
    isActiveCall: false
  }
};

/**
 * Example of chat page with active call
 */
export const ChatPageWithActiveCall: Story = {
  args: {
    userName: "John Doe",
    isAuthenticated: true,
    isActiveCall: true,
    onVideoRefsReady: () => {
      // Noop
    }
  },
  play: () => {
    // Function to execute when the video elements are found
    const executeWhenReady = () => {
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
    };

    // Check if the video elements are already in the DOM
    if (document.querySelector(".goodtok-video__remote")) {
      executeWhenReady();
    } else {
      // If not, set up a MutationObserver to watch for when they're added
      const observer = new MutationObserver((mutations, observerInstance) => {
        if (document.querySelector(".goodtok-video__remote")) {
          executeWhenReady();
          // Once we've found the elements and executed our function, we don't need the observer anymore
          observerInstance.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
};
