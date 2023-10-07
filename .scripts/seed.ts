/*
 * Copyright (C) <%= YEAR %> by Fonoster Inc (https://fonoster.com)
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
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../mods/apiserver/src/utils";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      username: "goodtok",
      email: "goodtok@goodtok.io",
      password: hashPassword("changeme"),
      name: "GoodTok"
    }
  });

  await prisma.user.create({
    data: {
      id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc2",
      username: "member",
      email: "member@goodtok.io",
      password: hashPassword("changeme"),
      name: "GoodTok Member"
    },
  });

  await prisma.workspace.create({
    data: {
      id: "default",
      name: "Default",
      ownerId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1"
    },
  });

  await prisma.workspaceMember.create({
    data: {
      userId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      workspaceId: "default",
      status: "ACTIVE",
      role: "MEMBER"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "external-customer-id-1",
      workspaceId: "default",
      status: "ONLINE"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "external-customer-id-2",
      workspaceId: "default",
      status: "OFFLINE"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "external-customer-id-3",
      workspaceId: "default",
      status: "ONLINE"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "external-customer-id-5",
      workspaceId: "default",
      status: "DEQUEUED"
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
