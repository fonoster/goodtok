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
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

export const StyledBox = styled(Box)({
  backgroundColor: "#FFFFFF",
  width: "440px",
  height: "404px",
  flexShrink: 0,
  padding: "24px"
});

export const StyledTitle = styled(Typography)({
  color: "#27150C",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px",
  letterSpacing: "0.5px"
});
