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
import { Drawer, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";

export const StyledDrawer = styled(Drawer)({
  padding: "24px",
  "& .MuiDrawer-paper": {
    backgroundColor: "#FFFFFF",
    boxShadow: "5px 0px 40px 5px rgba(0, 0, 0, 0.10)",
    borderRight: "none !important",
    marginTop: "75px",
    paddingTop: "24px",
    height: "calc(100% - 75px - 24px)",
    width: "250px"
  },
  "& .Mui-selected": {
    backgroundColor: "#FFF4F0 !important"
  },
  "& .Mui-selected .MuiTypography-root": {
    fontWeight: 500
  },
  "& .MuiTypography-root": {
    fontFamily: "Poppins"
  }
});

export const StyledTitle = styled(Typography)({
  color: "#27150C",
  fontFamily: "Poppins",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "28px",
  letterSpacing: "0.5px"
});

export const StyledLink = styled(Link)({
  color: "#000",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "150%",
  textDecoration: "none",
  "&:hover": {
    textDecorationLine: "underline"
  },
  cursor: "pointer"
});
