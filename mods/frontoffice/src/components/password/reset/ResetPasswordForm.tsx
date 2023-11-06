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
import { TextField } from "../../textfield/TextField";
import { Button } from "../../button/Button";
import {
  ResetPasswordFormContainer,
  ResetPasswordFormDescription,
  ResetPasswordFormTitle
} from "./ResetPasswordFormStyles";
import React from "react";

export type ResetPasswordFormProps = {
  onReset?: (password: string) => void;
};

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onReset,
  ...props
}) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <ResetPasswordFormContainer {...props}>
      <ResetPasswordFormTitle sx={{ mb: 2 }}>
        Reset your password
      </ResetPasswordFormTitle>

      <ResetPasswordFormDescription sx={{ mb: 5 }}>
        Please reset your password
      </ResetPasswordFormDescription>

      <TextField
        label="Password"
        type="password"
        placeholder="Password"
        helperText="8+ characters with upper, lower, number, and symbol."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 6 }}
      />

      <TextField
        label="Confirm Password"
        type="password"
        placeholder="Password"
        helperText="8+ characters with upper, lower, number, and symbol."
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 8 }}
      />

      <Button
        sx={{ mb: 4 }}
        onClick={() => onReset && onReset(password)}
        disabled={password !== confirmPassword}
      >
        Reset Password
      </Button>
    </ResetPasswordFormContainer>
  );
};
