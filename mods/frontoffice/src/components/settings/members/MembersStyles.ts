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
import {
  Box,
  Link,
  Table,
  TableCell,
  TableContainer,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

export const StyledBox = styled(Box)({
  backgroundColor: "#FFFFFF",
  padding: "24px"
});

export const StyledTable = styled(Table)({
  width: "100%"
});

export const StyledTableContainer = styled(TableContainer)({
  minWidth: "100%",
  borderRadius: "0px",
  boxShadow: "none"
});

export const StyledTableHeadCell = styled(TableCell)({
  color: "#27150C",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal"
});

export const StyledTableCell = styled(TableCell)({
  color: "#27150C",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "24px"
});

export const StyledTitle = styled(Typography)({
  color: "#27150C",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px",
  letterSpacing: "0.5px"
});

export const StyledLink = styled(Link)({
  color: "#27150C",
  textAlign: "right",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "28px",
  letterSpacing: "0.5px",
  textDecoration: "none",
  "&:hover": {
    textDecorationLine: "underline"
  },
  cursor: "pointer"
});
