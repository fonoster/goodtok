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
import { User } from "@goodtok/apiserver";
import { UsersClient, UpdateUserRequest, UpdateUserResponse } from "./types";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@goodtok/apiserver";
import Client from "../client";

/**
 * @classdesc Use the Goodtok Users capability to retrieve and manage users.
 * Ensure the Goodtok API Server is running for the Users API to function.
 *
 * @example
 *
 * const SDK = require("@goodtok/sdk");
 *
 * async function getUser() {
 *   const client = new SDK.Client({ workspace: "myworkspace" });
 *   await client.login("goodtok", "mysecretpassword");
 *
 *   const users = new SDK.Users(client);
 *   const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
 *   const user = await users.getUserById(id);
 *
 *   console.log(user);
 * }
 *
 * getUser().catch(console.error);
 */
export default class Users implements UsersClient {
  client: Client;
  trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

  /**
   * Constructs a new Users API object.
   *
   * @param {Client} client - Object containing the client configuration
   * @see module:sdk:Client
   */
  constructor(client: Client) {
    this.client = client;
    this.trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: this.client.getEndpoint(),
          headers: {
            authorization: `Bearer ${this.client.getToken()}`
          }
        })
      ],
      transformer: undefined
    });
  }

  /**
   * Retrieves the logged-in user.
   *
   * @return {Promise<User>} A promise resolving to the user
   * @throws Will throw an error if user is not logged in or the JWT token has expired
   * @example
   *
   * const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
   *
   * users.getCurrentUser(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getCurrentUser(): Promise<User> {
    return this.getUserById(this.client.getCurrentUserId());
  }

  /**
   * Retrieves a user by its ID. The calling user must have an admin role to retrieve other users.
   *
   * @param {string} id - The user ID
   * @return {Promise<User>} A promise resolving to the user
   * @throws Will throw an error if the user is not found
   * @throws If the user is not an admin and the user ID does not match the logged-in user's ID
   * @example
   *
   * const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
   *
   * users.getUserById(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getUserById(id: string): Promise<User> {
    return this.trpc.users.getUserById.query(id);
  }

  /**
   * Updates a user's details. The calling user must have an admin role to update other users.
   *
   * @param {UpdateUserRequest} request - A request object containing the user ID and update data
   * @param {string} request.id - The user ID
   * @param {string} request.name - Optional parameter to update the user's name
   * @param {string} request.email - Optional parameter to update the user's email
   * @param {string} request.password - Optional parameter to update the user's password
   * @param {string} request.avatar - Optional parameter to update the user's avatar
   * @return {Promise<UpdateUserResponse>} A promise resolving to the updated user's details
   * @throws Will throw an error if the user is not found
   * @throws If the user is not an admin and the user ID does not match the logged-in user's ID
   * @example
   *
   * const request = {
   *   id: "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d",
   *   name: "John Doe",
   *   email: "john@example.com",
   *   password: "mysecretpassword",
   *   avatar: "https://example.com/avatar.png"
   * };
   *
   * users.updateUser(request)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { id } = await this.trpc.users.updateUser.mutate({
      id: request.id,
      data: request
    });
    return { id };
  }
}
