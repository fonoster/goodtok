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
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

type QueueItemProps = {
  isOdd: boolean;
};

export const StyledQueueItem = styled("div")<QueueItemProps>(({ isOdd }) => ({
  width: "670px",
  padding: "16px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  background: "var(--tertiary-light, #F4F4F4)",
  ...(isOdd && {
    background: "var(--tertiary-light, #FFFFFF)"
  }),
  cursor: "pointer",
  "&:hover": {
    background: "var(--tertiary-light, #FFF4F0)"
  }
}));

export const StyledQueueItemContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "8px",
  width: "100%"
}));

export const StyledOnlineTitle = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal"
}));

export const StyledCustomerName = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "24px",
  flexGrow: 1
}));

export const StyledCustomerNote = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "24px"
}));

export const StyledTime = styled(Typography)(() => ({
  color: "var(--tertiary-dark, #27150C)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal"
}));

export const FlexBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  width: "100%"
}));
