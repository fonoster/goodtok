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
import { AppBar } from "../appbar/AppBar";
import { SignupForm, SignupFormProps } from "./SignupForm";
import React from "react";

type SignupPageProps = SignupFormProps;

export const SignupPage: React.FC<SignupPageProps> = ({ ...props }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar
        workspaceId=""
        userName=""
        avatar=""
        // This will hide the avatar and its menu
        isAuthenticated={false}
        onSignOut={() => {}}
      />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SignupForm {...props} />
      </Box>
    </Box>
  );
};
