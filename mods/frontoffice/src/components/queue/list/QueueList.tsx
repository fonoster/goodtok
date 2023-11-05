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
  StyledAvgWaitTime,
  StyledEmptyQueueListBody,
  StyledEmptyQueueListContainer,
  StyledEmptyQueueListTitle,
  StyledMenuItem,
  StyledQueueListBox,
  StyledQueueListItemCount,
  StyledQueueListTitle,
  StyledSelect
} from "./QueueListStyles";
import { Box, FormControl, MenuItem } from "@mui/material";
import { QueueItem } from "../item/QueueItem";
import React from "react";

export type CustomerData = {
  id: string;
  name: string;
  isOnline: boolean;
  note: string;
  time: string;
};

type QueueListProps = {
  avgWaitTime?: string;
  maxItems?: number;
  data: CustomerData[];
  hideAvgWaitTime?: boolean;
  onQueueEntrySelect: (id: string) => void;
};

export const QueueList: React.FC<QueueListProps> = ({
  avgWaitTime = "",
  maxItems = 8,
  data,
  hideAvgWaitTime = true,
  onQueueEntrySelect,
  ...props
}) => {
  const [sort, setSort] = React.useState("status");

  const sortedData = [...data].sort((a, b) => {
    switch (sort) {
      case "by-name-desc":
        return b.name.localeCompare(a.name);
      case "status":
        return (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <Box {...props}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <StyledQueueListTitle>Customer Queue</StyledQueueListTitle>
          {!hideAvgWaitTime && (
            <StyledAvgWaitTime>Avg waiting time: {avgWaitTime}</StyledAvgWaitTime>
          )}
        </Box>
        <FormControl size="small">
          <StyledSelect
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
          >
            <StyledMenuItem value={"status"}>Sort by status</StyledMenuItem>
            <StyledMenuItem value={"by-name-desc"}>Sort by name</StyledMenuItem>
          </StyledSelect>
        </FormControl>
      </Box>
      {data.length === 0 && (
        <StyledEmptyQueueListContainer sx={{ mt: 3 }}>
          <Box sx={{ width: 353 }}>
            <StyledEmptyQueueListTitle>
              No one is here yet!
            </StyledEmptyQueueListTitle>
            <StyledEmptyQueueListBody sx={{ mt: 4 }}>
              When customers need to connect they will display here, no further
              action is required.
            </StyledEmptyQueueListBody>
          </Box>
        </StyledEmptyQueueListContainer>
      )}
      {data.length > 0 && (
        <StyledQueueListBox sx={{ mt: 4 }}>
          {sortedData
            .map((customer, index) => (
              <QueueItem
                key={index}
                id={customer.id}
                isOdd={index % 2 === 0}
                isOnline={customer.isOnline}
                name={customer.name}
                time={customer.time}
                note={customer.note}
                onClick={() => onQueueEntrySelect(customer.id)}
              />
            ))
            .slice(0, maxItems)}
        </StyledQueueListBox>
      )}
      <Box display="flex" justifyContent="center" alignItems="center">
        <StyledQueueListItemCount sx={{ mt: 2 }}>
          {`Showing ${Math.min(maxItems, sortedData.length)} of ${data.length
            } Customers`}
        </StyledQueueListItemCount>
      </Box>
    </Box>
  );
};
