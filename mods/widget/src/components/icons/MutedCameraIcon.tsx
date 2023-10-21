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

type MutedCameraIconProps = {
  width?: number;
  height?: number;
};

export function MutedCameraIcon({
  width = 20,
  height = 20,
  ...props
}: MutedCameraIconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 12.8427V7.1492C20 6.19131 18.8376 5.70698 18.1596 6.38504L15.6949 8.86049V5.0935C15.6949 4.50155 15.2105 4.01722 14.6186 4.01722H8.58065L18.1703 13.6069C18.8376 14.2849 20 13.8006 20 12.8427ZM0.314812 0.314812C-0.104937 0.734562 -0.104937 1.41262 0.314812 1.83237L2.4889 4.01722H1.70322C1.11126 4.01722 0.626934 4.50155 0.626934 5.0935V15.8563C0.626934 16.4483 1.11126 16.9326 1.70322 16.9326H14.6186C14.8446 16.9326 15.0383 16.8465 15.2105 16.7389L17.8797 19.408C18.2995 19.8278 18.9775 19.8278 19.3973 19.408C19.817 18.9883 19.817 18.3102 19.3973 17.8905L1.83237 0.314812C1.41262 -0.104937 0.734562 -0.104937 0.314812 0.314812Z"
        fill="#333333"
      />
    </svg>
  );
}
