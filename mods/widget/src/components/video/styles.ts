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

export const GoodtokWidget = styled.div`
  background-color: #fff;
  border-radius: 30px 30px 12px 12px;
  width: 584px;
  height: 388px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
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

export const VideoContainer = styled.div`
  position: relative;
  contain: content;
  height: 327px;
  background-color: #fff;
  border-radius: 0px 0px 12px 12px;
`;

export const CustomerVideo = styled.video`
  position: absolute;
  left: 24px;
  top: 24px;
  height: 90px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

export const StaffVideo = styled.video`
  background-color: #fff;
  position: relative;
  top: -55px;
  border-radius: 0px 0px 12px 12px;
  height: auto;
  width: 584px;
`;

export const MutedOverlay = styled.div`
  position: absolute;
  left: 24px;
  top: 24px;
  height: 90px;
  width: 160px;
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
