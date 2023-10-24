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
import { connect, StringCodec } from "nats";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config({ path: join(__dirname, "..", ".env") });

const REGISTER_SUBJECT = "routr.endpoint.registered";
const {
  TEST_WORKSPACE_ID,
  SHOPIFY_TEST_CUSTOMER_ID,
  NATS_URL,
  SIP_DOMAIN
} = process.env;

async function main() {
  const nc = await connect({ servers: NATS_URL });
  const sc = StringCodec();
  const registration = {
    aor: `sip:${SHOPIFY_TEST_CUSTOMER_ID}@${SIP_DOMAIN}`,
    extraHeaders: {
      "X-Customer-Id": SHOPIFY_TEST_CUSTOMER_ID,
      "X-Workspace-Id": TEST_WORKSPACE_ID
    }
  };

  nc.publish(REGISTER_SUBJECT, sc.encode(JSON.stringify(registration)));
}

main().
  then(() => {
    process.exit(0)
  }).
  catch(console.error)
