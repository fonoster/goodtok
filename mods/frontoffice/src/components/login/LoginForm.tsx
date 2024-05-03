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
import { Formik, Form, Field } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { GoogleIcon } from "../button/GoogleIcon";
import React from "react";

// Zod schema for validation
const validationSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1)
});

// Formik validation schema from the Zod schema
const formikValidationSchema = toFormikValidationSchema(validationSchema);

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
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={formikValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSignInSubmit(values);
        setSubmitting(false); // Prevent multiple submissions
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "440px"
            }}
            {...props}
          >
            <LoginFormTitle sx={{ mb: 5 }}>Log In</LoginFormTitle>

            <Field
              as={TextField}
              label="Email address"
              name="email"
              placeholder="Email address"
              error={touched.email && !!errors.email} // Make sure to cast the error to boolean
              helperText={
                (touched.email && errors.email) ||
                "Please enter your email address"
              }
            />

            <Field
              as={TextField}
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              error={touched.password && !!errors.password} // Make sure to cast the error to boolean
              helperText={
                (touched.password && errors.password) ||
                "Please enter your password"
              }
            />

            {error && <ErrorStyled>{error}</ErrorStyled>}

            {hasForgotPassword && (
              <LinkStyled sx={{ mb: 5 }} onClick={onForgotPasswordClick}>
                Forgot Password
              </LinkStyled>
            )}

            <Button type="submit">Log In</Button>

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
        </Form>
      )}
    </Formik>
  );
};
