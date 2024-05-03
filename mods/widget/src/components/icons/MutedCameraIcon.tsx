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

type MutedCameraIconProps = {
  width?: number;
  height?: number;
};

export function MutedCameraIcon({
  width = 36,
  height = 37,
  ...props
}: MutedCameraIconProps) {
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
        d="M28 21.4814V15.7879C28 14.83 26.8376 14.3457 26.1596 15.0237L23.6949 17.4992V13.7322C23.6949 13.1402 23.2105 12.6559 22.6186 12.6559H16.5807L26.1703 22.2456C26.8376 22.9236 28 22.4393 28 21.4814ZM8.31481 8.95348C7.89506 9.37323 7.89506 10.0513 8.31481 10.471L10.4889 12.6559H9.70322C9.11126 12.6559 8.62693 13.1402 8.62693 13.7322V24.495C8.62693 25.0869 9.11126 25.5713 9.70322 25.5713H22.6186C22.8446 25.5713 23.0383 25.4852 23.2105 25.3775L25.8797 28.0467C26.2995 28.4665 26.9775 28.4665 27.3973 28.0467C27.817 27.627 27.817 26.9489 27.3973 26.5292L9.83237 8.95348C9.41262 8.53373 8.73456 8.53373 8.31481 8.95348Z"
        fill="#333333"
      />
    </svg>
  );
}
