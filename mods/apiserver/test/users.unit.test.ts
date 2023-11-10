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

chai.use(chaiAsPromised);
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

describe("@apiserver[users]", () => {
  const testUser = {
    id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
    username: "johndoe",
    password: "123456",
    name: "Jhon Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.png",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  afterEach(() => sandbox.restore());

  it("should return a user", async () => {
    // Arrange
    const ctx = {
      prisma: {
        user: {
          findUnique: sandbox.stub().resolves(testUser)
        }
      }
    } as unknown as Context;

    const { getUserById } = await import("../src/users/getUserById");

    // Act
    const user = await getUserById(ctx, testUser.id);

    // Assert
    chai.expect(user).to.be.an("object");
    chai.expect(user.id).to.be.equal(testUser.id);
    chai.expect(user.username).to.be.equal(testUser.username);
    chai.expect(user.name).to.be.equal(testUser.name);
    chai.expect(user.email).to.be.equal(testUser.email);
    chai.expect(user.avatar).to.be.equal(testUser.avatar);
    chai.expect(user.createdAt).to.be.an("date").equal(testUser.createdAt);
    chai.expect(user.updatedAt).to.be.an("date").equal(testUser.updatedAt);
  });

  it("should throw an error if user is not found", async () => {
    // Arrange
    const ctx = {
      prisma: {
        user: {
          findUnique: sandbox.stub().resolves(null)
        }
      }
    } as unknown as Context;

    const { getUserById } = await import("../src/users/getUserById");

    // Act
    const promise = getUserById(ctx, testUser.id);

    // Assert
    await chai.expect(promise).to.eventually.be.rejectedWith(TRPCError);
  });

  it("should return a token", async () => {
    // Arrange
    const ctx = {
      prisma: {
        user: {
          findUnique: sandbox.stub().resolves(testUser)
        },
        workspaceMember: {
          findMany: sandbox.stub().resolves([])
        }
      },
      config: {
        jwtSecuritySalt: "abcdefg"
      }
    } as unknown as Context;

    const input = {
      username: testUser.username,
      password: "123456"
    };

    const { login } = await import("../src/users/login");

    // Act
    const token = await login(ctx, input);

    // Assert
    chai.expect(token).to.be.a("string");
  });

  it("fails to login if user is not found", async () => {
    // Arrange
    const ctx = {
      prisma: {
        user: {
          findUnique: sandbox.stub().resolves(null)
        },
        workspaceMember: {
          findMany: sandbox.stub().resolves([])
        }
      }
    } as unknown as Context;

    const input = {
      username: testUser.username,
      password: "123456", // Password is valid but user is not found
      salt: "abcdefg"
    };

    const { login } = await import("../src/users/login");

    // Act
    const promise = login(ctx, input);

    // Assert
    await chai.expect(promise).to.eventually.be.rejectedWith(TRPCError);
  });

  it("should throw an error if password is invalid", async () => {
    // Arrange
    const ctx = {
      prisma: {
        user: {
          findUnique: sandbox.stub().resolves(testUser)
        },
        workspaceMember: {
          findMany: sandbox.stub().resolves([])
        }
      }
    } as unknown as Context;

    const input = {
      username: testUser.username,
      password: "1234567", // Password is invalid
      salt: "abcdefg"
    };

    const { login } = await import("../src/users/login");

    // Act
    const promise = login(ctx, input);

    // Assert
    await chai.expect(promise).to.eventually.be.rejectedWith(TRPCError);
  });

  it("should update a user", async () => {
    // Arrange
    const ctx = {
      prisma: {
        user: {
          findUnique: sandbox.stub().resolves(testUser),
          update: sandbox.stub().resolves({
            ...testUser,
            name: "John Doe x"
          })
        }
      }
    } as unknown as Context;

    const request = {
      name: "John Doe x"
    };

    const { updateUser } = await import("../src/users/updateUser");

    // Act
    const user = await updateUser(ctx, request);

    // Assert
    chai.expect(user).to.be.an("object");
    chai.expect(user.id).to.be.equal(testUser.id);
    chai.expect(user.username).to.be.equal(testUser.username);
    chai.expect(user.name).to.be.equal("John Doe x"); // Name was updated
    chai.expect(user.email).to.be.equal(testUser.email);
    chai.expect(user.avatar).to.be.equal(testUser.avatar);
    chai.expect(user.createdAt).to.be.an("date").equal(testUser.createdAt);
  });

  it("should get a list of workspaces where the user is a member", async () => {
    // Arrange
    const ctx = {
      prisma: {
        user: {
          findUnique: sandbox.stub().resolves(testUser)
        },
        workspaceMember: {
          findMany: sandbox.stub().resolves([
            {
              id: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
              role: "OWNER",
              workspaceId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1",
              userId: "c5a6a3a6-fe03-4b10-9313-62b46dc191bc1"
            }
          ])
        }
      }
    } as unknown as Context;

    const { getMemberships } = await import("../src/users/getMemberships");

    // Act
    const memberships = await getMemberships(ctx, {
      username: testUser.username
    });

    // Assert
    chai.expect(memberships.workspaces).to.be.an("array");
    chai
      .expect(memberships.workspaces[0].id)
      .to.be.equal("c5a6a3a6-fe03-4b10-9313-62b46dc191bc1");
    chai.expect(memberships.workspaces[0].role).to.be.equal("OWNER");
  });
});
