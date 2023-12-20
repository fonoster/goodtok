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
  StyledCustomerName,
  StyledCustomerNote
} from "./QueueItemStyles";
import { StatusIndicatorIcon } from "./StatusIndicatorIcon";
import React from "react";

type QueueItemProps = {
  id: string;
  name: string;
  note: string;
  status: "ONLINE" | "IN_PROGRESS" | "OFFLINE";
  time: string;
  isOdd: boolean;
  onClick: (id: string) => void;
};

export const QueueItem: React.FC<QueueItemProps> = ({
  id,
  name,
  note,
  status,
  time,
  isOdd = false,
  onClick,
  ...props
}) => {
  return (
    <StyledQueueItem {...props} isOdd={isOdd} onClick={() => onClick(id)}>
      <StyledQueueItemContainer>
        <StyledOnlineTitle>
          <StatusIndicatorIcon status={status} />{" "}
        </StyledOnlineTitle>
        <FlexBox>
          <StyledCustomerName>{name}</StyledCustomerName>
          <StyledTime>{time}</StyledTime>
        </FlexBox>
        <StyledCustomerNote>{note}</StyledCustomerNote>
      </StyledQueueItemContainer>
    </StyledQueueItem>
  );
};
