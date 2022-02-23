import { styled } from "@mui/material/styles";

export const RotatedWrapper = styled("div")`
  position: relative;
  width: 180px;
  height: 180px;
  animation: App-logo-spin infinite 40s linear;
  @keyframes App-logo-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
