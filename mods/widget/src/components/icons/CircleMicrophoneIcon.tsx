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

export function CircleMicrophoneIcon() {
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
      <g filter="url(#filter0_b_941_290)">
        <circle cx="20" cy="20" r="20" fill={circleColor} fill-opacity="0.4" />
      </g>
      <path
        d="M10 18.1789V22.6234C10 23.2345 10.5 23.7345 11.1111 23.7345H14.4444L18.1 27.39C18.8 28.09 20 27.59 20 26.6011V14.19C20 13.2011 18.8 12.7011 18.1 13.4011L14.4444 17.0678H11.1111C10.5 17.0678 10 17.5678 10 18.1789ZM25 20.4011C25 18.4345 23.8667 16.7456 22.2222 15.9234V24.8678C23.8667 24.0567 25 22.3678 25 20.4011ZM22.2222 12.0122V12.2345C22.2222 12.6567 22.5 13.0234 22.8889 13.1789C25.7556 14.3234 27.7778 17.1345 27.7778 20.4011C27.7778 23.6678 25.7556 26.4789 22.8889 27.6234C22.4889 27.7789 22.2222 28.1456 22.2222 28.5678V28.79C22.2222 29.49 22.9222 29.9789 23.5667 29.7345C27.3333 28.3011 30 24.6678 30 20.4011C30 16.1345 27.3333 12.5011 23.5667 11.0678C22.9222 10.8122 22.2222 11.3122 22.2222 12.0122Z"
        fill="#333333"
      />
      <defs>
        <filter
          id="filter0_b_941_290"
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
            result="effect1_backgroundBlur_941_290"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_941_290"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
