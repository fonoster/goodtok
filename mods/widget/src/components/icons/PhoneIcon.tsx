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

type PhoneIconProps = {
  width?: number;
  height?: number;
};

export function PhoneIcon({
  width = 36,
  height = 31,
  ...props
}: PhoneIconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.0404 22.1386L23.2125 21.8158C22.5333 21.7378 21.8653 21.9716 21.3866 22.4504L19.338 24.499C16.1872 22.8957 13.6043 20.3239 12.001 17.1619L14.0607 15.1022C14.5395 14.6235 14.7733 13.9555 14.6953 13.2763L14.3725 10.4706C14.2389 9.34615 13.2925 8.5 12.1569 8.5H10.2308C8.97271 8.5 7.92616 9.54656 8.00409 10.8047C8.59417 20.3127 16.1984 27.9058 25.6953 28.4959C26.9533 28.5738 27.9999 27.5273 27.9999 26.2692V24.3431C28.011 23.2186 27.1649 22.2722 26.0404 22.1386Z"
        fill="#333333"
      />
    </svg>
  );
}
