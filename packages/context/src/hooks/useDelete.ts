import { useMutation } from "react-query";

import { IWithId, IAPI } from "./types";

const deleteRequestFactory =
  <In extends IWithId>(endpoint: string, api: IAPI) =>
  (payload: In["id"]): Promise<void> =>
    api.delete<void, void>(`${endpoint}/${payload}`);

const useDelete = <In extends IWithId, CustomError>(
  endpoint: string,
  api: IAPI
) => {
  const request = deleteRequestFactory<In>(endpoint, api);
  return useMutation<void, CustomError, In["id"]>(request);
};

export default useDelete;
