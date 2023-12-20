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
import { MediaConnection, Peer } from "peerjs";
import React, { useEffect, useRef, useState } from "react";

type VideoRefs = {
  remoteVideo: HTMLVideoElement;
  localVideo: HTMLVideoElement;
};

function ChatContainer() {
  const videoRefs = useRef<VideoRefs>();
  const [isActiveCall, setIsActiveCall] = React.useState(false);
  const [isLocalCameraMuted, setIsLocalCameraMuted] = React.useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [peer, setPeer] = React.useState<Peer>({} as Peer);
  const [localStream, setLocalStream] = React.useState<MediaStream>();
  const [connectionObject, setConnectionObject] =
    React.useState<ConnectionObject>({} as ConnectionObject);
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
    const tokens = new SDK.Tokens(client);
    tokens
      .createToken({
        ref: customerId,
        workspaceId: workspaceId,
        customerId: customerId
      })
      .then((token) => {
        const connectionObject = jwtDecode(token as string) as ConnectionObject;
        const peer = new Peer(undefined!, {
          host: connectionObject.signalingHost,
          port: connectionObject.signalingPort,
          debug: 3
        });

        setConnectionObject(connectionObject);
        setPeer(peer);
      })
      .catch((err) => {
        showSnackbar("Error creating inviter token");
        logger.error("Error creating token", err);
      });
  }, []);

  useEffect(() => {
    const users = new SDK.Users(client);
    users
      .getCurrentUser()
      .then((user) => {
        setName(user.name);
        setAvatar(user.avatar);
      })
      .catch((err) => {
        showSnackbar("Error getting current user");
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
        showSnackbar("Error getting current user");
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
        showSnackbar("Error getting current user");
        logger.error("Error getting current user", err);
      });
  }, [workspaceId, customerId, client]);

  const handleVideoRefsReady = (refs: VideoRefs) => {
    videoRefs.current = refs;
  };

  const handleStartCall = async () => {
    try {
      // The await here is important, otherwise the peer object is not ready
      await setIsActiveCall(true);

      if (!connectionObject || !videoRefs.current) {
        showSnackbar("An error occurred while calling");
        logger.error("Error getting connection object");
        return;
      }

      const localVideo = videoRefs.current.localVideo;
      const remoteVideo = videoRefs.current.remoteVideo;

      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      setLocalStream(localStream);

      localVideo.srcObject = localStream;
      localVideo.autoplay = true;

      peer.on("error", (err) => {
        showSnackbar("Error on peer: " + err);
        logger.error("Error on peer", err);
      });

      peer.on("call", (mediaConnection: MediaConnection) => {
        // We won't receive calls, but need this to reset the remote video
        mediaConnection.answer(localStream);

        mediaConnection.on("stream", (stream) => {
          remoteVideo.srcObject = stream;
          remoteVideo.autoplay = true;
        });
      });

      const call = await peer.call(customerId, localStream!);

      call.on("stream", (stream) => {
        remoteVideo.srcObject = stream;
        remoteVideo.autoplay = true;
      });

      changeStatusToInProgress();
    } catch (err) {
      logger.error("error on peer", err);
      showSnackbar("Error on peer: " + err);
    }
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
    if (peer) {
      setIsLocalCameraMuted(!isLocalCameraMuted);
      toggleVideo({
        videoRefs: { current: videoRefs.current! },
        localStream: localStream!,
        peer,
        remotePeerId: customerId
      });
    }
  };

  const handleMuteMicrophone = async () => {
    if (peer) {
      setIsLocalMicrophoneMuted(!isLocalMicrophoneMuted);
      localStream!.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
    }
  };

  const changeStatusToInProgress = () => {
    const queues = new SDK.Queues(client);
    queues.updateQueueEntryStatus({
      workspaceId,
      customerId,
      status: "IN_PROGRESS"
    });
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

async function toggleVideo(t: {
  videoRefs: {
    current: { localVideo: HTMLVideoElement; remoteVideo: HTMLVideoElement };
  };
  localStream: MediaStream;
  peer: Peer;
  remotePeerId: string;
}) {
  const { videoRefs, localStream, peer, remotePeerId } = t;

  const localVideo = videoRefs.current.localVideo;
  const videoTrack = localStream.getVideoTracks()[0];

  if (videoTrack?.readyState === "live" && videoTrack?.enabled) {
    localStream.removeTrack(videoTrack);
    videoTrack.enabled = false;
    // INFO: This is a hack to ensure the remote side sees a black screen instead of the last frame
    setTimeout(() => {
      videoTrack.stop();
      peer.call(remotePeerId, null);
    }, 500);
  } else {
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    const newVideoTrack = newStream.getVideoTracks()[0];
    localStream.addTrack(newVideoTrack);
    localVideo.srcObject = localStream;
    peer.call(remotePeerId, localStream);
  }
}

export default ChatContainer;
