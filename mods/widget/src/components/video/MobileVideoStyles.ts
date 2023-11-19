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
import styled from "styled-components";

export const MobileVideoContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const RemoteVideoContainer = styled.div`
  height: 100vh;
  width: auto;
  contain: content;
`;

export const RemoteVideo = styled.video`
  position: relative;
  height: 100%;
  width: auto;
  background-color: #000;
  opacity: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.5s ease-in-out;
`;

export const LocalVideoContainer = styled.div`
  position: absolute;
  contain: content;
  height: 90px;
  background-color: #000;
  position: absolute;
  right: 0;
  top: 0;
`;

export const LocalVideo = styled.video`
  background-color: #000;
  position: relative;
  height: auto;
  width: 160px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`;

export const MutedOverlay = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  // Aspects ratio 9:16
  height: 90px;
  width: 160px;
  z-index: 1;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Controls = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  height: 40px;
`;

export const ButtonCircleWrapper = styled.div`
  margin: 0 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
