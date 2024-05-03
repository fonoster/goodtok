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
import { LoginForm } from "./LoginForm";

/**
 * This story covers the login form for the Front Office and comes with the ability to enable/disable sign-up,
 * forgot-password, and Google Login.
 */
const meta = {
  title: "FrontOffice/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "goodtok-light"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      name: "Error",
      description: "Error message to display",
      control: { type: "text" },
      defaultValue: { summary: "" }
    },
    hasGoogleSignIn: {
      name: "Has Google Sign In",
      description: "Enables the Google login button",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    hasSignUp: {
      name: "Has Sign Up",
      description: "Enables the sign up button",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    hasForgotPassword: {
      name: "Has Forgot Password",
      description: "Enables the forgot password link",
      control: { type: "boolean" },
      defaultValue: { summary: "false" }
    },
    onGoogleSignInClick: {
      name: "On Google Sign In Click",
      description: "Triggered when the Google login button is clicked",
      action: "clicked"
    },
    onForgotPasswordClick: {
      name: "On Forgot Password Click",
      description: "Triggered when the forgot password link is clicked",
      action: "clicked"
    },
    onSignUpClick: {
      name: "On Sign Up Click",
      description: "Triggered when the signup button is clicked",
      action: "clicked"
    },
    onSignInSubmit: {
      name: "On Sign In Submit",
      description: "Triggered when the login form is submitted",
      action: "clicked"
    }
  }
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic login form without Google sign-in button, sign-up button, and forgot-password link.
 */
export const BasicLoginForm: Story = {
  args: {
    hasSignUp: false,
    hasForgotPassword: false,
    hasGoogleSignIn: false
  }
};
