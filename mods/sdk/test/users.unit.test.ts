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
import { Client, Users } from "../src";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("@sdk[users]", () => {
  const userId = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
  let mockClient: Client;
  let queryStub: sinon.SinonStub;
  let mutateStub: sinon.SinonStub;

  beforeEach(() => {
    mockClient = {
      getCurrentUserId: () => userId
    } as unknown as Client;

    queryStub = sandbox.stub().returns(Promise.resolve({ id: userId }));
    mutateStub = sandbox.stub().returns(Promise.resolve({ id: userId }));

    sandbox.stub(Users.prototype, "createTRPCProxy").returns({
      users: {
        getUserById: {
          query: queryStub
        },
        getCurrentUser: {
          query: queryStub
        },
        updateUser: {
          mutate: mutateStub
        }
      }
    } as unknown as ReturnType<typeof Users.prototype.createTRPCProxy>);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should get a user by its id", async () => {
    // Arrange
    const users = new Users(mockClient);

    // Act
    const user = await users.getUserById(userId);

    // Assert
    expect(queryStub).to.have.been.calledOnce;
    expect(user.id).to.equal(userId);
  });

  it("should get the authenticated user", async () => {
    // Arrange
    const users = new Users(mockClient);

    // Act
    const user = await users.getCurrentUser();

    // Assert
    expect(queryStub).to.have.been.calledOnce;
    expect(user.id).to.equal(userId);
  });

  it("should update a user", async () => {
    // Arrange
    const users = new Users(mockClient);
    const request = {
      id: userId,
      name: "John",
      avatar: "https://example.com/avatar.png"
    };

    // Act
    const response = await users.updateUser(request);

    // Assert
    expect(mutateStub).to.have.been.calledOnce;
    expect(response.id).to.equal(userId);
  });
});
