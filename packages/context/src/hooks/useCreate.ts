import { useMemo } from "react";
import { useMutation } from "react-query";

import { IParser, IWithId, IAPI } from "./types";

const createRequestFactory =
  <In, Out extends IWithId>(
    endpoint: string,
    parser: IParser<In, Out>,
    api: IAPI
  ) =>
  (payload: Partial<In>): Promise<Out> =>
    api.post<Partial<Out>, Out>(endpoint, parser.partialOut(payload));

const useCreate = <In, Out extends IWithId, CustomError>(
  endpoint: string,
  parser: IParser<In, Out>,
  api: IAPI
) => {
  const request = createRequestFactory<In, Out>(endpoint, parser, api);
  const { mutate, data, ...rest } =
    useMutation<Out, CustomError, Partial<In>>(request);

  return {
    mutate,
    data: useMemo(() => (data ? parser.in(data) : undefined), [data]),
    ...rest,
  };
};

export default useCreate;
