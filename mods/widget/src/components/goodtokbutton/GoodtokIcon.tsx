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

interface GoodtokIcon {
  online: boolean;
}

export function GoodtokIcon({ online = false, ...props }: GoodtokIcon) {
  return (
    <svg
      {...props}
      width="84"
      height="69"
      viewBox="0 0 84 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_752_125601)">
        <path
          d="M74 31.875C74 19.7938 62.7523 10 48.8775 10L35.1226 10C21.2478 10 10 19.7938 10 31.875V59H48.8775C62.7523 59 74 49.2062 74 37.125V31.875Z"
          fill="url(#paint0_linear_752_125601)"
        />
        <circle
          cx="16.5"
          cy="17.5"
          r="6.5"
          fill={online ? "#39E19E" : "#C2C2C2"}
        />
        <path
          d="M55.7078 38.5348C54.5362 38.5348 53.5536 38.1409 52.7599 37.3533C51.9663 36.5656 51.5695 35.5903 51.5695 34.4276C51.5695 33.2648 51.9663 32.2895 52.7599 31.5018C53.5536 30.7142 54.5362 30.3203 55.7078 30.3203C56.8416 30.3203 57.8054 30.7142 58.599 31.5018C59.3927 32.2895 59.7895 33.2648 59.7895 34.4276C59.7895 35.5903 59.3927 36.5656 58.599 37.3533C57.8054 38.1409 56.8416 38.5348 55.7078 38.5348Z"
          fill="white"
        />
        <path
          d="M42.0339 38.5348C40.8623 38.5348 39.8797 38.1409 39.086 37.3533C38.2923 36.5656 37.8955 35.5903 37.8955 34.4276C37.8955 33.2648 38.2923 32.2895 39.086 31.5018C39.8797 30.7142 40.8623 30.3203 42.0339 30.3203C43.1677 30.3203 44.1314 30.7142 44.9251 31.5018C45.7187 32.2895 46.1156 33.2648 46.1156 34.4276C46.1156 35.5903 45.7187 36.5656 44.9251 37.3533C44.1314 38.1409 43.1677 38.5348 42.0339 38.5348Z"
          fill="white"
        />
        <path
          d="M28.3592 38.5348C27.1876 38.5348 26.205 38.1409 25.4113 37.3533C24.6177 36.5656 24.2208 35.5903 24.2208 34.4276C24.2208 33.2648 24.6177 32.2895 25.4113 31.5018C26.205 30.7142 27.1876 30.3203 28.3592 30.3203C29.493 30.3203 30.4567 30.7142 31.2504 31.5018C32.0441 32.2895 32.4409 33.2648 32.4409 34.4276C32.4409 35.5903 32.0441 36.5656 31.2504 37.3533C30.4567 38.1409 29.493 38.5348 28.3592 38.5348Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_752_125601"
          x="7"
          y="7"
          width="74"
          height="59"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_752_125601"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_752_125601"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_752_125601"
          x1="48.799"
          y1="44.2899"
          x2="32.7559"
          y2="2.82016"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF9965" />
          <stop offset="1" stop-color="#DF682B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GoodtokHoverIcon({ online = false, ...props }) {
  return (
    <svg
      {...props}
      width="84"
      height="69"
      viewBox="0 0 84 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_752_125675)">
        <path
          d="M74 31.875C74 19.7938 62.7523 10 48.8775 10L35.1226 10C21.2478 10 10 19.7938 10 31.875V59H48.8775C62.7523 59 74 49.2062 74 37.125V31.875Z"
          fill="#FF9965"
        />
        <circle
          cx="16.5"
          cy="17.5"
          r="6.5"
          fill={online ? "#39E19E" : "#C2C2C2"}
        />
        <path
          d="M55.7078 38.5348C54.5362 38.5348 53.5536 38.1409 52.7599 37.3533C51.9663 36.5656 51.5695 35.5903 51.5695 34.4276C51.5695 33.2648 51.9663 32.2895 52.7599 31.5018C53.5536 30.7142 54.5362 30.3203 55.7078 30.3203C56.8416 30.3203 57.8054 30.7142 58.599 31.5018C59.3927 32.2895 59.7895 33.2648 59.7895 34.4276C59.7895 35.5903 59.3927 36.5656 58.599 37.3533C57.8054 38.1409 56.8416 38.5348 55.7078 38.5348Z"
          fill="white"
        />
        <path
          d="M42.0339 38.5348C40.8623 38.5348 39.8797 38.1409 39.086 37.3533C38.2923 36.5656 37.8955 35.5903 37.8955 34.4276C37.8955 33.2648 38.2923 32.2895 39.086 31.5018C39.8797 30.7142 40.8623 30.3203 42.0339 30.3203C43.1677 30.3203 44.1314 30.7142 44.9251 31.5018C45.7187 32.2895 46.1156 33.2648 46.1156 34.4276C46.1156 35.5903 45.7187 36.5656 44.9251 37.3533C44.1314 38.1409 43.1677 38.5348 42.0339 38.5348Z"
          fill="white"
        />
        <path
          d="M28.3592 38.5348C27.1876 38.5348 26.205 38.1409 25.4113 37.3533C24.6177 36.5656 24.2208 35.5903 24.2208 34.4276C24.2208 33.2648 24.6177 32.2895 25.4113 31.5018C26.205 30.7142 27.1876 30.3203 28.3592 30.3203C29.493 30.3203 30.4567 30.7142 31.2504 31.5018C32.0441 32.2895 32.4409 33.2648 32.4409 34.4276C32.4409 35.5903 32.0441 36.5656 31.2504 37.3533C30.4567 38.1409 29.493 38.5348 28.3592 38.5348Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_752_125675"
          x="7"
          y="7"
          width="74"
          height="59"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_752_125675"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_752_125675"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
