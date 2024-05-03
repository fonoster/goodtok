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
import { Context } from "../src/context";
import { TRPCError } from "@trpc/server";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

describe("@apiserver[queues]", () => {
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
        workspaceId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1"
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

  afterEach(() => sandbox.restore());

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

    const { getQueueByWorkspaceId } = await import(
      "../src/queues/getQueueByWorkspaceId"
    );

    // Act
    const queue = await getQueueByWorkspaceId(ctx, testWorkspace.id);

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
          customer: {
            id: testWorkspace.queue[0].customerId,
            email: undefined,
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

    const { getQueueByWorkspaceId } = await import(
      "../src/queues/getQueueByWorkspaceId"
    );

    // Act
    const promise = getQueueByWorkspaceId(ctx, testWorkspace.id);

    // Assert
    await chai.expect(promise).to.be.rejectedWith(TRPCError);
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
      workspaceId: testWorkspace.queue[0].workspaceId,
      expires: 300,
      metadata: {}
    };

    const { updateQueueEntry } = await import("../src/queues/updateQueueEntry");

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

    const { watchQueue } = await import("../src/queues/watchQueue");
    const observable = await watchQueue(testWorkspace.id);

    // Act
    observable.subscribe(mockObservable);
    mockObservable.next(testWorkspace.queue[0]);

    // Assert
    chai.expect(callback).to.have.been.calledOnce;
  });
});
