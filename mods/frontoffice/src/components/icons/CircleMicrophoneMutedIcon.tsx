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

export function CircleMicrophoneMutedIcon() {
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
      <g filter="url(#filter0_b_849_2655)">
        <circle cx="20" cy="20" r="20" fill={circleColor} fill-opacity="0.4" />
      </g>
      <path
        d="M25.75 23.4007L24.3 21.9507C24.5334 21.5674 24.7084 21.1674 24.825 20.7507C24.9417 20.334 25 19.9007 25 19.4507H27C27 20.184 26.8917 20.8799 26.675 21.5382C26.4584 22.1965 26.15 22.8174 25.75 23.4007ZM22.8 20.4007L21 18.6007V13.4507C21 13.1674 20.9042 12.9299 20.7125 12.7382C20.5209 12.5465 20.2834 12.4507 20 12.4507C19.7167 12.4507 19.4792 12.5465 19.2875 12.7382C19.0959 12.9299 19 13.1674 19 13.4507V16.6007L17 14.6007V13.4507C17 12.6174 17.2917 11.909 17.875 11.3257C18.4584 10.7424 19.1667 10.4507 20 10.4507C20.8334 10.4507 21.5417 10.7424 22.125 11.3257C22.7084 11.909 23 12.6174 23 13.4507V19.4507C23 19.634 22.9792 19.8007 22.9375 19.9507C22.8959 20.1007 22.85 20.2507 22.8 20.4007ZM19 29.4507V26.3757C17.2667 26.1424 15.8334 25.3674 14.7 24.0507C13.5667 22.734 13 21.2007 13 19.4507H15C15 20.834 15.4792 22.0132 16.4375 22.9882C17.3959 23.9632 18.5834 24.4507 20 24.4507C20.5667 24.4507 21.1042 24.3632 21.6125 24.1882C22.1209 24.0132 22.5834 23.7674 23 23.4507L24.425 24.8757C23.9417 25.259 23.4125 25.584 22.8375 25.8507C22.2625 26.1174 21.65 26.2924 21 26.3757V29.4507H19ZM27.8 31.0507L9.40002 12.6507L10.8 11.2507L29.2 29.6507L27.8 31.0507Z"
        fill="#333333"
      />
      <defs>
        <filter
          id="filter0_b_849_2655"
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
            result="effect1_backgroundBlur_849_2655"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_849_2655"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
