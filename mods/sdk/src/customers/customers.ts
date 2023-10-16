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
 * @classdesc Use Goodtok Customers, a capability of Goodtok, to retrieve a list of Customers
 * The Customers API requires of a running Goodtok API Server.
 *
 * @extends Customers
 * @example
 *
 * const SDK = require("@goodtok/sdk")
 * const customers = new SDK.Customers()
 *
 * const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d"
 *
 * acl.getCustomerById(id)
 *   .then(console.log)
 *   .catch(console.error)   // an error occurred
 */
export default class Customers implements CustomersClient {
  client: Client;
  trpc: any;
  // trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

  /**
   * Constructs a new Customers API object.
   *
   * @param {Client} client - Options to indicate the objects endpoint
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
   * Returns a customer by its ID.
   *
   * @param {string} id - The customer ID.
   * @return {Promise<Customer>} A promise that contains the customer.
   * @throws if the customer was not found or an error occurred.
   * @example
   *
   * const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d"
   * customers.getCustomerById(id)
   *  .then(console.log)
   *  .catch(console.error)   // an error occurred
   */
  async getCustomerById(id: string): Promise<Customer> {
    return this.trpc.customers.getCustomerById(id);
  }
}
