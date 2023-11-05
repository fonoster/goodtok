import { LoginPage } from "../components/login/LoginPage";
import React from "react";

function LoginContainer() {
  const [error, setError] = React.useState("");

  return (
    <LoginPage
      error={error}
      hasForgotPassword={false}
      onSignUpClick={() => {
        window.location.href = "/signup";
      }}
      onGoogleSignInClick={() => {}}
      onSignInSubmit={() => {
        window.location.href = "/dashboard";
      }}
    />
  );
}

export default LoginContainer;
