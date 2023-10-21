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

/**
 * Takes a video element and toggles PiP mode.
 *
 * @param {React.RefObject<HTMLVideoElement>} videoRef - The video element to toggle PiP mode on
 * @return {Promise<void>} A promise that resolves when PiP mode is toggled
 */
export const handlePiP = async (
  videoRef: React.RefObject<HTMLVideoElement>
): Promise<void> => {
  try {
    if (videoRef.current) {
      if (document.pictureInPictureElement) {
        // If some video is already in PiP mode, we'll exit from it
        await document.exitPictureInPicture();
      } else {
        // Otherwise, we request PiP four our video element
        await videoRef.current.requestPictureInPicture();
      }
    }
  } catch (error) {
    console.error("Failed to toggle PiP mode:", error);
  }
};
