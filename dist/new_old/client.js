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
const wphone_1 = require("wphone");
const sip_js_1 = require("sip.js");
// const registerButton = getButton("goodtok-register");
const answerButton = (0, wphone_1.getButton)("goodtok-answer");
const muteAudioButton = (0, wphone_1.getButton)("goodtok-mute-audio");
// const muteVideoButton = getButton("goodtok-mute-video");
let isRegistered = false;
let isAnswered = false;
let isOnhold = false;
let isMuted = false;
// Helper function to get an HTML audio element
function getVideoElement(id) {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLVideoElement)) {
        throw new Error(`Element "${id}" not found or not an audio element.`);
    }
    return el;
}
// Get the PiP button
const pipButton = document.getElementById("goodtok-pip");
// Get the video element
const videoElement = getVideoElement("goodtok-video");
// Add an event listener to the PiP button
pipButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (document.pictureInPictureElement) {
        // If PiP is already active, exit PiP mode
        yield document.exitPictureInPicture();
    }
    else {
        // Request PiP mode for the video
        try {
            yield videoElement.requestPictureInPicture();
        }
        catch (error) {
            console.error("Failed to enter Picture-in-Picture mode:", error);
        }
    }
}));
const options = {
    aor: "sip:anonymous@sip.goodtok.com",
    media: {
        constraints: { audio: true, video: true },
        remote: {
            audio: (0, wphone_1.getAudio)("goodtok-audio"),
            video: videoElement
        }
    },
    userAgentOptions: {
        authorizationUsername: "anonymous",
        authorizationPassword: "1234"
    }
};
// WebSocket server to connect with
const server = "ws://192.168.1.2:5062";
const delegate = {
    onCallAnswered: () => {
        isAnswered = true;
    },
    onCallHangup: () => {
        isAnswered = false;
    },
    onRegistered: () => {
        isRegistered = true;
    },
    onUnregistered: () => {
        isRegistered = false;
    },
    onCallHold: (held) => {
        isOnhold = held;
    },
};
// Construct a SimpleUser instance
const simpleUser = new sip_js_1.Web.SimpleUser(server, options);
simpleUser.delegate = delegate;
answerButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (isAnswered) {
        yield simpleUser.hangup();
    }
    else {
        yield simpleUser.answer();
    }
}));
// registerButton.addEventListener("click", async () => {
//   if (isRegistered) {
//     await simpleUser.unregister();
//     simpleUser.disconnect();
//   } {
//     simpleUser.connect()
//       .then(() => {
//         simpleUser.register();
//       })
//       .catch((error: Error) => {
//         console.error("Failed to connect to server");
//       });
//   }
// });
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
//# sourceMappingURL=client.js.map