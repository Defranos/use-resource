import { useMemo } from "react";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

import { ITodo, ITodoResponse, Parser } from "../../ToDoModule";

const useComplete = () => {
  const mutation = useMutation<
    ITodoResponse,
    AxiosError<Error> | null,
    ITodo["id"]
  >((payload: ITodo["id"]) =>
    axios
      .post<any, { data: ITodoResponse }, Error>(
        `http://localhost:4000/todos/${payload}/complete`
      )
      .then((response) => response.data)
  );

  return {
    ...mutation,
    data: useMemo(
      () => (mutation.data ? Parser.in(mutation.data) : undefined),
      [mutation.data]
    ),
  };
};

export default useComplete;
