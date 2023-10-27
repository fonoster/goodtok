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
import {
  FlexBox,
  StyledOnlineTitle,
  StyledQueueItem,
  StyledQueueItemContainer,
  StyledTime,
  StyledUserName,
  StyledUserNote
} from "./QueueItemStyles";
import { OnlineIndicatorIcon } from "./OnlineIndicatorIcon";
import React from "react";

type QueueItemProps = {
  id: string;
  isOdd: boolean;
  isOnline: boolean;
  userName: string;
  note?: string;
  time: string;
  onClick: (id: string) => void;
};

export const QueueItem: React.FC<QueueItemProps> = ({
  id,
  isOdd = false,
  isOnline = false,
  userName,
  note,
  time,
  onClick,
  ...props
}) => {
  return (
    <StyledQueueItem {...props} isOdd={isOdd} onClick={() => onClick(id)}>
      <StyledQueueItemContainer>
        <StyledOnlineTitle>
          <OnlineIndicatorIcon online={isOnline} />{" "}
          {isOnline ? "Online" : "Offline"}
        </StyledOnlineTitle>
        <FlexBox>
          <StyledUserName>{userName}</StyledUserName>
          <StyledTime>{time}</StyledTime>
        </FlexBox>
        <StyledUserNote>{note}</StyledUserNote>
      </StyledQueueItemContainer>
    </StyledQueueItem>
  );
};