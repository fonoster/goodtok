#!/usr/bin/env node

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

const frontOfficeAgent = {
  ref: customerAgentRef,
  domainRef,
  aor: `sip:${frontOfficeAgentRef}@${domain}`,
  // The token will only be valid to invite the customer agent
  aorLink: `sip:anonymous@${domain}`,
  domain,
  privacy,
  // Only allow INVITE requests for this agent
  allowedMethods: ["INVITE"]
};

const customerAgent = {
  ref: frontOfficeAgentRef,
  domainRef,
  aor: `sip:anonymous@${domain}`,
  aorLink: `sip:anonymous@${domain}`,
  domain,
  privacy,
  // Only allow REGISTER requests for this agent
  allowedMethods: ["REGISTER"]
};

const frontOfficeToken = jwt.sign(frontOfficeAgent, privateKey, signOptions);
const customerToken = jwt.sign(customerAgent, privateKey, signOptions);

console.log("Front Office Token: " + frontOfficeToken);
console.log("---------------------------------");
console.log("Customer Token: " + customerToken);
