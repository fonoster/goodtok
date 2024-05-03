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
import { StepButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/open-sans/600.css";
import "@fontsource/poppins/500.css";

export const OnboardingTitle = styled("h3")(() => ({
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

export const OnboardingBody = styled(Typography)(() => ({
  width: 440,
  height: 34,
  flexShrink: 0,
  color: "#27150C",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: 13,
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "18px",
  letterSpacing: 0.5
}));

export const StyledStepButton = styled(StepButton)(() => ({
  ".MuiStepIcon-text": { display: "none" },
  "& .MuiStepLabel-root .Mui-active": {
    color: "#FF9965"
  },
  "& .MuiStepLabel-root .Mui-completed": {
    color: "gray"
  }
}));
