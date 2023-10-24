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
import { join } from "path";
import { prisma } from "../mods/apiserver/src/db";
import dotenv from "dotenv";

dotenv.config({ path: join(__dirname, "..", ".env") });

async function main() {
  const {
    TEST_WORKSPACE_ID,
    SHOPIFY_STORE_DOMAIN,
    SHOPIFY_ACCESS_TOKEN
  } = process.env;

  await prisma.user.create({
    data: {
      id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      username: "goodtok",
      email: "goodtok@goodtok.io",
      password: "changeme",
      name: "Goodtok"
    }
  });

  await prisma.user.create({
    data: {
      id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc2",
      username: "member",
      email: "member@goodtok.io",
      password: "changeme",
      name: "Goodtok Member"
    },
  });

  await prisma.workspace.create({
    data: {
      id: TEST_WORKSPACE_ID,
      name: "My Workspace",
      ownerId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      timezone: "America/New_York",
      calendarUrl: "https://cal.com/goodtok",
      shopifyAccount: SHOPIFY_STORE_DOMAIN && SHOPIFY_ACCESS_TOKEN ? {
        create: {
          storeDomain: SHOPIFY_STORE_DOMAIN,
          accessToken: SHOPIFY_ACCESS_TOKEN
        }
      } : undefined,
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
      workspaceId: TEST_WORKSPACE_ID || "",
      status: "ACTIVE",
      role: "MEMBER"
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
