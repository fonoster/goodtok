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
import { SimpleUser } from "sip.js/lib/platform/web";

/**
 * The mediaToggle function enable or disable audio or video tracks.
 *
 * @param {SimpleUser} simpleUser - SIP user agent implementation with SIP.js
 * @param {boolean} enabled - Enable or disable media
 * @param {string} mediaType - Type of media to enable or disable
 */
export const mediaToggle = (
  simpleUser: SimpleUser,
  enabled: boolean,
  mediaType: "audio" | "video"
): void => {
  const tracks = simpleUser.localMediaStream.getTracks();
  tracks.forEach((track: MediaStreamTrack) => {
    if (track.kind === mediaType) {
      track.enabled = enabled;
    }
  });
};
