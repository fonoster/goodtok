import * as SDK from "@goodtok/sdk";
import { Method, ConnectionObject } from "@goodtok/common";
import { ChatPage } from "~components/chat/ChatPage";
import { useParams } from "react-router-dom";
import { useAuth } from "~authentication";
import { CustomerProfile } from "~components/chat/customer/types";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef } from "react";

function ChatContainer() {
  const videoRefs = useRef<null | React.RefObject<HTMLVideoElement>>(null);
  const [isActiveCall, setIsActiveCall] = React.useState(false);
  const [isLocalCameraMuted, setIsLocalCameraMuted] = React.useState(false);
  const [isLocalMicrophoneMuted, setIsLocalMicrophoneMuted] =
    React.useState(false);
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [customerProfile, setCustomerProfile] =
    React.useState<CustomerProfile>();

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

  const handleVideoRefsReady = (
    refs: React.RefObject<HTMLVideoElement> | null
  ) => {
    videoRefs.current = refs;
  };

  const handleStartCall = async () => {
    const tokens = new SDK.Tokens(client);
    const inviterToken = await tokens.createToken({
      ref: customerId!,
      workspaceId: workspaceId!,
      customerId: customerId!,
      aorLink: atob(encodedAor!),
      methods: [Method.INVITE]
    });

    const connectionObject = jwtDecode(inviterToken) as ConnectionObject;

    console.log(inviterToken);
    console.log(connectionObject);
  };

  const handleReturnToQueue = async () => {};

  const handleHangup = async () => {};

  const handleMuteCamera = async () => {};

  const handleMuteMicrophone = async () => {};

  return (
    <ChatPage
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
