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
import { TextField } from "../textfield/TextField";
import { Button } from "../button/Button";
import {
  ForgotPasswordFormContainer,
  ForgotPasswordFormDescription,
  ForgotPasswordFormTitle,
  OrDivider
} from "./ForgotPasswordFormStyles";
import React from "react";

export type ForgotPasswordFormProps = {
  onSubmit?: (email: string) => void;
  onReturnToSignIn?: () => void;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onReturnToSignIn,
  ...props
}) => {
  const [email, setEmail] = React.useState("");

  return (
    <ForgotPasswordFormContainer {...props}>
      <ForgotPasswordFormTitle sx={{ mb: 2 }}>
        Forgot Password?
      </ForgotPasswordFormTitle>

      <ForgotPasswordFormDescription sx={{ mb: 5 }}>
        Enter the email associated with your account and we’ll send you a link
        to reset your password.
      </ForgotPasswordFormDescription>

      <TextField
        label="Email"
        type="email"
        placeholder="Enter your email"
        helperText="Please enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 8 }}
      />

      <Button sx={{ mb: 4 }} onClick={() => onSubmit && onSubmit(email)}>
        Submit
      </Button>

      <OrDivider sx={{ mb: 4 }}>Or</OrDivider>

      <Button variant="outlined" color="secondary" onClick={onReturnToSignIn}>
        Back to Sign in
      </Button>
    </ForgotPasswordFormContainer>
  );
};
