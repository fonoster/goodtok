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
import React, { ReactNode } from "react";

import { GoodtokIcon } from "../../icons/GoodtokIcon";
import { OnlineIndicatorIcon } from "../../icons/OnlineIndicatorIcon";
import {
  ContentArea,
  FlexContainer,
  MenuContainerStyled,
  StatusArea,
  StatusAreaLabel
} from "./MenuContainerStyles";

type MenuContainerProps = {
  online?: boolean;
  isOpen?: boolean;
  children: ReactNode;
  className?: string;
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
    <MenuContainerStyled {...props}>
      <ContentArea>
        {children} {/* Render the children here */}
      </ContentArea>
      <StatusArea>
        <FlexContainer className="status-area-container">
          <FlexContainer
            className="powered-by"
            onClick={() => window.open("https://goodtok.io", "_blank")}
          >
            <StatusAreaLabel>Powered by</StatusAreaLabel>
            <GoodtokIcon />
          </FlexContainer>
          <FlexContainer className="status-indicator">
            <OnlineIndicatorIcon online={online} />
            <StatusAreaLabel>
              {online ? "Online" : "Offline"} Now
            </StatusAreaLabel>
          </FlexContainer>
        </FlexContainer>
      </StatusArea>
    </MenuContainerStyled>
  );
};
