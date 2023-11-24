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
    isAuthenticated: {
      name: "Is Authenticated",
      description: "Whether the user is authenticated",
      control: "boolean"
    },
    isActiveCall: {
      name: "Is Active Call",
      description: "Whether the user is in an active call",
      control: "boolean"
    },
    customerProfile: {
      name: "Customer Profile",
      description: "The customer profile of the user for the queue page",
      control: "object"
    },
    orders: {
      name: "Orders",
      description: "The orders of the user for the queue page",
      control: "object"
    },
    onVideoRefsReady: {
      name: "On Video Refs Ready",
      description: "The callback to be called when the video refs are ready",
      action: "clicked"
    },
    onCustomerDequeue: {
      name: "On Customer Dequeue",
      description: "The callback to be called when the customer dequeues",
      action: "clicked"
    }
  }
} satisfies Meta<typeof ChatPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of chat page with no active call and with orders.
 */
export const ChatPageExample: Story = {
  args: {
    workspaceId: "1",
    userName: "Jane Doe",
    avatar: "https://mui.com/static/images/avatar/3.jpg",
    isAuthenticated: true,
    isActiveCall: false,
    isAdmin: true,
    isLocalCameraMuted: false,
    isLocalMicrophoneMuted: false,
    customerProfile: {
      name: "Peters Doe",
      email: "peters@example.com",
      phone: "(785)317-9945",
      birthday: "1980-01-01",
      note: "Here goes a short note about that the user can use to build rapport with the customer"
    },
    orders: [
      {
        id: "1001",
        name: "First item in the order",
        total: 100,
        imageUrl: "https://picsum.photos/200",
        createdAt: "2021-10-01T00:00:00.000Z"
      },
      {
        id: "1001",
        name: "Second item in the order",
        total: 200,
        imageUrl: "https://picsum.photos/200",
        createdAt: "2021-10-01T00:00:00.000Z"
      },
      {
        id: "2001",
        name: "And item on anther order",
        total: 300,
        imageUrl: "https://picsum.photos/200",
        createdAt: "2021-10-01T00:00:00.000Z"
      }
    ]
  }
};

export type OrderItem = {
  id: string;
  name: string;
  photo: string;
  createdAt: string;
};

/**
 * Example of chat page with active call.
 */
export const ChatPageWithActiveCall: Story = {
  args: {
    workspaceId: "1",
    userName: "Jane Doe",
    avatar: "https://mui.com/static/images/avatar/3.jpg",
    isAuthenticated: true,
    isActiveCall: true,
    isLocalCameraMuted: false,
    isLocalMicrophoneMuted: false,
    isAdmin: true,
    customerProfile: {
      name: "Peters Doe",
      email: "peters@example.com",
      phone: "(785)317-9945",
      birthday: "1980-01-01",
      note: "This is a note"
    },
    orders: [
      {
        id: "1001",
        name: "First item in the order",
        total: 100,
        imageUrl: "https://picsum.photos/200",
        createdAt: "2021-10-01T00:00:00.000Z"
      },
      {
        id: "1001",
        name: "Second item in the order",
        total: 200,
        imageUrl: "https://picsum.photos/200",
        createdAt: "2021-10-01T00:00:00.000Z"
      },
      {
        id: "2001",
        name: "And item on anther order",
        total: 300,
        imageUrl: "https://picsum.photos/200",
        createdAt: "2021-10-01T00:00:00.000Z"
      }
    ],
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

      // eslint-disable-next-line storybook/context-in-play-function
      remoteVideo.play();

      const localVideo = document.querySelector(
        ".goodtok-video__local"
      ) as HTMLVideoElement;
      localVideo.src =
        "https://storage.googleapis.com/fn01/videos/demo_call_customer.mp4";
      localVideo.loop = true;
      localVideo.muted = true;

      // eslint-disable-next-line storybook/context-in-play-function
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
