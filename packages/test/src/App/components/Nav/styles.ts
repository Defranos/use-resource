import { styled } from "@mui/material/styles";
import {
  AppBar as AppBarBase,
  Button as ButtonBase,
  Typography,
} from "@mui/material";

export const AppBar = styled(AppBarBase)({
  position: "relative",
  backgroundColor: "#58585a",
});

export const AppTitle = styled(Typography)({
  flexGrow: 1,
});

export const Button = styled(ButtonBase)({
  color: "white",
});
