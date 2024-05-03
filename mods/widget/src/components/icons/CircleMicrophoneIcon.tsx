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
      <g filter="url(#filter0_b_849_1779)">
        <circle cx="20" cy="20" r="20" fill={circleColor} fill-opacity="0.4" />
      </g>
      <path
        d="M20 22.4507C19.1667 22.4507 18.4583 22.159 17.875 21.5757C17.2917 20.9924 17 20.284 17 19.4507V13.4507C17 12.6174 17.2917 11.909 17.875 11.3257C18.4583 10.7424 19.1667 10.4507 20 10.4507C20.8333 10.4507 21.5417 10.7424 22.125 11.3257C22.7083 11.909 23 12.6174 23 13.4507V19.4507C23 20.284 22.7083 20.9924 22.125 21.5757C21.5417 22.159 20.8333 22.4507 20 22.4507ZM19 29.4507V26.3757C17.2667 26.1424 15.8333 25.3674 14.7 24.0507C13.5667 22.734 13 21.2007 13 19.4507H15C15 20.834 15.4875 22.0132 16.4625 22.9882C17.4375 23.9632 18.6167 24.4507 20 24.4507C21.3833 24.4507 22.5625 23.9632 23.5375 22.9882C24.5125 22.0132 25 20.834 25 19.4507H27C27 21.2007 26.4333 22.734 25.3 24.0507C24.1667 25.3674 22.7333 26.1424 21 26.3757V29.4507H19ZM20 20.4507C20.2833 20.4507 20.5208 20.3549 20.7125 20.1632C20.9042 19.9715 21 19.734 21 19.4507V13.4507C21 13.1674 20.9042 12.9299 20.7125 12.7382C20.5208 12.5465 20.2833 12.4507 20 12.4507C19.7167 12.4507 19.4792 12.5465 19.2875 12.7382C19.0958 12.9299 19 13.1674 19 13.4507V19.4507C19 19.734 19.0958 19.9715 19.2875 20.1632C19.4792 20.3549 19.7167 20.4507 20 20.4507Z"
        fill="#333333"
      />
      <defs>
        <filter
          id="filter0_b_849_1779"
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
            result="effect1_backgroundBlur_849_1779"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_849_1779"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
