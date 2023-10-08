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
import { connect, StringCodec } from "nats";

async function main() {
  const nc = await connect({ servers: "api.goodtok.io:4222" });
  const sc = StringCodec();
  const randomOnetoThirteen = Math.floor(Math.random() * 13) + 1;
  const registration = {
    customerId: randomOnetoThirteen + "",
    aor: "sip:anonymous@sip.goodtok.io"
  };
  nc.publish("routr.register", sc.encode(JSON.stringify(registration)));
}

main().
  then(() => {
    process.exit(0)
  }).
  catch(console.error)
