/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
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
import * as SDK from "@goodtok/sdk";
import { OnboardingPage } from "~components/onboarding/OnboardingPage";
import { useAuth } from "~authentication";
import { useLogger } from "~logger";
import React, { useEffect } from "react";

function OnboardingContainer() {
  const { client, signOut, renewToken, isSignedIn } = useAuth();
  const logger = useLogger();

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
      .then(async function (res) {
        await renewToken();
        window.location.href = `/workspace/${res.id}`;
      })
      .catch((err) => {
        logger.error("error creating workspace", err);
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
