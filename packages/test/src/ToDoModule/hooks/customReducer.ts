import { IAction, IState } from "@use-resource/context";
import ITodo from "../model";

export type ExtraActions =
  | IAction<"UNCOMPLETE_REQUESTED", ITodo>
  | IAction<"UNCOMPLETE_SUCCEEDED", ITodo>
  | IAction<"UNCOMPLETE_FAILED", ITodo>
  | IAction<"COMPLETE_REQUESTED", ITodo>
  | IAction<"COMPLETE_SUCCEEDED", ITodo>
  | IAction<"COMPLETE_FAILED", ITodo>;

const reducer = (state: IState<ITodo>, action: ExtraActions): IState<ITodo> => {
  switch (action.type) {
    case "COMPLETE_REQUESTED":
      return {
        ...state,
        [String(action.payload.id)]: {
          element: { ...action.payload, isComplete: true },
          isLoading: false,
          isFull: true,
        },
      };
    case "UNCOMPLETE_REQUESTED":
      return {
        ...state,
        [String(action.payload.id)]: {
          element: { ...action.payload, isComplete: false },
          isLoading: false,
          isFull: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;
