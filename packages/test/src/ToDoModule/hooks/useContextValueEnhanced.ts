import { Dispatch } from "react";
import useResource, {
  IParser,
  ExtraPropertiesType,
} from "@use-resource/context";
import ITodo from "../model";
import { CustomMethodsPayloads } from "../context/enhanced";
import useComplete from "./useComplete";
import useUnComplete from "./useUnComplete";
import customReducer, { ExtraActions } from "./customReducer";

const parser: IParser<ITodo, ITodo> = {
  in: (e) => e,
  out: (e) => e,
  partialOut: (e) => e,
  axiosResponse: ({ data }) => data,
};

const useContextValue = () => {
  const complete = useComplete();
  const unComplete = useUnComplete();

  const handleUnComplete = (dispatch: Dispatch<ExtraActions>) => {
    return (payload: ITodo) => {
      dispatch({ type: "UNCOMPLETE_REQUESTED", payload });

      const onSuccess = () => {
        dispatch({ type: "UNCOMPLETE_SUCCEEDED", payload });
      };

      const onError = () => {
        dispatch({ type: "UNCOMPLETE_FAILED", payload });
      };

      unComplete.mutate(payload.id, { onSuccess, onError });
    };
  };
  const handleComplete = (dispatch: Dispatch<ExtraActions>) => {
    return (payload: ITodo) => {
      dispatch({ type: "COMPLETE_REQUESTED", payload });

      const onSuccess = () => {
        dispatch({ type: "COMPLETE_SUCCEEDED", payload });
      };

      const onError = () => {
        dispatch({ type: "COMPLETE_FAILED", payload });
      };

      unComplete.mutate(payload.id, { onSuccess, onError });
    };
  };

  const extraProperties: ExtraPropertiesType<CustomMethodsPayloads> = {
    unComplete: {
      method: handleUnComplete,
      loading: unComplete.isLoading,
      error: unComplete.error,
      mutationReseter: unComplete.reset,
      status: unComplete.status,
    },
    complete: {
      method: handleComplete,
      loading: complete.isLoading,
      error: complete.error,
      mutationReseter: complete.reset,
      status: complete.status,
    },
  };

  return useResource<ITodo, ITodo, typeof extraProperties, Error>({
    endpoint: "http://localhost:4000/todos",
    parser,
    extraProperties,
    customReducer,
  });
};

export default useContextValue;
