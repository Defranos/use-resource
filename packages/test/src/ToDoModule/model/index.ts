interface ITodo {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly isComplete: boolean;
}

export interface ITodoResponse {
  // here we duplicate to have a better scalability in case the BE model shifts from the FE one and update the parser method only
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly isComplete: boolean;
}

export default ITodo;
