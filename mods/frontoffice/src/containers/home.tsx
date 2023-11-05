import { HomePage } from "~components/home/HomePage";
import { useAuth } from "~authentication";
import React, { useEffect } from "react";

function HomeContainer() {
  const [name, setName] = React.useState("");

  const { signOut, isSignedIn } = useAuth();

  useEffect(() => {
    setName("John Doe");
  });

  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = "/login";
    }
  });

  return (
    <HomePage
      isAuthenticated={true}
      onWorkspaceSelect={() => {}}
      userName={name}
      workspaces={[]}
      onSignOut={signOut}
    />
  );
}

export default HomeContainer;
