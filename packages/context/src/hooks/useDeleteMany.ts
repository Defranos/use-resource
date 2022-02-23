import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

import { IWithId } from "./types";

const deleteManyRequestFactory =
  <In extends IWithId>(endpoint: string) =>
  (payload: In["id"][]): Promise<void> =>
    axios.delete<void>(endpoint, { data: payload }).then();

const useDeleteMany = <In extends IWithId, CustomError>(endpoint: string) => {
  const request = deleteManyRequestFactory<In>(endpoint);
  return useMutation<void, AxiosError<CustomError>, In["id"][]>(request);
};

export default useDeleteMany;
