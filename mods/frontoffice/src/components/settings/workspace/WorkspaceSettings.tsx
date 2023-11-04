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
import { Box, Typography } from "@mui/material";
import { TextField } from "../../textfield/TextField";
import { StyledBox, SettingsTitle } from "./WorkspaceSettingsStyles";
import { Button } from "../../button/Button";
import React, { useState } from "react";
import { Select } from "../../select/Select";
import { timezones } from "./timezones";

type WorkspaceSettingsProps = {
  initialName: string;
  initialTimezone: string;
  initialShopifyStoreUrl: string;
  initialCalendarUrl: string;
  initialSchedule: WeekdaySchedule;
  onSave?: (name: string, timezone: string, shopifyStoreId: string) => void;
};

type WeekdaySchedule = {
  [day: string]: {
    from: string | boolean;
    to: string | boolean;
  };
};

export const WorkspaceSettings: React.FC<WorkspaceSettingsProps> = ({
  initialName,
  initialTimezone,
  initialCalendarUrl,
  initialShopifyStoreUrl,
  initialSchedule,
  onSave
}) => {
  const [name, setName] = useState(initialName);
  const [timezone, setTimezone] = useState(initialTimezone);
  const [calendarUrl, setCalendarUrl] = useState(initialCalendarUrl);
  const [shopifyStoreAPIkey, setShopifyStoreAPIkey] = useState("");
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState(
    initialShopifyStoreUrl
  );
  const [schedule, setSchedule] = useState<WeekdaySchedule>(initialSchedule);

  const handleSave = () => {
    onSave && onSave(name, timezone, shopifyStoreUrl);
  };

  const [scheduleErrors, setScheduleErrors] = useState<WeekdaySchedule>(
    Object.keys(initialSchedule).reduce(
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
    const [fromHours, fromMinutes] = from.split(":").map(Number);
    const [toHours, toMinutes] = to.split(":").map(Number);
    return (
      new Date(0, 0, 0, fromHours, fromMinutes) <
      new Date(0, 0, 0, toHours, toMinutes)
    );
  };

  const handleScheduleChange = (
    day: string,
    type: "from" | "to",
    value: string
  ) => {
    const updatedTimes = {
      ...schedule[day],
      [type]: value
    };

    const timesAreValid = isValidTimeRange(
      updatedTimes.from as string,
      updatedTimes.to as string
    );

    setSchedule((prev) => ({
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
        {Object.entries(schedule).map(([day, times]) => (
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
                value={times.from as string}
                onChange={(e) =>
                  handleScheduleChange(day, "from", e.target.value)
                }
                sx={{ marginRight: "8px" }}
                error={scheduleErrors[day].from as boolean}
              />
              <Typography variant="body2" sx={{ marginX: "10px" }}>
                -
              </Typography>
              <TextField
                label="To"
                type="time"
                value={times.to as string}
                onChange={(e) =>
                  handleScheduleChange(day, "to", e.target.value)
                }
                sx={{ marginLeft: "8px" }}
                error={scheduleErrors[day].to as boolean}
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
