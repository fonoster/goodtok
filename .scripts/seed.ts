/*
 * Copyright (C) <%= YEAR %> by Fonoster Inc (https://fonoster.com)
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
      name: "Goodtok"
    }
  });

  await prisma.user.create({
    data: {
      id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc2",
      username: "member",
      email: "member@goodtok.io",
      password: hashPassword("changeme"),
      name: "Goodtok Member"
    },
  });

  await prisma.workspace.create({
    data: {
      id: "g-4f90d13a42",
      name: "My Workspace",
      ownerId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      timezone: "America/New_York",
      hoursOfOperation: {
        Monday: {
          enabled: false,
          hours: []
        },
        Tuesday: {
          enabled: false,
          hours: []
        },
        Wednesday: {
          enabled: false,
          hours: []
        },
        Thursday: {
          enabled: false,
          hours: []
        },
        Friday: {
          enabled: false,
          hours: []
        },
        Saturday: {
          enabled: false,
          hours: []
        },
        Sunday: {
          enabled: true,
          hours: []
        }
      }
    },
  });

  await prisma.workspaceMember.create({
    data: {
      userId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      workspaceId: "g-4f90d13a42",
      status: "ACTIVE",
      role: "MEMBER"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "1",
      workspaceId: "g-4f90d13a42",
      status: "ONLINE",
      aor: "sip:1@sip.goodtok.io"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "2",
      workspaceId: "g-4f90d13a42",
      status: "OFFLINE",
      aor: "sip:2@sip.goodtok.io"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "3",
      workspaceId: "g-4f90d13a42",
      status: "ONLINE",
      aor: "sip:3@sip.goodtok.io"
    },
  });

  await prisma.queueEntry.create({
    data: {
      customerId: "4",
      workspaceId: "g-4f90d13a42",
      status: "DEQUEUED",
      aor: "sip:4@sip.goodtok.io"
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
