import { AppBar, Container, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledAppBar = styled(AppBar)({
  background: "#F5F5F5",
  boxShadow: "none",
  padding: 0
});

export const StyledToolbar = styled(Toolbar)({
  width: "100%",
  background: "#FFF",
  borderBottom: "1px solid #E8E8E8",
  justifyContent: "center",
  height: 75,
  "&.MuiToolbar-root": {
    padding: 0
  }
});

export const StyledContainer = styled(Container)({
  width: "100%",
  "&.MuiContainer-root": {
    width: "100%",
    padding: 0
  }
});
