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
