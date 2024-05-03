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

export function CircleHangupIcon() {
  const [isHovered, setIsHovered] = useState(false);
  const circleColor = isHovered ? "#eda3a3" : "#E37171";

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="#E37171"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g filter="url(#filter0_b_941_302)">
        <circle cx="20" cy="20" r="20" fill={circleColor} fill-opacity="0.5" />
      </g>
      <path
        d="M28.0404 23.6386L25.2125 23.3158C24.5333 23.2378 23.8653 23.4716 23.3866 23.9504L21.338 25.999C18.1872 24.3957 15.6043 21.8239 14.001 18.6619L16.0607 16.6022C16.5395 16.1235 16.7733 15.4555 16.6953 14.7763L16.3725 11.9706C16.2389 10.8462 15.2925 10 14.1569 10H12.2308C10.9727 10 9.92616 11.0466 10.0041 12.3047C10.5942 21.8127 18.1984 29.4058 27.6953 29.9959C28.9533 30.0738 29.9999 29.0273 29.9999 27.7692V25.8431C30.011 24.7186 29.1649 23.7722 28.0404 23.6386Z"
        fill="white"
      />
      <defs>{/* ... the rest of your SVG definition ... */}</defs>
    </svg>
  );
}
