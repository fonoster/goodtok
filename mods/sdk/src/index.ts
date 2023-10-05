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
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@goodtok/apiserver";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://127.0.0.1:5000/v1"
    })
  ],
  transformer: undefined
});

async function main() {
  /**
   * Inferring types
   */
  const user = await trpc.user.getUserById.query("0");

  console.log(user);
}

main().catch(console.error);
