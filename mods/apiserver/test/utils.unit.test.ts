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
import { ContextOptionsWithUrl } from "../src/types";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

describe("@apiserver[utils]", () => {
  afterEach(() => sandbox.restore());

  it("gets the token from the url path", async () => {
    // Arrange
    const request = {
      req: {
        url: "/v1/users?token=123456"
      }
    } as unknown as ContextOptionsWithUrl;

    // Act
    const { getToken } = await import("../src/utils");

    // Assert
    chai.expect(getToken(request)).to.equal("123456");
  });

  it("gets the token from the authorization header", async () => {
    // Arrange
    const request = {
      req: {
        headers: {
          authorization: "Bearer 123456"
        }
      }
    } as unknown as ContextOptionsWithUrl;

    // Act
    const { getToken } = await import("../src/utils");

    // Assert
    chai.expect(getToken(request)).to.equal("123456");
  });

  it("generates a token for the authenticated user", async () => {
    // Arrange
    const request = {
      user: {
        id: "123456",
        username: "test",
        ownedWorkspaces: [
          {
            id: "123456",
            name: "test"
          }
        ]
      },
      jwtSecuritySalt: "123456",
      jwtSignOptions: {
        expiresIn: "24h"
      }
    };

    // Act
    const { generateToken } = await import("../src/utils");

    // Assert
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chai.expect(generateToken(request as any)).to.be.a("string");
  });

  it("verifies the the function throws an error if the token is invalid", async () => {
    // Arrange
    const request = {
      token: "123456",
      jwtSecuritySalt: "abcdefg",
      jwtSignOptions: {
        expiresIn: "24h"
      }
    };

    // Act
    const { verifyToken } = await import("../src/utils");

    // Assert
    chai.expect(() => verifyToken(request)).to.throw;
  });
});
