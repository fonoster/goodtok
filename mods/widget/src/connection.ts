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
import { GoodTokConnectionObject } from "./types";

export function getConnectionObject(
  document: Document
): GoodTokConnectionObject {
  const scriptTag = document.querySelector(
    "script[src*='unpkg.com/goodtok'], script[src*='lib/client.js']"
  );
  if (scriptTag) {
    const srcValue = scriptTag.getAttribute("src");

    // Check if srcValue is a fully qualified URL or a relative path
    let fullUrl;
    if (srcValue.startsWith("http://") || srcValue.startsWith("https://")) {
      fullUrl = new URL(srcValue);
    } else {
      // Construct a full URL using window.location as the base for relative paths
      fullUrl = new URL(srcValue, window.location.href);
    }

    const token = fullUrl.searchParams.get("token");

    // Use this parameters to request a token from the server if not token is provided
    // const key = fullUrl.searchParams.get("key");
    // const decodedKey = atob(key);
    // const keyParts = decodedKey.split(":");
    // const id = keyParts[0];
    // const server = keyParts[1];

    // Now lets decode the JWT token
    const payload = jwtDecode(token) as { [key: string]: string };

    return {
      aor: payload.aor,
      signalingServer: payload.signalingServer,
      token
    };
  }
}
