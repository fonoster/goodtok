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
import React, { useState } from "react";

export function CircleShareScreenIcon() {
  const [isHovered, setIsHovered] = useState(false);
  const circleColor = isHovered ? "#FFFFFF" : "#B7B7B7";

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g filter="url(#filter0_b_941_299)">
        <circle cx="20" cy="20" r="20" fill={circleColor} fill-opacity="0.4" />
      </g>
      <path
        d="M26.6667 25.0312C27.5833 25.0312 28.325 24.2578 28.325 23.3125L28.3333 14.7188C28.3333 13.7648 27.5833 13 26.6667 13H13.3333C12.4083 13 11.6667 13.7648 11.6667 14.7188V23.3125C11.6667 24.2578 12.4083 25.0312 13.3333 25.0312H10V26.75H30V25.0312H26.6667ZM13.3333 23.3125V14.7188H26.6667V23.3211L13.3333 23.3125ZM20.8333 17.4086C17.5917 17.8727 16.3 20.1586 15.8333 22.4531C16.9917 20.8461 18.5167 20.1156 20.8333 20.1156V21.9977L24.1667 18.7836L20.8333 15.5781V17.4086Z"
        fill="#333333"
      />
      <defs>
        <filter
          id="filter0_b_941_299"
          x="-10"
          y="-10"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_941_299"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_941_299"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
