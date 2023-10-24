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

export const MenuItemContainer = styled.div<{ isTopElement?: boolean }>`
  height: 36px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 32px;
  border-top: 1px solid #e8e8e8;
  cursor: pointer;

  &:hover,
  &:hover label {
    background-color: #f5f5f5;
  }

  ${(props) =>
    props.isTopElement &&
    `
    border-top: none;
    border-radius: 30px 30px 0px 0px;
  `}
`;

export const Label = styled.label`
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
`;
