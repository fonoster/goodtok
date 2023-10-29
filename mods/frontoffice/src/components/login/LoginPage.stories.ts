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
import { LoginPage } from "./LoginPage";

/**
 * This story covers the LoginPage component. The LoginPage component is meant to be used as the main page of the
 * application. It contains a login form and links to the signup and forgot password pages.
 */
const meta = {
  title: "FrontOffice/LoginPage",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    withGoogleLogin: {
      name: "With Google Login",
      description: "Enables the google login button",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    withSignup: {
      name: "With Signup",
      description: "Enables the signup button",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    withForgotPassword: {
      name: "With Forgot Password",
      description: "Enables the forgot password link",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    onGoogleLoginClick: {
      name: "On Google Login Click",
      description: "Triggered when the google login button is clicked",
      action: "clicked"
    },
    onForgotPasswordClick: {
      name: "On Forgot Password Click",
      description: "Triggered when the forgot password link is clicked",
      action: "clicked"
    },
    onSignupClick: {
      name: "On Signup Click",
      description: "Triggered when the signup button is clicked",
      action: "clicked"
    },
    signInWithEmailAndPassword: {
      name: "On Sign In With Email and Password",
      description: "Triggered when the sign in button is clicked",
      action: "clicked"
    },
    error: {
      name: "Error",
      description: "Error message to display",
      control: { type: "text" },
      defaultValue: { summary: "" }
    }
  }
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Login page with the most basic login form.
 */
export const BasicLoginPage: Story = {
  args: {
    withGoogleLogin: false,
    withSignup: false,
    withForgotPassword: false,
    error: ""
  }
};

/**
 * Full login page with Signup, Forgot Password, and Google Login.
 */
export const FullLoginPage: Story = {
  args: {
    withSignup: true,
    withForgotPassword: true,
    withGoogleLogin: true
  }
};
