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
const callButton = (0, wphone_1.getButton)("goodtok-call");
const muteAudioButton = (0, wphone_1.getButton)("goodtok-mute-audio");
const muteVideoButton = (0, wphone_1.getButton)("goodtok-mute-video");
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
const options = {
    aor: "sip:goodtok@sip.goodtok.com",
    media: {
        constraints: { audio: true, video: true },
        remote: {
            audio: (0, wphone_1.getAudio)("goodtok-audio"),
            video: getVideoElement("goodtok-video")
        }
    },
    userAgentOptions: {
        authorizationUsername: "goodtok",
        authorizationPassword: "1234"
    }
};
// WebSocket server to connect with
const server = "ws://192.168.1.2:5062";
const delegate = {
    onCallAnswered: () => {
        callButton.textContent = "Hangup";
        isAnswered = true;
    },
    onCallHangup: () => {
        callButton.textContent = "Answer";
        isAnswered = false;
    },
    onCallHold: (held) => {
        muteAudioButton.textContent = "Unmute";
        isOnhold = held;
    },
};
// Construct a SimpleUser instance
const simpleUser = new sip_js_1.Web.SimpleUser(server, options);
simpleUser.delegate = delegate;
callButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (!isAnswered) {
        yield simpleUser.connect();
        yield simpleUser.call("sip:anonymous@sip.goodtok.com");
    }
    else {
        yield simpleUser.disconnect();
        yield simpleUser.hangup();
    }
}));
muteVideoButton.addEventListener("click", () => {
    if (isOnhold) {
        simpleUser.unhold();
    }
    else {
        simpleUser.hold();
    }
});
muteAudioButton.addEventListener("click", () => {
    if (isMuted) {
        simpleUser.unmute();
    }
    else {
        simpleUser.mute();
    }
});
//# sourceMappingURL=frontoffice.js.map