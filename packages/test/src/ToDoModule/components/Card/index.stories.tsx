import React from "react";
import ITodo from "../../model";

import Card from "./index";

export default {
  component: Card,
  title: "Components/Todo/Card",
};

export const Main = (args: ITodo) => <Card {...args} id={0} />;

Main.args = {
  isComplete: false,
  name: "test",
};
