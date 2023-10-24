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

type CalendarIconProps = {
  width?: number;
  height?: number;
};

export function CalendarIcon({
  width = 36,
  height = 31,
  ...props
}: CalendarIconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 36 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26 10.6362H25V8.6665H23V10.6362H13V8.6665H11V10.6362H10C8.9 10.6362 8 11.5226 8 12.6059V28.3635C8 29.4468 8.9 30.3332 10 30.3332H26C27.1 30.3332 28 29.4468 28 28.3635V12.6059C28 11.5226 27.1 10.6362 26 10.6362ZM26 28.3635H10V15.5604H26V28.3635Z"
        fill="#333333"
      />
    </svg>
  );
}
