import React from "react";
import { CircularWrapper, CircularProgress } from "./styles";

const PageLoader = React.memo(() => {
  return (
    <CircularWrapper>
      <CircularProgress size={90} />
    </CircularWrapper>
  );
});

export default PageLoader;
