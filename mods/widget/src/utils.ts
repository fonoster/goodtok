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
const getKeyFromSearchParam = (searchParams: URLSearchParams, key: string) => {
  const searchParamsValue = searchParams.get("key");
  if (!searchParamsValue) {
    return null;
  }

  const decodedKey = atob(searchParamsValue);
  const obj = JSON.parse(decodedKey);

  return obj[key];
};

export function getScriptParams(document: Document): URLSearchParams {
  const scriptTag = document.querySelector(
    "script[src*='unpkg.com/goodtok'], script[src*='lib/client.jsx'], script[src*='./src/index.jsx']"
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

    return fullUrl.searchParams;
  }

  return null;
}

export function getCustomerToken(document: Document): string {
  return getScriptParams(document)?.get("token");
}

export function getAPIServer(document: Document): string {
  const searchParams = getScriptParams(document);
  return getKeyFromSearchParam(searchParams, "server");
}

export function getWorkspaceId(document: Document): string {
  const searchParams = getScriptParams(document);
  return getKeyFromSearchParam(searchParams, "gtid");
}
