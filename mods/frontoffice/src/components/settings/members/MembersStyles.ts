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
