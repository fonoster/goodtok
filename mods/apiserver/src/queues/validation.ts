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
import { QueueEntryStatus } from "@prisma/client";
import { z } from "zod";

export const updateQueueEntryStatusSchema = z
  .object({
    workspaceId: z.string(),
    customerId: z.string(),
    // SDK only is only allowed to update status to DEQUEUED or IN_PROGRESS
    status: z.enum([QueueEntryStatus.DEQUEUED, QueueEntryStatus.IN_PROGRESS])
  })
  .required();

export const joinQueueSchema = z
  .object({
    customerId: z.string(),
    workspaceId: z.string()
  })
  .required();
