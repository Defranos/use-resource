import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

import { IWithId } from "./types";

const deleteRequestFactory =
  <In extends IWithId>(endpoint: string) =>
  (payload: In["id"]): Promise<void> =>
    axios.delete<void>(`${endpoint}/${payload}`).then();

const useDelete = <In extends IWithId, CustomError>(endpoint: string) => {
  const request = deleteRequestFactory<In>(endpoint);
  return useMutation<void, AxiosError<CustomError>, In["id"]>(request);
};

export default useDelete;
