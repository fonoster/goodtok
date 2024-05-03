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
import styled, { createGlobalStyle, keyframes } from "styled-components";

// This global style is to inject the imported font into your styled components.
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
`;

export const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const NotificationBody = styled.div`
  height: 139px;
  display: flex;
  padding: 8px 32px 0px 32px;
`;

export const InnerContainer = styled.div`
  width: 244px;
  text-align: center;
`;

export const WaitingIndicator = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`;

export const StyledSpan = styled.span`
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
`;

export const StyledP = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.07px;
`;

export const NotificationHeader = styled.div`
  padding: 24px 24px 8px 24px;
  display: flex;
  justify-content: flex-end;
`;

export const Rotate = styled.div`
  animation: ${rotateAnimation} 1.2s linear infinite;
  transform-origin: center center;
`;
