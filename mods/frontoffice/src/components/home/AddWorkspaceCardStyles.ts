import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/poppins/500.css";

export const StyledAddWorkspaceCard = styled("div")(() => ({
  width: "265px",
  height: "279px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  border: "1px solid #FF9965"
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
