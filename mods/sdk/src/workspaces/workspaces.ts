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
import { QueueEntry, WorkspacesClient } from "./types";
import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink
} from "@trpc/client";
import {
  AppRouter,
  GetMembersResponse,
  GetQueueResponse,
  UpdateWorkspaceRequest,
  Workspace
} from "@goodtok/apiserver";
import Client from "../client";

export default class Workspaces implements WorkspacesClient {
  client: Client;
  trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

  constructor(client: Client) {
    this.client = client;
    const wsClient = createWSClient({
      url: this.client.getEndpoint().replace("http", "ws")
    });
    this.trpc = createTRPCProxyClient<AppRouter>({
      links: [
        // call subscriptions through websockets and the rest over http
        splitLink({
          condition(op) {
            return op.type === "subscription";
          },
          true: wsLink({
            client: wsClient
          }),
          false: httpBatchLink({
            url: this.client.getEndpoint(),
            headers: {
              authorization: `Bearer ${this.client.getToken()}`
            }
          })
        })
      ],
      transformer: undefined
    });
  }

  getDefaultWorkspaceId(): string {
    return this.client.getDefaultWorkspaceId();
  }

  async getDefaultWorkspaceQueue(): Promise<GetQueueResponse> {
    return this.trpc.workspaces.getQueueByWorkspaceId.query(
      this.client.getDefaultWorkspaceId()
    );
  }

  async getDefaultWorkspace(): Promise<Workspace> {
    return this.trpc.workspaces.getWorkspaceById.query(
      this.client.getDefaultWorkspaceId()
    );
  }

  async getDefaultWorkspaceMembers(): Promise<GetMembersResponse> {
    return this.trpc.workspaces.getMembersByWorkspaceId.query(
      this.client.getDefaultWorkspaceId()
    );
  }

  async getWorkspaceById(id: string): Promise<Workspace> {
    return this.trpc.workspaces.getWorkspaceById.query(id);
  }

  async getMembersByWorkspaceId(
    workspaceId: string
  ): Promise<GetMembersResponse> {
    return this.trpc.workspaces.getMembersByWorkspaceId.query(workspaceId);
  }

  async getQueueByWorkspaceId(workspaceId: string): Promise<GetQueueResponse> {
    return this.trpc.workspaces.getQueueByWorkspaceId.query(workspaceId);
  }

  async updateWorkspace(request: UpdateWorkspaceRequest): Promise<Workspace> {
    return this.trpc.workspaces.updateWorkspace.mutate(request);
  }

  async getWorkspaces(): Promise<Workspace[]> {
    throw new Error("method not implemented.");
  }

  watchQueue(
    workspaceId: string,
    callback: (error: Error, data?: QueueEntry) => void
  ) {
    this.trpc.workspaces.watchQueue.subscribe(workspaceId, {
      onData(data: QueueEntry) {
        callback(null, data);
      },
      onError(err: Error) {
        callback(err);
      }
    });
  }
}
