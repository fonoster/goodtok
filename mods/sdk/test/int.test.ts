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
import Users from "../src/users";
import Workspaces from "../src/workspaces";
import Client from "../src/client";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

const expect = chai.expect;
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

const DEFAULT_ENDPOINT = "http://localhost:6789/v1";
const DEFAULT_WORKSPACE_ID = "default";

const client = new Client({
  endpoint: DEFAULT_ENDPOINT,
  workspace: DEFAULT_WORKSPACE_ID
});

// TODO: Update this test to match the seed data
describe("@sdk[integration]", () => {
  const workspaceId = "g-4f90d13a42";
  const userId = "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1";

  afterEach(() => sandbox.restore());

  it("gets user by its identifier", async () => {
    await client.login("goodtok", "changeme");

    const users = new Users(client);
    const user = await users.getUserById(userId);
    expect(user).to.be.an("object").that.has.property("id");
  });

  it("updates user", async () => {
    await client.login("goodtok", "changeme");

    const users = new Users(client);
    const user = await users.updateUser({
      name: "Goodtok"
    });
    expect(user).to.be.an("object").that.has.property("id");
  });

  it("gets a workspace by its identifier", async () => {
    await client.login("goodtok", "changeme");

    const workspaces = new Workspaces(client);
    const response = await workspaces.getMembersByWorkspaceId(workspaceId);

    expect(response.members).to.be.an("array").that.has.lengthOf(1);
  });

  it("gets all queue entries for a workspace", async () => {
    await client.login("goodtok", "changeme");

    const workspaces = new Workspaces(client);
    const response = await workspaces.getQueueByWorkspaceId(workspaceId);

    expect(response.queue).to.be.an("array");
  });

  it("updates a workspace", async () => {
    await client.login("goodtok", "changeme");

    const workspaces = new Workspaces(client);
    const response = await workspaces.updateWorkspace({
      id: workspaceId,
      status: "ONLINE"
    });
    expect(response).to.be.an("object").that.has.property("id");
  });
});
