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
import { Box, Divider } from "@mui/material";
import {
  ErrorStyled,
  LinkStyled,
  LoginFormFooterText,
  LoginFormTitle
} from "./styles";
import { TextField } from "../textfield/TextField";
import { Button } from "../button/Button";
import { GoogleIcon } from "../button/GoogleIcon";
import React, { useState } from "react";

type LoginFormProps = {
  error?: string;
  withSignup?: boolean;
  withForgotPassword?: boolean;
  withGoogleLogin?: boolean;
  onForgotPasswordClick?: () => void;
  onGoogleLoginClick?: () => void;
  onSignupClick?: () => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  error,
  signInWithEmailAndPassword,
  onSignupClick,
  onForgotPasswordClick,
  onGoogleLoginClick,
  withSignup = false,
  withForgotPassword = false,
  withGoogleLogin = false,
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
      />

      {error && <ErrorStyled>{error}</ErrorStyled>}

      {withForgotPassword && (
        <LinkStyled sx={{ mb: 5 }} onClick={onForgotPasswordClick}>
          Forgot Password
        </LinkStyled>
      )}

      <Button onClick={() => signInWithEmailAndPassword(email, password)}>
        Log In
      </Button>

      {withGoogleLogin && (
        <>
          <Divider sx={{ mt: 3, mb: 3 }}>Or</Divider>

          <Button variant="outlined" onClick={onGoogleLoginClick}>
            <GoogleIcon />
            Login with Google
          </Button>
        </>
      )}

      {withSignup && (
        <>
          <LoginFormFooterText sx={{ mt: 10 }}>
            Don't Have an Account?
          </LoginFormFooterText>

          <Button onClick={onSignupClick} color="secondary">
            Create a Goodtok Account
          </Button>
        </>
      )}
    </Box>
  );
};
