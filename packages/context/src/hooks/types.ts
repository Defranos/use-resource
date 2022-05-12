import { MutateOptions, useQuery } from "react-query";

export interface IExtraProperty<CustomError = Error> {
  readonly method: (payload: any) => void;
  readonly loading: boolean;
  readonly error: CustomError | null;
  readonly mutationReseter: () => void;
  readonly status: ReturnType<typeof useQuery>["status"] | null;
}

export type ExtraPropertiesType<T, CustomError = Error | null> = {
  [Property in keyof T]: IExtraProperty<CustomError>;
};

export interface IAction<T, P> {
  readonly type: T;
  readonly payload: P;
}

export interface IWithId {
  readonly id: string | number;
}

export interface IAPI {
  get: <Payload extends unknown, Response extends unknown>(
    url: string,
    payload?: Payload
  ) => Promise<Response>;
  post: <Payload extends unknown, Response extends unknown>(
    url: string,
    payload?: Payload
  ) => Promise<Response>;
  put: <Payload extends unknown, Response extends unknown>(
    url: string,
    payload?: Payload
  ) => Promise<Response>;
  delete: <Payload extends unknown, Response extends unknown>(
    url: string,
    payload?: Payload
  ) => Promise<Response>;
}
export interface ICustomReducer<T extends IWithId> {
  (state: IState<T>, action: IAction<string, any>): IState<T>;
}

type CreateSucceededAction<T> = IAction<"CREATE_SUCCEEDED", T>;
type CreateRequestedAction<T> = IAction<"CREATE_REQUESTED", T>;

type CreateManySucceededAction<T> = IAction<"CREATE_MANY_SUCCEEDED", T>;
type CreateManyRequestedAction<T> = IAction<"CREATE_MANY_REQUESTED", T>;

type EditSucceededAction<T> = IAction<"EDIT_SUCCEEDED", T>;
type EditRequestedAction<T> = IAction<"EDIT_REQUESTED", T>;

type FetchSucceededAction<T> = IAction<"FETCH_SUCCEEDED", T>;

type FetchOneSucceededAction<T> = IAction<"FETCH_ONE_SUCCEEDED", T>;
type FetchOneRequestedAction<T> = IAction<"FETCH_ONE_REQUESTED", T>;

type DeleteOneSucceededAction<T> = IAction<"DELETE_ONE_SUCCEEDED", T>;
type DeleteOneRequestedAction<T> = IAction<"DELETE_ONE_REQUESTED", T>;
type DeleteManySucceededAction<T> = IAction<"DELETE_MANY_SUCCEEDED", T>;
type DeleteManyRequestedAction<T> = IAction<"DELETE_MANY_REQUESTED", T>;

export type Action<T extends IWithId> =
  | CreateSucceededAction<T>
  | CreateManySucceededAction<T[]>
  | CreateManyRequestedAction<T[]>
  | EditSucceededAction<T>
  | FetchSucceededAction<T[]>
  | FetchOneSucceededAction<T>
  | CreateRequestedAction<Partial<T>>
  | EditRequestedAction<T>
  | FetchOneRequestedAction<T["id"]>
  | DeleteOneRequestedAction<T["id"]>
  | DeleteOneSucceededAction<T["id"]>
  | DeleteManyRequestedAction<T["id"][]>
  | DeleteManySucceededAction<T["id"][]>
  | IAction<string, any>;

export interface IParser<In, Out> {
  in: (data: Out) => In;
  out: (data: In) => Out;
  partialOut: (data: Partial<In>) => Partial<Out>;
}

export interface IState<T extends IWithId> {
  readonly [key: string]: {
    readonly element: T;
    readonly isLoading: boolean;
    readonly isFull: boolean;
  };
}
export type Reducer<T extends IWithId> = (
  state: IState<T>,
  action: Action<T>
) => IState<T>;

interface IStateProperties {
  readonly fetch: unknown;
  readonly create: unknown;
  readonly edit: unknown;
  readonly fetchOne: unknown;
  readonly delete: unknown;
  readonly deleteMany: unknown;
}

export type IResourceContextState<
  In extends IWithId,
  Out extends IWithId,
  Properties,
  CustomError = Error | null
> = {
  readonly data: In[];
  readonly loadings: {
    readonly [Property in
      | keyof IStateProperties
      | Exclude<keyof Properties, "byId">]: boolean;
  } & {
    readonly byId: (id: In["id"]) => boolean;
  };
  readonly errors: {
    readonly [Property in
      | keyof IStateProperties
      | keyof Properties]: CustomError | null;
  };
  readonly status: {
    readonly [Property in keyof IStateProperties | keyof Properties]:
      | ReturnType<typeof useQuery>["status"]
      | null;
  };
  readonly methods: {
    readonly create: (
      payload: Partial<In>,
      options?: MutateOptions<Out, CustomError | null, Partial<In>>
    ) => void;
    readonly edit: (
      payload: In,
      options?: MutateOptions<Out, CustomError | null, In>
    ) => void;
    readonly refetch: () => void;
    readonly getById: (id: In["id"]) => In | undefined;
    readonly delete: (id: In["id"]) => void;
    readonly deleteMany: (ids: In["id"][]) => void;
    readonly fetchOne: (id: In["id"]) => void;
  } & {
    readonly [Property in keyof Properties]: (
      payload: Properties[Property]
    ) => void;
  };
  readonly mutationReseter: {
    readonly [Property in
      | keyof IStateProperties
      | keyof Properties]: () => void;
  };
};
