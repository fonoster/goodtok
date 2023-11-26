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

export const MenuContainerStyled = styled.div`
  background-color: #fff;
  border-radius: 30px;
  width: 308px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
`;

export const ContentArea = styled.div`
  padding: 0;
  width: 308px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StatusArea = styled.div`
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  border-radius: 0px 0px 30px 30px;
  height: 36px;
  padding: 10px 32px 16px 32px;
  display: flex;
  justify-content: space-between;
`;

export const StatusAreaLabel = styled.span`
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 21px;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  &.powered-by {
    cursor: pointer;
    gap: 10px;
  }
  &.status-area-container {
    display: flex;
    justify-content: space-between;
    gap: 17px;
  }
`;
