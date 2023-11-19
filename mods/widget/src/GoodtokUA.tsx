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
import { getAPIServer, getCustomerToken, getWorkspaceId } from "./utils";
import { Web } from "sip.js";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";

const GoodtokUA = () => {
  const videoRefs = useRef(null);
  const [calendarUrl, setCalendarUrl] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [customerToken, setCustomerToken] = useState(null);
  const [simpleUser, setSimpleUser] = useState<Web.SimpleUser | null>(null);
  const [connectionObj, setConnectionObj] = useState<ConnectionObject | null>(
    null
  );

  const handleVideoRefsReady = (refs: unknown) => {
    videoRefs.current = refs;
  };

  const handleWidgetEvents = async (event: GoodtokWidgetEvents) => {
    if (event === GoodtokWidgetEvents.SCHEDULE_MEETING_REQUEST) {
      window.open(calendarUrl, "_blank");
      return;
    }

    if (!simpleUser) {
      console.error(
        "unable to process event: simpleUser is not initialized yet."
      );
      setHasError(true);
      setNotificationOpen(true);
      return;
    }

    switch (event) {
      case GoodtokWidgetEvents.VIDEO_SESSION_REQUEST:
        simpleUser
          .connect()
          .then(() => {
            simpleUser.register({
              requestOptions: {
                extraHeaders: [
                  `X-Connect-Token: ${customerToken}`,
                  `X-Customer-Id: ${connectionObj.customerId}`,
                  `X-Workspace-Id: ${connectionObj.workspaceId}`,
                  "Expires: 60"
                ]
              }
            });

            setNotificationOpen(true);
          })
          .catch((e) => {
            console.error("failed to connect to server");
            setHasError(true);
            setNotificationOpen(true);
          });
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
      case GoodtokWidgetEvents.CLOSE:
        if (simpleUser.isConnected()) {
          await simpleUser.unregister();
          await simpleUser.disconnect();
          await simpleUser.hangup();
        }
        setVideoOpen(false);
        break;

      default:
        // TODO: You can handle other unanticipated events here
        break;
    }
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
    if (connectionObj) {
      const customerVideo = videoRefs.current.customerVideo;
      const staffAudio = videoRefs.current.staffAudio;
      const staffVideo = videoRefs.current.staffVideo;
      const options = {
        aor: connectionObj.aor,
        media: {
          constraints: { audio: true, video: true },
          remote: {
            audio: staffAudio, // You might need to ensure that these refs are available at this point
            video: staffVideo
          },
          local: {
            video: customerVideo
          }
        }
      };
      const user = new Web.SimpleUser(connectionObj.signalingServer, options);

      const delegate = {
        onCallReceived: () => {
          user.answer();
          setVideoOpen(true);
          setMenuOpen(false);
          setNotificationOpen(false);
        }
      };
      user.delegate = delegate;
      setSimpleUser(user);
    }
  }, [videoRefs, connectionObj]);

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
          setHasError(true);
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

  return (
    <GoodtokWidget
      online={isOnline}
      onEvent={handleWidgetEvents}
      onVideoRefsReady={handleVideoRefsReady}
      onNotificationClose={() => {
        setNotificationOpen(false);
        setHasError(false);
      }}
      videoOpen={videoOpen}
      menuOpen={menuOpen}
      notificationOpen={notificationOpen}
      hasError={hasError}
    />
  );
};

export default GoodtokUA;
