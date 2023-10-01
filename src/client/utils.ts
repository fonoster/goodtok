import { SimpleUser } from "sip.js/lib/platform/web";

export const mediaToggle = (simpleUser: SimpleUser, enabled: boolean, type: "audio" | "video") => {
  const tracks = (simpleUser.localMediaStream as MediaStream).getTracks();
  tracks.forEach((track: MediaStreamTrack) => {
    if (track.kind === type) {
      track.enabled = enabled;
    }
  });
}