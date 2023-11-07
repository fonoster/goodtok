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
import { Box, Step, Stepper, StepLabel } from "@mui/material";
import { AppBar } from "../appbar/AppBar";
import { OnboardingBody, OnboardingTitle, StyledStepButton } from "./styles";
import { TextField } from "../textfield/TextField";
import { Button } from "../button/Button";
import { timezones } from "../../utils/timezones";
import { Select } from "../../components/select/Select";
import React, { useState } from "react";

type OnboardingPageProps = {
  onAbandon: () => void;
  onCreateWorkspace: (request: {
    name: string;
    timezone: string;
    calendarUrl: string;
    shopifyUrl: string;
    shopifyApiKey: string;
  }) => void;
};

const steps = ["Create Workspace", "Shopify Credentials", "Calendar URL"];

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  onAbandon,
  onCreateWorkspace,
  ...props
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [workspaceName, setWorkspaceName] = useState("");
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [shopifyApiKey, setShopifyApiKey] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [calendarUrl, setCalendarUrl] = useState("");

  return (
    <Box {...props} display="flex" flexDirection="column" minHeight="100vh">
      <AppBar
        workspaceId=""
        userName=""
        avatar=""
        // This will hide the avatar and its menu
        isAuthenticated={false}
        onSignOut={() => {}}
      />
      <Box
        sx={{ pt: 5, display: "flex", justifyContent: "center" }}
        minWidth="100%"
      >
        <Stepper nonLinear activeStep={activeStep} sx={{ width: 764 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={false}>
              <StyledStepButton onClick={() => setActiveStep(index)}>
                <StepLabel>{label}</StepLabel>
              </StyledStepButton>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }} minWidth="100%">
        <Box mt={6}>
          {activeStep === 0 && (
            <Box sx={{ width: "440px" }}>
              {" "}
              {/* Align the Box on the parent Box */}
              <OnboardingTitle sx={{ textAlign: "left" }}>
                Create a Workspace to get started managing your queues and more.
              </OnboardingTitle>
              <OnboardingBody sx={{ mt: 6, textAlign: "left" }}>
                Worspace is how you manage a property in Goodtok. With a
                workspace you can invite members, access the customer queue,
                enable integrations and more.
              </OnboardingBody>
              <TextField
                sx={{ mt: 8, mb: 4 }}
                label="Name"
                placeholder="Workspace Name"
                helperText="Please enter a name for your workspace"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
              <Select
                label="Timezone"
                helperText="Please select a timezone"
                value={timezone}
                data={timezones}
                onChange={(e) => setTimezone(e.target.value)}
              />
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  width: 212,
                  gap: 2
                }}
              >
                <Button onClick={onAbandon} variant="outlined">
                  Skip for now
                </Button>

                <Button
                  onClick={() => {
                    setActiveStep(1);
                  }}
                  disabled={workspaceName.length === 0}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          )}
          {activeStep === 1 && (
            <Box sx={{ width: "440px" }}>
              <OnboardingTitle sx={{ textAlign: "left" }}>
                Set your Shopify credentials.
              </OnboardingTitle>
              <OnboardingBody sx={{ mt: 2, textAlign: "left" }}>
                For information on how to obtain an API key for your integration
                please head over to our documentation and search for "Shopify
                API KEY."
              </OnboardingBody>

              {/* TODO: Validate that it is a valid shopify url */}
              <TextField
                sx={{ mt: 8 }}
                label="Store URL"
                placeholder="mystore-43c62e3b.myshopify.com"
                helperText="Please enter your store URL"
                value={shopifyUrl}
                onChange={(e) => setShopifyUrl(e.target.value)}
              />

              <TextField
                sx={{ mt: 4 }}
                label="API Key"
                placeholder="shpss_1234567890abcdef1234567890abcdef"
                helperText="Please enter your API Key"
                type="password"
                value={shopifyApiKey}
                onChange={(e) => setShopifyApiKey(e.target.value)}
              />

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  width: 212,
                  gap: 2
                }}
              >
                <Button onClick={onAbandon} variant="outlined">
                  Skip for now
                </Button>

                <Button
                  onClick={() => {
                    setActiveStep(2);
                  }}
                  disabled={
                    shopifyUrl.length === 0 || shopifyApiKey.length === 0
                  }
                >
                  Continue
                </Button>
              </Box>
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{ width: "440px" }}>
              <OnboardingTitle sx={{ textAlign: "left" }}>
                Set your calendar URL.
              </OnboardingTitle>
              <OnboardingBody sx={{ mt: 2, textAlign: "left" }}>
                By clicking on the button below you agree to our privacy policy.
              </OnboardingBody>

              <TextField
                sx={{ mt: 6 }}
                label="Calendar URL"
                placeholder="https://cal.com/some-calendar"
                helperText="Please enter your calendar URL"
                value={calendarUrl}
                onChange={(e) => setCalendarUrl(e.target.value)}
              />

              <Button
                sx={{ mt: 4 }}
                onClick={() => {
                  onCreateWorkspace?.({
                    name: workspaceName,
                    timezone,
                    calendarUrl,
                    shopifyUrl,
                    shopifyApiKey
                  });
                }}
                disabled={
                  workspaceName.length === 0 ||
                  shopifyUrl.length === 0 ||
                  shopifyApiKey.length === 0 ||
                  calendarUrl.length === 0
                }
              >
                Create Workspace
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
