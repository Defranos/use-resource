import { useMemo } from "react";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";

import { IParser, IWithId } from "./types";

const options = Object.freeze({
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
  retryDelay: (attemptIndex: number) => Math.min(500 ** attemptIndex, 30000),
});

const fetchRequestFactory =
  <In extends IWithId, Out extends IWithId>(
    endpoint: string,
    parser: IParser<In, Out>
  ) =>
  (): Promise<Out[]> =>
    axios.get(endpoint).then(parser.axiosResponse);

const useFetchList = <In extends IWithId, Out extends IWithId, CustomError>(
  endpoint: string,
  parser: IParser<In, Out>
) => {
  const request = fetchRequestFactory<In, Out>(endpoint, parser);
  const { data, ...rest } = useQuery<Out[], AxiosError<CustomError> | null>(
    endpoint,
    request,
    options
  );

  return {
    data: useMemo(() => data?.map(parser.in) || [], [data]),
    ...rest,
  };
};

export default useFetchList;
