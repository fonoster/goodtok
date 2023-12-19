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
import { getLogger } from "@fonoster/logger";
import { updateQueueEntry } from "./updateQueueEntry";
import { getCustomerById } from "../customers/getCustomerById";
import { queueObservers } from "../workspaces/observers";
import { JoinQueueRequest } from "./types";
import jwt from "jsonwebtoken";
import { Context } from "../context";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export async function joinQueue(
  ctx: Context,
  joinQueueRequest: JoinQueueRequest
) {
  const { customerId, workspaceId } = joinQueueRequest;

  const claims = jwt.decode(ctx.token) as {
    metadata: { name: string; email: string; message: string };
  };

  logger.verbose("customerId and workspaceId", { customerId, workspaceId });

  const entry = await updateQueueEntry(ctx, {
    customerId,
    workspaceId,
    // FIXME: We are setting the expiration time to 24 hours for now
    expires: 86400,
    metadata: claims.metadata
  });

  logger.verbose("entry updated", { entry });

  const customer = await getCustomerById(ctx, { workspaceId, customerId });

  const entryWithCustomer = {
    ...entry,
    customer: {
      id: customerId,
      name: customer.name,
      email: customer.email,
      avatar: customer.avatar,
      note: customer.note
    }
  };

  // Notify all observers
  queueObservers.forEach((emit) => emit(entryWithCustomer));
}
