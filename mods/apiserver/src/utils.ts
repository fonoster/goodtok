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
import { ContextOptionsWithUrl, UserWithWorkspaces } from "./types";
import { TRPCError } from "@trpc/server";
import { Day, WeeklyHoursType, WorkspaceMemberRole } from "./workspaces/types";
import moment from "moment-timezone";
import jwt from "jsonwebtoken";

const logger = getLogger({ service: "common", filePath: __filename });

/**
 * Generates a JWT token with the necesary claims for the user to be authenticated. The claims include
 * the user id, username and a list of workspaces with their roles. The bearer of this token will be
 * able to access the resources of the workspaces according to the role of the user in each workspace.
 *
 * @param {UserWithWorkspaces} request - User object
 * @param {string} jwtSecuritySalt - JWT security salt
 * @param {jwt.SignOptions} jwtSignOptions - JWT sign options
 * @return {string} JWT token
 */
export function generateToken(request: {
  user: UserWithWorkspaces;
  jwtSecuritySalt: string;
  jwtSignOptions: jwt.SignOptions;
  workspaces: { id: string; role: WorkspaceMemberRole }[];
}): string {
  const { user, workspaces, jwtSecuritySalt } = request;

  const claims = {
    sub: user.id,
    email: user.email,
    workspaces
  };

  // Fixme: Allow passing expiration time
  return jwt.sign(claims, jwtSecuritySalt, { expiresIn: "24h" });
}

// Fixme: Need to compare the claims with the requested resource
export function verifyToken(request: {
  token: string;
  jwtSecuritySalt: string;
  jwtSignOptions: jwt.SignOptions;
}): Record<string, string> {
  const { token, jwtSecuritySalt, jwtSignOptions } = request;

  try {
    return jwt.verify(token, jwtSecuritySalt, jwtSignOptions) as Record<
      string,
      string
    >;
  } catch (e) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
  }
}

/**
 * Function that returns the token from the query string or authorization header
 *
 * @param {ContextOptionsWithUrl} request - HTTP request object from express
 * @return {string | null}
 */
export function getToken(request: ContextOptionsWithUrl): string | null {
  if (request.req.url?.includes("token=")) {
    const urlParams = new URLSearchParams(request.req.url.split("?")[1]);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      return tokenFromUrl;
    }
  }

  const authHeader = request.req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const [tokenType, authToken] = authHeader.split(" ");
  if (tokenType !== "Bearer") {
    return null;
  }

  return authToken;
}

/**
 * Function that asserts that the given environment variable is set.
 *
 * @param {string[]} variables environment variables to check
 */
export function assertEnvsAreSet(variables: string[]) {
  variables.forEach((variable: string) => {
    if (!(variable in process.env)) {
      logger.error(
        `the environment variable ${variable} is required but was not found`
      );
      process.exit(1);
    }
  });
}

export function isOpenNow(
  timezone: string,
  hoursOfOperations: WeeklyHoursType
): boolean {
  const now = moment().tz(timezone);
  const currentDay: Day = now.format("dddd") as Day;
  const hoursToday = hoursOfOperations[currentDay];

  if (!hoursToday || !hoursToday.from || !hoursToday.to) {
    return false;
  }

  // Make sure the hours are in the same day
  const fromMoment = moment.tz(
    `${now.format("YYYY-MM-DD")} ${hoursToday.from}`,
    "YYYY-MM-DD HH:mm",
    timezone
  );
  const toMoment = moment.tz(
    `${now.format("YYYY-MM-DD")} ${hoursToday.to}`,
    "YYYY-MM-DD HH:mm",
    timezone
  );

  return now.isBetween(fromMoment, toMoment);
}
