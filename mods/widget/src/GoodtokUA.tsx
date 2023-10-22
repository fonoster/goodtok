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
import { GoodtokWidget } from "./components/goodtokwidget/GoodtokWidget";
import { GoodtokWidgetEvents } from "./components/goodtokwidget/types";
import React, { useState } from "react";
import { Web } from "sip.js";

const GoodtokUA = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  let simpleUser: Web.SimpleUser;

  // Placeholder methods for widget event handling
  const handleWidgetEvents = (event: GoodtokWidgetEvents) => {
    if (event === GoodtokWidgetEvents.VIDEO_SESSION_REQUEST) {
      if (simpleUser) {
        simpleUser
          .connect()
          .then(() => {
            simpleUser.register({
              requestOptions: {
                extraHeaders: [
                  "X-Connect-Token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiJmcm9udC1vZmZpY2UtYWdlbnQiLCJkb21haW5SZWYiOiJkZWZhdWx0IiwiYW9yIjoic2lwOmFub255bW91c0BzaXAuZ29vZHRvay5pbyIsImFvckxpbmsiOiJzaXA6YW5vbnltb3VzQHNpcC5nb29kdG9rLmlvIiwiZG9tYWluIjoic2lwLmdvb2R0b2suaW8iLCJwcml2YWN5IjoiTk9ORSIsImFsbG93ZWRNZXRob2RzIjpbIlJFR0lTVEVSIl0sInNpZ25hbGluZ1NlcnZlciI6IndzOi8vc2lwLmdvb2R0b2suaW86NTA2MiIsImlhdCI6MTY5Nzk5ODI0MywiZXhwIjoxNjk4MDg0NjQzfQ.bRZL_pRRnxZpu-Wvq8Pvd_WG882Jg4cL5D5D30DC0-_I0V2s4kbhlE67DGOEWnj36OZeQ56Ui4r_TNu7kVgvUc_Q2yDn-cXGg9Kiwn1GSEny88BYmCTVL8L7y8hEfafObw1NYMMxOXTI-dYvLLbicvcaUxQAfndiUD5AvB1K1eqt1GA1RsP7sa4KQ3RMVzVm2_8OOshtmg5q2zWYa36G-CFXofS5hjzKuvLmVIeiUtlaA0ZR0a4PXAcFmimFscHerVEr3NKDpbawA0gOvjv9-iuYdJMlqZDOilENNBIhzmDhob97j_jnXMuMS2QW7P-EAl1GBf_sC6MjTOsY8r4iMx1Auoq7PmCs4puQH-DyJhGPtkR9gNm1uKC6hsWot4acAkRUptenktGr66Gotw4T_vss0a_VbkNC1xV_HqvzCGRpsNmARPWzZmaZNBAfIaOoBfQAcM3wGDQC9QdYQE7160ImQPRCLybm1eWb9ZBEjmNUY-uj3x1OPI1bjfA_EY_YvD3TApvhk0rL1SdXcsBRYSvGXVDsw7c26FRVa5Fzwm88oTY3GMuMWdepLGIeh0uspXcfLWxrea6tB7iqKoR7eB3OdLEaNG6QzVyT2HI0DGLPZxJo50xMqVtGHt_nABJTmVSk6sLHol2m70lLqHL90QHBIesIkeUTaop3VDjHAZk",
                  "Expires: 60",
                  "X-Customer-Id: 1",
                  "X-Workspace-Id: default"
                ]
              }
            });
          })
          .catch((e) => {
            console.error("Failed to connect to server");
          });
      } else {
        // TODO: Error handling
      }
    }
  };

  const handleVideoRefsReady = (videoRefs: any) => {
    const audioElement = document.createElement("audio");
    const staffVideo = videoRefs.staffVideo;
    const customerVideo = videoRefs.customerVideo;

    // document.appendChild(audioElement);

    const options = {
      // Fixme: This should be a random number and store in local storage
      aor: "sip:anonymous@api.goodtok.io",
      media: {
        constraints: { audio: true, video: true },
        remote: {
          audio: audioElement,
          video: staffVideo
        },
        local: {
          video: customerVideo
        }
      }
    };

    // Fixme
    simpleUser = new Web.SimpleUser("ws://192.168.1.7:5062", options);

    const delegate = {
      onCallReceived: () => {
        simpleUser.answer();
        setVideoOpen(true);
        setMenuOpen(false);
        setNotificationOpen(false);
      }
    };

    simpleUser.delegate = delegate;
  };

  return (
    <GoodtokWidget
      online={true}
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