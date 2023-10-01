import { getAudio, getButton } from "wphone";
import { Web } from "sip.js";

const callButton = getButton("goodtok-call");
const muteAudioButton = getButton("goodtok-mute-audio");
const muteVideoButton = getButton("goodtok-mute-video");

let isAnswered = false;
let isOnhold = false;
let isMuted = false;

// Helper function to get an HTML audio element
function getVideoElement(id: string): HTMLVideoElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLVideoElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}

const options: Web.SimpleUserOptions = {
  aor: "sip:goodtok@sip.goodtok.com",
  media: {
    constraints: { audio: true, video: true },
    remote: {
      audio: getAudio("goodtok-audio"),
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

const delegate: Web.SimpleUserDelegate = {
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
}

// Construct a SimpleUser instance
const simpleUser = new Web.SimpleUser(server, options);
simpleUser.delegate = delegate;

callButton.addEventListener("click", async () => {
  if (!isAnswered) {
    await simpleUser.connect();
    await simpleUser.call("sip:anonymous@sip.goodtok.com");
  } else {
    await simpleUser.disconnect();
    await simpleUser.hangup();
  }
});

muteVideoButton.addEventListener("click", () => {
  if (isOnhold) {
    simpleUser.unhold();
  } else {
    simpleUser.hold();
  }
});

muteAudioButton.addEventListener("click", () => {
  if (isMuted) {
    simpleUser.unmute();
  } else {
    simpleUser.mute();
  }
})
