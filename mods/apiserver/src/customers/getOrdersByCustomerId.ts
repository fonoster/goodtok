/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
import { Context } from "../context";
import { GetOrdersByCustomerIdRequest, Order } from "./types";
import { getLogger } from "@fonoster/logger";
import ShopifyAPI from "./shopify";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function getOrdersByCustomerId(
  ctx: Context,
  request: GetOrdersByCustomerIdRequest
): Promise<Order[] | null> {
  const { workspaceId, customerId } = request;
  logger.verbose("get orders for customer", { workspaceId, customerId });

  const workspace = await ctx.prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: { shopifyAccount: true }
  });

  const shopifyClient = new ShopifyAPI({
    shop: workspace.shopifyAccount.storeDomain,
    accessToken: workspace.shopifyAccount.accessToken
  });

  try {
    return await shopifyClient.getOrdersHistoryByCustomerId({
      customerId
    });
  } catch (err) {
    logger.warn("error getting customer by id", { err });
  }

  return [];
}
