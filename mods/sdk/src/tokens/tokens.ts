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
import { createTRPCProxyClient } from "@trpc/client";
import { AppRouter } from "@goodtok/apiserver";
import { TokensClient } from "./types";
import {
  CreateAnonymousTokenInput,
  CreateTokenInput
} from "@goodtok/apiserver";
import { AbstractBaseClient } from "../base";
import { formatAndThrowError } from "../errors";
import Client from "../client";

/**
 * @classdesc Use the Goodtok Tokens capability to create and verify JWT tokens.
 * Ensure the Goodtok API Server is running for the Tokens API to function.
 *
 * @extends AbstractBaseClient
 * @example
 *
 * const SDK = require("@goodtok/sdk");
 *
 * async function createAnonymousToken() {
 *   const client = new SDK.Client({ workspace: "myworkspace" });
 *   await client.login("goodtok", "mysecretpassword");
 *
 *   const tokens = new SDK.Tokens(client);
 *
 *   const request = {
 *     ref: "myref",
 *     workspaceId: "g-1234567890",
 *     metadata: {
 *      customField: "customValue"
 *     }
 *   }
 *
 *   const connectionObject = await tokens.createAnonymousToken(request);
 *   console.log(connectionObject);
 * }
 *
 * createAnonymousToken().catch(console.error);
 */
export default class Tokens extends AbstractBaseClient implements TokensClient {
  client: Client;
  trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

  /**
   * Constructs a new Tokens API object.
   *
   * @param {Client} client - Object containing the client configuration
   * @see module:sdk:Client
   */
  constructor(client: Client) {
    super(client);
  }

  /**
   * Creates a new anonymous token for the specified workspace, and does not require authentication.
   *
   * @param {CreateAnonymousTokenInput} request - A request with claims required to create a token
   * @param {string} request.ref - A reference for the anonymous user
   * @param {string} request.workspaceId - The workspace ID
   * @param {string} request.metadata - Custom metadata to be included in the token
   * @return {Promise<string>} A promise resolving to the token
   * @throws Will throw an error if the workspace does not have the `anonymous` feature enabled
   * @example
   *
   * const request = {
   *   ref: "myref",
   *   workspaceId: "g-1234567890",
   *   metadata: {
   *    customField: "customValue"
   *   }
   * }
   *
   * tokens.createAnonymousToken(request)
   *   .then(console.log)
   *   .catch(console.error) // handle any errors
   */
  async createAnonymousToken(request: CreateAnonymousTokenInput) {
    try {
      return await this.trpc.tokens.createAnonymousToken.mutate(request);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Creates a new token with the specified permissions.
   *
   * @param {CreateTokenInput} request - A request with claims required to create the token
   * @param {string} request.ref - A reference for the user
   * @param {string} request.peerId - The peer ID for the user
   * @return {Promise<string>} A promise resolving to the token
   * @throws Will throw an error if the user is not logged in
   * @example
   *
   * const request = {
   *   ref: "myref",
   *   customerId: "121a4579",
   *   workspaceId: "g-1234567890"
   * };
   *
   * tokens.createToken(request)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async createToken(request: CreateTokenInput) {
    try {
      return await this.trpc.tokens.createToken.mutate(request);
    } catch (err) {
      formatAndThrowError(err);
    }
  }
}
