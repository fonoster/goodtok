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

import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";

type InputProps = {
  error: boolean;
};

export const StyledTitle = styled("h2")({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "28px",
  letterSpacing: "0.5px"
});

export const TextFieldStyled = styled.input<InputProps>`
  border: 1px solid var(--primary-light, #e9e9e9);
  border-radius: 4px;
  box-sizing: border-box;
  color: var(--primary-dark, #27150c);
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  height: 48px;
  line-height: 24px;
  letter-spacing: 0.5px;
  width: 100%;
  padding: 0 10px;
  border: 1px solid
    ${(props) => (props.error ? "#d32f2f" : "var(--primary-light, #e9e9e9)")};
  &:focus {
    outline: none;
    border: 2px solid
      ${(props) => (props.error ? "#d32f2f" : "var(--primary-light, #8d8d8d)")};
  }
  &::placeholder {
    color: #c9cdcf;
  }
`;

export const TextAreaStyled = styled.textarea<InputProps>`
  border-radius: 4px;
  box-sizing: border-box;
  color: var(--primary-dark, #27150c);
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  height: 120px;
  line-height: 24px;
  letter-spacing: 0.5px;
  width: 100%;
  padding: 10px;
  border: 1px solid
    ${(props) => (props.error ? "#d32f2f" : "var(--primary-light, #e9e9e9)")};
  &:focus {
    outline: none;
    border: 2px solid
      ${(props) => (props.error ? "#d32f2f" : "var(--primary-light, #8d8d8d)")};
  }
  &::placeholder {
    color: #c9cdcf;
  }
  resize: none;
`;

export const StyledButton = styled.button`
  background: linear-gradient(323deg, #ff9965 30.56%, #df682b 118.19%);
  width: 100%;
  height: 37px;
  flex-shrink: 0;
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  color: var(--base-01, #fff);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Poppins;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 1.32px;
  text-transform: uppercase;
  border-radius: 40px;
  border: none;
  box-shadow: none;
  transition: background 0.3s ease; /* Add transition for smooth hover effect */
  &:hover {
    cursor: pointer;
    background: linear-gradient(
      323deg,
      #ff9965 55%,
      #df682b 120%
    ); /* Adjust the gradient stops for hover */
  }
`;
