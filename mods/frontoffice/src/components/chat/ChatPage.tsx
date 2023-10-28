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
import { Box } from "@mui/material";
import { AppBar } from "../appbar/AppBar";
import { StartCall } from "./start/StartCall";
import { CustomerInfo } from "./customer/CustomerInfo";
import { CustomerProfile, OrderItem } from "./customer/types";
import React, { useEffect, useRef } from "react";
import Video from "./video/Video";

type ChatPageProps = {
  isAuthenticated: boolean;
  isActiveCall: boolean;
  userName: string;
  customerProfile: CustomerProfile;
  orders: OrderItem[];
  onVideoRefsReady: (refs: any) => void;
};

export const ChatPage: React.FC<ChatPageProps> = ({
  isAuthenticated,
  isActiveCall = true,
  userName,
  customerProfile,
  orders,
  onVideoRefsReady,
  ...props
}) => {
  const videoRefs = useRef(null);

  useEffect(() => {
    if (videoRefs.current) {
      onVideoRefsReady(videoRefs.current);
    }
  }, [onVideoRefsReady]);

  return (
    <Box
      {...props}
      sx={{
        mb: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(100vh - 64px)"
      }}
    >
      <AppBar isAuthenticated={isAuthenticated} userName={userName} />
      <Box
        sx={{
          pt: 2,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        {!isActiveCall && (
          <StartCall onReturnToQueue={() => {}} onStartCall={() => {}} />
        )}
        {isActiveCall && <Video ref={videoRefs} isOpen={true} />}

        <CustomerInfo profile={customerProfile} orders={orders} />
      </Box>
    </Box>
  );
};
