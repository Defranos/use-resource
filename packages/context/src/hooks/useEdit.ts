import { useMemo } from "react";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

import { IParser, IWithId } from "./types";

const editRequestFactory =
  <In extends IWithId, Out extends IWithId>(
    endpoint: string,
    parser: IParser<In, Out>
  ) =>
  (payload: In): Promise<Out> =>
    axios.put<Out>(endpoint, parser.out(payload)).then(parser.axiosResponse);

const useEdit = <In extends IWithId, Out extends IWithId, CustomError>(
  endpoint: string,
  parser: IParser<In, Out>
) => {
  const request = editRequestFactory<In, Out>(endpoint, parser);
  const { mutate, data, ...rest } = useMutation<
    Out,
    AxiosError<CustomError>,
    In
  >(request);

  return {
    mutate,
    data: useMemo(() => (data ? parser.in(data) : undefined), [data]),
    ...rest,
  };
};

export default useEdit;
