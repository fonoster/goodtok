/* eslint-disable no-undef */
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
import "./index.css";
import { GoodtokButton } from "./components/gootokbutton/GoodtokButton";
import { createRoot } from "react-dom/client";
import { Web } from "sip.js";
import React from "react";

class VideoChatWidget extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Add audio and video elements
    const audioElement = document.createElement("audio");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.playsinline = true;
    videoElement.muted = true;
    videoElement.id = "goodtok-video";
    videoElement.style = "background-color: #000;";

    shadowRoot.appendChild(audioElement);
    shadowRoot.appendChild(videoElement);

    const goodtokContainer = document.createElement("div");
    goodtokContainer.className = "goodtok-container";
    const root = createRoot(goodtokContainer);

    root.render(<GoodtokButton online />);

    shadowRoot.appendChild(goodtokContainer);

    // TEST SIP.JS
    const options = {
      aor: "sip:anonymous@api.goodtok.io",
      media: {
        constraints: { audio: true, video: true },
        remote: {
          audio: audioElement,
          video: videoElement
        }
      }
    };

    const simpleUser = new Web.SimpleUser("ws://192.168.1.7:5062", options);

    const delegate = {
      onCallReceived: () => {
        simpleUser.answer();
      }
    };

    simpleUser.delegate = delegate;

    simpleUser
      .connect()
      .then(() => {
        simpleUser.register({
          requestOptions: {
            extraHeaders: [
              "X-Connect-Token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiJmcm9udC1vZmZpY2UtYWdlbnQiLCJkb21haW5SZWYiOiJkZWZhdWx0IiwiYW9yIjoic2lwOmFub255bW91c0BzaXAuZ29vZHRvay5pbyIsImFvckxpbmsiOiJzaXA6YW5vbnltb3VzQHNpcC5nb29kdG9rLmlvIiwiZG9tYWluIjoic2lwLmdvb2R0b2suaW8iLCJwcml2YWN5IjoiTk9ORSIsImFsbG93ZWRNZXRob2RzIjpbIlJFR0lTVEVSIl0sInNpZ25hbGluZ1NlcnZlciI6IndzOi8vc2lwLmdvb2R0b2suaW86NTA2MiIsImlhdCI6MTY5NzgwNzg3NiwiZXhwIjoxNjk3ODk0Mjc2fQ.HJNjls048M4R-b_qbiC-cAWiJR7YlTHX5S-YOU3LduiUSBlpcBEIJuuFkeB5Qfg13rM9qPdFPz9t-LA40yuskeqJEyQHWYgFj_bZMKpeU88X4_LHyeZcONy7YMLDYjIM21OwNL-oIKGvmP4RCP6fMEetb7xBkMh8d8ScivufQrV5b-u0ZdS88OZUl4hTopdGQjgheAskt9T3wQdpl1ZNImcekl4IX_ovBFgIWy_-CQHCSxYAEfnZGgB83cs3iU34O7QAQCunGc2rclngUCqzNRhwRLBEqvw8v2mWTcyeA0pX9sta2U4CAJs30r92oZCj2SXLZO9_1rog_vBWhsWuztn6t1CvPfsGCY4Hwh3kX1JRtBhSUUMkQGm7j27yyrhrur103gnQMJ-9d3bUPqu6rhmxAvpxXUC5QQ9GPPLOwqo9ML8a5krmMHGtzHyPKTTzOmSPgCXi-TOhoKkE3VfHuVZsHyW5iJCmhn9TUGK01FmhEvmjXUdP_fJSR8cFqKiL-JeNJnbDAQRLjzWpatQknF_X9rvDf2-qW0cdvbtjoJ6xQFwUX5_QaTF7Iydbc4U23Biurxt5vv56G29ca3A-cqjfWkdaLbnhwfIGs6dSMnx1CS6kmpyvCAS0lx23ADWYMjO124M9aj5hqs23cf28GPgZX6FSZjjnFJwCx9h4evo",
              "Expires: 60",
              "X-Customer-Id: 1",
              "X-Workspace-Id: default"
            ]
          }
        });
      })
      .catch((e) => {
        console.error(e);
        console.error("Failed to connect to server");
      });
  }
}

export default VideoChatWidget;

window.customElements.define("goodtok-component", VideoChatWidget);
document.body.appendChild(new VideoChatWidget());
