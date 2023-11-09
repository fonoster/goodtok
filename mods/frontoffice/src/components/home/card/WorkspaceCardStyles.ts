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
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

export const StyledWorkspaceCard = styled("div")(() => ({
  width: "265px",
  height: "279px",
  display: "flex",
  // Make this slightly bigger than the add workspace card so that the
  // to create a visual effect that they are the same size
  padding: "31px 31px 18px 31px",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  background: "var(--tertiary-light, #FFF4F0)",
  cursor: "pointer"
}));

export const StyledWorkspaceCardCircle = styled("div")(() => ({
  width: "88px",
  height: "88px",
  flexShrink: 0,
  borderRadius: "1000px",
  background: "var(--tertiary-prime, #FF9965)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

export const StyledWorkspaceCardCircleText = styled(Typography)(() => ({
  color: "var(--tertiary-light, #FFF4F0)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "28px"
}));

export const StyledWorkspaceCardNameContainer = styled("div")(() => ({
  height: "66px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
}));

export const StyledWorkspaceCardName = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px"
}));

export const StyledWorkspaceCardDate = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "28px"
}));
