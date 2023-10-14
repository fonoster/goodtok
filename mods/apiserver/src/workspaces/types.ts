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
import { z } from "zod";

export type DayPreferences = {
  enabled: boolean;
  hours: { start: string; end: string }[];
};

export enum Days {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday"
}

export type WeeklyHoursType = {
  [key in Days]: DayPreferences;
};

export type Workspace = {
  id: string;
  name: string;
  hoursOfOperation: WeeklyHoursType;
  timezone: string;
  shopifyAccount?: {
    storeId: string;
    accessToken: string;
  };
};

export const updateWorkspaceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  timezone: z.string().min(3),
  shopifyAccount: z.object({
    storeId: z.string().min(1),
    accessToken: z.string().min(1)
  }),
  hoursOfOperation: z.object({
    Monday: z.object({
      enabled: z.boolean(),
      hours: z.array(
        z.object({
          start: z.string(),
          end: z.string()
        })
      )
    }),
    Tuesday: z.object({
      enabled: z.boolean(),
      hours: z.array(
        z.object({
          start: z.string(),
          end: z.string()
        })
      )
    }),
    Wednesday: z.object({
      enabled: z.boolean(),
      hours: z.array(
        z.object({
          start: z.string(),
          end: z.string()
        })
      )
    }),
    Thursday: z.object({
      enabled: z.boolean(),
      hours: z.array(
        z.object({
          start: z.string(),
          end: z.string()
        })
      )
    }),
    Friday: z.object({
      enabled: z.boolean(),
      hours: z.array(
        z.object({
          start: z.string(),
          end: z.string()
        })
      )
    }),
    Saturday: z.object({
      enabled: z.boolean(),
      hours: z.array(
        z.object({
          start: z.string(),
          end: z.string()
        })
      )
    }),
    Sunday: z.object({
      enabled: z.boolean(),
      hours: z.array(
        z.object({
          start: z.string(),
          end: z.string()
        })
      )
    })
  })
});

export type UpdateWorkspaceRequest = z.infer<typeof updateWorkspaceSchema>;

export type Member = {
  userId: string;
  name: string;
  status: string;
  avatar: string;
};

export type Customer = {
  name: string;
  avatar: string;
};

export type QueueEntry = {
  customerId: string;
  registeredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  workspaceId: string;
  customer: Customer;
  aor: string;
};
