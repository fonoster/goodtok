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
import { SignupPage } from "./SignupPage";

/**
 * This story covers the SignupPage component. The SignupPage component is a wrapper for the SignupForm component
 * and comes with the ability to enable/disable the google signup button and the terms and conditions checkbox.
 */
const meta = {
  title: "FrontOffice/SignupPage",
  component: SignupPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    withGoogleSignup: {
      name: "With Google Signup",
      description: "Enables the Google signup button",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    withTermsAndConditions: {
      name: "With Terms And Conditions",
      description: "Enables the terms and conditions checkbox",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    onGoogleSignupClick: {
      name: "On Google Signup Click",
      description: "Triggered when the Google signup button is clicked",
      action: "clicked"
    },
    onLoginClick: {
      name: "On Login Click",
      description: "Triggered when the login button is clicked",
      action: "clicked"
    },
    signup: {
      name: "Signup",
      description: "Signup function",
      action: "clicked"
    },
    error: {
      name: "Error",
      description: "Error message to display",
      control: { type: "text" },
      defaultValue: { summary: "" }
    }
  }
} satisfies Meta<typeof SignupPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic sign up page without Google signup button and terms and conditions checkbox.
 */
export const BasicSignupPage: Story = {
  args: {
    withGoogleSignup: false,
    withTermsAndConditions: false,
    error: ""
  }
};

/**
 * Full sign up page with Google signup button and terms and conditions checkbox.
 */
export const FullSignupPage: Story = {
  args: {
    withGoogleSignup: true,
    withTermsAndConditions: true
  }
};
