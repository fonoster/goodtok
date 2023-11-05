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
import { Box } from "@mui/material";
import {
  ErrorStyled,
  LinkStyled,
  LoginFormFooterText,
  LoginFormTitle,
  StyledDivider
} from "./LoginFormStyles";
import { TextField } from "../textfield/TextField";
import { Button } from "../button/Button";
import { GoogleIcon } from "../button/GoogleIcon";
import React, { useState } from "react";

export type LoginFormProps = {
  error?: string;
  hasSignUp?: boolean;
  hasForgotPassword?: boolean;
  hasGoogleSignIn?: boolean;
  onForgotPasswordClick?: () => void;
  onGoogleSignInClick?: () => void;
  onSignUpClick?: () => void;
  onSignInSubmit: (request: { email: string; password: string }) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  error,
  hasSignUp = false,
  hasForgotPassword = false,
  hasGoogleSignIn = false,
  onSignInSubmit,
  onSignUpClick,
  onForgotPasswordClick,
  onGoogleSignInClick,
  ...props
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "440px"
      }}
      {...props}
    >
      <LoginFormTitle>Log In</LoginFormTitle>
      <TextField
        label="Email address"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // TODO: When the user presses enter, the form should be submitted
      />

      {error && <ErrorStyled>{error}</ErrorStyled>}

      {hasForgotPassword && (
        <LinkStyled sx={{ mb: 5 }} onClick={onForgotPasswordClick}>
          Forgot Password
        </LinkStyled>
      )}

      <Button onClick={() => onSignInSubmit({ email, password })}>
        Log In
      </Button>

      {hasGoogleSignIn && (
        <>
          <StyledDivider sx={{ mt: 3, mb: 3 }}>Or</StyledDivider>

          <Button variant="outlined" onClick={onGoogleSignInClick}>
            <GoogleIcon />
            Login with Google
          </Button>
        </>
      )}

      {hasSignUp && (
        <>
          <LoginFormFooterText sx={{ mt: 10 }}>
            Don't Have an Account?
          </LoginFormFooterText>

          <Button onClick={onSignUpClick} color="secondary">
            Create a Goodtok Account
          </Button>
        </>
      )}
    </Box>
  );
};
