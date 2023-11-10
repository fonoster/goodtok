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
  StartCallBody,
  StartCallContainer,
  StartCallTitle,
  StyledReturnToQueueButton,
  StyledStartCallButton
} from "./StartCallStyles";
import React from "react";
import { Box } from "@mui/material";

type StartCallProps = {
  onStartCall: () => void;
  onCustomerDequeue: () => void;
};

export const StartCall: React.FC<StartCallProps> = ({
  onStartCall,
  onCustomerDequeue,
  ...props
}) => {
  return (
    <StartCallContainer
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box>
        <StartCallTitle>You’re all set to connect.</StartCallTitle>
        <StartCallBody>
          Start a call with your customer to get started, or return to the
          queue.
        </StartCallBody>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "width: 100%;"
          }}
        >
          <StyledStartCallButton onClick={onStartCall}>
            Call customer
          </StyledStartCallButton>
          <StyledReturnToQueueButton
            onClick={onCustomerDequeue}
            variant="outlined"
          >
            Remove from queue
          </StyledReturnToQueueButton>
        </Box>
      </Box>
    </StartCallContainer>
  );
};
