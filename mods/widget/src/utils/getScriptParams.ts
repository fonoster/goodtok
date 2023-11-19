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
 * Get the URLSearchParams object from the script tag that loaded this script
 *
 * @param {Document} document - The document object
 * @return {URLSearchParams} object
 * @example
 *
 * const searchParams = getScriptParams(document);
 * const token = searchParams.get("token");
 * console.log(token);
 */
export function getScriptParams(document: Document): URLSearchParams {
  const scriptTag = document.querySelector(
    "script[src*='unpkg.com/@goodtok/widget'], script[src*='./src/index.jsx']"
  );

  if (scriptTag) {
    const srcValue = scriptTag.getAttribute("src");

    let fullUrl;
    if (srcValue.startsWith("http://") || srcValue.startsWith("https://")) {
      fullUrl = new URL(srcValue);
    } else {
      fullUrl = new URL(srcValue, window.location.href);
    }

    return fullUrl.searchParams;
  }

  return null;
}
