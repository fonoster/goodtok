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

export default class Customers implements CustomersClient {
  client: Client;
  trpc: any;
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

  async getCustomerById(id: string): Promise<Customer> {
    return this.trpc.customers.getCustomerById.query(id);
  }
}