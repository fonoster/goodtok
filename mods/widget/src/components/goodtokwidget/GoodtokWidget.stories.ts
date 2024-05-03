/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
import { GoodtokWidget } from "./GoodtokWidget";
import { menuData } from "./data";

/**
 * The GoodtokWidget component is composite component that renders the Goodtok widget. The Goodtok widget is a floating
 * button on the bottom right corner of the screen and associated menu, notifications, and video chat, etc.
 */
const meta = {
  title: "Widget/GoodtokWidget",
  component: GoodtokWidget,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  argTypes: {
    online: {
      name: "Online indicator",
      description: "Indicates if the remote is accepting calls",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    menuOpen: {
      name: "Menu Open",
      description: "Indicates if the menu is open",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    notificationOpen: {
      name: "Notification Open",
      description: "Indicates if the notification is open",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    videoOpen: {
      name: "Video Open",
      description: "Indicates if the video is open",
      control: { type: "boolean" },
      defaultValue: { summary: "false" },
      action: "play"
    },
    onEvent: {
      name: "onEvent",
      description: "Callback for events",
      action: "clicked"
    },
    hasError: {
      name: "Error Indicator",
      description: "Indicates if the widget is in an error state",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    }
  }
} satisfies Meta<typeof GoodtokWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Full example of the Goodtok widget
 */
export const GoodtokWidgetExample: Story = {
  args: {
    online: false,
    notificationOpen: false,
    hasError: false,
    videoOpen: false,
    menuOpen: false,
    menuData: menuData,
    onVideoRefsReady: () => {
      // Noop
    }
  },
  play: () => {
    // Function to execute when the video elements are found
    const executeWhenReady = () => {
      const video = document.querySelector(
        ".goodtok-video__remote"
      ) as HTMLVideoElement;
      video.src =
        "https://storage.googleapis.com/fn01/videos/demo_call_remote.mp4";
      video.loop = true;
      video.muted = true;
      // eslint-disable-next-line storybook/context-in-play-function
      video.play();

      const videoCustomer = document.querySelector(
        ".goodtok-video__local"
      ) as HTMLVideoElement;
      videoCustomer.src =
        "https://storage.googleapis.com/fn01/videos/demo_call_customer.mp4";
      videoCustomer.loop = true;
      videoCustomer.muted = true;
      // eslint-disable-next-line storybook/context-in-play-function
      videoCustomer.play();
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
