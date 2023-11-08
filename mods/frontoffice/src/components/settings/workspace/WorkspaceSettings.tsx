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
import { WeeklyHoursType, Day } from "@goodtok/sdk";
import { Box, Typography } from "@mui/material";
import { TextField } from "../../textfield/TextField";
import { StyledBox, SettingsTitle } from "./WorkspaceSettingsStyles";
import { Button } from "../../button/Button";
import { Select } from "../../select/Select";
import { timezones } from "../../../utils/timezones";
import { WorkspaceSettingsType } from "./types";
import { Formik, Field, Form } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import React, { useState } from "react";

type HoursOfOperationErrors = {
  [day: string]: {
    from: boolean;
    to: boolean;
  };
};

type WorkspaceSettingsProps = {
  initialName: string;
  initialTimezone: string;
  initialShopifyStoreUrl: string;
  initialCalendarUrl: string;
  initialHoursOfOperation: WeeklyHoursType;
  onSave?: (settings: WorkspaceSettingsType) => void;
};

export const WorkspaceSettings: React.FC<WorkspaceSettingsProps> = ({
  initialName,
  initialTimezone,
  initialCalendarUrl,
  initialShopifyStoreUrl,
  initialHoursOfOperation,
  onSave
}) => {
  const [name, setName] = useState(initialName);
  const [timezone, setTimezone] = useState(initialTimezone);
  const [calendarUrl, setCalendarUrl] = useState(initialCalendarUrl);
  const [shopifyStoreAPIkey, setShopifyStoreAPIkey] = useState("");
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState(
    initialShopifyStoreUrl
  );
  const [hoursOfOperation, setHoursOfOperation] = useState(
    initialHoursOfOperation
  );

  const orderedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  // Sort the hours of operation by the correct order of days
  const sortedHours = Object.entries(hoursOfOperation).sort(
    ([day1], [day2]) => orderedDays.indexOf(day1) - orderedDays.indexOf(day2)
  );

  const handleSave = () => {
    onSave &&
      onSave({
        name,
        timezone,
        calendarUrl,
        shopifyStoreUrl,
        shopifyStoreAPIkey,
        hoursOfOperation
      });
  };

  const [scheduleErrors, setScheduleErrors] = useState<HoursOfOperationErrors>(
    Object.keys(initialHoursOfOperation).reduce(
      (acc, day) => ({
        ...acc,
        [day]: { from: false, to: false }
      }),
      {}
    )
  );

  // Function to check if 'from' time is before 'to' time
  const isValidTimeRange = (from: string, to: string) => {
    if (from === "" && to === "") return true; // If both are empty, consider it valid
    const [fromHours, fromMinutes] = from?.split(":").map(Number) || [0, 0];
    const [toHours, toMinutes] = to?.split(":").map(Number) || [0, 0];
    return (
      new Date(0, 0, 0, fromHours, fromMinutes) <
      new Date(0, 0, 0, toHours, toMinutes)
    );
  };

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

  const hasScheduleErrors = () => {
    return Object.values(scheduleErrors).some((day) => day.from || day.to);
  };

  return (
    <Box>
      <SettingsTitle>Workspace Settings</SettingsTitle>
      <StyledBox>
        <TextField
          label="Name"
          placeholder="My store"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Select
          label="Timezone"
          value={timezone}
          data={timezones}
          onChange={(e) => setTimezone(e.target.value)}
        />

        <TextField
          label="Calendar URL"
          value={calendarUrl}
          onChange={(e) => setCalendarUrl(e.target.value)}
        />

        <TextField
          label="Shopify Store URL"
          value={shopifyStoreUrl}
          onChange={(e) => setShopifyStoreUrl(e.target.value)}
        />

        <TextField
          label="Shopify API Key"
          type="password"
          placeholder="********"
          value={shopifyStoreAPIkey}
          onChange={(e) => setShopifyStoreAPIkey(e.target.value)}
        />
      </StyledBox>

      <SettingsTitle sx={{ mt: 4 }}>Hours of Operation</SettingsTitle>
      <StyledBox sx={{ pb: 1 }}>
        {sortedHours.map(([day, times]) => (
          <Box key={day} display="flex">
            <Typography
              variant="body1"
              sx={{ width: "90px", marginRight: "19px", textAlign: "right" }}
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
        <Button onClick={handleSave} disabled={hasScheduleErrors()}>
          Save changes
        </Button>
      </Box>
    </Box>
  );
};
