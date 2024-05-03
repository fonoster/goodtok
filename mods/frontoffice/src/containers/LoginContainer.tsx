/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
      window.location.href = "/";
    } catch (error) {
      const err = error as { data: { code: string }; message: string };
      if (err.data?.code === "UNAUTHORIZED") {
        setError("Invalid email or password");
        return;
      }
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      window.location.href = "/";
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
