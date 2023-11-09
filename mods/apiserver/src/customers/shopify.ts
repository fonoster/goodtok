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
import { ShopifyCustomer } from "./types";
import { TRPCError } from "@trpc/server";
import logger from "@fonoster/logger";
import axios from "axios";

export default class ShopifyAPI {
  shop: string;
  accessToken: string;
  baseUrl: string;
  defaultHeaders: { "X-Shopify-Access-Token": string; "Content-Type": string };

  constructor(opts: { shop: string; accessToken: string }) {
    const { shop, accessToken } = opts;
    this.shop = shop;
    this.accessToken = accessToken;
    this.baseUrl = `https://${this.shop}/admin/api/2023-10`;
    this.defaultHeaders = {
      "X-Shopify-Access-Token": this.accessToken,
      "Content-Type": "application/json"
    };
  }

  async getCustomerById(customerId: string): Promise<ShopifyCustomer> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/customers.json?ids=${customerId}`,
        {
          headers: this.defaultHeaders
        }
      );

      if (response.data && response.data.customers) {
        return response.data.customers[0];
      }

      return null;
    } catch (error) {
      logger.error("an error occurred while getting customer by id", {
        error,
        customerId,
        shop: this.shop,
        baseUrl: this.baseUrl,
        defaultHeaders: this.defaultHeaders
      });
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error });
    }
  }
}
