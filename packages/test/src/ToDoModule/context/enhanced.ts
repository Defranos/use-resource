import { createResourceContext } from "@use-resource/context";
import ITodo from "../model";

export type CustomMethodsPayloads = {
  unComplete: ITodo;
  complete: ITodo;
};

export default createResourceContext<ITodo, ITodo, CustomMethodsPayloads>(
  "todos",
  ["unComplete", "complete"]
);
