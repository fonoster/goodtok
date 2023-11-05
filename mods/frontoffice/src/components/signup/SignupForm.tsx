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
import { Box, Modal } from "@mui/material";
import {
  ErrorStyled,
  LinkStyled,
  SignupFormFooterText,
  SignupFormTitle,
  StyledCheckbox,
  StyledDivider,
  StyledMarkdown
} from "./SignupFormStyles";
import { TextField } from "../textfield/TextField";
import { Button } from "../button/Button";
import { GoogleIcon } from "../button/GoogleIcon";
import { termsAndConditionsText } from "./terms";
import React, { useState } from "react";

export type SignupFormProps = {
  error?: string;
  withGoogleSignup?: boolean;
  withTermsAndConditions?: boolean;
  onGoogleSignupClick?: () => void;
  onLoginClick?: () => void;
  signup: (request: { name: string; email: string; password: string }) => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({
  error,
  signup,
  onLoginClick,
  onGoogleSignupClick,
  withTermsAndConditions = false,
  withGoogleSignup = false,
  ...props
}) => {
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAndConditionsOpen, setTermsAndConditionsOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "440px"
        }}
        {...props}
      >
        <SignupFormTitle>Sign up for Goodtok</SignupFormTitle>

        <TextField
          label="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        {withTermsAndConditions && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2
            }}
          >
            <StyledCheckbox
              checked={termsAndConditions}
              onChange={() => setTermsAndConditions(!termsAndConditions)}
            />
            <LinkStyled onClick={() => setTermsAndConditionsOpen(true)}>Agree to the terms and conditions</LinkStyled>
          </Box>
        )}

        <Button
          onClick={() => signup({ name, email, password })}
          disabled={withTermsAndConditions && (!termsAndConditions || !!error)}
        >
          Sign up for Goodtok
        </Button>

        {withGoogleSignup && (
          <>
            <StyledDivider sx={{ mt: 3, mb: 3 }}>Or</StyledDivider>

            <Button
              variant="outlined"
              onClick={onGoogleSignupClick}
              disabled={
                withTermsAndConditions && (!termsAndConditions || !!error)
              }
            >
              <GoogleIcon />
              Sign up with Google
            </Button>
          </>
        )}

        <SignupFormFooterText sx={{ mt: 10 }}>
          Already have an Account?
        </SignupFormFooterText>

        <Button onClick={onLoginClick} color="secondary">
          Log in to Goodtok
        </Button>
      </Box>
      <Modal
        // TODO: Fix deprecated api
        BackdropProps={{
          style: {
            backgroundColor: "#27150C",
            opacity: 0.8
          }
        }}
        open={termsAndConditionsOpen}
        onClose={() => setTermsAndConditionsOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ width: 600, backgroundColor: "#fff", p: 2, overflow: "auto", maxHeight: "80vh" }}>
          <StyledMarkdown>
            {termsAndConditionsText}
          </StyledMarkdown>
        </Box>
      </Modal>
    </>
  );
};
