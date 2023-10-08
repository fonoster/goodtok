/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of GoodTok
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
import jwtDecode from "jwt-decode";
import { FOConnectionObject } from "./types";

export function getButton(id: string): HTMLButtonElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLButtonElement)) {
    throw new Error(`Element "${id}" not found or not a button element.`);
  }
  return el;
}

export function getAudio(id: string): HTMLAudioElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLAudioElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}

// Helper function to get an HTML audio element
export function getVideoElement(id: string): HTMLVideoElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLVideoElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}

export function getConnectionObject(document: Document): FOConnectionObject {
  const scriptTag = document.querySelector("script[src*='lib/frontoffice.js']");
  if (scriptTag) {
    const srcValue = scriptTag.getAttribute("src");

    const url = new URL(srcValue, window.location.href);

    const token = url.searchParams.get("token");

    // Needs error handling

    // Now lets decode the JWT token
    const payload = jwtDecode(token) as { [key: string]: string };

    return {
      aor: payload.aor,
      aorLink: payload.aorLink,
      token,
      signalingServer: payload.signalingServer
    };
  }
}
