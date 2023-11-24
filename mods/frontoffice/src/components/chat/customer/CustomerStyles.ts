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
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";

import "@fontsource/open-sans/600.css";

export const StyledLink = styled(Link)({
  color: "var(--tertiary-dark, #27150C)",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "open sans",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "24px",
  letterSpacing: "-0.176px",
  textDecoration: "underline",
  "&:hover": {
    textDecorationLine: "underline"
  },
  cursor: "pointer"
});
