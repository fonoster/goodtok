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
import { Customer, CustomersClient, GetCustomerRequest } from "./types";
import { AbstractBaseClient } from "../base";
import { formatAndThrowError } from "../errors";
import Client from "../client";

/**
 * @classdesc Use the Goodtok Customers capability to retrieve and manage customers.
 * Ensure the Goodtok API Server is running for the Customers API to function.
 *
 * @extends AbstractBaseClient
 * @example
 *
 * const SDK = require("@goodtok/sdk");
 *
 * async function getCustomer() {
 *   const client = new SDK.Client({ workspace: "myworkspace" });
 *   await client.login("goodtok", "mysecretpassword");
 *
 *   const customers = new SDK.Customers(client);
 *   const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
 *   const customer = await customers.getCustomerById(id);
 *
 *   console.log(customer);
 * }
 *
 * getCustomer().catch(console.error);
 */
export default class Customers
  extends AbstractBaseClient
  implements CustomersClient
{
  client: Client;
  trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

  /**
   * Constructs a new Customers API object.
   *
   * @param {Client} client - Object containing the client configuration
   * @see module:sdk:Client
   */
  constructor(client: Client) {
    super(client);
  }

  /**
   * Retrieves a customer for a workspace by customer ID.
   *
   * @param {GetCustomerRequest} request - Request object containing the customer ID and workspace ID
   * @param {string} request.workspaceId - The workspace ID
   * @param {string} request.customerId - The customer ID
   * @return {Promise<Customer>} A promise resolving to the customer
   * @throws Will throw an error if the customer is not found
   * @example
   *
   * const request = {
   *   workspaceId: "452b1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
   *   customerId: "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d"
   * };
   *
   * customers.getCustomer(request)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getCustomer(request: GetCustomerRequest): Promise<Customer> {
    try {
      return await this.trpc.customers.getCustomerById.query(request);
    } catch (err) {
      formatAndThrowError(err);
    }
  }

  /**
   * Retrieves a customer by ID in the default workspace.
   *
   * @param {string} id - The customer ID
   * @return {Promise<Customer>} A promise resolving to the customer
   * @throws Will throw an error if the customer is not found
   * @example
   *
   * const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
   * customers.getCustomerInDefaultWorkspace(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getCustomerInDefaultWorkspace(id: string): Promise<Customer> {
    try {
      return await this.getCustomer({
        workspaceId: this.client.getDefaultWorkspaceId(),
        customerId: id
      });
    } catch (err) {
      formatAndThrowError(err);
    }
  }
}
