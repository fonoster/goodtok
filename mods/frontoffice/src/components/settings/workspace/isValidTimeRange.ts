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
// Function to check if 'from' time is before 'to' time
export const isValidTimeRange = (from: string, to: string) => {
  if (from === "" && to === "") return true; // If both are empty, consider it valid
  const [fromHours, fromMinutes] = from?.split(":").map(Number) || [0, 0];
  const [toHours, toMinutes] = to?.split(":").map(Number) || [0, 0];
  return (
    new Date(0, 0, 0, fromHours, fromMinutes) <
    new Date(0, 0, 0, toHours, toMinutes)
  );
};
