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

export function CircleCameraMutedIcon() {
  const [isHovered, setIsHovered] = useState(false);
  const circleColor = isHovered ? "#FFFFFF" : "#B7B7B7";

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g filter="url(#filter0_b_849_2661)">
        <circle cx="20" cy="20" r="20" fill={circleColor} fill-opacity="0.5" />
      </g>
      <path
        d="M30 22.2934V16.5999C30 15.642 28.8376 15.1577 28.1596 15.8357L25.6949 18.3112V14.5442C25.6949 13.9522 25.2105 13.4679 24.6186 13.4679H18.5807L28.1703 23.0576C28.8376 23.7356 30 23.2513 30 22.2934ZM10.3148 9.7655C9.89506 10.1852 9.89506 10.8633 10.3148 11.2831L12.4889 13.4679H11.7032C11.1113 13.4679 10.6269 13.9522 10.6269 14.5442V25.307C10.6269 25.899 11.1113 26.3833 11.7032 26.3833H24.6186C24.8446 26.3833 25.0383 26.2972 25.2105 26.1896L27.8797 28.8587C28.2995 29.2785 28.9775 29.2785 29.3973 28.8587C29.817 28.439 29.817 27.7609 29.3973 27.3412L11.8324 9.7655C11.4126 9.34575 10.7346 9.34575 10.3148 9.7655Z"
        fill="#333333"
      />
      <defs>
        <filter
          id="filter0_b_849_2661"
          x="-10"
          y="-9.54932"
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
            result="effect1_backgroundBlur_849_2661"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_849_2661"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
