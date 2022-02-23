import { useMemo } from "react";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

import { IParser, IWithId } from "./types";

const fetchOneRequestFactory =
  <In extends IWithId, Out extends IWithId>(
    endpoint: string,
    parser: IParser<In, Out>
  ) =>
  (payload: In["id"]): Promise<Out> =>
    axios.get<Out>(`${endpoint}/${payload}`).then(parser.axiosResponse);

const useFetchOne = <In extends IWithId, Out extends IWithId, CustomError>(
  endpoint: string,
  parser: IParser<In, Out>
) => {
  const request = fetchOneRequestFactory<In, Out>(endpoint, parser);
  const { mutate, data, ...rest } = useMutation<
    Out,
    AxiosError<CustomError>,
    In["id"]
  >(request);

  return {
    mutate,
    data: useMemo(() => (data ? parser.in(data) : undefined), [data]),
    ...rest,
  };
};

export default useFetchOne;
