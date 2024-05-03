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
import { AddWorkspaceCard } from "./AddWorkspaceCard";

/**
 * This component holds the workspace card which is displayed on the home page. By itself, the component doesn't
 * do much. It's meant to be used as a child of the WorkspaceCardList component.
 */
const meta = {
  title: "FrontOffice/AddWorkspaceCard",
  component: AddWorkspaceCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      name: "On Click",
      description: "Triggered when the workspace card is clicked",
      action: "clicked"
    }
  }
} satisfies Meta<typeof AddWorkspaceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of a card to add a new workspace.
 */
export const AddWorkspaceCardExample: Story = {};
