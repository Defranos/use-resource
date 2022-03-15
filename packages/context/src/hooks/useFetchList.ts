import { useMemo } from "react";
import { useQuery } from "react-query";

import { IParser, IWithId, IAPI } from "./types";

const options = Object.freeze({
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
  retryDelay: (attemptIndex: number) => Math.min(500 ** attemptIndex, 30000),
});

const fetchRequestFactory =
  <Out extends IWithId>(endpoint: string, api: IAPI) =>
  (): Promise<Out[]> =>
    api.get<void, Out[]>(endpoint);

const useFetchList = <In extends IWithId, Out extends IWithId, CustomError>(
  endpoint: string,
  parser: IParser<In, Out>,
  api: IAPI
) => {
  const request = fetchRequestFactory<Out>(endpoint, api);
  const { data, ...rest } = useQuery<Out[], CustomError>(
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
