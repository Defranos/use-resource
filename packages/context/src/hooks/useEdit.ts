import { useMemo } from "react";
import { useMutation } from "react-query";

import { IParser, IWithId, IAPI } from "./types";

const editRequestFactory =
  <In extends IWithId, Out extends IWithId>(
    endpoint: string,
    parser: IParser<In, Out>,
    api: IAPI
  ) =>
  (payload: In): Promise<Out> =>
    api.put<Out, Out>(endpoint, parser.out(payload));

const useEdit = <In extends IWithId, Out extends IWithId, CustomError>(
  endpoint: string,
  parser: IParser<In, Out>,
  api: IAPI
) => {
  const request = editRequestFactory<In, Out>(endpoint, parser, api);
  const { mutate, data, ...rest } = useMutation<Out, CustomError, In>(request);

  return {
    mutate,
    data: useMemo(() => (data ? parser.in(data) : undefined), [data]),
    ...rest,
  };
};

export default useEdit;
