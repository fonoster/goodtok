/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
 * Utility method to check for audio call capabilities.
 *
 * @return {boolean} True if audio call is supported, false otherwise.
 */
export async function canInitiateAudioCall(): Promise<boolean> {
  return navigator.mediaDevices.enumerateDevices().then((devices) => {
    const audioInput = devices.find((device) => device.kind === "audioinput");
    const audioOutput = devices.find((device) => device.kind === "audiooutput");
    return !!audioInput && !!audioOutput;
  });
}

/**
 * Utility method to check for video call capabilities.
 *
 * @return {boolean} True if video call is supported, false otherwise.
 */
export async function canInitiateVideoCall(): Promise<boolean> {
  return navigator.mediaDevices.enumerateDevices().then((devices) => {
    const audioInput = devices.find((device) => device.kind === "audioinput");
    const audioOutput = devices.find((device) => device.kind === "audiooutput");
    const videoInput = devices.find((device) => device.kind === "videoinput");
    return !!audioInput && !!audioOutput && !!videoInput;
  });
}

/**
 * Utility method to check for screen sharing capabilities.
 *
 * @return {boolean} True if screen sharing is supported, false otherwise.
 */
export function canShareScreen(): boolean {
  return navigator.mediaDevices?.getDisplayMedia !== undefined;
}
