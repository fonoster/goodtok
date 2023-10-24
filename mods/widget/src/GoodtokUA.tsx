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
import { toggleTrack } from "@goodtok/common/src/utils";
import { Web } from "sip.js";
import { getAPIServer, getCustomerToken, getWorkspaceId } from "./utils";
import React, { useEffect, useRef, useState } from "react";
import jwtDecode from "jwt-decode";

const GoodtokUA = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [customerToken, setCustomerToken] = useState(null);
  const [simpleUser, setSimpleUser] = useState<Web.SimpleUser | null>(null);
  const [connectionObj, setConnectionObj] = useState<ConnectionObject | null>(
    null
  );
  const videoRefsRef = useRef<any>(null);

  const handleVideoRefsReady = (videoRefs: unknown) => {
    videoRefsRef.current = videoRefs;
  };

  const handleWidgetEvents = async (event: GoodtokWidgetEvents) => {
    if (!simpleUser) {
      console.error(
        "Unable to process VIDEO_SESSION_REQUEST: simpleUser is not initialized yet."
      );
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
          })
          .catch((e) => {
            console.error("Failed to connect to server");
          });
        break;

      case GoodtokWidgetEvents.AUDIO_MUTE_REQUEST:
        {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          });
          toggleTrack(mediaStream, "audio", false);
          toggleTrack(mediaStream, "video", false);
        }
        break;

      case GoodtokWidgetEvents.AUDIO_UNMUTE_REQUEST:
        {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          });
          toggleTrack(mediaStream, "audio", true);
          toggleTrack(mediaStream, "video", true);
        }
        break;

      case GoodtokWidgetEvents.VIDEO_MUTE_REQUEST:
        console.log("video mute request");
        mediaToggle(simpleUser, false, "video");
        break;

      case GoodtokWidgetEvents.VIDEO_UNMUTE_REQUEST:
        console.log("video unmute request");
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
    if (!customerToken) {
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
          setCustomerToken(token);
          setConnectionObj(jwtDecode(token) as ConnectionObject);
        });
    }
  }, [customerToken]);

  useEffect(() => {
    if (connectionObj) {
      const customerVideo = videoRefsRef.current.customerVideo;
      const staffAudio = videoRefsRef.current.staffAudio;
      const staffVideo = videoRefsRef.current.staffVideo;
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
  }, [videoRefsRef, connectionObj]);

  return (
    <GoodtokWidget
      online={false}
      onEvent={handleWidgetEvents}
      onVideoRefsReady={handleVideoRefsReady}
      onNotificationClose={() => setNotificationOpen(false)}
      videoOpen={videoOpen}
      menuOpen={menuOpen}
      notificationOpen={notificationOpen}
    />
  );
};

export default GoodtokUA;
