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

export function CirclePiPIcon() {
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
      <g filter="url(#filter0_b_941_296)">
        <circle cx="20" cy="20" r="20" fill={circleColor} fill-opacity="0.4" />
      </g>
      <path
        d="M24.9091 16.1146H20C19.55 16.1146 19.1818 16.465 19.1818 16.8932V20.0078C19.1818 20.436 19.55 20.7864 20 20.7864H24.9091C25.3591 20.7864 25.7273 20.436 25.7273 20.0078V16.8932C25.7273 16.465 25.3591 16.1146 24.9091 16.1146ZM27.3636 13H12.6364C11.7364 13 11 13.7008 11 14.5573V25.4583C11 26.3148 11.7364 27 12.6364 27H27.3636C28.2636 27 29 26.3148 29 25.4583V14.5573C29 13.7008 28.2636 13 27.3636 13ZM26.5455 25.4661H13.4545C13.0045 25.4661 12.6364 25.1157 12.6364 24.6874V15.3204C12.6364 14.8921 13.0045 14.5417 13.4545 14.5417H26.5455C26.9955 14.5417 27.3636 14.8921 27.3636 15.3204V24.6874C27.3636 25.1157 26.9955 25.4661 26.5455 25.4661Z"
        fill="#333333"
      />
      <defs>
        <filter
          id="filter0_b_941_296"
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
            result="effect1_backgroundBlur_941_296"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_941_296"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
