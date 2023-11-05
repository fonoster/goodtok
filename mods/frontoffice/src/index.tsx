import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "~authentication";
import React from "react";
import LoginContainer from "~containers/login";
import HomeContainer from "~containers/home";
import OnboardingContainer from "~containers/onboarding";
import WorkspaceContainer from "~containers/workspace";

const router = createBrowserRouter([
  {
    path: "/onboarding",
    element: <OnboardingContainer />
  },
  {
    path: "/new-workspace",
    element: <OnboardingContainer />
  },
  {
    path: "/dashboard",
    element: <HomeContainer />
  },
  {
    path: "/workspace/:id",
    element: <WorkspaceContainer />
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
