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
import { Box, Step, Stepper, StepLabel, Typography } from "@mui/material";
import { AppBar } from "../appbar/AppBar";
import { OnboardingBody, OnboardingTitle, StyledStepButton } from "./styles";
import { TextField } from "../textfield/TextField";
import { Button } from "../button/Button";
import React, { useState } from "react";

type OnboardingPageProps = {
  onFinished?: (
    workspaceName: string,
    shopifyUrl: string,
    shopifyApiKey: string
  ) => void;
};

const steps = ["Create Workspace", "Add Integration", "Privacy Agreement"];

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  onFinished,
  ...props
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [workspaceName, setWorkspaceName] = useState("");
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [shopifyApiKey, setShopifyApiKey] = useState("");

  return (
    <Box {...props} display="flex" flexDirection="column" minHeight="100vh">
      <AppBar />
      <Box
        sx={{ pt: 10, display: "flex", justifyContent: "center" }}
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
        <Box mt={20}>
          {activeStep === 0 && (
            <Box sx={{ width: "440px" }}>
              {" "}
              {/* Align the Box on the parent Box */}
              <OnboardingTitle sx={{ mb: 2, textAlign: "left" }}>
                Create a Workspace to get started managing your queues and more.
              </OnboardingTitle>
              <OnboardingBody sx={{ mb: 10, mt: 6, textAlign: "left" }}>
                Worspace is how you manage a property in Goodtok. With a
                workspace you can invite members, access the customer queue,
                enable integrations and more.
              </OnboardingBody>
              <TextField
                label="Name"
                placeholder="Workspace Name"
                helperText="Please enter a name for your workspace"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
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
                <Button onClick={() => {}} variant="outlined">
                  Skip this step
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
              <OnboardingTitle sx={{ mb: 2, textAlign: "left" }}>
                Select Your Integration.
              </OnboardingTitle>
              <OnboardingBody sx={{ mb: 5, mt: 2, textAlign: "left" }}>
                For information on how to obtain an API key for your integration
                please head over to our documentation and search for SHOPIFY API
                KEY.
              </OnboardingBody>

              {/* TODO: Validate that it is a valid shopify url */}
              <TextField
                label="Store URL"
                placeholder="mystore-43c62e3b.myshopify.com"
                helperText="Please enter your store URL"
                value={shopifyUrl}
                onChange={(e) => setShopifyUrl(e.target.value)}
              />

              <TextField
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
                <Button onClick={() => {}} variant="outlined">
                  Skip this step
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
              <OnboardingTitle sx={{ mb: 2, textAlign: "left" }}>
                Privacy Agreement.
              </OnboardingTitle>
              <OnboardingBody sx={{ mb: 5, mt: 2, textAlign: "left" }}>
                By clicking on the button below you agree to our privacy policy.
              </OnboardingBody>

              <Box sx={{ mt: 4 }}>
                <Button
                  onClick={() => {
                    onFinished?.(workspaceName, shopifyUrl, shopifyApiKey);
                  }}
                  disabled={
                    workspaceName.length === 0 ||
                    shopifyUrl.length === 0 ||
                    shopifyApiKey.length === 0
                  }
                >
                  Create Workspace
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
