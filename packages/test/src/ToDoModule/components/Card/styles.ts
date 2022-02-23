import { PropsWithChildren } from "react";
import { styled, Theme } from "@mui/material/styles";
import {
  Cancel as CancelBase,
  Delete as DeleteBase,
  Check as CheckBase,
} from "@mui/icons-material";

import ITodo from "../../model";

type IStyleProps = PropsWithChildren<{
  readonly isComplete: ITodo["isComplete"];
}>;

export const TodoWrapper = styled("div")((props: IStyleProps) => ({
  padding: "1em",
  borderRadius: "10px",
  backgroundColor: props.isComplete ? "#2ca45696" : "#e6e6e6",
}));

const iconStyle = {
  cursor: "pointer",
  color: "#58585a",
  padding: ".25em",
  borderRadius: "1em",
  "&:hover": {
    background: "#cccccc",
  },
};

export const CancelIcon = styled(CancelBase)(() => iconStyle);
export const DeleteIcon = styled(DeleteBase)(() => iconStyle);
export const CheckIcon = styled(CheckBase)(() => iconStyle);
