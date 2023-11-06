import * as SDK from "@goodtok/sdk";
import { OnboardingPage } from "~components/onboarding/OnboardingPage";
import { useAuth } from "~authentication";
import React, { useEffect } from "react";

function OnboardingContainer() {
  const { client, signOut, isSignedIn } = useAuth();

  if (!client) {
    signOut();
    return;
  }

  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = "/login";
    }
  });

  const handleAbandon = () => {
    window.location.href = "/";
  };

  const handleCreateWorkspace = (request: {
    name: string;
    timezone: string;
    calendarUrl: string;
    shopifyUrl: string;
    shopifyApiKey: string;
  }) => {
    const { name, timezone, calendarUrl, shopifyUrl, shopifyApiKey } = request;

    const workspaces = new SDK.Workspaces(client);
    workspaces
      .createWorkspace({
        name,
        timezone,
        calendarUrl,
        shopifyAccount: {
          storeDomain: shopifyUrl,
          accessToken: shopifyApiKey
        }
      })
      .then((res) => {
        window.location.href = `/workspace/${res.id}`;
      })
      .catch((err) => {
        // TODO: Handle error
        console.log({ err });
      });
  };

  return (
    <OnboardingPage
      onAbandon={handleAbandon}
      onCreateWorkspace={handleCreateWorkspace}
    />
  );
}

export default OnboardingContainer;
