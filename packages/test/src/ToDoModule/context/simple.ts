import { createResourceContext } from "@use-resource/context";
import ITodo from "../model";

export default createResourceContext<ITodo, ITodo>("todos");
