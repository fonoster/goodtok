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
import { Button } from "../../button/Button";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";

export const StartCallContainer = styled("div")({
  backgroundColor: "#fff",
  width: "900px",
  // Updated to match the size of the video
  height: "554px"
});

export const StartCallTitle = styled(Typography)({
  fontFamily: "Poppins",
  fontSize: "24px",
  fontWeight: 600,
  lineHeight: "28px",
  letterSpacing: "0.5px",
  color: "#27150C",
  textAlign: "center",
  marginTop: "32px"
});

export const StartCallBody = styled(Typography)({
  fontFamily: "Poppins",
  fontSize: "17px",
  fontWeight: 500,
  lineHeight: "24px",
  color: "#27150C",
  textAlign: "center",
  marginTop: "16px"
});

export const StyledStartCallButton = styled(Button)({
  width: "220px"
});

export const StyledReturnToQueueButton = styled(Button)({
  width: "220px",
  marginLeft: "16px"
});
