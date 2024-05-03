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
import { Divider, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";
import "@fontsource/open-sans/400.css";

export const LoginFormTitle = styled("h3")(() => ({
  width: 440,
  height: 34,
  flexShrink: 0,
  color: "#27150C",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: 24,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "28px",
  letterSpacing: 0.5
}));

export const LoginFormFooterText = styled("h3")(() => ({
  width: 440,
  height: 34,
  flexShrink: 0,
  color: "#27150C",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: 20,
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px",
  letterSpacing: 0.5
}));

export const LinkStyled = styled(Link)(() => ({
  color: "#27150C",
  fontFamily: "Open Sans",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16px",
  textDecoration: "underline",
  // "&:hover": {
  //   textDecoration: "none"
  // }
  cursor: "pointer"
}));

export const ErrorStyled = styled("p")(() => ({
  color: "#FF9965",
  fontFamily: "Open Sans",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16px",
  letterSpacing: 0.25
}));

export const StyledDivider = styled(Divider)(() => ({
  color: "#252525",
  textAlign: "center",
  fontFamily: "Open Sans",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16px",
  letterSpacing: 0.25
}));
