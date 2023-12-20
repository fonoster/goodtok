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
import * as SDK from "@goodtok/sdk";
import { ConnectionObject } from "@goodtok/common";
import { ChatPage } from "~components/chat/ChatPage";
import { useParams } from "react-router-dom";
import { useAuth } from "~authentication";
import { CustomerProfile } from "~components/chat/customer/types";
import { jwtDecode } from "jwt-decode";
import { useLogger } from "~logger";
import { useSnackbar } from "~snackbar";
import React, { useEffect, useRef, useState } from "react";

type VideoRefs = {
  remoteVideo: HTMLVideoElement;
  remoteAudio: HTMLAudioElement;
  localVideo: HTMLVideoElement;
};

function ChatContainer() {
  const videoRefs = useRef<VideoRefs>();
  const [isActiveCall, setIsActiveCall] = React.useState(false);
  const [isLocalCameraMuted, setIsLocalCameraMuted] = React.useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [isLocalMicrophoneMuted, setIsLocalMicrophoneMuted] =
    React.useState(false);
  const [customerProfile, setCustomerProfile] = React.useState<CustomerProfile>(
    {} as CustomerProfile
  );

  const { client, signOut, isAdmin } = useAuth();
  const { showSnackbar } = useSnackbar();

  const logger = useLogger();
  const { id: workspaceId, sessionId: customerId } = useParams() as {
    id: string;
    sessionId: string;
  };

  if (!client) {
    signOut();
    return;
  }

  useEffect(() => {
    const users = new SDK.Users(client);
    users
      .getCurrentUser()
      .then((user) => {
        setName(user.name);
        setAvatar(user.avatar);
      })
      .catch((err) => {
        logger.error("Error getting current user", err);
      });
  });

  useEffect(() => {
    const customers = new SDK.Customers(client);
    customers
      .getCustomerById({ workspaceId, customerId })
      .then((profile) => {
        setCustomerProfile(profile);
      })
      .catch((err) => {
        logger.error("Error getting current user", err);
      });
  }, [workspaceId, customerId, client]);

  useEffect(() => {
    const customers = new SDK.Customers(client);
    customers
      .getOrdersByCustomerId({ workspaceId, customerId })
      .then((orders) => {
        setOrders(orders);
      })
      .catch((err) => {
        logger.error("Error getting current user", err);
      });
  }, [workspaceId, customerId, client]);

  const handleVideoRefsReady = (refs: VideoRefs) => {
    videoRefs.current = refs;
  };

  const handleStartCall = async () => {
    setIsActiveCall(true);

    const tokens = new SDK.Tokens(client);
    const inviterToken = await tokens.createToken({
      ref: customerId,
      workspaceId: workspaceId,
      customerId: customerId
    });

    const connectionObject = jwtDecode(
      inviterToken as string
    ) as ConnectionObject;

    if (!connectionObject || !videoRefs.current) {
      logger.error("error getting connection object");
      return;
    }

    const localVideo = videoRefs.current.localVideo;
    const remoteAudio = videoRefs.current.remoteAudio;
    const remoteVideo = videoRefs.current.remoteVideo;

    // TODO: Inite peer connection and then call

    const queues = new SDK.Queues(client);

    queues.updateQueueEntryStatus({
      workspaceId,
      customerId,
      status: "IN_PROGRESS"
    });
  };

  const onCustomerDequeue = async () => {
    // TODO: If peer exist and is connected, hangup

    const queues = new SDK.Queues(client);
    queues.updateQueueEntryStatus({
      workspaceId,
      customerId,
      status: "DEQUEUED"
    });

    showSnackbar("Customer removed from queue");
  };

  const handleHangup = async () => {
    // TODO: If peer exist and is connected, hangup
  };

  const handleMuteCamera = async () => {
    // TODO: If peer exist and is connected, and mute camera
    // if (peer) {
    //   setIsLocalCameraMuted(!isLocalCameraMuted);
    //   // TODO: Toggle camera
    // }
  };

  const handleMuteMicrophone = async () => {
    // TODO: If peer exist and is connected, and mute microphone
    // if (peer) {
    //   setIsLocalMicrophoneMuted(!isLocalMicrophoneMuted);
    //   // TODO: Toggle microphone
    // }
  };

  return (
    <ChatPage
      isAdmin={isAdmin(workspaceId)}
      workspaceId={workspaceId}
      userName={name}
      avatar={avatar}
      customerProfile={customerProfile!}
      isAuthenticated={true}
      orders={orders}
      isActiveCall={isActiveCall}
      isLocalCameraMuted={isLocalCameraMuted}
      isLocalMicrophoneMuted={isLocalMicrophoneMuted}
      onStartCall={handleStartCall}
      onCustomerDequeue={onCustomerDequeue}
      onVideoRefsReady={handleVideoRefsReady}
      onHangup={handleHangup}
      onMuteCamera={handleMuteCamera}
      onMuteMicrophone={handleMuteMicrophone}
      onSignOut={signOut}
    />
  );
}

export default ChatContainer;
