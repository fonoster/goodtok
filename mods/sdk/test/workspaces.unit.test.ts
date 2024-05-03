/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
import { Client, Workspaces } from "../src";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("@sdk[workspaces]", () => {
  const workspaceId = "7f6224b9-bc7b-44d1-9bf2-a3a69d77359d";
  let mockClient: Client;
  let queryStub: sinon.SinonStub;
  let mutateStub: sinon.SinonStub;
  let subscribeStub: sinon.SinonStub;
  let emptyQueryStub: sinon.SinonStub;

  beforeEach(() => {
    mockClient = {
      getDefaultWorkspaceId: () => workspaceId
    } as unknown as Client;

    queryStub = sandbox.stub().returns(Promise.resolve({ id: workspaceId }));
    mutateStub = sandbox.stub().returns(Promise.resolve({ id: workspaceId }));
    emptyQueryStub = sandbox.stub().returns(Promise.resolve({}));
    subscribeStub = sandbox.stub().returns(Promise.resolve({}));

    sandbox.stub(Workspaces.prototype, "createTRPCProxy").returns({
      workspaces: {
        getWorkspaceById: {
          query: queryStub
        },
        getMembersByWorkspaceId: {
          query: emptyQueryStub
        },
        getQueueByWorkspaceId: {
          query: emptyQueryStub
        },
        updateWorkspace: {
          mutate: mutateStub
        },
        getWorkspaces: {
          query: queryStub
        },
        watchQueue: {
          subscribe: subscribeStub
        }
      }
    } as unknown as ReturnType<typeof Workspaces.prototype.createTRPCProxy>);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should get the default workspace for the authenticated user", async () => {
    // Arrange
    const workspaces = new Workspaces(mockClient);

    // Act
    const workspace = await workspaces.getDefaultWorkspace();

    // Assert
    expect(queryStub).to.have.been.calledOnce;
    expect(workspace).to.be.an("object").that.has.property("id");
    expect(workspace.id).to.be.equal(workspaceId);
  });

  it("should get the workspace by its id", async () => {
    // Arrange
    const workspaces = new Workspaces(mockClient);

    // Act
    const workspace = await workspaces.getWorkspaceById(workspaceId);

    // Assert
    expect(queryStub).to.have.been.calledOnce;
    expect(workspace).to.be.an("object").that.has.property("id");
    expect(workspace.id).to.be.equal(workspaceId);
  });

  it("should get the default workspace members for the authenticated user", async () => {
    // Arrange
    const workspaces = new Workspaces(mockClient);

    // Act
    await workspaces.getDefaultWorkspaceMembers();
    await workspaces.getMembersByWorkspaceId(workspaceId);

    // Assert
    expect(emptyQueryStub).to.have.been.calledTwice;
  });

  it("should update the workspace", async () => {
    // Arrange
    const workspaces = new Workspaces(mockClient);

    // Act
    const response = await workspaces.updateWorkspace({
      id: workspaceId,
      name: "test"
    });

    // Assert
    expect(mutateStub).to.have.been.calledOnce;
    expect(response).to.be.an("object").that.has.property("id");
    expect(response.id).to.be.equal(workspaceId);
  });

  it.skip("should get the workspaces for the authenticated user", async () => {
    // Arrange
    const workspaces = new Workspaces(mockClient);

    // Act
    const response = await workspaces.getWorkspaces();

    // Assert
    expect(queryStub).to.have.been.calledOnce;
    expect(response).to.be.an("object").that.has.property("id");
    expect(response).to.be.an("array").that.has.lengthOf(1);
  });
});
