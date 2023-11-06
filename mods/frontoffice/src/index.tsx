import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "~authentication";
import React from "react";
import LoginContainer from "~containers/LoginContainer";
import HomeContainer from "~containers/HomeContainer";
import OnboardingContainer from "~containers/OnboardingContainer";
import WorkspaceContainer from "~containers/WorkspaceContainer";
import ChatContainer from "~containers/ChatContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer />
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
    path: "/w/:id/s/:sessionId/aor/:encodedAor",
    element: <ChatContainer />
  },
  {
    path: "/login",
    element: <LoginContainer />
  }
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
