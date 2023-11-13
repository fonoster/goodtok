/* eslint-disable camelcase */
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
import { z } from "zod";

export const getCustomerByIdRequestSchema = z.object({
  workspaceId: z.string().min(1),
  customerId: z.string().min(1)
});

export const getOrdersByCustomerIdRequestSchema = z.object({
  workspaceId: z.string().min(1),
  customerId: z.string().min(1)
});

export type GetCustomerByIdRequest = z.infer<
  typeof getCustomerByIdRequestSchema
>;

export type GetOrdersByCustomerIdRequest = z.infer<
  typeof getOrdersByCustomerIdRequestSchema
>;

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  note: string;
  address: string;
  avatar: string;
};

export type ShopifyCustomer = {
  id: number;
  email: string;
  accepts_marketing: boolean;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  orders_count: number;
  state: string;
  total_spent: string;
  last_order_id: null;
  note: string;
  verified_email: boolean;
  multipass_identifier: unknown;
  tax_exempt: boolean;
  tags: string;
  last_order_name: string;
  currency: string;
  phone: string;
  addresses: ShopifyCustomerAddress[];
  accepts_marketing_updated_at: string;
  marketing_opt_in_level: string;
  tax_exemptions: string[];
  email_marketing_consent: boolean; // Deprecated
  sms_marketing_consent: {
    state: string;
    opt_in_level: string;
    consent_updated_at: string;
    consent_collected_from: string;
  };
  admin_graphql_api_id: string;
  default_address: ShopifyCustomerAddress;
};

export type ShopifyCustomerAddress = {
  address1: string;
  address2?: string;
  city: string;
  company?: string;
  country: string;
  first_name?: string;
  id: number;
  last_name?: string;
  phone?: string;
  province: string;
  zip: string;
  province_code?: string;
  country_code?: string;
  country_name?: string;
  default?: boolean;
};

export type Order = {
  id: string;
  name: string;
  total: number;
  photo: string;
  createdAt: string;
};

export type ShopifyOrder = {
  order_number: number;
  created_at: string;
  line_items: {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    vendor: string;
  }[];
};
