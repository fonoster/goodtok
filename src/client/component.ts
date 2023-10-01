import { Web } from "sip.js";
import { getVideoLogoSVG, getVideoSVG, getPhoneSVG, getVideoSlashSVG, getMicrophoneSVG, getMicrophoneSlashSVG } from "./icons";
import { shadowRootContent } from "./shadowRootContent";
import { mediaToggle } from "./utils";

const server = "ws://192.168.1.2:5062";

class GoodTokComponent extends HTMLElement {
  
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = shadowRootContent
    this.initGoodTok();
  }

  initGoodTok() {
    // Control elements
    const phoneButton = this.shadowRoot.querySelector("#goodtok-phone");
    const microphoneButton = this.shadowRoot.querySelector("#goodtok-microphone");
    const cameraButton = this.shadowRoot.querySelector("#goodtok-camera");
    microphoneButton.innerHTML = getMicrophoneSVG();
    cameraButton.innerHTML = getVideoSVG();
    phoneButton.innerHTML = getPhoneSVG();

    // Media elements
    const audioElement = this.shadowRoot.querySelector("#goodtok-audio") as HTMLAudioElement;
    const videoElement = this.shadowRoot.querySelector("#goodtok-video") as HTMLVideoElement;

    // Toggle button
    const toggleButton = this.shadowRoot.querySelector("#toggle-btn");
    const goodTokWrapper = this.shadowRoot.querySelector(".wrapper");
    toggleButton.innerHTML = getVideoLogoSVG();

    // State variables
    let microphoneEnabled = true;
    let cameraEnabled = true;

    toggleButton.addEventListener("click", () => {
      const wrapper = goodTokWrapper as HTMLElement | HTMLDivElement;
      const toggleBtn = toggleButton as HTMLButtonElement;
      if (wrapper.style.display === "none") {
        wrapper.style.display = "block";
        toggleBtn.style.display = "none";
      } else {
        wrapper.style.display = "none";
        toggleBtn.style.display = "block";
      }
    });

    const options: Web.SimpleUserOptions = {
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
 
    const simpleUser = new Web.SimpleUser(server, options);
    
    const delegate: Web.SimpleUserDelegate = {
      onCallReceived: () => {
        simpleUser.answer();
      },
      onCallAnswered: () => {
        const wrapper = goodTokWrapper as HTMLElement | HTMLDivElement;
        const toggleBtn = toggleButton as HTMLButtonElement;
        wrapper.style.display = "block";
        toggleBtn.style.display = "none";
      },
      onCallHangup: () => {
        const toggleBtn = toggleButton as HTMLButtonElement;
        const wrapper = goodTokWrapper as HTMLElement | HTMLDivElement;
        wrapper.style.display = "none";
        toggleBtn.style.display = "block";
      },
    }

    simpleUser.delegate = delegate;

    phoneButton.addEventListener("click", async () => {
      const toggleBtn = toggleButton as HTMLButtonElement;
      const wrapper = goodTokWrapper as HTMLElement | HTMLDivElement;
      wrapper.style.display = "none";
      toggleBtn.style.display = "block"; // Show the logo when the component is hidden
      await simpleUser.hangup();
    });

    cameraButton.addEventListener("click", () => {
      if (cameraEnabled) {
        cameraEnabled = false;
        cameraButton.innerHTML = getVideoSlashSVG();
        mediaToggle(simpleUser, false, "video")
      } else {
        cameraEnabled = true;
        cameraButton.innerHTML = getVideoSVG();
        mediaToggle(simpleUser, true, "video")
      }
    })

    microphoneButton.addEventListener("click", () => {
      if (microphoneEnabled) {
        microphoneEnabled = false;
        microphoneButton.innerHTML = getMicrophoneSlashSVG();
        mediaToggle(simpleUser, false, "audio")
      } else {
        microphoneEnabled = true;
        microphoneButton.innerHTML = getMicrophoneSVG();
        mediaToggle(simpleUser, true, "audio")
      }
    })

    simpleUser.connect()
      .then(() => {
        simpleUser.register();
      })
      .catch((error: Error) => {
        console.error("Failed to connect to server");
      });
  }
}

export default GoodTokComponent;