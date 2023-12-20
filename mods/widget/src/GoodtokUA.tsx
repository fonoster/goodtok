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
import { GoodtokWidget } from "./components/goodtokwidget/GoodtokWidget";
import { GoodtokWidgetEvents } from "./components/goodtokwidget/types";
import { ConnectionObject } from "@goodtok/common";
import { getAPIServer, getCustomerToken, getWorkspaceId } from "./utils/utils";
import { jwtDecode } from "jwt-decode";
import { menuData as menuDataOptions } from "./components/goodtokwidget/data";
import { Item } from "./components/menu/Menu";
import { NotificationType } from "./components/notification/Notification";
import {
  canInitiateAudioCall,
  canInitiateVideoCall
} from "./utils/capabilities";
import { MediaConnection, Peer } from "peerjs";
import React, { useEffect, useRef, useState } from "react";

const GoodtokUA = () => {
  const videoRefs = useRef(null);
  const [calendarUrl, setCalendarUrl] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<NotificationType>();
  const [customerToken, setCustomerToken] = useState(null);
  const [peer, setPeer] = useState(null);
  const [remoteMediaConnection, setRemoteMediaConnection] =
    useState<MediaConnection | null>(null);
  const [remotePeerId, setRemotePeerId] = useState(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [sessionType, setSessionType] = useState<
    | GoodtokWidgetEvents.AUDIO_SESSION_REQUEST
    | GoodtokWidgetEvents.VIDEO_SESSION_REQUEST
    | null
  >(null);
  const [menuData, setMenuData] = useState<Item[]>([]);
  const [connectionObject, setConnectionObject] =
    useState<ConnectionObject | null>(null);

  const handleVideoRefsReady = (refs: unknown) => {
    videoRefs.current = refs;
  };

  const sendSessionRequest = async (
    connectionObject: ConnectionObject,
    customerToken: string,
    event: GoodtokWidgetEvents
  ) => {
    try {
      const localVideo = videoRefs.current.localVideo;
      const remoteVideo = videoRefs.current.remoteVideo;

      const peer = new Peer(connectionObject.customerId, {
        host: connectionObject.signalingHost,
        port: connectionObject.signalingPort
      });

      setPeer(peer);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: event === GoodtokWidgetEvents.VIDEO_SESSION_REQUEST,
        audio: true
      });

      setLocalStream(stream);
      localVideo.srcObject = stream;
      localVideo.autoplay = true;

      peer.on("error", (err) => {
        console.error("PeerJS error:", err);
        setNotificationType(NotificationType.UNKNOWN_ERROR);
        setNotificationOpen(true);
      });

      peer.on("call", (mediaConnection: MediaConnection) => {
        mediaConnection.answer(stream);

        mediaConnection.on("stream", (stream) => {
          remoteVideo.srcObject = stream;
          remoteVideo.autoplay = true;
        });

        setRemoteMediaConnection(mediaConnection);
        setRemotePeerId(mediaConnection.peer);
        setVideoOpen(true);
        setNotificationOpen(false);
        setMenuOpen(false);
      });

      setVideoMuted(event === GoodtokWidgetEvents.AUDIO_SESSION_REQUEST);

      await joinQueue(connectionObject, customerToken);
    } catch (e) {
      console.error("failed to initialize peer", e);
      setNotificationType(NotificationType.UNKNOWN_ERROR);
      setNotificationOpen(true);
    }
  };

  const joinQueue = async (
    connectionObject: ConnectionObject,
    customerToken: string
  ) => {
    const workspaceId = getWorkspaceId(document);
    const server = getAPIServer(document);

    const client = new SDK.Client({
      endpoint: server,
      workspace: workspaceId
    });

    client.setToken(customerToken);

    const queues = new SDK.Queues(client);

    await queues.joinQueue({
      customerId: connectionObject.customerId,
      workspaceId: connectionObject.workspaceId
    });
  };

  const leaveQueue = async (
    connectionObject: ConnectionObject,
    customerToken: string
  ) => {
    const workspaceId = getWorkspaceId(document);
    const server = getAPIServer(document);

    const client = new SDK.Client({
      endpoint: server,
      workspace: workspaceId
    });

    client.setToken(customerToken);

    const queues = new SDK.Queues(client);

    await queues.updateQueueEntryStatus({
      customerId: connectionObject.customerId,
      workspaceId: connectionObject.workspaceId,
      status: "DEQUEUED"
    });
  };

  const handleScheduleMeetingRequest = () => {
    window.open(calendarUrl, "_blank");
  };

  const handleSubmitContactForm = async (values: Record<string, string>) => {
    const workspaceId = getWorkspaceId(document);
    const server = getAPIServer(document);
    let customerRef = sessionStorage.getItem("customerRef");

    if (!customerRef) {
      customerRef = Math.random().toString(36).substring(7);
      sessionStorage.setItem("customerRef", customerRef);
    }

    const client = new SDK.Client({
      endpoint: server,
      workspace: workspaceId
    });

    const tokens = new SDK.Tokens(client);

    const customerToken = await tokens.createAnonymousToken({
      ref: customerRef,
      workspaceId,
      metadata: values
    });

    const connectionObject = jwtDecode(customerToken) as ConnectionObject;

    setCustomerToken(customerToken);
    setConnectionObject(connectionObject);
    setCalendarUrl(connectionObject.calendarUrl);
    sessionStorage.setItem("customerToken", customerToken);
    return { connectionObject, customerToken };
  };

  const handleWidgetEvents = async (
    event: GoodtokWidgetEvents,
    data: Record<string, string>
  ) => {
    const toggleVideoHere = async () => {
      toggleVideo({
        videoRefs,
        localStream,
        peer,
        remotePeerId
      });
    };

    switch (event) {
      case GoodtokWidgetEvents.SUBMIT_CONTACT_FORM_REQUEST: {
        setContactFormOpen(false);
        setNotificationType(NotificationType.WAITING_FOR_AGENT);
        setNotificationOpen(true);
        const { connectionObject, customerToken } =
          await handleSubmitContactForm(data);
        await sendSessionRequest(connectionObject, customerToken, sessionType);
        break;
      }

      case GoodtokWidgetEvents.SCHEDULE_MEETING_REQUEST:
        handleScheduleMeetingRequest();
        break;

      case GoodtokWidgetEvents.VIDEO_SESSION_REQUEST:
      case GoodtokWidgetEvents.AUDIO_SESSION_REQUEST: {
        if (customerToken && isOnline) {
          setNotificationType(NotificationType.WAITING_FOR_AGENT);
          setMenuOpen(false);
          setNotificationOpen(true);
          await sendSessionRequest(connectionObject, customerToken, event);
        } else {
          setMenuOpen(false);
          setContactFormOpen(true);
        }

        setSessionType(event);

        break;
      }

      case GoodtokWidgetEvents.AUDIO_MUTE_REQUEST:
        localStream
          .getAudioTracks()
          .forEach((track) => (track.enabled = false));
        break;

      case GoodtokWidgetEvents.AUDIO_UNMUTE_REQUEST:
        localStream.getAudioTracks().forEach((track) => {
          track.enabled = true;
        });
        break;

      case GoodtokWidgetEvents.VIDEO_MUTE_REQUEST:
        toggleVideoHere();
        break;

      case GoodtokWidgetEvents.VIDEO_UNMUTE_REQUEST:
        toggleVideoHere();
        break;

      case GoodtokWidgetEvents.HANGUP_REQUEST:
      case GoodtokWidgetEvents.CLOSE_MENU_EVENT: {
        // Reset widget state
        setMenuOpen(false);
        setVideoOpen(false);
        setNotificationOpen(false);
        setContactFormOpen(false);

        // Release media resources and close peer connection
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
          remoteMediaConnection?.close();
        }

        if (peer) {
          peer.destroy();
        }

        if (connectionObject) {
          await leaveQueue(connectionObject, customerToken);
        }
        break;
      }

      case GoodtokWidgetEvents.OPEN_MENU_EVENT:
        setMenuOpen(true);
        break;

      default:
        // TODO: You can handle other unanticipated events here
        break;
    }

    return async () => {
      // TODO: Make sure to clean up and leave the queue
    };
  };

  useEffect(() => {
    let token = getCustomerToken(document);

    if (!token) {
      token = sessionStorage.getItem("customerToken");
    }

    if (token) {
      const connectionObject = jwtDecode(token) as ConnectionObject;
      setCustomerToken(token);
      setConnectionObject(connectionObject);
      setCalendarUrl(connectionObject.calendarUrl);
      return;
    }
  }, []);

  useEffect(() => {
    const workspaceId = getWorkspaceId(document);
    const server = getAPIServer(document);

    const client = new SDK.Client({
      endpoint: server,
      workspace: workspaceId
    });

    const workspaces = new SDK.Workspaces(client);
    const tokens = new SDK.Tokens(client);

    const subscription = workspaces.watchWorkspaceStatus(
      workspaceId,
      (error, workspaceStatus) => {
        if (error) {
          // If an error occurs is better to show the widget as offline
          setIsOnline(false);
          return;
        }
        setIsOnline(workspaceStatus.isOpen && workspaceStatus.isEnabled);
      }
    );

    // We create a provisional token just to get the calendar url
    // TODO: Consider a better error handling here
    tokens
      .createAnonymousToken({ ref: "placeholder", workspaceId, metadata: {} })
      .then((token) => {
        const connectionObj = jwtDecode(token) as ConnectionObject;
        setCalendarUrl(connectionObj.calendarUrl);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const canInitiateAudio = canInitiateAudioCall();
    const canInitiateVideo = canInitiateVideoCall();

    const videoCallOption = menuDataOptions.find(
      (option) => option.name === GoodtokWidgetEvents.VIDEO_SESSION_REQUEST
    );

    const audioCallOption = menuDataOptions.find(
      (option) => option.name === GoodtokWidgetEvents.AUDIO_SESSION_REQUEST
    );

    const scheduleMeetingOption = menuDataOptions.find(
      (option) => option.name === GoodtokWidgetEvents.SCHEDULE_MEETING_REQUEST
    );

    const availableOptions = [
      ...(canInitiateVideo ? [videoCallOption] : []),
      ...(canInitiateAudio ? [audioCallOption] : []),
      scheduleMeetingOption
    ].filter(Boolean);

    if (!canInitiateVideo && !canInitiateAudio) {
      setNotificationType(NotificationType.DEVICE_UNAVAILABLE_ERROR);
      setNotificationOpen(true);
      return;
    }

    setMenuData(availableOptions);
  }, []);

  return (
    <GoodtokWidget
      online={isOnline}
      onEvent={handleWidgetEvents}
      onVideoRefsReady={handleVideoRefsReady}
      onNotificationClose={() => {
        setNotificationOpen(false);
      }}
      videoOpen={videoOpen}
      initialCameraMutedState={videoMuted}
      menuOpen={menuOpen}
      menuData={menuData}
      contactFormOpen={contactFormOpen}
      notificationOpen={notificationOpen}
      notificationType={notificationType}
    />
  );
};

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

export default GoodtokUA;
