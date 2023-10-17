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
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@goodtok/apiserver";
import { Customer, CustomersClient } from "./types";
import Client from "../client";

/**
 * @classdesc Use the Goodtok Customers capability to retrieve and manage customers.
 * Ensure the Goodtok API Server is running for the Customers API to function.
 *
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
export default class Customers implements CustomersClient {
  client: Client;
  trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

  /**
   * Constructs a new Customers API object.
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
   * Retrieves a customer by its ID.
   *
   * @param {string} id - The customer ID
   * @return {Promise<Customer>} A promise resolving to the customer
   * @throws Will throw an error if the customer is not found
   * @example
   *
   * const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
   * customers.getCustomerById(id)
   *   .then(console.log)
   *   .catch(console.error); // handle any errors
   */
  async getCustomerById(id: string): Promise<Customer> {
    return this.trpc.customers.getCustomerById.query(id);
  }
}
