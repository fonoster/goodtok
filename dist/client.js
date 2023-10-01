"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sip_js_1 = require("sip.js");
function getMicrophoneSVG() {
    return `
  <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>`;
}
function getPhoneSVG() {
    return `<svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>`;
}
function getVideoSVG() {
    return `<svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg>`;
}
function getVideoLogoSVG() {
    return `
    <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/>
    </svg>`;
}
class GoodTokComponent extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });
        // Add the HTML content to the shadow root
        shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
          .video {
            width: 400px;
            height: 225px;
            margin: 0;
            bottom: 00px;
            contain: content;
            border-radius: 10px;
          }
          .video #goodtok-video {
            height: auto;
            width: 400px;
            bottom: 40px;
          }
          .wrapper {
            z-index: 1000;
            background-color: rgba(51, 51, 51, 0.5);
            display: none;
            border-radius: 10px;
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 0px;
          }

          .button-container {
            position: absolute;
            width: 100%;
            bottom: 10px; 
            text-align: center;
            display: flex;
            justify-content: center; 
            align-items: center;
          }

          .wrapper button {
            background-color: rgba(51, 51, 51, 0.5);
            border: none;
            color: white !important;
            padding: 10px 12px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            margin: 0 5px; 
            cursor: pointer;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex; 
            align-items: center; 
            justify-content: center; 
          }

          .wrapper #goodtok-answer {
            background-color: rgba(255, 0, 0, .7); /* Make the muteAudioButton red */
          }

          .wrapper button:hover {
            background-color: rgba(85, 85, 85, 0.5);
            color: white;
          }

          #toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000; /* Ensure it's above other elements */
            background-color: #053204; /* Primary-Prime color */
            border-radius: 20%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #053204; /* Primary-Dark color */
            box-shadow: 0 0 10px #CCEFE1; /* Primary-Mid color for a subtle shadow */
          }
          
        //   #toggle-btn {
        //     position: fixed;
        //     bottom: 20px;
        //     right: 20px;
        //     z-index: 1000; /* Ensure it's above other elements */
        //     background-color: #053204; /* Primary-Dark color */
        //     border-radius: 0; /* Make it square */
        //     width: 60px;
        //     height: 60px;
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     border: none;
        //     box-shadow: 0 0 10px #0D3231; /* Secondary-Dark color for a subtle shadow */
        // }
        
        .wrapper.shown #toggle-btn {
            display: none; /* Hide the logo when the component is shown */
        }

        </style>
        <div class="wrapper">
          <div class="video">
            <video id="goodtok-video">
              <p>Your browser doesn't support HTML5 video.</p>
            </video>
            <div class="button-container">
              <button id="goodtok-mute-audio"></button>
              <button id="goodtok-answer"></button>
              <button id="goodtok-camera"></button>
            </div>
          </div>
          <audio style="display: none" id="goodtok-audio" controls>
            <p>Your browser doesn't support HTML5 audio.</p>
          </audio>
          <script src="/lib/client.js?ref=1"></script>
        </div>

        <button id="toggle-btn">Toggle</button>
      `;
        // Initialize the GoodTok logic
        this.initGoodTok();
    }
    initGoodTok() {
        const answerButton = this.shadowRoot.querySelector("#goodtok-answer");
        const muteAudioButton = this.shadowRoot.querySelector("#goodtok-mute-audio");
        const muteVideoButton = this.shadowRoot.querySelector("#goodtok-camera");
        const audioElement = this.shadowRoot.querySelector("#goodtok-audio");
        const videoElement = this.shadowRoot.querySelector("#goodtok-video");
        const toggleButton = this.shadowRoot.querySelector("#toggle-btn");
        const goodTokWrapper = this.shadowRoot.querySelector(".wrapper");
        toggleButton.innerHTML = getVideoLogoSVG();
        toggleButton.addEventListener("click", () => {
            const wrapper = goodTokWrapper;
            const toggleBtn = toggleButton;
            if (wrapper.style.display === "none") {
                wrapper.style.display = "block";
                toggleBtn.style.display = "none"; // Hide the logo when the component is shown
            }
            else {
                wrapper.style.display = "none";
                toggleBtn.style.display = "block"; // Show the logo when the component is hidden
            }
        });
        muteAudioButton.innerHTML = getMicrophoneSVG();
        answerButton.innerHTML = getPhoneSVG();
        muteVideoButton.innerHTML = getVideoSVG();
        let isAnswered = false;
        let isMuted = false;
        // Helper function to get an HTML audio element
        function getVideoElement(id) {
            const el = document.getElementById(id);
            if (!(el instanceof HTMLVideoElement)) {
                throw new Error(`Element "${id}" not found or not an audio element.`);
            }
            return el;
        }
        const options = {
            aor: "sip:anonymous@sip.goodtok.com",
            media: {
                constraints: { audio: true, video: true },
                remote: {
                    audio: audioElement,
                    video: videoElement
                }
            },
            userAgentOptions: {
                authorizationUsername: "anonymous",
                authorizationPassword: "1234"
            }
        };
        const server = "ws://192.168.1.2:5062";
        const delegate = {
            onCallAnswered: () => {
                isAnswered = true;
            },
            onCallHangup: () => {
                isAnswered = false;
                const toggleBtn = toggleButton;
                const wrapper = goodTokWrapper;
                wrapper.style.display = "none";
                toggleBtn.style.display = "block"; // Show the logo when the component is hidden
            },
        };
        const simpleUser = new sip_js_1.Web.SimpleUser(server, options);
        simpleUser.delegate = delegate;
        answerButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            if (isAnswered) {
                const toggleBtn = toggleButton;
                const wrapper = goodTokWrapper;
                wrapper.style.display = "none";
                toggleBtn.style.display = "block"; // Show the logo when the component is hidden
                yield simpleUser.hangup();
            }
            else {
                yield simpleUser.answer();
            }
        }));
        muteAudioButton.addEventListener("click", () => {
            if (isMuted) {
                simpleUser.unmute();
            }
            else {
                simpleUser.mute();
            }
        });
        simpleUser.connect()
            .then(() => {
            simpleUser.register();
        })
            .catch((error) => {
            console.error("Failed to connect to server");
        });
    }
}
customElements.define('goodtok-component', GoodTokComponent);
const goodtokComponentInstance = new GoodTokComponent();
document.body.appendChild(goodtokComponentInstance);
//# sourceMappingURL=client.js.map