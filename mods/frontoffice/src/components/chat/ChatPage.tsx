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
import { AppBar } from "../appbar/AppBar";
import { StartCall } from "./start/StartCall";
import { CustomerInfo } from "./customer/CustomerInfo";
import { CustomerProfile, OrderItem } from "./customer/types";
import { StyledTitle } from "./ChatPageStyles";
import React, { useEffect, useRef } from "react";
import Video from "./video/Video";

type ChatPageProps = {
  workspaceId: string;
  userName: string;
  avatar: string;
  isAuthenticated: boolean;
  isActiveCall: boolean;
  customerProfile: CustomerProfile;
  orders: OrderItem[];
  isLocalCameraMuted: boolean;
  isLocalMicrophoneMuted: boolean;
  isAdmin: boolean;
  onStartCall: () => void;
  onCustomerDequeue: () => void;
  onVideoRefsReady: (refs: any) => void;
  onSignOut: () => void;
  onHangup: () => void;
  onMuteCamera: () => void;
  onMuteMicrophone: () => void;
};

export const ChatPage: React.FC<ChatPageProps> = ({
  workspaceId,
  userName,
  avatar,
  isAuthenticated,
  isActiveCall = true,
  customerProfile,
  orders,
  isLocalCameraMuted,
  isLocalMicrophoneMuted,
  isAdmin,
  onStartCall,
  onCustomerDequeue,
  onVideoRefsReady,
  onSignOut,
  onHangup,
  onMuteCamera,
  onMuteMicrophone,
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
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        minHeight: "100vh"
      }}
    >
      <AppBar
        workspaceId={workspaceId}
        isAuthenticated={isAuthenticated}
        userName={userName}
        avatar={avatar}
        onSignOut={onSignOut}
        isAdmin={isAdmin}
      />

      <Box
        sx={{
          pt: 2,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <StyledTitle sx={{ mb: 2 }}>Live Session</StyledTitle>

        {!isActiveCall && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <StartCall
              onCustomerDequeue={onCustomerDequeue}
              onStartCall={onStartCall}
            />
            <Box>
              <CustomerInfo profile={customerProfile} orders={orders} />
            </Box>
          </Box>
        )}

        {isActiveCall && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Video
              isLocalCameraMuted={isLocalCameraMuted}
              isLocalMicrophoneMuted={isLocalMicrophoneMuted}
              onHangup={onHangup}
              onMuteCamera={onMuteCamera}
              onMuteMicrophone={onMuteMicrophone}
              ref={videoRefs}
              isOpen={true}
            />
            <Box>
              <CustomerInfo profile={customerProfile} orders={orders} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
