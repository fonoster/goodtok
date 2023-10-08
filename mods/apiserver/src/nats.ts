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
import { connect } from "nats";
import { getLogger } from "@fonoster/logger";

const logger = getLogger({ service: "apiserver", filePath: __filename });

export function watchNats(
  natsUrl: string,
  callback: (registerEvent: { customerId: string; aor: string }) => void
) {
  (async () => {
    const nc = await connect({ servers: natsUrl });

    const subscription = nc.subscribe("routr.register");

    logger.debug("connected to nats", { natsUrl });
    logger.debug("subscribed to subject", { subject: "routr.register" });

    // eslint-disable-next-line no-loops/no-loops
    for await (const msg of subscription) {
      const messageStr = msg.data.toString();
      callback({ ...JSON.parse(messageStr) });
    }
  })();
}
