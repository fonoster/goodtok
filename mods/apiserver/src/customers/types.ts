/* eslint-disable camelcase */

import { type } from "os";

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

export type GetCustomerByIdRequest = z.infer<
  typeof getCustomerByIdRequestSchema
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
  multipass_identifier: null;
  tax_exempt: boolean;
  tags: string;
  last_order_name: null;
  currency: string;
  phone: string;
  addresses: unknown[];
  accepts_marketing_updated_at: string;
  marketing_opt_in_level: null;
  tax_exemptions: unknown[];
  email_marketing_consent: unknown;
  sms_marketing_consent: unknown;
  admin_graphql_api_id: string;
  default_address: unknown;
};
