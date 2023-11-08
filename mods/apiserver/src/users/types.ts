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

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export const updateUserSchema = z.object({
  name: z
    .string()
    .max(60, "Name must be at most 60 characters long.")
    .optional(),
  avatar: z
    .string()
    .max(255, "Avatar must be at most 255 characters long.")
    .optional(),
  password: z
    .string()
    .optional()
    .refine(
      (password) => {
        return (
          password === undefined ||
          password.length === 0 ||
          password.length >= 8
        );
      },
      {
        message: "Password must be at least 8 characters long."
      }
    )
});

export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
