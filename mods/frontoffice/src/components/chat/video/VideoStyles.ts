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
import styled from "styled-components";

export const GoodtokWidget = styled.div`
  background-color: #fff;
  width: 900px;
  height: 554px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 35px;
  padding: 16px 24px 10px 24px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;

  > *:not(:last-child) {
    margin-right: 10px;
  }

  > :last-child {
    margin-left: auto;
  }
`;

export const RemoteVideoContainer = styled.div`
  position: relative;
  contain: content;
  height: 495px;
  background-color: #000;
`;

export const RemoteVideo = styled.video`
  background-color: #000;
  position: relative;
  top: -55px;
  height: auto;
  width: 900px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`;

export const LocalVideoContainer = styled.div`
  position: relative;
  contain: content;
  height: 129px;
  background-color: #000;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  position: absolute;
  left: 24px;
  top: 24px;
`;

export const LocalVideo = styled.video`
  background-color: #000;
  position: relative;
  height: auto;
  width: 229px;
  top: -15px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`;

export const MutedOverlay = styled.div`
  position: absolute;
  left: 24px;
  top: 24px;
  height: 129px;
  width: 229px;
  border-radius: 4px;
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

  &:hover {
    cursor: pointer;
  }
`;
