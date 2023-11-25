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
import { Context } from "../context";
import { Customer, GetCustomerByIdRequest } from "./types";
import { formatShopifyAddress } from "./utils";
import { getLogger } from "@fonoster/logger";
import ShopifyAPI from "./shopify";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function getCustomerById(
  ctx: Context,
  request: GetCustomerByIdRequest
): Promise<Customer | null> {
  const { workspaceId, customerId } = request;

  logger.verbose("get customer by id", { workspaceId, customerId });

  const workspace = await ctx.prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: { shopifyAccount: true }
  });

  const shopifyClient = new ShopifyAPI({
    shop: workspace.shopifyAccount.storeDomain,
    accessToken: workspace.shopifyAccount.accessToken
  });

  try {
    const shopifyCustomer = await shopifyClient.getCustomerById(customerId);

    return shopifyCustomer
      ? {
          id: shopifyCustomer.id.toString(),
          name: `${shopifyCustomer.first_name} ${shopifyCustomer.last_name}`,
          email: shopifyCustomer.email,
          phone: shopifyCustomer.phone,
          birthday: "",
          note: shopifyCustomer.note,
          address: formatShopifyAddress(shopifyCustomer.default_address),
          avatar: null
        }
      : null;
  } catch (err) {
    logger.verbose("no customer found in shopify and will fallback to queue", {
      customerId,
      workspaceId
    });
    const result = await ctx.prisma.queueEntry.findFirst({
      where: {
        customerId,
        workspaceId
      }
    });

    const metadata = result.metadata as Record<string, string>;

    return {
      id: customerId,
      name: metadata.name,
      email: metadata.email,
      note: metadata.message
    } as Customer;
  }
}
