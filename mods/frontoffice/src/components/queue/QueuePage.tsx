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
import { AppBar } from "../appbar/AppBar";
import { Box } from "@mui/material";
import { QueueStatus } from "./status/QueueStatus";
import { CustomerData, QueueList } from "./list/QueueList";
import React from "react";

type QueuePageProps = {
  userName: string;
  avatar: string;
  isAuthenticated: boolean;
  data: CustomerData[];
  storeURL: string;
  workspaceName: string;
  avgWaitTime: string;
  isOnline: boolean;
  onQueueEntrySelect: (id: string, aor: string) => void;
  onOnlineStatusChange: (isOnline: boolean) => void;
  onSignOut: () => void;
};

export const QueuePage: React.FC<QueuePageProps> = ({
  userName,
  avatar,
  isAuthenticated,
  data,
  storeURL,
  workspaceName,
  avgWaitTime,
  isOnline,
  onQueueEntrySelect,
  onOnlineStatusChange,
  onSignOut,
  ...props
}) => {
  const handleOnlineChange = (newOnlineStatus: boolean) => {
    onOnlineStatusChange(newOnlineStatus); // Notify the parent component
  };

  return (
    <Box
      {...props}
      sx={{ backgroundColor: "#F5F5F5", height: "100%", minHeight: "100vh" }}
    >
      <AppBar
        isAuthenticated={isAuthenticated}
        userName={userName}
        avatar={avatar}
        onSignOut={onSignOut}
      />
      <Box sx={{ p: 5 }} display="flex" flexDirection="row" gap={20}>
        <QueueStatus
          online={isOnline}
          workspaceName={workspaceName}
          storeURL={storeURL}
          onChange={handleOnlineChange}
        />
        <QueueList
          avgWaitTime={avgWaitTime}
          onQueueEntrySelect={onQueueEntrySelect}
          data={data}
        />
      </Box>
    </Box>
  );
};
