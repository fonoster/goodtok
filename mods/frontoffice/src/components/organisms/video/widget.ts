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
import { Web } from "sip.js";
import { getAudio, getButton, getVideoElement } from "./utils";
import { InviteInfo } from "./types";
import * as Common from "@goodtok/common";
import * as SDK from "@goodtok/sdk";

export async function initVideoWidget(
  client: any,
  inviteInfo: InviteInfo
) {
  const tokens = new SDK.Tokens(client);
  const connectionObject = await tokens.createToken(inviteInfo);
  const callButton = getButton("goodtok-call");
  const muteAudioButton = getButton("goodtok-mute-audio");
  const videoMuteButton = getButton("goodtok-mute-video");

  let isAnswered = false;
  let isMuted = false;

  const options: Web.SimpleUserOptions = {
    aor: connectionObject.aor,
    media: {
      constraints: { audio: true, video: true },
      remote: {
        audio: getAudio("goodtok-audio"),
        video: getVideoElement("goodtok-video")
      }
    }
  };

  const delegate: Web.SimpleUserDelegate = {
    onCallAnswered: () => {
      callButton.textContent = "Hangup";
      isAnswered = true;
    },
    onCallHangup: () => {
      callButton.textContent = "Call";
      isAnswered = false;
    }
  };

  const simpleUser = new Web.SimpleUser(
    connectionObject.signalingServer,
    options
  );

  simpleUser.delegate = delegate;

  callButton.addEventListener("click", async () => {
    if (!isAnswered) {
      await simpleUser.connect();
      await simpleUser.call(connectionObject.aorLink, {
        extraHeaders: [`X-Connect-Token: ${connectionObject.token}`]
      });
    } else {
      await simpleUser.disconnect();
      await simpleUser.hangup();
    }
  });

  muteAudioButton.addEventListener("click", () => {
    if (isMuted) {
      Common.mediaToggle(simpleUser, true, "audio");
      isMuted = false;
      muteAudioButton.textContent = "Mute Audio";
    } else {
      Common.mediaToggle(simpleUser, false, "audio");
      isMuted = true;
      muteAudioButton.textContent = "Unmute Audio";
    }
  });

  videoMuteButton.addEventListener("click", () => {
    if (isMuted) {
      Common.mediaToggle(simpleUser, true, "video");
      isMuted = false;
      videoMuteButton.textContent = "Mute Video";
    } else {
      Common.mediaToggle(simpleUser, false, "video");
      isMuted = true;
      videoMuteButton.textContent = "Unmute Video";
    }
  });
}
