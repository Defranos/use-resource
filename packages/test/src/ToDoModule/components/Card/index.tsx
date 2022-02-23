import React from "react";
import ITodo from "../../model";
import { TodoWrapper, CancelIcon, DeleteIcon, CheckIcon } from "./styles";
import useTodoModule from "../../hooks/useModule";

const ToDoCard = (todo: ITodo) => {
  const todoResource = useTodoModule();

  const handleDelete = () => {
    todoResource.methods.delete(todo.id);
  };

  const handleComplete = () => {
    todoResource.methods.complete(todo);
  };
  const handleUnComplete = () => {
    todoResource.methods.unComplete(todo);
  };

  return (
    <TodoWrapper data-test-id="to-do-element" isComplete={todo.isComplete}>
      <div style={{ display: "flex", alignItems: "center", fontSize: "1.2em" }}>
        <div style={{ flex: 1 }}>{todo.name}</div>
        <DeleteIcon onClick={handleDelete} />
        {!todo.isComplete && (
          <CheckIcon
            data-test-id="complete-task-button"
            onClick={handleComplete}
          />
        )}
        {todo.isComplete && (
          <CancelIcon
            data-test-id="uncomplete-task-button"
            onClick={handleUnComplete}
          />
        )}
      </div>
    </TodoWrapper>
  );
};

export default ToDoCard;
