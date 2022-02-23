import { Grow } from "@mui/material";
import React from "react";
import ITodo from "../../model";
import ToDoCard from "../Card";

const getToDoCardFromToDo = (animated?: boolean) => (todo: ITodo) => {
  if (animated) {
    return (
      <Grow
        in
        mountOnEnter
        timeout={1000}
        key={todo.id ?? new Date().toISOString()}
      >
        <div style={{ margin: "1em" }}>
          <ToDoCard {...todo} />
        </div>
      </Grow>
    );
  }
  return (
    <div style={{ margin: "1em" }} key={todo.id ?? new Date().toISOString()}>
      <ToDoCard {...todo} />
    </div>
  );
};

export interface IProps {
  readonly todoList: ITodo[];
  readonly animated?: boolean;
}
const ToDoList = ({ todoList, animated }: IProps) => {
  return (
    <div data-test-id="to-do-list-wrapper">
      {todoList.map(getToDoCardFromToDo(animated))}
    </div>
  );
};

export default ToDoList;
