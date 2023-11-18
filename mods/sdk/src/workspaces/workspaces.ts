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
import { WorkspacesClient } from "./types";
import {
  TRPCClientError,
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink
} from "@trpc/client";
import type {
  AddWorkspaceMemberRequest,
  AppRouter,
  CreateWorkspaceRequest,
  GetMembersResponse,
  Member,
  UpdateWorkspaceRequest,
  Workspace,
  WorkspaceStatus
} from "@goodtok/apiserver";
import { AbstractBaseClient } from "../base";
import { formatAndThrowError } from "../errors";
import { GoodtokError } from "../errors/GoodtokError";
import Client from "../client";
import isomorphicWS from "isomorphic-ws";
import { Unsubscribable } from "@trpc/server/observable";

if (typeof window !== "undefined") {
  window.WebSocket = isomorphicWS as unknown as typeof WebSocket;
} else if (typeof global !== "undefined") {
  global.WebSocket = isomorphicWS as unknown as typeof WebSocket;
}

/**
 * @classdesc Use the Goodtok Workspaces capability to retrieve and manage workspaces.
 * Ensure the Goodtok API Server is running for the Workspaces API to function.
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
 *   const workspaces = new SDK.Workspaces(client);
 *   const workspace = await workspaces.getDefaultWorkspace();
 *
 *   console.log(workspace);
 * }
 *
 * getWorkspace().catch(console.error);
 */
