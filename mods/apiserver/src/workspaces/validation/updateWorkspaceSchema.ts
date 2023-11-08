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
import { WorkspaceStatus } from "@prisma/client";
import { MAX_LENGTH_FOR_ANY_INPUT, MAX_LENGTH_FOR_NAME } from "../../constants";

export const updateWorkspaceSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(1)
    .max(MAX_LENGTH_FOR_NAME, "Name is too long")
    .optional(),
  timezone: z.string().min(1).optional(),
  calendarUrl: z
    .string()
    .min(1)
    .max(MAX_LENGTH_FOR_ANY_INPUT, "Calendar URL is too long")
    .optional(),
  status: z.enum([WorkspaceStatus.ONLINE, WorkspaceStatus.OFFLINE]).optional(),
  shopifyAccount: z
    .object({
      storeDomain: z
        .string()
        .min(1)
        .max(MAX_LENGTH_FOR_ANY_INPUT, "Store domain is too long")
        .optional(),
      accessToken: z
        .string()
        .min(1)
        .max(MAX_LENGTH_FOR_ANY_INPUT, "Access token is too long")
        .optional()
    })
    .optional(),
  hoursOfOperation: z
    .object({
      Monday: z
        .object({
          from: z.string().min(1).max(5).optional(),
          to: z.string().min(1).max(5).optional()
        })
        .optional(),
      Tuesday: z
        .object({
          from: z.string().min(1).max(5).optional(),
          to: z.string().min(1).max(5).optional()
        })
        .optional(),
      Wednesday: z
        .object({
          from: z.string().min(1).max(5).optional(),
          to: z.string().min(1).max(5).optional()
        })
        .optional(),
      Thursday: z
        .object({
          from: z.string().min(1).max(5).optional(),
          to: z.string().min(1).max(5).optional()
        })
        .optional(),
      Friday: z
        .object({
          from: z.string().min(1).max(5).optional(),
          to: z.string().min(1).max(5).optional()
        })
        .optional(),
      Saturday: z
        .object({
          from: z.string().min(1).max(5).optional(),
          to: z.string().min(1).max(5).optional()
        })
        .optional(),
      Sunday: z
        .object({
          from: z.string().min(1).max(5).optional(),
          to: z.string().min(1).max(5).optional()
        })
        .optional()
    })
    .optional()
});
