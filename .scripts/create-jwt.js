#!/usr/bin/env node
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

const fs = require("fs");
const jwt = require("jsonwebtoken");

if (!fs.existsSync("./.keys") || !fs.existsSync("./.keys/private.key")) {
  console.error("No private key found. Please run 'npm run keys:generate' first");
  return;
}

const privateKey = fs.readFileSync("./.keys/private.key");

// Please never create a long-lived token for a production environment
const signOptions = { expiresIn: "24h", algorithm: "RS256" };
const domainRef = "goodtok-01";
const privacy = "NONE";
const domain = "sip.goodtok.io";
const frontOfficeAgentRef = "front-office-agent";
const customerAgentRef = "customer-agent";
// const signalingServer = "wss://sip.goodtok.io:5062";
const signalingServer = "ws://sip.goodtok.io:5062";

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
  ref: frontOfficeAgentRef,
  domainRef,
  aor: `sip:anonymous@${domain}`,
  aorLink: `sip:anonymous@${domain}`,
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
