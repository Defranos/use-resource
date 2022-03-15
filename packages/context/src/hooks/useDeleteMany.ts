import { useMutation } from "react-query";
import { IWithId, IAPI } from "./types";

const deleteManyRequestFactory =
  <In extends IWithId>(endpoint: string, api: IAPI) =>
  (payload: In["id"][]): Promise<void> =>
    api.delete<In["id"][], void>(endpoint, payload).then();

const useDeleteMany = <In extends IWithId, CustomError>(
  endpoint: string,
  api: IAPI
) => {
  const request = deleteManyRequestFactory<In>(endpoint, api);
  return useMutation<void, CustomError, In["id"][]>(request);
};

export default useDeleteMany;
