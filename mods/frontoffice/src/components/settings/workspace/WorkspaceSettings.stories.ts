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
import { WorkspaceSettings } from "./WorkspaceSettings";

/**
 * Workspace settings story. This story is used to showcase the WorkspaceSettings component.
 */
const meta = {
  title: "FrontOffice/WorkspaceSettings",
  component: WorkspaceSettings,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    initialName: {
      name: "Name",
      description: "The initial name of the workspace",
      control: {
        type: "text"
      }
    },
    initialShopifyStoreUrl: {
      name: "Shopify Store ID",
      description: "The initial Shopify Store ID of the workspace",
      control: {
        type: "text"
      }
    },
    initialTimezone: {
      name: "Timezone",
      description: "The initial timezone of the workspace",
      control: {
        type: "text"
      }
    },
    initialCalendarUrl: {
      name: "Calendar URL",
      description: "The initial calendar URL of the workspace",
      control: {
        type: "text"
      }
    },
    onSave: {
      name: "On Save",
      description:
        "The callback to be called when the user clicks the save button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof WorkspaceSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example story showing the WorkspaceSettings component.
 */
export const WorkspaceSettingsExample: Story = {
  args: {
    initialName: "My Workspace",
    initialShopifyStoreUrl: "quickstart-43c62e3b.myshopify.com",
    initialTimezone: "America/New_York",
    initialCalendarUrl: "https://cal.com/some-calendar",
    initialHoursOfOperation: {
      Monday: { from: "09:00", to: "17:00" },
      Tuesday: { from: "09:00", to: "17:00" },
      Wednesday: { from: "09:00", to: "17:00" },
      Thursday: { from: "09:00", to: "17:00" },
      Friday: { from: "09:00", to: "17:00" },
      Saturday: { from: "", to: "" }, // Closed
      Sunday: { from: "", to: "" } // Closed
    }
  }
};
