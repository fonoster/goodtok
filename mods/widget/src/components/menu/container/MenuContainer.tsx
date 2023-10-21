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
import "./styles.css";
import React, { ReactNode } from "react";
import { GoodtokIcon } from "../../icons/GoodtokIcon";
import { OnlineIndicatoricon } from "../../icons/OnlineIndicatorIcon";

type MenuContainerProps = {
  online?: boolean;
  isOpen?: boolean;
  children: ReactNode;
};

export const MenuContainer: React.FC<MenuContainerProps> = ({
  online = false,
  isOpen = true,
  children,
  ...props
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div {...props} className="menu-container">
      <div className="content-area">
        {children} {/* Render the children here */}
      </div>
      <div className="status-area">
        <div className="status-area-container">
          <div className="powered-by">
            <label>Powered by</label>
            <GoodtokIcon />
          </div>
          <div className="status-indicator">
            <OnlineIndicatoricon online={online} />
            <label>Online Now</label>
          </div>
        </div>
      </div>
    </div>
  );
};
