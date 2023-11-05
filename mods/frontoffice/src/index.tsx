import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "~authentication";
import React from "react";
import LoginContainer from "~containers/login";
import HomeContainer from "~containers/home";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <HomeContainer />
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
