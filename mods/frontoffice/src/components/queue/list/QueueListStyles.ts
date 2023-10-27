import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";

export const StyledQueueListTitle = styled(Typography)(() => ({
  fontFamily: "Poppins",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "24px",
  letterSpacing: "0.5px",
  color: "#27150C",
  marginTop: "20px"
}));

export const StyledAvgWaitTime = styled(Typography)(() => ({
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "28px",
  letterSpacing: "0.5px",
  color: "#27150C"
}));

export const StyledQueueListItemCount = styled(Typography)(() => ({
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "28px",
  letterSpacing: "0.5px",
  color: "#27150C"
}));

export const StyledQueueListBox = styled(Box)(() => ({
  background: "#FFF",
  boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.1)"
}));
