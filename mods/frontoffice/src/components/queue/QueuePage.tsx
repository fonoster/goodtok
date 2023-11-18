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
  workspaceId: string;
  workspaceName: string;
  userName: string;
  avatar: string;
  data: CustomerData[];
  storeURL: string;
  avgWaitTime: string;
  isEnabled: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  onQueueEntrySelect: (id: string, aor: string) => void;
  onEnabledStatusChange: (isEnabled: boolean) => void;
  onSignOut: () => void;
};

export const QueuePage: React.FC<QueuePageProps> = ({
  workspaceId,
  workspaceName,
  userName,
  avatar,
  data,
  storeURL,
  avgWaitTime,
  isEnabled,
  isAuthenticated,
  isAdmin,
  onQueueEntrySelect,
  onEnabledStatusChange,
  onSignOut,
  ...props
}) => {
  const handleEnabledChange = (newEnabledStatus: boolean) => {
    onEnabledStatusChange(newEnabledStatus); // Notify the parent component
  };

  return (
    <Box
      {...props}
      sx={{ backgroundColor: "#F5F5F5", height: "100%", minHeight: "100vh" }}
    >
      <AppBar
        workspaceId={workspaceId}
        userName={userName}
        avatar={avatar}
        onSignOut={onSignOut}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
      />
      <Box sx={{ p: 5 }} display="flex" flexDirection="row" gap={20}>
        <QueueStatus
          enabled={isEnabled}
          workspaceName={workspaceName}
          storeURL={storeURL}
          onChange={handleEnabledChange}
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
