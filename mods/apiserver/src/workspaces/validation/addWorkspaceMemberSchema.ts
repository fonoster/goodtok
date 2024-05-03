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
import { MAX_LENGTH_FOR_ANY_INPUT } from "../../constants";

export const addWorkspaceMemberSchema = z.object({
  workspaceId: z.string().min(1),
  name: z.string().min(1).max(MAX_LENGTH_FOR_ANY_INPUT, "Name is too long"),
  email: z.string().min(1).max(MAX_LENGTH_FOR_ANY_INPUT, "Email is too long"),
  role: z.string().min(1)
});
