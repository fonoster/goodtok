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
import { getKeyFromSearchParam } from "./getKeyFromSearchParam";
import { getScriptParams } from "./getScriptParams";

/**
 * Get the token from the script tag that loaded this script
 *
 * @param {Document} document - The document object
 * @return {string} token
 */
export function getCustomerToken(document: Document): string {
  return getScriptParams(document).get("token");
}

/**
 * Get the URL of the API server from the script tag that loaded this script
 *
 * @param {Document} document - The document object
 * @return {string} URL of the API server
 */
export function getAPIServer(document: Document): string {
  const searchParams = getScriptParams(document);
  return getKeyFromSearchParam(searchParams, "server");
}

/**
 * Get the workspace ID from the script tag that loaded this script
 *
 * @param {Document} document - The document object
 * @return {string} workspace ID
 */
export function getWorkspaceId(document: Document): string {
  const searchParams = getScriptParams(document);
  return getKeyFromSearchParam(searchParams, "gtid");
}
