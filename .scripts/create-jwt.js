#!/usr/bin/env node
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
const fs = require("fs");
const { join } = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

if (!fs.existsSync("./.keys") || !fs.existsSync("./.keys/private.key")) {
  console.error("No private key found. Please run 'npm run keys:generate' first");
  return;
}

dotenv.config({ path: join(__dirname, "..", ".env") });

const {
  SIP_DOMAIN,
  SIP_SIGNALING_SERVER,
  TEST_WORKSPACE_ID,
  SHOPIFY_TEST_CUSTOMER_ID,
} = process.env;

const privateKey = fs.readFileSync("./.keys/private.key");

// Please never create a long-lived token for a production environment
const signOptions = { expiresIn: "24h", algorithm: "RS256" };
const domainRef = "default";
const privacy = "NONE";
const domain = SIP_DOMAIN;
const frontOfficeAgentRef = "front-office-agent";
const customerAgentRef = SHOPIFY_TEST_CUSTOMER_ID;
const signalingServer = SIP_SIGNALING_SERVER
const calendarUrl = "https://cal.com/goodtok";

const frontOfficeAgent = {
  ref: customerAgentRef,
  domainRef,
  aor: `sip:${frontOfficeAgentRef}@${domain}`,
  // The token will only be valid to invite the customer agent
  aorLink: `sip:anonymous@${domain}`,
  domain,
  privacy,
  // Only allow INVITE requests for this agent
  allowedMethods: ["INVITE"],
  signalingServer
};

const customerAgent = {
  ref: customerAgentRef,
  customerId: customerAgentRef,
  domainRef,
  workspaceId: TEST_WORKSPACE_ID,
  calendarUrl,
  aor: `sip:${customerAgentRef}@${domain}`,
  aorLink: `sip:${customerAgentRef}@${domain}`,
  domain,
  privacy,
  // Only allow REGISTER requests for this agent
  allowedMethods: ["REGISTER"],
  signalingServer
};

const frontOfficeToken = jwt.sign(frontOfficeAgent, privateKey, signOptions);
const customerToken = jwt.sign(customerAgent, privateKey, signOptions);

console.log("Front Office Token: " + frontOfficeToken);
console.log("---------------------------------");
console.log("Customer Token: " + customerToken);

