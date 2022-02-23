import { rest } from "msw";
import { ITodo } from "../../ToDoModule";

let list: ITodo[] = [
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
];

export const handlers = [
  rest.get("http://localhost:4000/todos", (req, res, ctx) => {
    return res(ctx.json(list));
  }),
  rest.delete("http://localhost:4000/todos/:id", (req, res, ctx) => {
    list = list.filter((element) => element.id !== Number(req.params.id));
    return res();
  }),
  rest.post("http://localhost:4000/todos/:id/complete", (req, res, ctx) => {
    list = list.map((element) =>
      element.id === Number(req.params.id)
        ? { ...element, isComplete: true }
        : element
    );
    return res(
      ctx.json(list.find((element) => element.id === Number(req.params.id)))
    );
  }),
  rest.post("http://localhost:4000/todos/:id/uncomplete", (req, res, ctx) => {
    list = list.map((element) =>
      element.id === Number(req.params.id)
        ? { ...element, isComplete: false }
        : element
    );
    return res(
      ctx.json(list.find((element) => element.id === Number(req.params.id)))
    );
  }),
  rest.post("http://localhost:4000/todos", (req: any, res, ctx) => {
    const greatestId = list.reduce(
      (acc, element) => (element.id > acc ? element.id : acc),
      0
    );

    const todo: ITodo = {
      id: greatestId + 1,
      name: req.body.name,
      description: "",
      isComplete: false,
    };
    list.push(todo);
    return res(ctx.json(todo));
  }),
];
