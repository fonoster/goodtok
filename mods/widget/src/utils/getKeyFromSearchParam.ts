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
 * Find key in search params and return it.
 *
 * @param {URLSearchParams} searchParams - The document object
 * @param {string} key - The key to get from the search params
 * @return {URLSearchParams} object
 * @example
 *
 * const searchParams = getScriptParams(document);
 * const token = getKeyFromSearchParam(searchParams, "token");
 * console.log(token);
 */
export function getKeyFromSearchParam(
  searchParams: URLSearchParams,
  key: string
) {
  const searchParamsValue = searchParams?.get("key");
  if (!searchParamsValue) {
    return null;
  }

  const decodedKey = atob(searchParamsValue);
  const obj = JSON.parse(decodedKey);

  return obj[key];
}
