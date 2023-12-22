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
import { prisma } from "../db";
import { getGravatarURL } from "./getGravatar";

const logger = getLogger({ service: "apiserver", filePath: __filename });

async function connectWithRetries(retries = 5, interval = 5000): Promise<void> {
  try {
    await prisma.$connect();
    logger.info("database connection successful");
  } catch (e) {
    if (retries === 0) {
      throw new Error(
        "could not connect to the database after several retries"
      );
    }
    logger.error(
      `error connecting to the database: ${e.message}, retrying in ${
        interval / 1000
      } seconds...`
    );
    await new Promise((resolve) => setTimeout(resolve, interval));
    return connectWithRetries(retries - 1, interval);
  }
}

async function upsertDefaultUser(request: { email: string; password: string }) {
  try {
    const { email, password } = request;
    await connectWithRetries();

    const today = new Date();

    const user = await prisma.user.upsert({
      where: {
        email
      },
      update: {
        password,
        updatedAt: today
      },
      create: {
        name: "Admin",
        email,
        avatar: getGravatarURL(email),
        password,
        createdAt: today,
        updatedAt: today
      }
    });

    if (user.updatedAt.getMilliseconds() === user.createdAt.getMilliseconds()) {
      logger.verbose("it is a new user so creating a default workspace");

      const createData = {
        ownerId: user.id,
        id: "g-7b7c46fb05",
        name: "Default Workspace",
        timezone: "America/New_York",
        enabled: true,
        calendarUrl: "https://cal.com/placeholder",
        hoursOfOperation: {
          Monday: { from: "09:00", to: "17:00" },
          Tuesday: { from: "09:00", to: "17:00" },
          Wednesday: { from: "09:00", to: "17:00" },
          Thursday: { from: "09:00", to: "17:00" },
          Friday: { from: "09:00", to: "17:00" },
          Saturday: {},
          Sunday: {}
        },
        shopifyAccount: {
          create: {
            accessToken: "",
            storeDomain: "https://placeholder.myshopify.com"
          }
        }
      };

      const workspace = await prisma.workspace.create({
        data: createData,
        include: {
          shopifyAccount: true
        }
      });

      logger.verbose("default workspace created:", {
        id: workspace.id,
        ownerId: user.id
      });
    }

    logger.verbose("user upserted:", {
      id: user.id
    });
  } catch (e) {
    throw new Error(`error in upsertDefaultUser execution: ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export { upsertDefaultUser };
