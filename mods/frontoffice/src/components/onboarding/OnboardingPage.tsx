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
import { Formik, Form, Field, useFormikContext } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import React, { useState } from "react";

// Define the Zod validation schema for each step
const stepValidationSchemas = [
  z.object({
    name: z.string().min(1, "Workspace name is required.")
  }),
  z.object({
    shopifyUrl: z
      .string()
      .min(1, "Shopify URL is required.")
      .url("Invalid URL"),
    shopifyApiKey: z.string().min(1, "Shopify API key is required.")
  }),
  z.object({
    calendarUrl: z
      .string()
      .min(1, "Calendar URL is required.")
      .url("Invalid URL")
  })
];

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
  const [timezone, setTimezone] = useState("America/New_York");
  const [activeStep, setActiveStep] = useState(0);

  // Define initial form values
  const initialValues = {
    name: "",
    shopifyUrl: "",
    shopifyApiKey: "",
    calendarUrl: ""
  };

  const formik = useFormikContext();

  const currentValidationSchema = toFormikValidationSchema(
    stepValidationSchemas[activeStep]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={currentValidationSchema}
      onSubmit={(values) => {
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1); // Proceed to next step
        } else {
          onCreateWorkspace({
            name: values.name,
            timezone: timezone,
            calendarUrl: values.calendarUrl,
            shopifyUrl: values.shopifyUrl,
            shopifyApiKey: values.shopifyApiKey
          });
        }
      }}
    >
      {({ errors, touched }) => (
        <Form noValidate>
          <Box
            {...props}
            display="flex"
            flexDirection="column"
            minHeight="100vh"
          >
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

            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              minWidth="100%"
            >
              <Box mt={6}>
                {activeStep === 0 && (
                  <Box sx={{ width: "440px" }}>
                    {" "}
                    {/* Align the Box on the parent Box */}
                    <OnboardingTitle sx={{ textAlign: "left" }}>
                      Create a Workspace to get started managing your queues and
                      more.
                    </OnboardingTitle>
                    <OnboardingBody sx={{ mt: 6, textAlign: "left" }}>
                      Worspace is how you manage a property in Goodtok. With a
                      workspace you can invite members, access the customer
                      queue, enable integrations and more.
                    </OnboardingBody>
                    <Field
                      as={TextField}
                      label="Name"
                      name="name"
                      placeholder="Workspace Name"
                      error={touched.name && !!errors.name}
                      helperText={
                        (touched.name && errors.name) ||
                        "Please enter your preferred Workspace name"
                      }
                      sx={{ mt: 8, mb: 4 }}
                    />
                    <Select
                      label="Timezone"
                      data={timezones}
                      helperText={"Please select a timezone"}
                      onChange={(e) => setTimezone(e.target.value)}
                      sx={{ mb: 4 }}
                      value={timezone}
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

                      <Button type="submit">Continue</Button>
                    </Box>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box sx={{ width: "440px" }}>
                    <OnboardingTitle sx={{ textAlign: "left" }}>
                      Set your Shopify credentials.
                    </OnboardingTitle>
                    <OnboardingBody sx={{ mt: 2, textAlign: "left" }}>
                      For information on how to obtain an API key for your
                      integration integration please head over to our
                      documentation and search for "Shopify API KEY."
                    </OnboardingBody>

                    {/* TODO: Validate that it is a valid shopify url */}
                    <Field
                      as={TextField}
                      name="shopifyUrl"
                      label="Store URL"
                      placeholder="Shopify Store URL"
                      error={touched.shopifyUrl && !!errors.shopifyUrl}
                      helperText={
                        (touched.shopifyUrl && errors.shopifyUrl) ||
                        "Please enter your store URL"
                      }
                      sx={{ mt: 8 }}
                    />

                    <Field
                      as={TextField}
                      label="API Key"
                      name="shopifyApiKey"
                      placeholder="shpss_1234567890abcdef1234567890abcdef"
                      type="password"
                      error={touched.shopifyApiKey && !!errors.shopifyApiKey}
                      helperText={
                        (touched.shopifyApiKey && errors.shopifyApiKey) ||
                        "Please enter your API Key"
                      }
                      sx={{ mt: 4 }}
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

                      <Button type="submit">Continue</Button>
                    </Box>
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box sx={{ width: "440px" }}>
                    <OnboardingTitle sx={{ textAlign: "left" }}>
                      Set your calendar URL.
                    </OnboardingTitle>
                    <OnboardingBody sx={{ mt: 2, textAlign: "left" }}>
                      By clicking on the button below you agree to our privacy
                      policy.
                    </OnboardingBody>

                    <Field
                      as={TextField}
                      label="Calendar URL"
                      name="calendarUrl"
                      placeholder="https://cal.com/some-calendar"
                      error={touched.calendarUrl && !!errors.calendarUrl}
                      helperText={
                        touched.calendarUrl && errors.calendarUrl
                          ? errors.calendarUrl
                          : "Please enter your calendar URL"
                      }
                      sx={{ mt: 6 }}
                    />

                    <Button sx={{ mt: 4 }} type="submit">
                      Finish
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
