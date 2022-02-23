import { Dispatch, useReducer } from "react";
import { mergeDeepRight, keys } from "ramda";
import {
  ICustomReducer,
  IAction,
  Action,
  IWithId,
  Reducer,
  IState,
} from "./types";

type CustomMethods<T extends IWithId, Properties> = {
  [Property in keyof Properties]: (payload: T) => void;
};
function isAction<T extends IWithId>(
  action: IAction<string, any>
): action is Action<T> {
  return [
    "CREATE_SUCCEEDED",
    "CREATE_REQUESTED",
    "CREATE_MANY_SUCCEEDED",
    "CREATE_MANY_REQUESTED",
    "EDIT_SUCCEEDED",
    "EDIT_REQUESTED",
    "FETCH_SUCCEEDED",
    "FETCH_ONE_SUCCEEDED",
    "FETCH_ONE_REQUESTED",
    "DELETE_ONE_SUCCEEDED",
    "DELETE_ONE_REQUESTED",
    "DELETE_MANY_SUCCEEDED",
    "DELETE_MANY_REQUESTED",
  ].includes(action.type);
}

const reducer =
  <T extends IWithId>(customReducer?: ICustomReducer<T>) =>
  (state: IState<T>, action: Action<T> | IAction<string, T>): IState<T> => {
    if (!isAction<T>(action)) {
      return customReducer ? customReducer(state, action) : state;
    }

    switch (action.type) {
      case "FETCH_SUCCEEDED":
        return action.payload.reduce(
          (acc, element) => ({
            ...acc,
            [String(element.id)]: {
              element: mergeDeepRight(
                { ...state[String(element.id)]?.element },
                element
              ),
              isLoading: false,
              isFull: state[String(element.id)]?.isFull || false,
            },
          }),
          {}
        );

      case "EDIT_REQUESTED":
        return {
          ...state,
          [String(action.payload.id)]: {
            ...state[String(action.payload.id)],
            isLoading: true,
            isFull: false,
          },
        };
      case "FETCH_ONE_REQUESTED":
        return {
          ...state,
          [String(action.payload)]: {
            ...state[String(action.payload)],
            isLoading: true,
            isFull: false,
          },
        };
      case "CREATE_SUCCEEDED":
      case "EDIT_SUCCEEDED":
      case "FETCH_ONE_SUCCEEDED":
        return {
          ...state,
          [String(action.payload.id)]: {
            element: action.payload,
            isLoading: false,
            isFull: true,
          },
        };

      case "DELETE_ONE_REQUESTED":
        return Object.keys(state).reduce((acc, key) => {
          const item = state[key];
          return item.element.id === action.payload
            ? acc
            : { [item.element.id]: item, ...acc };
        }, {} as IState<T>);
      case "DELETE_MANY_REQUESTED":
        return Object.keys(state).reduce((acc, key) => {
          const item = state[key];
          return action.payload.includes(item.element.id)
            ? acc
            : { [item.element.id]: item, ...acc };
        }, {} as IState<T>);
      default:
        return state;
    }
  };

type ExtraMethods<Properties> = {
  readonly [Property in keyof Properties]: (
    dispatch: Dispatch<IAction<string, any>>
  ) => (payload: Properties[Property]) => void;
};
const useResourceReducer = <T extends IWithId, Properties>(
  extraMethods?: ExtraMethods<Properties>,
  customReducer?: ICustomReducer<T>
) => {
  const [state, dispatch] = useReducer(
    reducer(customReducer) as Reducer<T>,
    {} as IState<T>
  );
  const populate = (payload: T[]) =>
    dispatch({ type: "FETCH_SUCCEEDED", payload });
  const handleCreateSucceeded = (payload: T) =>
    dispatch({ type: "CREATE_SUCCEEDED", payload });
  const handleEditSucceeded = (payload: T) =>
    dispatch({ type: "EDIT_SUCCEEDED", payload });
  const handleFetchOneSucceeded = (payload: T) =>
    dispatch({ type: "FETCH_ONE_SUCCEEDED", payload });
  const handleCreateRequest = (payload: T) =>
    dispatch({ type: "CREATE_REQUESTED", payload });
  const handleEditRequest = (payload: T) =>
    dispatch({ type: "EDIT_REQUESTED", payload });
  const handleFetchOneRequest = (payload: T["id"]) =>
    dispatch({ type: "FETCH_ONE_REQUESTED", payload });
  const handleDeleteOneRequested = (payload: T["id"]) =>
    dispatch({ type: "DELETE_ONE_REQUESTED", payload });
  const handleDeleteOneSucceeded = (payload: T["id"]) =>
    dispatch({ type: "DELETE_ONE_SUCCEEDED", payload });
  const handleDeleteManySucceeded = (payload: T["id"][]) =>
    dispatch({ type: "DELETE_MANY_SUCCEEDED", payload });

  const customMethods = keys(extraMethods).reduce((acc, key) => {
    return {
      ...acc,
      [key]: extraMethods[key](dispatch),
    };
  }, {} as { readonly [Property in keyof Properties]: (payload: any) => void });

  return {
    customMethods,
    state,
    populate,
    handleCreateSucceeded,
    handleEditSucceeded,
    handleFetchOneSucceeded,
    handleCreateRequest,
    handleEditRequest,
    handleFetchOneRequest,
    handleDeleteOneSucceeded,
    handleDeleteManySucceeded,
    handleDeleteOneRequested,
  };
};

export default useResourceReducer;
