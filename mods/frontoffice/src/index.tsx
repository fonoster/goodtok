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
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "~authentication";
import { SnackbarProvider } from "~snackbar";
import LoginContainer from "~containers/LoginContainer";
import HomeContainer from "~containers/HomeContainer";
import OnboardingContainer from "~containers/OnboardingContainer";
import WorkspaceContainer from "~containers/WorkspaceContainer";
import ChatContainer from "~containers/ChatContainer";
import SettingsContainer from "~containers/SettingsContainer";
import React from "react";
import { LoggerProvider } from "~logger";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer />
  },
  {
    path: "/login",
    element: <LoginContainer />
  },
  {
    path: "/onboarding",
    element: <OnboardingContainer />
  },
  {
    path: "/new-workspace",
    element: <OnboardingContainer />
  },
  {
    path: "/workspace/:id",
    element: <WorkspaceContainer />
  },
  {
    path: "/workspace/:id/s/:sessionId/aor/:encodedAor",
    element: <ChatContainer />
  },
  {
    path: "/workspace/:id/settings/:section",
    element: <SettingsContainer />
  }
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <SnackbarProvider>
        <LoggerProvider>
          <RouterProvider router={router} />
        </LoggerProvider>
      </SnackbarProvider>
    </React.StrictMode>
  </AuthProvider>
);
