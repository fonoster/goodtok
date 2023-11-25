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
} from "./NotificationStyles";

export enum NotificationType {
  WAITING_FOR_AGENT = "WAITING_FOR_AGENT",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  PERMISSIONS_ERROR = "PERMISSIONS_ERROR",
  DEVICE_UNAVAILABLE_ERROR = "DEVICE_UNAVAILABLE_ERROR"
}

export const NOTIFICATION_MESSAGES = {
  [NotificationType.WAITING_FOR_AGENT]: {
    title: "Hang tight!",
    description:
      "Please keep this tab open while we connect you with one of our representatives."
  },
  [NotificationType.UNKNOWN_ERROR]: {
    title: "Unexpected Error!",
    description:
      "Oops! Something unexpected happened and we couldn't process your request. Please try again later."
  },
  [NotificationType.PERMISSIONS_ERROR]: {
    title: "Permissions Needed!",
    description:
      "We don't have permission to access your camera or microphone. Please check your browser settings."
  },
  [NotificationType.DEVICE_UNAVAILABLE_ERROR]: {
    title: "Device Not Found!",
    description: "The requested media is not available."
  }
};

type NotificationsProps = {
  online?: boolean;
  isOpen: boolean;
  type: NotificationType;
  onClose: () => void;
};

export const Notification: React.FC<NotificationsProps> = ({
  online = false,
  onClose,
  isOpen,
  type,
  ...props
}) => {
  const { title, description } = NOTIFICATION_MESSAGES[type] || {};

  return (
    <MenuContainer {...props} isOpen={isOpen} online={online}>
      <div className="notification-container">
        <NotificationHeader onClick={onClose}>
          <CloseIcon />
        </NotificationHeader>
        <NotificationBody>
          <InnerContainer>
            {type === NotificationType.WAITING_FOR_AGENT && (
              <>
                <WaitingIndicator>
                  <Rotate>
                    <LoadingIcon />
                  </Rotate>
                  <StyledSpan>{title}</StyledSpan>
                </WaitingIndicator>
                <StyledP>{description}</StyledP>
              </>
            )}
            {type !== NotificationType.WAITING_FOR_AGENT && (
              <>
                <WaitingIndicator>
                  <StyledSpan>{title}</StyledSpan>
                </WaitingIndicator>
                <StyledP>{description}</StyledP>
              </>
            )}
          </InnerContainer>
        </NotificationBody>
      </div>
    </MenuContainer>
  );
};
