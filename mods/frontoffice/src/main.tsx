import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "app/app";
import { AuthProvider } from "./authentication";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
