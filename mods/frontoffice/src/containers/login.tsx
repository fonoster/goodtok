import { useAuth } from "~authentication";
import { LoginPage } from "~components/login/LoginPage";
import React, { useEffect } from "react";

function LoginContainer() {
  const [error, setError] = React.useState("");

  const { signIn, isSignedIn } = useAuth();

  const handleSignInSubmit = async (request: {
    email: string;
    password: string;
  }) => {
    const { email, password } = request;
    try {
      await signIn(email, password);
      window.location.href = "/dashboard";
    } catch (error) {
      const err = error as { message: string };
      if (err.message === "UNAUTHORIZED") {
        setError("Invalid email or password");
        return;
      }
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      window.location.href = "/dashboard";
    }
  });

  return (
    <LoginPage
      error={error}
      onSignUpClick={() => {
        window.location.href = "/signup";
      }}
      onSignInSubmit={handleSignInSubmit}
    />
  );
}

export default LoginContainer;