import useResource, { IParser } from "@use-resource/context";
import ITodo from "../model";

const parser: IParser<ITodo, ITodo> = {
  in: (e) => e,
  out: (e) => e,
  partialOut: (e) => e,
  axiosResponse: ({ data }) => data,
};

const endpoint = "http://localhost:4000/todos";
export default () => useResource<ITodo, ITodo>({ endpoint, parser });
