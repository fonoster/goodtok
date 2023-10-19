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
import { ShopifyCustomerAddress } from "./types";

export function formatShopifyAddress(address: ShopifyCustomerAddress): string {
  let formattedAddress = "";

  if (address.first_name && address.last_name) {
    formattedAddress += `${address.first_name} ${address.last_name}\n`;
  }

  formattedAddress += address.address1 + "\n";

  if (address.address2) {
    formattedAddress += address.address2 + "\n";
  }

  formattedAddress += `${address.city}, ${address.province} ${address.zip}\n`;
  formattedAddress += address.country;

  if (address.phone) {
    formattedAddress += `\nPhone: ${address.phone}`;
  }

  return formattedAddress.trim();
}
