import React from "react";
import renderer from "react-test-renderer";

import { ITodo } from "ToDoModule";
import Card from ".";

const mockCard: ITodo = {
  id: 1,
  name: "My first todo task",
  isComplete: false,
};

describe("[TODO] => Card", () => {
  it("Should handle completed status", () => {
    const tree = renderer.create(<Card {...mockCard} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should handle uncompleted status", () => {
    const tree = renderer.create(<Card {...mockCard} isComplete />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
