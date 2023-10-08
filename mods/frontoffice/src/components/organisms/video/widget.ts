/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of GoodTok
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
import { mediaToggle } from "../../../../../common/src/utils";
import {
  getAudio,
  getButton,
  getConnectionObject,
  getVideoElement
} from "./utils";

export function initVideoWidget(document: Document): void {
  // const connectionObject = getConnectionObject(document);
  const connectionObject = {
    aor: "sip:goodtok@sip.goodtok.io",
    aorLink: "sip:anonymous@sip.goodtok.io",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiJjdXN0b21lci1hZ2VudCIsImRvbWFpblJlZiI6Imdvb2R0b2stMDEiLCJhb3IiOiJzaXA6ZnJvbnQtb2ZmaWNlLWFnZW50QHNpcC5nb29kdG9rLmlvIiwiYW9yTGluayI6InNpcDphbm9ueW1vdXNAc2lwLmdvb2R0b2suaW8iLCJkb21haW4iOiJzaXAuZ29vZHRvay5pbyIsInByaXZhY3kiOiJOT05FIiwiYWxsb3dlZE1ldGhvZHMiOlsiSU5WSVRFIl0sInNpZ25hbGluZ1NlcnZlciI6IndzOi8vc2lwLmdvb2R0b2suaW86NTA2MiIsImlhdCI6MTY5NjcyMzQ4MCwiZXhwIjoxNjk2ODA5ODgwfQ.YhNzq_5gHp5t9MsEcmQmTHNLHlYyjELfwAbiGiHU-dYkter2_A7Yq8wuwPigcwQzIx3NPWGGx8HN6Nf14QEkxJgmHhwyJRy4-UbZpl-q-fV0rGZKU7GMTDsl0uVNj_-ny_vpt0C912k1SgxXAPZ9leZa1G-OMSj-KXMAIgZzyCwz73zrgZKuxP1dy-y-Sn_Vm5rDPJ7grFgiVcsngI2sm3RQPuNaLdTD9rPT6BSWWlDeihanHSKA0xhzcZXkMA0nTstl6ro_6aCyhs2JoDWLo65X6FL9tOabvMRfqgr-WwS4dUf1wFDq5-e7dMPKIQXRvv084axZ-8W4h4dTleI0lOjDOOMiyjhrQ1jLHDrcdCXdDWvsKQh7Uihr6r3brzMd_2QapqmCX_H40x5Jy-gNiwmYII6HLqtwiUOfi_75qb0sagauG0FUKIkZnLQY0xDByltB45mw-Z1foncyKDzxi8i80GA6E0S4crFy3a63zCJq02UJCTSNrOnHp6uuX0qdbpXvGBbjCxB5RCcv_QfOyzBmuYYRG_vXVExOwua0giV9V1qyKbSmBeNfefol5LWglfYAE0pJ6i_2Flaip3Lkd3fs2kp4o2arcSCdgsc-ucklSmgKSybz8dzsLqNm2viQLB6TyhyudRVbVzfNh__HKyCRfScvEpTVDQWAh20EBw0",
    signalingServer: "ws://sip.goodtok.io:5062"
  };

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
      mediaToggle(simpleUser, true, "audio");
      isMuted = false;
      muteAudioButton.textContent = "Mute Audio";
    } else {
      mediaToggle(simpleUser, false, "audio");
      isMuted = true;
      muteAudioButton.textContent = "Unmute Audio";
    }
  });

  videoMuteButton.addEventListener("click", () => {
    if (isMuted) {
      mediaToggle(simpleUser, true, "video");
      isMuted = false;
      videoMuteButton.textContent = "Mute Video";
    } else {
      mediaToggle(simpleUser, false, "video");
      isMuted = true;
      videoMuteButton.textContent = "Unmute Video";
    }
  });
}
