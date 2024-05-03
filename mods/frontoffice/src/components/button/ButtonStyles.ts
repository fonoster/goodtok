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
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "@fontsource/poppins/600.css";

export const PrimaryButtonStyle = styled(Button)(({ color }) => ({
  background:
    color === "primary"
      ? "linear-gradient(323deg, #FF9965 30.56%, #DF682B 118.19%)"
      : "var(--base-05, #8D8D8D)",
  width: "100%",
  height: "37px",
  flexShrink: "0",
  display: "flex",
  padding: "8px 16px",
  justifyContent: "center",
  alignItems: "center",
  color: "var(--base-01, #FFF)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: 11,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "21px",
  letterSpacing: "1.32px",
  textTransform: "uppercase",
  borderRadius: "40px",
  border: "none",
  boxShadow: "none",
  "&:hover": {
    border: "none",
    boxShadow: "none",
    background:
      color === "primary"
        ? "linear-gradient(323deg, #FF9965 30.56%, #DF682B 118.19%)"
        : "var(--base-05, #8D8D8D)"
  }
}));

export const OutlinedButtonStyle = styled(Button)(({ color }) => ({
  border:
    color === "primary"
      ? "2px solid var(--base-01, #FF9965)"
      : "2px solid var(--base-01, #8D8D8D)",
  width: "100%",
  height: "37px",
  flexShrink: "0",
  display: "flex",
  padding: "8px 16px",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Poppins",
  fontSize: 11,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "21px",
  letterSpacing: "1.32px",
  textTransform: "uppercase",
  borderRadius: "40px",
  boxShadow: "none",
  background: "transparent",
  color: "var(--base-01, #000)",
  "&:hover": {
    color: "var(--base-01, #FFF)",
    background:
      color === "primary"
        ? "linear-gradient(323deg, #FF9965 30.56%, #DF682B 118.19%)"
        : "var(--base-05, #8D8D8D)",
    border:
      color === "primary"
        ? "2px solid var(--base-01, #FF9965)"
        : "2px solid var(--base-01, #8D8D8D)"
  }
}));
