import { WeeklyHoursType } from "@goodtok/sdk";

export type WorkspaceSettingsType = {
  name: string;
  timezone: string;
  shopifyStoreUrl: string;
  shopifyStoreAPIkey?: string;
  calendarUrl: string;
  hoursOfOperation: WeeklyHoursType;
};
