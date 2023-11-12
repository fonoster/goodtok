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
import type { AppRouter } from "@goodtok/apiserver";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { ClientOptions } from "./types";
import { Buffer } from "buffer";
import { jwtDecode } from "jwt-decode";

export default class Client {
  private options: ClientOptions;
  private token: string;
  private currentUserId: string;
  private defaultWorkspaceId: string;
  constructor(options: ClientOptions) {
    this.options = options;
    this.defaultWorkspaceId = options.workspace;
    if (!options.endpoint) {
      // Default to the public API :)
      this.options.endpoint = "https://api.goodtok.io/v1";
    }
  }

  async login(email: string, password: string) {
    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: this.options.endpoint,
          headers: {
            authorization: `Basic ${Buffer.from(
              `${email}:${password}`
            ).toString("base64")}`
          }
        })
      ],
      transformer: undefined
    });

    this.token = await trpc.users.login.mutate({ email, password });

    const userInfo = jwtDecode(this.token) as {
      [key: string]: string;
    };

    this.currentUserId = userInfo.sub;
  }

  async renewToken() {
    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: this.options.endpoint,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        })
      ],
      transformer: undefined
    });

    this.token = await trpc.users.renewToken.mutate(this.token);
  }

  async acceptInvite(token: string) {
    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: this.options.endpoint
        })
      ],
      transformer: undefined
    });
    await trpc.users.acceptInvite.mutate(token);
  }

  setToken(token: string) {
    this.token = token;
    const userInfo = jwtDecode(token) as {
      [key: string]: string;
    };

    this.currentUserId = userInfo.sub;
  }

  getToken() {
    return this.token;
  }

  getEndpoint() {
    return this.options.endpoint;
  }

  setDefaultWorkspaceId(workspaceId: string) {
    this.defaultWorkspaceId = workspaceId;
  }

  getDefaultWorkspaceId() {
    return this.defaultWorkspaceId;
  }

  getCurrentUserId() {
    return this.currentUserId;
  }
}
