import {
  AppBar,
  Container,
  Toolbar,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem
} from "@mui/material";
import { styled } from "@mui/material/styles";

import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";

type StyledToolbarProps = {
  isAuthenticated?: boolean;
};

type StyledAppBarProps = {
  isAuthenticated?: boolean;
};

export const StyledMenu = styled(MuiMenu)({
  "& .MuiPaper-root": {
    padding: "10px",
    background: "#FFF",
    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
    width: "270px"
  }
});

export const StyledMenuItem = styled(MuiMenuItem)({
  "&.MuiMenuItem-root": {
    padding: "0px 10px",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%",
    height: "44px"
  }
});

export const StyledMenuItemSignout = styled(MuiMenuItem)({
  "&.MuiMenuItem-root": {
    padding: "0px 10px",
    color: "#000",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150%",
    height: "44px",
    textDecoration: "underline"
  }
});

export const StyledMenuUser = styled("p")({
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "150%",
  color: "#000",
  margin: "0px 10px",
  marginBottom: "8px",
  height: "44px"
});

export const StyledAppBar = styled(AppBar)<StyledAppBarProps>(
  ({ isAuthenticated }) => ({
    background: "#FFF",
    padding: 0,
    ...(isAuthenticated
      ? {
          boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)"
        }
      : {
          boxShadow: "none"
        })
  })
);

export const StyledToolbar = styled(Toolbar)<StyledToolbarProps>(
  ({ isAuthenticated }) => ({
    background: "#FFF",
    justifyContent: "center",
    height: 75,
    ...(!isAuthenticated
      ? {
          borderBottom: "1px solid #E8E8E8",
          "&.MuiToolbar-root": {
            padding: 0
          }
        }
      : {})
  })
);

export const StyledContainer = styled(Container)({
  width: "100%",
  "&.MuiContainer-root": {
    width: "100%",
    padding: 0
  }
});
