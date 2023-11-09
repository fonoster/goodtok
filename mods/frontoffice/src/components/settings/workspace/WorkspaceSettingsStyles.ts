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
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";

export const StyledBox = styled(Box)(() => ({
  width: "440px",
  height: "auto",
  background: "var(--base-01, #FFF)",
  paddingTop: "32px",
  paddingLeft: "24px",
  paddingRight: "24px"
}));

export const SettingsTitle = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px",
  letterSpacing: "0.5px",
  marginBottom: "8px"
}));
