/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of GoodTok
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
import { QueueEntry } from "./types";
import { getCustomerFromCRM } from "../crm";
import { observable } from "@trpc/server/observable";

// List to keep track of all active observers
const observers: Array<(entry: QueueEntry) => void> = [];

// TODO: Replace this with a real queue
setInterval(() => {
  const randomIdFromOneToTen = Math.floor(Math.random() * 1000) + 1;
  const entry: QueueEntry = {
    customerId: randomIdFromOneToTen + "",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "IN_PROGRESS",
    workspaceId: "default",
    customer: getCustomerFromCRM("1")
  };

  // Notify all observers
  observers.forEach((emit) => emit(entry));
}, 20000);

export function watchQ(workspaceId: string) {
  return observable<QueueEntry>((emit) => {
    // Add the observer's next method to the list when a client subscribes
    observers.push(emit.next.bind(emit));

    // Remove the observer's next method when the client unsubscribes
    return () => {
      const index = observers.indexOf(emit.next.bind(emit));
      if (index !== -1) {
        observers.splice(index, 1);
      }
    };
  });
}