export default class Workspaces
  extends AbstractBaseClient
  implements WorkspacesClient
{
  client: Client;
  trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

  /**
   * Constructs a new Workspaces API object.
   *
   * @param {Client} client - Object containing the client configuration
   * @see module:sdk:Client
   */
  constructor(client: Client) {
    super(client);
    this.trpc = this.createTRPCProxy();
  }

  // TODO: Use dependency injection to avoid exposing this method to users
  // TODO: Consider the edge case where the word "http" is part of the endpoint
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
   * Creates a new workspace.
   *
   * @param {CreateWorkspaceRequest} request - The request object containing the workspace name, timezone, and hours of operation
   * @param {string} request.name - The workspace name
   * @param {string} request.timezone - The workspace timezone
   * @param {object} request.hoursOfOperation - The workspace hours of operation
   * @return {Promise<Workspace>} A promise resolving to the created workspace
   * @example
   *
   * const request = {
   *   name: "My Workspace",
   *   timezone: "America/New_York",
   *   hoursOfOperation: {
   *     Monday: { from: "09:00", to: "17:00" },
   *     Tuesday: { from: "09:00", to: "17:00" },
   *     // ...
   *   }
   * };
   *
   * workspaces.createWorkspace(request)
   *  .then(console.log)
   *  .catch(console.error); // handle any errors
   */
  async createWorkspace(request: CreateWorkspaceRequest): Promise<Workspace> {
    try {
      return await this.trpc.workspaces.createWorkspace.mutate(request);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Retrieves the default workspace ID.
   *
   * @return {string} The default workspace ID
   * @example
   *
   * workspaces.getDefaultWorkspaceId();
   */
  getDefaultWorkspaceId(): string {
    return this.client.getDefaultWorkspaceId();
  }

  /**
   * Retrieves the default workspace.
   *
   * @return {Promise<Workspace>} A promise resolving to the workspace
   * @example
   *
   * workspaces.getDefaultWorkspace()
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getDefaultWorkspace(): Promise<Workspace> {
    try {
      return await this.trpc.workspaces.getWorkspaceById.query(
        this.client.getDefaultWorkspaceId()
      );
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Retrieves the members for the default workspace.
   *
   * @return {Promise<GetMembersResponse>} A promise resolving to the members
   * @example
   *
   * workspaces.getDefaultWorkspaceMembers()
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getDefaultWorkspaceMembers(): Promise<GetMembersResponse> {
    try {
      return await this.trpc.workspaces.getMembersByWorkspaceId.query(
        this.client.getDefaultWorkspaceId()
      );
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Retrieves a workspace by its ID.
   *
   * @param {string} id - The workspace ID
   * @return {Promise<Workspace>} A promise resolving to the workspace
   * @example
   *
   * const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
   *
   * workspaces.getWorkspaceById(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getWorkspaceById(id: string): Promise<Workspace> {
    try {
      return await this.trpc.workspaces.getWorkspaceById.query(id);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Retrieves the members for a workspace by its ID.
   *
   * @param {string} id - The workspace ID
   * @return {Promise<Workspace>} A promise resolving to an object containing an array of members
   * @example
   *
   * const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
   *
   * workspaces.getMembersByWorkspaceId(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getMembersByWorkspaceId(id: string): Promise<GetMembersResponse> {
    try {
      return await this.trpc.workspaces.getMembersByWorkspaceId.query(id);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Updates the details of a workspace.
   *
   * @param {UpdateWorkspaceRequest} request - The request object containing the workspace ID and update data
   * @param {string} request.id - The workspace ID
   * @param {string} request.name - The workspace name
   * @param {string} request.timezone - The workspace timezone
   * @param {object} request.hoursOfOperation - The workspace hours of operation
   * @return {Promise<Workspace>} A promise resolving to the updated workspace's details
   * @example
   *
   * const request = {
   *   id: "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d",
   *   name: "My Workspace",
   *   timezone: "America/New_York",
   *   hoursOfOperation: {
   *     Monday: { from: "09:00", to: "17:00" },
   *     Tuesday: { from: "09:00", to: "17:00" },
   *     // ...
   *   }
   * };
   *
   * workspaces.updateWorkspace(request)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async updateWorkspace(request: UpdateWorkspaceRequest): Promise<Workspace> {
    try {
      return await this.trpc.workspaces.updateWorkspace.mutate(request);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Retrieves all workspaces for the authenticated user.
   *
   * @return {Promise<Workspace[]>} A promise resolving to an array of workspaces
   * @example
   *
   * workspaces.getWorkspaces()
   *  .then(console.log)
   *  .catch(console.error); // handle any errors
   */
  async getWorkspaces(): Promise<Workspace[]> {
    try {
      return await this.trpc.workspaces.getWorkspaces.query(
        this.client.getCurrentUserId()
      );
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Adds a member to a workspace.
   *
   * @param {AddWorkspaceMemberRequest} request - The request object containing the workspace ID and member details
   * @param {string} request.workspaceId - The workspace ID
   * @param {string} request.name - The member name
   * @param {string} request.email - The member email
   * @param {string} request.role - The member role
   * @return {Promise<Member>} A promise resolving to the added member
   * @example
   *
   * const request = {
   *   workspaceId: "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d",
   *   name: "John Doe",
   *   email: "jhon@example.com",
   *   role: "MEMBER"
   * };
   *
   * workspaces.addWorkspaceMember(request)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async addWorkspaceMember(
    request: AddWorkspaceMemberRequest
  ): Promise<Member> {
    try {
      return await this.trpc.workspaces.addWorkspaceMember.mutate(request);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Removes a member from a workspace.
   *
   * @param {string} id - The member ID
   * @return {Promise<void>} A promise resolving to void
   * @example
   *
   * const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
   *
   * workspaces.removeWorkspaceMember(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async removeWorkspaceMember(id: string): Promise<void> {
    try {
      return await this.trpc.workspaces.removeWorkspaceMember.mutate(id);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Removes a workspace.
   *
   * @param {string} id - The workspace ID
   * @return {Promise<void>} A promise resolving to void
   * @example
   *
   * const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
   *
   * workspaces.removeWorkspace(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async removeWorkspace(id: string): Promise<void> {
    try {
      return await this.trpc.workspaces.removeWorkspace.mutate(id);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Resends a workspace member invite.
   *
   * @param {string} id - The member ID
   * @return {Promise<void>} A promise resolving to void
   * @example
   *
   * const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
   *
   * workspaces.resendWorkspaceMemberInvite(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async resendWorkspaceMemberInvite(id: string): Promise<void> {
    try {
      return await this.trpc.workspaces.resendWorkspaceMemberInvite.mutate(id);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Registers a callback for real-time updates on workspace status.
   *
   * @param {string} id - The ID of the workspace
   * @param {function} callback - The callback to be invoked when the workspace status updates
   * @return {Unsubscribable} An object containing the unsubscribe method
   * @example
   *
   * const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";
   *
   * workspaces.watchWorkspaceStatus(id, (err, data) => {
   *   if (err) {
   *    console.error(err);
   *    return;
   *   }
   *
   *   console.log(data);
   * });
   */
  watchWorkspaceStatus(
    id: string,
    callback: (error: GoodtokError, data?: WorkspaceStatus) => void
  ) {
    return this.trpc.workspaces.watchWorkspaceStatus.subscribe(id, {
      onData(data: WorkspaceStatus) {
        callback(null, data);
      },
      onError(err: TRPCClientError<any>) {
        callback(new GoodtokError(err.data.code, err.data.message));
      }
    });
  }
}
