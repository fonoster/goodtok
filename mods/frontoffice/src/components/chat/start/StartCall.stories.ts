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
import { StartCall } from "./StartCall";

/**
 * Story for the StartCall component.
 */
const meta = {
  title: "FrontOffice/StartCall",
  component: StartCall,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    onStartCall: {
      name: "On Start Call",
      description: "Callback when the user clicks on the start call button",
      action: "clicked"
    },
    onReturnToQueue: {
      name: "On Return to Queue",
      description:
        "Callback when the user clicks on the return to queue button",
      action: "clicked"
    }
  }
} satisfies Meta<typeof StartCall>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Example of a story using the StartCall component
 */
export const StartCallExample: Story = {};
