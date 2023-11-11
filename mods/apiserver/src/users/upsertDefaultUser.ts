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

    const user = await prisma.user.upsert({
      where: {
        email
      },
      update: {
        password
      },
      create: {
        name: "Admin",
        email,
        password,
        updatedAt: new Date()
      }
    });

    logger.verbose("user upserted:", user);
  } catch (e) {
    throw new Error(`error in upsertDefaultUser execution: ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export { upsertDefaultUser };
