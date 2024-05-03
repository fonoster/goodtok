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

export const StyledAddWorkspaceCard = styled("div")(() => ({
  width: "325px",
  height: "325px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #FF9965",
  cursor: "pointer"
}));

export const StyledAddWorkspaceCardText = styled(Typography)(() => ({
  color: "#27150C",
  textAlign: "center",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "56px",
  letterSpacing: "2px",
  padding: "0 16px",
  margin: "0",
  textTransform: "uppercase"
}));
