import * as SDK from "@goodtok/sdk";
import { Method, ConnectionObject, mediaToggle } from "@goodtok/common";
import { ChatPage } from "~components/chat/ChatPage";
import { useParams } from "react-router-dom";
import { useAuth } from "~authentication";
import { CustomerProfile } from "~components/chat/customer/types";
import { jwtDecode } from "jwt-decode";
import { Web } from "sip.js";
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
  const [isLocalMicrophoneMuted, setIsLocalMicrophoneMuted] =
    React.useState(false);
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [customerProfile, setCustomerProfile] =
    React.useState<CustomerProfile>();
  const [simpleUser, setSimpleUser] = useState<Web.SimpleUser | null>(null);

  const { client, signOut } = useAuth();

  let { id: workspaceId, sessionId: customerId, encodedAor } = useParams();

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
        // TODO: Handle error
      });
  });

  useEffect(() => {
    const session = new SDK.Customers(client);
    session
      .getCustomer({ workspaceId: workspaceId!, customerId: customerId! })
      .then((profile) => {
        setCustomerProfile(profile);
      })
      .catch((err) => {
        // TODO: Handle error
      });
  }, [workspaceId, customerId, client]);

  const handleVideoRefsReady = (refs: VideoRefs) => {
    videoRefs.current = refs;
  };

  const handleStartCall = async () => {
    setIsActiveCall(true);
    const tokens = new SDK.Tokens(client);
    const inviterToken = await tokens.createToken({
      ref: customerId!,
      workspaceId: workspaceId!,
      customerId: customerId!,
      aorLink: atob(encodedAor!),
      methods: [Method.INVITE]
    });

    const connectionObject = jwtDecode(inviterToken) as ConnectionObject;

    if (!connectionObject || !videoRefs.current) {
      // TODO: Handle error
      return;
    }

    const localVideo = videoRefs.current.localVideo;
    const remoteAudio = videoRefs.current.remoteAudio;
    const remoteVideo = videoRefs.current.remoteVideo;
    const options = {
      aor: connectionObject.aor,
      media: {
        constraints: { audio: true, video: true },
        remote: {
          audio: remoteAudio,
          video: remoteVideo
        },
        local: {
          video: localVideo
        }
      }
    };
    const simpleUser = new Web.SimpleUser(
      connectionObject.signalingServer,
      options
    );

    const delegate = {
      onCallHangup: () => {
        setIsActiveCall(false);
        if (simpleUser) {
          simpleUser.disconnect();
        }
      }
    };
    simpleUser.delegate = delegate;
    setSimpleUser(simpleUser);

    await simpleUser.connect();
    await simpleUser.call(connectionObject.aorLink, {
      extraHeaders: [`X-Connect-Token: ${inviterToken}`]
    });
  };

  const handleReturnToQueue = async () => {
    if (simpleUser) {
      simpleUser.hangup();
    }

    window.location.href = `/workspace/${workspaceId}`;
  };

  const handleHangup = async () => {
    if (simpleUser) {
      simpleUser.hangup();
    }
  };

  const handleMuteCamera = async () => {
    if (simpleUser) {
      setIsLocalCameraMuted(!isLocalCameraMuted);
      mediaToggle(simpleUser, isLocalCameraMuted, "video");
    }
  };

  const handleMuteMicrophone = async () => {
    if (simpleUser) {
      setIsLocalMicrophoneMuted(!isLocalMicrophoneMuted);
      mediaToggle(simpleUser, isLocalMicrophoneMuted, "audio");
    }
  };

  return (
    <ChatPage
      workspaceId={workspaceId!}
      userName={name}
      avatar={avatar}
      customerProfile={customerProfile!}
      isAuthenticated={true}
      orders={[]}
      isActiveCall={isActiveCall}
      isLocalCameraMuted={isLocalCameraMuted}
      isLocalMicrophoneMuted={isLocalMicrophoneMuted}
      onStartCall={handleStartCall}
      onReturnToQueue={handleReturnToQueue}
      onVideoRefsReady={handleVideoRefsReady}
      onHangup={handleHangup}
      onMuteCamera={handleMuteCamera}
      onMuteMicrophone={handleMuteMicrophone}
      onSignOut={signOut}
    />
  );
}

export default ChatContainer;
