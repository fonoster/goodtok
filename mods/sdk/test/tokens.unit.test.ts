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
import { Client, Tokens } from "../src";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("@sdk[tokens]", () => {
  const customerId = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
  let mockClient: Client;
  let mutateStub: sinon.SinonStub;

  beforeEach(() => {
    mockClient = {} as Client;
    mutateStub = sandbox.stub().returns(Promise.resolve({}));

    sandbox.stub(Tokens.prototype, "createTRPCProxy").returns({
      tokens: {
        createAnonymousToken: {
          mutate: mutateStub
        },
        createToken: {
          mutate: mutateStub
        }
      }
    } as unknown as ReturnType<typeof Tokens.prototype.createTRPCProxy>);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should create an anonymous token with the given claims", async () => {
    // Arrange
    const tokens = new Tokens(mockClient);
    const request = {
      ref: customerId
    };

    // Act
    await tokens.createAnonymousToken(request);

    // Assert
    expect(mutateStub).to.have.been.calledOnce;
  });

  it("should create a token with the given claims", async () => {
    // Arrange
    const tokens = new Tokens(mockClient);
    const request = {
      ref: customerId,
      customerId: customerId
    };

    // Act
    await tokens.createToken(request);

    // Assert
    expect(mutateStub).to.have.been.calledOnce;
  });
});
