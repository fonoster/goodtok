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
import { Order, ShopifyCustomer, ShopifyOrder, ShopifyProduct } from "./types";
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
    this.baseUrl = `${this.shop}/admin/api/2023-10`;
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

  async getOrdersHistoryByCustomerId(request: {
    customerId: string;
    limit?: number;
  }): Promise<Order[]> {
    const { customerId, limit = 10 } = request;
    try {
      const response = (await axios.get(
        `${this.baseUrl}/orders.json?customer_id=${customerId}&limit=${limit}&status=any`,
        {
          headers: this.defaultHeaders
        }
      )) as { data: { orders: ShopifyOrder[] } };

      if (response.data?.orders) {
        const orderPromises = response.data.orders.map(async (order) => {
          // TODO: We will want to cache this data in the future
          const response = (await axios.get(
            `${this.baseUrl}/products/${order.line_items[0].product_id}.json`,
            {
              headers: this.defaultHeaders
            }
          )) as { data: { product: ShopifyProduct } };

          const imageUrl = response.data.product?.image?.src;

          // Return the complete order object
          return {
            id: order.order_number.toString(),
            createdAt: order.created_at,
            name: order.line_items[0].name,
            imageUrl,
            total: order.line_items[0].price
          };
        });

        return await Promise.all(orderPromises);
      }
      return [];
    } catch (error) {
      logger.error("an error occurred while getting orders history", {
        error,
        shop: this.shop,
        baseUrl: this.baseUrl,
        defaultHeaders: this.defaultHeaders
      });
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message
      });
    }
  }
}
