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
import React from "react";

type StatusIndicatorIconProps = {
  status: "ONLINE" | "IN_PROGRESS" | "OFFLINE";
};

export function StatusIndicatorIcon({
  status,
  ...props
}: StatusIndicatorIconProps) {
  return (
    <svg
      {...props}
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill={statusColor(status)} />
    </svg>
  );
}

function statusColor(status: "ONLINE" | "IN_PROGRESS" | "OFFLINE") {
  switch (status) {
    case "ONLINE":
      return "#39E19E";
    case "IN_PROGRESS":
      return "#FFC700";
    case "OFFLINE":
      return "#C2C2C2";
  }
}
