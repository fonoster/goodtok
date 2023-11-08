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
import { Context } from "../src/context";
import { TRPCError } from "@trpc/server";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import { UpdateWorkspaceRequest } from "../src/workspaces/types";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

describe("@apiserver[workspaces]", () => {
  const testWorkspace = {
    id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
    name: "Workspace 1",
    timezone: "America/New_York",
    createdAt: new Date(),
    updatedAt: new Date(),
    // shopifyAccount: undefined,
    queue: [
      {
        customerId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
        registeredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "ONLINE",
        workspaceId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
        aor: "sip:"
      }
    ],
    hoursOfOperation: {
      Monday: {
        enabled: true,
        hours: [
          {
            start: "09:00",
            end: "17:00"
          }
        ]
      }
    }
  };

  const testMember = {
    id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
    userId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
    status: "PENDING",
    role: "ADMIN",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://example.com/avatar.png"
    },
    createdAt: new Date()
  };

  afterEach(() => sandbox.restore());

  it("should return a workspace", async () => {
    // Arrange
    const ctx = {
      prisma: {
        workspace: {
          findUnique: sandbox.stub().resolves(testWorkspace)
        }
      }
    } as unknown as Context;

    const request = { workspaceId: testWorkspace.id };

    const { getWorkspaceById } = await import(
      "../src/workspaces/getWorkspaceById"
    );

    // Act
    const workspace = await getWorkspaceById(ctx, request);

    // Assert
    chai.expect(workspace).to.deep.equal(testWorkspace);
  });

  it("should throw an error if workspace is not found", async () => {
    // Arrange
    const ctx = {
      prisma: {
        workspace: {
          findUnique: sandbox.stub().resolves(null)
        }
      }
    } as unknown as Context;

    const request = { workspaceId: testWorkspace.id };

    const { getWorkspaceById } = await import(
      "../src/workspaces/getWorkspaceById"
    );

    // Act
    const promise = getWorkspaceById(ctx, request);

    // Assert
    await chai.expect(promise).to.be.rejectedWith(TRPCError);
  });

  it("should return members", async () => {
    // Arrange
    const ctx = {
      prisma: {
        workspace: {
          findUnique: sandbox.stub().resolves({
            members: [testMember]
          })
        }
      }
    } as unknown as Context;

    const request = { workspaceId: testWorkspace.id };

    const { getMembersByWorkspaceId } = await import(
      "../src/workspaces/getMembersByWorkspaceId"
    );

    // Act
    const members = await getMembersByWorkspaceId(ctx, request);

    // Assert
    chai.expect(members).to.deep.equal({
      members: [
        {
          id: testMember.id,
          userId: testMember.userId,
          email: testMember.user.email,
          name: testMember.user.name,
          status: testMember.status,
          role: testMember.role,
          createdAt: testMember.createdAt
        }
      ]
    });
  });

  it("should throw an error if workspace is not found when getting members", async () => {
    // Arrange
    const ctx = {
      prisma: {
        workspace: {
          findUnique: sandbox.stub().resolves(null)
        }
      }
    } as unknown as Context;

    const request = { workspaceId: testWorkspace.id };

    const { getMembersByWorkspaceId } = await import(
      "../src/workspaces/getMembersByWorkspaceId"
    );

    // Act
    const promise = getMembersByWorkspaceId(ctx, request);

    // Assert
    await chai.expect(promise).to.be.rejectedWith(TRPCError);
  });

  it("should return a queue by workspace id", async () => {
    // Arrange
    const ctx = {
      prisma: {
        workspace: {
          findUnique: sandbox.stub().resolves(testWorkspace)
        }
      },
      getCustomerById: sandbox.stub().resolves({
        id: testWorkspace.queue[0].customerId,
        name: "John Doe",
        avatar: "https://example.com/avatar.png",
        note: "Some note"
      })
    } as unknown as Context;

    const request = { workspaceId: testWorkspace.id };

    const { getQueueByWorkspaceId } = await import(
      "../src/workspaces/getQueueByWorkspaceId"
    );

    // Act
    const queue = await getQueueByWorkspaceId(ctx, request);

    // Assert
    chai.expect(queue).to.deep.equal({
      queue: [
        {
          customerId: testWorkspace.queue[0].customerId,
          createdAt: testWorkspace.queue[0].createdAt,
          updatedAt: testWorkspace.queue[0].updatedAt,
          registeredAt: testWorkspace.queue[0].registeredAt,
          status: testWorkspace.queue[0].status,
          workspaceId: testWorkspace.queue[0].workspaceId,
          aor: testWorkspace.queue[0].aor,
          customer: {
            id: testWorkspace.queue[0].customerId,
            name: "John Doe",
            avatar: "https://example.com/avatar.png",
            note: "Some note"
          }
        }
      ]
    });
  });

  it("should throw an error if workspace is not found when getting queue", async () => {
    // Arrange
    const ctx = {
      prisma: {
        workspace: {
          findUnique: sandbox.stub().resolves(null)
        }
      }
    } as unknown as Context;

    const request = { workspaceId: testWorkspace.id };

    const { getQueueByWorkspaceId } = await import(
      "../src/workspaces/getQueueByWorkspaceId"
    );

    // Act
    const promise = getQueueByWorkspaceId(ctx, request);

    // Assert
    await chai.expect(promise).to.be.rejectedWith(TRPCError);
  });

  it("should update a workspace", async () => {
    // Arrange
    const ctx = {
      prisma: {
        workspace: {
          update: sandbox.stub().resolves(testWorkspace)
        },
        shopifyAccount: {
          findUnique: sandbox.stub().resolves(null)
        }
      }
    } as unknown as Context;

    const request: UpdateWorkspaceRequest = {
      id: testWorkspace.id,
      name: testWorkspace.name,
      timezone: "America/New_York",
      hoursOfOperation: {
        Monday: {
          enabled: true,
          hours: [
            {
              start: "09:00",
              end: "17:00"
            }
          ]
        }
      }
    } as unknown as UpdateWorkspaceRequest;

    const { updateWorkspace } = await import(
      "../src/workspaces/updateWorkspace"
    );

    // Act
    const workspace = await updateWorkspace(ctx, request);

    // Assert
    chai.expect(workspace).to.have.property("id").to.equal(testWorkspace.id);
    chai
      .expect(workspace)
      .to.have.property("name")
      .to.equal(testWorkspace.name);
    chai
      .expect(workspace)
      .to.have.property("timezone")
      .to.equal("America/New_York");
    chai
      .expect(workspace)
      .to.have.property("hoursOfOperation")
      .to.deep.equal({
        Monday: {
          enabled: true,
          hours: [
            {
              start: "09:00",
              end: "17:00"
            }
          ]
        }
      });
    chai.expect(workspace).to.have.property("shopifyAccount").to.be.undefined;
  });

  it("should update a workspace with a shopify account", async () => {
    const shopifyAccount = {
      storeDomain: "123456",
      accessKey: "abc123"
    };

    const ctx = {
      prisma: {
        workspace: {
          update: sandbox.stub().resolves(testWorkspace)
        },
        shopifyAccount: {
          findUnique: sandbox.stub().resolves(shopifyAccount)
        }
      }
    } as unknown as Context;

    const request: UpdateWorkspaceRequest = {
      id: testWorkspace.id,
      name: testWorkspace.name,
      timezone: "America/New_York",
      hoursOfOperation: {
        Monday: {
          enabled: true,
          hours: [
            {
              start: "09:00",
              end: "17:00"
            }
          ]
        }
      },
      shopifyAccount: {
        accessToken: "abc123",
        storeDomain: "123456"
      }
    } as unknown as UpdateWorkspaceRequest;

    const { updateWorkspace } = await import(
      "../src/workspaces/updateWorkspace"
    );

    // Act
    const workspace = await updateWorkspace(ctx, request);

    // Assert
    chai
      .expect(workspace)
      .to.have.property("shopifyAccount")
      .to.deep.equal(shopifyAccount);
  });

  it("updates a queue entry", async () => {
    // Arrange
    const ctx = {
      prisma: {
        queueEntry: {
          findFirst: sandbox.stub().resolves(null),
          create: sandbox.stub().resolves(testWorkspace.queue[0]),
          update: sandbox.stub().resolves(testWorkspace.queue[0])
        }
      }
    } as unknown as Context;

    const request = {
      customerId: testWorkspace.queue[0].customerId,
      aor: testWorkspace.queue[0].aor,
      workspaceId: testWorkspace.queue[0].workspaceId
    };

    const { updateQueueEntry } = await import(
      "../src/workspaces/updateQueueEntry"
    );

    // Act
    const queueEntry = await updateQueueEntry(ctx, request);

    // Assert
    chai.expect(queueEntry).to.deep.equal(testWorkspace.queue[0]);
  });

  it("should observe queue for changes", async () => {
    // Arrange
    const callback = sandbox.spy();
    const mockObservable = {
      next: callback
    };

    const { watchQueue } = await import("../src/workspaces/watchQueue");
    const observable = await watchQueue(testWorkspace.id);

    // Act
    observable.subscribe(mockObservable);
    mockObservable.next(testWorkspace.queue[0]);

    // Assert
    chai.expect(callback).to.have.been.calledOnce;
  });
});
