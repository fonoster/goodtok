import { Web } from "sip.js";
import { mediaToggle } from "../client/utils";
import { getAudio, getButton, getConnectionObject, getVideoElement } from "./utils";

const connectionObject = getConnectionObject(document);

const callButton = getButton("goodtok-call");
const muteAudioButton = getButton("goodtok-mute");

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
    callButton.textContent = "Answer";
    isAnswered = false;
  }
}

const simpleUser = new Web.SimpleUser(connectionObject.signalingServer, options);
simpleUser.delegate = delegate;

callButton.addEventListener("click", async () => {
  if (!isAnswered) {
    await simpleUser.connect();
    await simpleUser.call(connectionObject.aorLink, 
      { extraHeaders: [`X-Connect-Token: ${connectionObject.token}`] });
  } else {
    await simpleUser.disconnect();
    await simpleUser.hangup();
  }
});

muteAudioButton.addEventListener("click", () => {
  if (isMuted) {
    mediaToggle(simpleUser, true, "audio")
    isMuted = false;
    muteAudioButton.textContent = "Mute";
  } else {
    mediaToggle(simpleUser, false, "audio")
    isMuted = true;
    muteAudioButton.textContent = "Unmute";
  }
})
