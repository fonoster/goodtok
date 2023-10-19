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
import { formatShopifyAddress } from "../src/customers/utils";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

describe("@apiserver[customers]", () => {
  afterEach(() => sandbox.restore());

  it("should format a complete address", () => {
    const input = {
      address1: "Chestnut Street 92",
      address2: "Apartment 2",
      city: "Louisville",
      country: "United States",
      first_name: "Bob",
      id: 207119551,
      last_name: "Norman",
      phone: "555-625-1199",
      province: "Kentucky",
      zip: "40202",
      province_code: "KY",
      country_code: "US",
      country_name: "United States",
      default: true
    };

    // eslint-disable-next-line prettier/prettier
    const expectedOutput =
`Bob Norman
Chestnut Street 92
Apartment 2
Louisville, Kentucky 40202
United States
Phone: 555-625-1199`;

    chai.expect(formatShopifyAddress(input)).to.equal(expectedOutput);
  });

  it("should handle missing optional fields", () => {
    const input = {
      address1: "Chestnut Street 92",
      city: "Louisville",
      country: "United States",
      id: 207119551,
      province: "Kentucky",
      zip: "40202"
    };

    // eslint-disable-next-line prettier/prettier
    const expectedOutput =
`Chestnut Street 92
Louisville, Kentucky 40202
United States`;

    chai.expect(formatShopifyAddress(input)).to.equal(expectedOutput);
  });
});
