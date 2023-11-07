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

async function main() {
  await prisma.user.create({
    data: {
      id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      username: "goodtok",
      email: "goodtok@goodtok.io",
      password: "changeme",
      name: "Goodtok"
    }
  });

  await prisma.workspace.create({
    data: {
      id: "g-4f90d13a42",
      name: "Default Workspace",
      ownerId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
      timezone: "America/New_York",
      calendarUrl: "https://cal.com/goodtok",
      hoursOfOperation: {
        Monday: { from: "09:00", to: "17:00" },
        Tuesday: { from: "09:00", to: "17:00" },
        Wednesday: { from: "09:00", to: "17:00" },
        Thursday: { from: "09:00", to: "17:00" },
        Friday: { from: "09:00", to: "17:00" },
        Saturday: {},
        Sunday: {}
      }
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
