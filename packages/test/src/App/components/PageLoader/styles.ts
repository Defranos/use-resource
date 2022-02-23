import { CircularProgressProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CircularProgress as CircularProgressBase } from "@mui/material";

export const CircularWrapper = styled("div")({
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  height: "100%",
});

export const CircularProgress = styled(
  CircularProgressBase
)<CircularProgressProps>(({ theme }) => ({
  margin: theme.spacing(2),
}));
