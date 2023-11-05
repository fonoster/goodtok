import { OnboardingPage } from "~components/onboarding/OnboardingPage";
import { useAuth } from "~authentication";
import React, { useEffect } from "react";

function OnboardingContainer() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = "/login";
    }
  });

  const handleAbandon = () => {
    window.location.href = "/dashboard";
  };

  const handleCreateWorkspace = (request: {
    workspaceName: string;
    shopifyUrl: string;
    shopifyApiKey: string;
  }) => {
    const { workspaceName, shopifyUrl, shopifyApiKey } = request;
    // TODO: Create workspace
    window.location.href = "/dashboard";
  };

  return (
    <OnboardingPage
      onAbandon={handleAbandon}
      onCreateWorkspace={handleCreateWorkspace}
    />
  );
}

export default OnboardingContainer;
