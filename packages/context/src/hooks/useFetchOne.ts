import { useMemo } from "react";
import { useMutation } from "react-query";

import { IParser, IWithId, IAPI } from "./types";

const fetchOneRequestFactory =
  <In extends IWithId, Out extends IWithId>(endpoint: string, api: IAPI) =>
  (payload: In["id"]): Promise<Out> =>
    api.get<void, Out>(`${endpoint}/${payload}`);

const useFetchOne = <In extends IWithId, Out extends IWithId, CustomError>(
  endpoint: string,
  parser: IParser<In, Out>,
  api: IAPI
) => {
  const request = fetchOneRequestFactory<In, Out>(endpoint, api);
  const { mutate, data, ...rest } =
    useMutation<Out, CustomError, In["id"]>(request);

  return {
    mutate,
    data: useMemo(() => (data ? parser.in(data) : undefined), [data]),
    ...rest,
  };
};

export default useFetchOne;
