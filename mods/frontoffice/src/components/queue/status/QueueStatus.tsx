/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
import { Box } from "@mui/material";
import {
  StyledQueueStatusText,
  StyledShopifyLogo,
  StyledStatusBackedBy,
  StyledStatusStoreURL,
  StyledStatusTitle,
  SyledSwitch
} from "./QueueStatusStyles";
import React from "react";

type QueueStatusProps = {
  workspaceName: string;
  storeURL: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export const QueueStatus: React.FC<QueueStatusProps> = ({
  onChange,
  workspaceName,
  storeURL,
  enabled,
  ...props
}) => {
  return (
    <Box {...props}>
      <StyledStatusTitle sx={{ mb: 2 }}>{workspaceName}</StyledStatusTitle>
      <StyledStatusBackedBy display="flex" alignItems="center">
        Powered by <StyledShopifyLogo />
      </StyledStatusBackedBy>
      <StyledStatusStoreURL sx={{ mt: 1 }}>{storeURL}</StyledStatusStoreURL>
      <Box sx={{ mt: 4 }} display="flex" alignItems="center">
        <SyledSwitch
          inputProps={{ "aria-label": "controlled" }}
          checked={enabled}
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        />
        <StyledQueueStatusText>
          Queue {enabled ? "Enabled" : "Disabled"}
        </StyledQueueStatusText>
      </Box>
    </Box>
  );
};
