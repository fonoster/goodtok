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
import { Members } from "./Members";
import { Role, Status } from "./types";

/**
 * This component is used to display the list of members for a workspace. By itself it doesn't
 * perform any action. The parent component must provide the data and the callbacks.
 */
const meta = {
  title: "FrontOffice/Members",
  component: Members,
  parameters: {
    layout: "padded"
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      name: "Data",
      description: "The data to be displayed",
      control: {
        type: "object"
      }
    },
    onDelete: {
      name: "On Delete",
      description:
        "The callback to be called when the user clicks the delete button",
      action: "clicked"
    },
    onResend: {
      name: "On Resend",
      description:
        "The callback to be called when the user clicks the resend button",
      action: "clicked"
    },
    onInvite: {
      name: "On Invite",
      description:
        "The callback to be called when the user clicks the invite button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof Members>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Display a list of members.
 */
export const MembersExample: Story = {
  args: {
    data: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: Role.ADMIN,
        status: Status.ACTIVE,
        createdAt: new Date("2021-01-01T00:00:00Z")
      },
      {
        id: "2",
        name: "Lisa Smith",
        email: "lisa.smith@service.com",
        role: Role.MEMBER,
        status: Status.PENDING,
        createdAt: new Date("2020-08-15T14:25:36Z")
      },
      {
        id: "3",
        name: "Omar Ahmad",
        email: "omar.ahmad@mysite.net",
        role: Role.MEMBER,
        status: Status.ACTIVE,
        createdAt: new Date("2022-03-22T10:42:00Z")
      },
      {
        id: "4",
        name: "Emily Johnson",
        email: "emilyj@corporate.org",
        role: Role.ADMIN,
        status: Status.PENDING,
        createdAt: new Date("2021-11-05T19:33:27Z")
      },
      {
        id: "5",
        name: "Raj Patel",
        email: "raj.patel@exampleshop.com",
        role: Role.MEMBER,
        status: Status.ACTIVE,
        createdAt: new Date("2019-12-01T08:00:00Z")
      }
    ]
  }
};
