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
import { ConnectionObject, mediaToggle } from "@goodtok/common";
import { getAPIServer, getCustomerToken, getWorkspaceId } from "./utils/utils";
import { RegistererRegisterOptions, Web } from "sip.js";
import { jwtDecode } from "jwt-decode";
import { menuData as menuDataOptions } from "./components/goodtokwidget/data";
import { Item } from "./components/menu/Menu";
import { NotificationType } from "./components/notification/Notification";
import {
  canInitiateAudioCall,
  canInitiateVideoCall
} from "./utils/capabilities";
import React, { useEffect, useRef, useState } from "react";

const GoodtokUA = () => {
  const videoRefs = useRef(null);
  const [calendarUrl, setCalendarUrl] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<NotificationType>();
  const [customerToken, setCustomerToken] = useState(null);
  const [simpleUser, setSimpleUser] = useState<Web.SimpleUser | null>(null);
  const [menuData, setMenuData] = useState<Item[]>([]);
  const [connectionObj, setConnectionObj] = useState<ConnectionObject | null>(
    null
  );

  const handleVideoRefsReady = (refs: unknown) => {
    videoRefs.current = refs;
  };

  const initSimpleUser = async (includeVideo: boolean) => {
    if (connectionObj) {
      const localVideo = videoRefs.current.localVideo;
      const remoteAudio = videoRefs.current.remoteAudio;
      const remoteVideo = videoRefs.current.remoteVideo;
      const options = {
        aor: connectionObj.aor,
        media: {
          constraints: { audio: true, video: includeVideo },
          remote: {
            audio: remoteAudio,
            video: remoteVideo
          },
          local: {
            video: localVideo
          }
        }
      };
      const user = new Web.SimpleUser(connectionObj.signalingServer, options);

      const unregisterOptions = {
        requestOptions: {
          extraHeaders: [
            `X-Connect-Token: ${customerToken}`,
            `X-Customer-Id: ${connectionObj.customerId}`,
            `X-Workspace-Id: ${connectionObj.workspaceId}`
          ]
        }
      };

      const delegate: Web.SimpleUserDelegate = {
        onCallHangup: () => {
          setVideoOpen(false);
          setMenuOpen(false);
          setNotificationOpen(false);
          user.unregister(unregisterOptions);
        },
        onCallReceived: () => {
          user
            .answer()
            .then(() => {
              setNotificationOpen(false);
              setMenuOpen(false);
              setVideoOpen(true);
            })
            .catch((e) => {
              if (
                e instanceof DOMException &&
                e.message?.toLocaleLowerCase() === "permission denied"
              ) {
                setNotificationType(NotificationType.PERMISSIONS_ERROR);
                setNotificationOpen(true);
                return;
              } else if (
                e instanceof DOMException &&
                e.message?.toLocaleLowerCase() === "requested device not found"
              ) {
                setNotificationType(NotificationType.DEVICE_UNAVAILABLE_ERROR);
                setNotificationOpen(true);
                return;
              }

              setNotificationType(NotificationType.UNKNOWN_ERROR);
              setNotificationOpen(true);
            });
        }
      };
      user.delegate = delegate;
      return user;
    }
  };

  const register = async (
    simpleUser: Web.SimpleUser,
    registererRegisterOptions: RegistererRegisterOptions
  ) => {
    try {
      await simpleUser.connect();
      simpleUser.register(registererRegisterOptions);
      setNotificationType(NotificationType.WAITING_FOR_AGENT);
      setNotificationOpen(true);
    } catch (e) {
      console.error("failed to connect to server");
      setNotificationType(NotificationType.UNKNOWN_ERROR);
      setNotificationOpen(true);
    }
  };

  const sendSessionRequest = async (
    event: GoodtokWidgetEvents,
    registerOptions: RegistererRegisterOptions
  ) => {
    try {
      const simpleUser = await initSimpleUser(
        event === GoodtokWidgetEvents.VIDEO_SESSION_REQUEST
      );
      setVideoMuted(event === GoodtokWidgetEvents.AUDIO_SESSION_REQUEST);
      register(simpleUser, registerOptions);
      setSimpleUser(simpleUser);
    } catch (e) {
      console.error("failed to initialize simple user", e);
      setNotificationType(NotificationType.UNKNOWN_ERROR);
      setNotificationOpen(true);
    }
  };

  const handleWidgetEvents = async (event: GoodtokWidgetEvents) => {
    if (event === GoodtokWidgetEvents.SCHEDULE_MEETING_REQUEST) {
      window.open(calendarUrl, "_blank");
      return;
    }

    const registerOptions = {
      requestOptions: {
        extraHeaders: [
          `X-Connect-Token: ${customerToken}`,
          `X-Customer-Id: ${connectionObj.customerId}`,
          `X-Workspace-Id: ${connectionObj.workspaceId}`
        ]
      }
    };

    switch (event) {
      case GoodtokWidgetEvents.VIDEO_SESSION_REQUEST:
        sendSessionRequest(event, registerOptions);
        break;

      case GoodtokWidgetEvents.AUDIO_SESSION_REQUEST:
        sendSessionRequest(event, registerOptions);
        break;

      case GoodtokWidgetEvents.AUDIO_MUTE_REQUEST:
        mediaToggle(simpleUser, false, "audio");
        break;

      case GoodtokWidgetEvents.AUDIO_UNMUTE_REQUEST:
        mediaToggle(simpleUser, true, "audio");
        break;

      case GoodtokWidgetEvents.VIDEO_MUTE_REQUEST:
        mediaToggle(simpleUser, false, "video");
        break;

      case GoodtokWidgetEvents.VIDEO_UNMUTE_REQUEST:
        mediaToggle(simpleUser, true, "video");
        break;

      case GoodtokWidgetEvents.HANGUP_REQUEST:
      case GoodtokWidgetEvents.CLOSE_MENU_EVENT:
        setVideoOpen(false);
        if (simpleUser.isConnected()) {
          await simpleUser.unregister(unregisterOptions);
          await simpleUser.disconnect();
          try {
            await simpleUser.hangup();
          } catch (e) {
            // Best effort
          }
        }
        break;

      case GoodtokWidgetEvents.OPEN_MENU_EVENT:
        // noop
        break;

      default:
        // TODO: You can handle other unanticipated events here
        break;
    }

    return async () => {
      const unregisterOptions = {
        requestOptions: {
          extraHeaders: [
            `X-Connect-Token: ${customerToken}`,
            `X-Customer-Id: ${connectionObj.customerId}`,
            `X-Workspace-Id: ${connectionObj.workspaceId}`
          ]
        }
      };
      await simpleUser.unregister(unregisterOptions);
      await simpleUser.disconnect();
      try {
        await simpleUser.hangup();
      } catch (e) {
        // Best effort
      }
    };
  };

  useEffect(() => {
    const token = getCustomerToken(document);
    setCustomerToken(token);
  }, []);

  useEffect(() => {
    const token = getCustomerToken(document);

    if (token) {
      const connectionObj = jwtDecode(token) as ConnectionObject;
      setCustomerToken(token);
      setConnectionObj(connectionObj);
      setCalendarUrl(connectionObj.calendarUrl);
      return;
    }

    const workspaceId = getWorkspaceId(document);
    const server = getAPIServer(document);
    let customerRef = localStorage.getItem("customerRef");

    if (!customerRef) {
      customerRef = Math.random().toString(36).substring(7);
      localStorage.setItem("customerRef", customerRef);
    }

    const client = new SDK.Client({
      endpoint: server,
      workspace: workspaceId
    });

    const tokens = new SDK.Tokens(client);

    tokens
      .createAnonymousToken({
        ref: customerRef,
        workspaceId
      })
      .then((token) => {
        const connectionObj = jwtDecode(token) as ConnectionObject;
        setCustomerToken(token);
        setConnectionObj(connectionObj);
        setCalendarUrl(connectionObj.calendarUrl);
      });
  }, [customerToken]);

  useEffect(() => {
    const workspaceId = getWorkspaceId(document);
    const server = getAPIServer(document);

    const client = new SDK.Client({
      endpoint: server,
      workspace: workspaceId
    });

    const workspaces = new SDK.Workspaces(client);

    const subscription = workspaces.watchWorkspaceStatus(
      workspaceId,
      (error, workspaceStatus) => {
        if (error) {
          console.error("failed to watch workspace status", error);
          setNotificationType(NotificationType.UNKNOWN_ERROR);
          setNotificationOpen(true);
          return;
        }
        setIsOnline(workspaceStatus.isOpen && workspaceStatus.isEnabled);
      }
    );

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
      notificationOpen={notificationOpen}
      notificationType={notificationType}
    />
  );
};

export default GoodtokUA;
