import React from "react";

import List, { IProps } from "./index";

export default {
  component: List,
  title: "Components/Todo/List",
};

export const Main = (args: IProps) => (
  <List
    {...args}
    todoList={[
      {
        id: 1,
        name: "My first todo task",
        isComplete: false,
      },
      {
        id: 2,
        name: "My second todo task",
        isComplete: false,
      },
      {
        id: 3,
        name: "you guessed it... It's my third todo task",
        isComplete: false,
      },
    ]}
  />
);

Main.args = {
  animated: false,
};
