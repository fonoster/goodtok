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
import { Invite } from "./Invite";

/**
 * The Invite component is used to invite new members to the workspace. The component is used in the
 * settings page withing the members section.
 */
const meta = {
  title: "FrontOffice/InviteMember",
  component: Invite,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    onInvite: {
      name: "On Invite",
      description:
        "The callback to be called when the user clicks the invite button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof Invite>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Invite member story. This story is used to showcase the Invite component.
 */
export const InviteMemberExample: Story = {};
