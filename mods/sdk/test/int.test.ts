/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
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
import { Users } from "../src/users";
import { Client } from "../src/client";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

const DEFAULT_ENDPOINT = "http://localhost:5000/v1";
const DEFAULT_WORKSPACE_ID = "default";

describe("goodtok sdk", () => {
  afterEach(() => sandbox.restore());

  it.only("gets user by its identifier", async () => {
    const client = new Client({
      endpoint: DEFAULT_ENDPOINT,
      workspaceId: DEFAULT_WORKSPACE_ID
    });
    await client.login("goodtok", "changeme");

    const users = new Users(client);
    const user = await users.getUserById(
      "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1"
    );
  });
});
