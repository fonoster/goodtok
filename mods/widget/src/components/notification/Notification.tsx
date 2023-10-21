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
import { MenuContainer } from "../menu/container/MenuContainer";
import { CloseIcon } from "../icons/CloseIcon";
import { LoadingIcon } from "../icons/LoadingIcon";
import React from "react";
import {
  NotificationBody,
  NotificationHeader,
  InnerContainer,
  WaitingIndicator,
  Rotate,
  StyledSpan,
  StyledP
} from "./styles";

type MenuContainerProps = {
  online?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const Notification: React.FC<MenuContainerProps> = ({
  online = false,
  onClose,
  isOpen,
  ...props
}) => {
  return (
    <MenuContainer {...props} isOpen={isOpen} online={online}>
      <div className="notification-container">
        <NotificationHeader>
          <CloseIcon onClick={onClose} />
        </NotificationHeader>
        <NotificationBody>
          <InnerContainer>
            <WaitingIndicator>
              <Rotate>
                <LoadingIcon />
              </Rotate>
              <StyledSpan>Hang tight!</StyledSpan>
            </WaitingIndicator>
            <StyledP>
              Please keep this tab open while we connect you with one of our
              representatives.
            </StyledP>
          </InnerContainer>
        </NotificationBody>
      </div>
    </MenuContainer>
  );
};
