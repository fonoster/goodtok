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
import React from "react";

type CameraIconProps = {
  width?: number;
  height?: number;
};

export function CameraIcon({
  width = 36,
  height = 31,
  ...props
}: CameraIconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 36 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5556 13.729V9.59706C23.5556 8.94775 23.0556 8.4165 22.4444 8.4165H9.11111C8.5 8.4165 8 8.94775 8 9.59706V21.4026C8 22.0519 8.5 22.5832 9.11111 22.5832H22.4444C23.0556 22.5832 23.5556 22.0519 23.5556 21.4026V17.2707L26.1 19.9741C26.8 20.7179 28 20.1866 28 19.1359V11.8519C28 10.8012 26.8 10.27 26.1 11.0137L23.5556 13.729Z"
        fill="#333333"
      />
    </svg>
  );
}
