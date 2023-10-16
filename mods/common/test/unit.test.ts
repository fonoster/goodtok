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
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { mediaToggle } from "../src/utils";
import { SimpleUser } from "sip.js/lib/platform/web";

chai.use(sinonChai);
const sandbox = sinon.createSandbox();
describe("@common", () => {
  afterEach(() => sandbox.restore());

  const createMockTrack = (
    kind: "audio" | "video",
    enabled: boolean
  ): MediaStreamTrack =>
    ({
      kind,
      enabled
    } as unknown as MediaStreamTrack);

  it("should disable audio tracks", () => {
    const mockTrack = createMockTrack("audio", true);
    const mockUser: Partial<SimpleUser> = {
      localMediaStream: {
        getTracks: () => [mockTrack]
      } as unknown as MediaStream
    };

    mediaToggle(mockUser as SimpleUser, false, "audio");
    expect(mockTrack.enabled).to.be.false;
  });

  it("should disable video tracks", () => {
    const mockTrack = createMockTrack("video", true);
    const mockUser: Partial<SimpleUser> = {
      localMediaStream: {
        getTracks: () => [mockTrack]
      } as unknown as MediaStream
    };

    mediaToggle(mockUser as SimpleUser, false, "video");
    expect(mockTrack.enabled).to.be.false;
  });
});
