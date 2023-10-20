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
import { GoodtokIcon, GoodtokHoverIcon } from "./GoodtokIcon";
import "./component.css";

interface GoodtokButtonProps {
  online: boolean;
}

export const GoodtokButton: React.FC<GoodtokButtonProps> = ({
  online = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <GoodtokHoverIcon
          className="goodtok-button"
          {...props}
          online={online}
        />
      ) : (
        <GoodtokIcon {...props} online={online} />
      )}
    </div>
  );
};
