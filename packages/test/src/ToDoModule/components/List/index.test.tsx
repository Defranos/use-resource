import React from "react";
import renderer from "react-test-renderer";
import { ITodo } from "ToDoModule";
import List from ".";

const mockList: ITodo[] = [
  {
    id: 1,
    name: "My first todo task",
    isComplete: false,
  },
];

describe("[TODO] => List", () => {
  it("Should render properly", () => {
    const tree = renderer.create(<List todoList={mockList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
