import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "~authentication";
import LoginContainer from "~containers/LoginContainer";
import HomeContainer from "~containers/HomeContainer";
import OnboardingContainer from "~containers/OnboardingContainer";
import WorkspaceContainer from "~containers/WorkspaceContainer";
import ChatContainer from "~containers/ChatContainer";
import SettingsContainer from "~containers/SettingsContainer";
import React from "react";

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
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
