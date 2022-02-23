import { useMemo } from "react";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

import { IParser, IWithId } from "./types";

const createRequestFactory =
  <In, Out extends IWithId>(endpoint: string, parser: IParser<In, Out>) =>
  (payload: Partial<In>): Promise<Out> =>
    axios
      .post<Out>(endpoint, parser.partialOut(payload))
      .then(parser.axiosResponse);

const useCreate = <In, Out extends IWithId, CustomError>(
  endpoint: string,
  parser: IParser<In, Out>
) => {
  const request = createRequestFactory<In, Out>(endpoint, parser);
  const { mutate, data, ...rest } = useMutation<
    Out,
    AxiosError<CustomError>,
    Partial<In>
  >(request);

  return {
    mutate,
    data: useMemo(() => (data ? parser.in(data) : undefined), [data]),
    ...rest,
  };
};

export default useCreate;
