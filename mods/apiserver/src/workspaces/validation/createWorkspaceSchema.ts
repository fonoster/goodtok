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
import { updateWorkspaceSchema } from "./updateWorkspaceSchema";
import { MAX_LENGTH_FOR_ANY_INPUT, MAX_LENGTH_FOR_NAME } from "../../constants";

export const createWorkspaceSchema = updateWorkspaceSchema
  .omit({
    id: true
  })
  .merge(
    z
      .object({
        name: z.string().min(1).max(MAX_LENGTH_FOR_NAME, "Name is too long"),
        calendarUrl: z
          .string()
          .min(1)
          .max(MAX_LENGTH_FOR_ANY_INPUT, "Calendar URL is too long")
      })
      .required()
  );
