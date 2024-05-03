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
import { z } from "zod";
import { HoursOfOperationErrors, WorkspaceSettingsProps } from "./types";
import { Box, Modal, Typography } from "@mui/material";
import { TextField } from "../../textfield/TextField";
import { Button } from "../../button/Button";
import { Select } from "../../select/Select";
import { timezones } from "../../../utils/timezones";
import { Formik, Field, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  StyledBox,
  SettingsTitle,
  StyledDangerZone
} from "./WorkspaceSettingsStyles";
import { Day } from "@goodtok/sdk";
import { sortHours } from "./sortedHours";
import { isValidTimeRange } from "./isValidTimeRange";
import { hasScheduleErrors } from "./hasScheduleErrors";
import { ConfirmationForm } from "../../../components/confirmation/ConfirmationForm";
import React, { useState } from "react";

// Zod schema for validation
const validationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(60, "Name must be less than 60 characters"),
  calendarUrl: z
    .string()
    .min(1, "Calendar URL is required")
    .url("Invalid URL format")
    .max(255, "Calendar URL must be less than 100 characters"),
  shopifyStoreUrl: z
    .string()
    .min(1, "Shopify Store URL is required")
    .url("Invalid URL format")
    .max(255, "Shopify Store URL must be less than 255 characters"),
  shopifyStoreAPIkey: z
    .string()
    .max(255, "API Key must be less than 255 characters")
    .optional()
});

// Convert Zod schema to Formik validation schema
const formikValidationSchema = toFormikValidationSchema(validationSchema);

export const WorkspaceSettings: React.FC<WorkspaceSettingsProps> = ({
  initialName,
  initialTimezone,
  initialCalendarUrl,
  initialShopifyStoreUrl,
  initialHoursOfOperation,
  isAdmin,
  onSave,
  onWorkspaceDelete
}) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [hoursOfOperation, setHoursOfOperation] = useState(
    initialHoursOfOperation
  );
  const [scheduleErrors, setScheduleErrors] = useState<HoursOfOperationErrors>(
    Object.keys(initialHoursOfOperation).reduce(
      (acc, day) => ({
        ...acc,
        [day]: { from: false, to: false }
      }),
      {}
    )
  );

  const handleScheduleChange = (
    day: Day,
    type: "from" | "to",
    value: string
  ) => {
    const updatedTimes = {
      ...hoursOfOperation[day],
      [type]: value
    };

    const timesAreValid = isValidTimeRange(updatedTimes.from, updatedTimes.to);

    setHoursOfOperation((prev) => ({
      ...prev,
      [day]: updatedTimes
    }));

    setScheduleErrors((prev) => ({
      ...prev,
      [day]: {
        from: !timesAreValid,
        to: !timesAreValid && updatedTimes.to !== ""
      }
    }));
  };

  return (
    <Formik
      initialValues={{
        name: initialName,
        timezone: initialTimezone,
        calendarUrl: initialCalendarUrl,
        shopifyStoreUrl: initialShopifyStoreUrl,
        shopifyStoreAPIkey: ""
      }}
      validationSchema={formikValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!hasScheduleErrors(scheduleErrors)) {
          onSave &&
            onSave({
              ...values,
              hoursOfOperation
            });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form style={{ display: "flex", alignItems: "flex-start" }}>
          <Box>
            <SettingsTitle>Workspace Settings</SettingsTitle>
            <StyledBox>
              <Field
                as={TextField}
                label="Name"
                name="name"
                placeholder="Name"
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />

              <Field
                as={Select}
                label="Timezone"
                name="timezone"
                data={timezones}
                error={touched.timezone && errors.timezone}
                helperText={touched.timezone && errors.timezone}
              />

              <Field
                as={TextField}
                label="Calendar URL"
                name="calendarUrl"
                error={touched.calendarUrl && errors.calendarUrl}
                helperText={touched.calendarUrl && errors.calendarUrl}
              />

              <Field
                as={TextField}
                label="Shopify Store URL"
                name="shopifyStoreUrl"
                error={touched.shopifyStoreUrl && errors.shopifyStoreUrl}
                helperText={touched.shopifyStoreUrl && errors.shopifyStoreUrl}
              />

              <Field
                as={TextField}
                label="Shopify API Key"
                name="shopifyStoreAPIkey"
                type="password"
                placeholder="API Key"
                error={touched.shopifyStoreAPIkey && errors.shopifyStoreAPIkey}
                helperText={
                  touched.shopifyStoreAPIkey && errors.shopifyStoreAPIkey
                }
              />
            </StyledBox>

            <SettingsTitle sx={{ mt: 4 }}>Hours of Operation</SettingsTitle>

            <StyledBox sx={{ pb: 1 }}>
              {sortHours(hoursOfOperation).map(([day, times]) => (
                <Box key={day} display="flex">
                  <Typography
                    variant="body1"
                    sx={{
                      width: "90px",
                      marginRight: "19px",
                      textAlign: "right"
                    }}
                  >
                    {day}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={3}>
                    <TextField
                      label="From"
                      type="time"
                      value={times.from}
                      onChange={(e) =>
                        handleScheduleChange(day as Day, "from", e.target.value)
                      }
                      sx={{ marginRight: "8px" }}
                      error={!!scheduleErrors[day]?.from}
                    />
                    <Typography variant="body2" sx={{ marginX: "10px" }}>
                      -
                    </Typography>
                    <TextField
                      label="To"
                      type="time"
                      value={times.to}
                      onChange={(e) =>
                        handleScheduleChange(day as Day, "to", e.target.value)
                      }
                      sx={{ marginLeft: "8px" }}
                      error={!!scheduleErrors[day]?.to}
                    />
                  </Box>
                </Box>
              ))}
            </StyledBox>

            <Box sx={{ width: 206, mt: 5 }}>
              <Button type="submit">Save changes</Button>
            </Box>
          </Box>
          {isAdmin && (
            <Box sx={{ ml: 5 }}>
              <SettingsTitle>Danger Zone</SettingsTitle>
              <StyledDangerZone>
                <Typography variant="body1">Delete Workspace</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  This will permanently delete your workspace and all of its
                  data. This action cannot be undone.
                </Typography>

                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={() => setConfirmDeleteOpen(true)}
                >
                  Delete workspace
                </Button>
              </StyledDangerZone>
            </Box>
          )}
          <Modal
            BackdropProps={{
              style: {
                backgroundColor: "#27150C",
                opacity: 0.8
              }
            }}
            open={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ConfirmationForm
              title="Delete Workspace"
              description="Are you sure you want to delete this workspace? You will lose all associated data. This action cannot be undone."
              confirmationText={initialName}
              onCancel={() => setConfirmDeleteOpen(false)}
              onConfirm={() => {
                setConfirmDeleteOpen(false);
                onWorkspaceDelete();
              }}
            />
          </Modal>
        </Form>
      )}
    </Formik>
  );
};
