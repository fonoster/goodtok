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
import { QueueEntry, QueuesClient } from "./types";
import {
  TRPCClientError,
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink
} from "@trpc/client";
import type {
  AppRouter,
  DequeueRequest,
  GetQueueResponse
} from "@goodtok/apiserver";
import { AbstractBaseClient } from "../base";
import { formatAndThrowError } from "../errors";
import { GoodtokError } from "../errors/GoodtokError";
import Client from "../client";
import isomorphicWS from "isomorphic-ws";

if (typeof window !== "undefined") {
  window.WebSocket = isomorphicWS as unknown as typeof WebSocket;
} else if (typeof global !== "undefined") {
  global.WebSocket = isomorphicWS as unknown as typeof WebSocket;
}

/**
 * @classdesc Use the Goodtok Queues capability to retrieve and manage queues.
 * Ensure the Goodtok API Server is running for the Queues API to function.
 *
 * @extends AbstractBaseClient
 * @example
 *
 * const SDK = require("@goodtok/sdk");
 *
 * async function getWorkspace() {
 *   const client = new SDK.Client({ workspace: "myworkspace" });
 *   await client.login("goodtok", "mysecretpassword");
 *
 *   const workspaceId = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
 *
 *   const queues = new SDK.Queues(client);
 *   const queue = await workspaces.getQueueByWorkspaceId(workspaceId);
 *
 *   console.log(workspace);
 * }
 *
 * getWorkspace().catch(console.error);
 */
export default class Queues extends AbstractBaseClient implements QueuesClient {
  client: Client;
  trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

  /**
   * Constructs a new Queues API object.
   *
   * @param {Client} client - Object containing the client configuration
   * @see module:sdk:Client
   */
  constructor(client: Client) {
    super(client);
    this.trpc = this.createTRPCProxy();
  }

  // TODO: Use dependency injection to avoid exposing this method to users
  createTRPCProxy() {
    const wsClient = createWSClient({
      url:
        this.client.getEndpoint().replace("http", "ws") +
        `?token=${this.client.getToken()}`
    });

    // Unlike the other APIs, the Workspaces API uses a split link to handle subscriptions
    return createTRPCProxyClient<AppRouter>({
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

  /**
   * Retrieves the queue for the default workspace.
   *
   * @return {Promise<GetQueueResponse>} A promise resolving to the queue
   * @example
   *
   * workspaces.getDefaultWorkspaceQueue()
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getDefaultWorkspaceQueue(): Promise<GetQueueResponse> {
    try {
      return await this.trpc.queues.getQueueByWorkspaceId.query(
        this.client.getDefaultWorkspaceId()
      );
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Retrieves the queue for a workspace by its ID.
   *
   * @param {string} id - The workspace ID
   * @return {Promise<Workspace>} A promise resolving to an object containing an array of queue entries
   * @example
   *
   * const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
   *
   * queues.getQueueByWorkspaceId(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getQueueByWorkspaceId(id: string): Promise<GetQueueResponse> {
    try {
      return await this.trpc.queues.getQueueByWorkspaceId.query(id);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Registers a callback for real-time updates on queue entries within a workspace.
   *
   * @param {string} id - The ID of the workspace
   * @param {function} callback - The callback to be invoked when a queue entry updates
   * @example
   *
   * const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
   *
   * queues.watchQueue(id, (err, data) => {
   *   if (err) {
   *    console.error(err);
   *    return;
   *   }
   *
   *   console.log(data);
   * });
   */
  watchQueue(
    id: string,
    callback: (error: GoodtokError, data?: QueueEntry) => void
  ) {
    this.trpc.queues.watchQueue.subscribe(id, {
      onData(data: QueueEntry) {
        callback(null, data);
      },
      onError(err: TRPCClientError<any>) {
        callback(new GoodtokError(err.data.code, err.data.message));
      }
    });
  }

  /**
   * Removes entry from the queue.
   *
   * @param {DequeueRequest} request - The dequeue request
   * @param {string} request.workspaceId - The workspace ID
   * @param {string} request.customerId - The customer ID to dequeue
   * @return {Promise<void>} A promise resolving to void
   * @example
   *
   * const request = {
   *  workspaceId: "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d",
   *  customerId: "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d"
   * };
   *
   * queues.dequeue(request)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async dequeue(request: DequeueRequest): Promise<void> {
    try {
      await this.trpc.queues.dequeue.mutate(request);
    } catch (err) {
      formatAndThrowError(err);
    }
  }
}
