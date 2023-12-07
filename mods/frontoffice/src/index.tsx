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
import { LoggerProvider } from "~logger";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

const HomeContainer = React.lazy(() => import("~containers/HomeContainer"));
const LoginContainer = React.lazy(() => import("~containers/LoginContainer"));
const OnboardingContainer = React.lazy(
  () => import("~containers/OnboardingContainer")
);
const WorkspaceContainer = React.lazy(
  () => import("~containers/WorkspaceContainer")
);
const ChatContainer = React.lazy(() => import("~containers/ChatContainer"));
const SettingsContainer = React.lazy(
  () => import("~containers/SettingsContainer")
);
const AcceptInviteContainer = React.lazy(
  () => import("~containers/AccepInviteContainer")
);

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
  },
  {
    path: "/accept-invite",
    element: <AcceptInviteContainer />
  }
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <Suspense
        fallback={
          <Backdrop
            sx={{
              backgroundColor: "#FFF",
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={true}
          >
            <CircularProgress style={{ color: "#FF9965" }} />
          </Backdrop>
        }
      >
        <SnackbarProvider>
          <LoggerProvider>
            <RouterProvider router={router} />
          </LoggerProvider>
        </SnackbarProvider>
      </Suspense>
    </React.StrictMode>
  </AuthProvider>
);
