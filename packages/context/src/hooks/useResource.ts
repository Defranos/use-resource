import { Dispatch, useEffect, useMemo } from "react";
import { MutateOptions, useQuery } from "react-query";
import { keys } from "ramda";

import useResourceReducer from "./useResourceReducer";
import {
  ExtraPropertiesType,
  ICustomReducer,
  IParser,
  IWithId,
  IAction,
  IAPI,
  IResourceContextState,
} from "./types";
import useCreate from "./useCreate";
import useEdit from "./useEdit";
import useFetchList from "./useFetchList";
import useFetchOne from "./useFetchOne";
import useDelete from "./useDelete";
import useDeleteMany from "./useDeleteMany";

interface IProps<
  In extends IWithId,
  Out,
  Properties,
  CustomActions extends IAction<string, any> | undefined
> {
  readonly endpoint: string;
  readonly parser: IParser<In, Out>;
  readonly api: IAPI;
  readonly extraProperties?: ExtraPropertiesType<Properties>;
  readonly customReducer?: ICustomReducer<In, CustomActions>;
}

type DispatchableMethod = (
  dispatch: Dispatch<IAction<string, any>>
) => (payload: any) => void;

const useResource = <
  In extends IWithId,
  Out extends IWithId,
  Properties = {},
  CustomError = Error,
  CustomActions extends IAction<string, any> | undefined = undefined
>({
  endpoint,
  parser,
  api,
  extraProperties,
  customReducer,
}: IProps<In, Out, Properties, CustomActions>): IResourceContextState<
  In,
  Out,
  Properties,
  CustomError
> => {
  const propertyKeys = keys(extraProperties);

  const methods = propertyKeys.reduce(
    (acc, key) => ({ ...acc, [key]: extraProperties[key].method }),
    {} as { readonly [Property in keyof Properties]: DispatchableMethod }
  );

  const loadings = propertyKeys.reduce(
    (acc, key) => ({ ...acc, [key]: extraProperties[key].loading }),
    {} as { readonly [Property in keyof Properties]: boolean }
  );

  const errors = propertyKeys.reduce(
    (acc, key) => ({ ...acc, [key]: extraProperties[key].error }),
    {} as { readonly [Property in keyof Properties]: CustomError | null }
  );

  const statuses = propertyKeys.reduce(
    (acc, key) => ({ ...acc, [key]: extraProperties[key].status }),
    {} as {
      readonly [Property in keyof Properties]:
        | ReturnType<typeof useQuery>["status"]
        | null;
    }
  );

  const mutationReseters = propertyKeys.reduce(
    (acc, key) => ({ ...acc, [key]: extraProperties[key].status }),
    {} as {
      readonly [Property in keyof Properties]: () => void;
    }
  );

  const reducer = useResourceReducer<In, Properties, CustomActions>(
    methods,
    customReducer
  );
  const create = useCreate<In, Out, CustomError>(endpoint, parser, api);
  const edit = useEdit<In, Out, CustomError>(endpoint, parser, api);
  const fetchList = useFetchList<In, Out, CustomError>(endpoint, parser, api);
  const fetchOne = useFetchOne<In, Out, CustomError>(endpoint, parser, api);
  const deleteHook = useDelete<In, CustomError>(endpoint, api);
  const deleteMany = useDeleteMany<In, CustomError>(endpoint, api);

  const registerList = () => reducer.populate(fetchList.data);
  useEffect(registerList, [fetchList.data, fetchList.isFetching]);

  const handleCreate = (
    payload: Partial<In>,
    options?: MutateOptions<Out, CustomError, Partial<In>>
  ) => {
    create.mutate(payload, options);
  };

  const handleCreateSuccess = () => {
    if (create.data) {
      reducer.handleCreateSucceeded(create.data);
    }
  };
  useEffect(handleCreateSuccess, [create.data]);

  const handleEdit = (
    payload: In,
    options?: MutateOptions<Out, CustomError | null, In>
  ) => {
    reducer.handleEditRequest(payload);
    edit.mutate(payload, options);
  };

  const handleEditSuccess = () => {
    if (edit.data) {
      reducer.handleEditSucceeded(edit.data);
    }
  };
  useEffect(handleEditSuccess, [edit.data]);

  const handleFetchOne = (id: In["id"]) => {
    reducer.handleFetchOneRequest(id);
    fetchOne.mutate(id);
  };
  const handleFetchOneSuccess = () => {
    if (fetchOne.data) {
      reducer.handleFetchOneSucceeded(fetchOne.data);
    }
  };
  useEffect(handleFetchOneSuccess, [fetchOne.data]);

  const handleDelete = (
    id: In["id"],
    options?: MutateOptions<void, CustomError, In["id"]>
  ) => {
    reducer.handleDeleteOneRequested(id);
    const enhancedOptions = {
      ...options,
      onSuccess: () => {
        options?.onSuccess?.(undefined, id, undefined);
        reducer.handleDeleteOneSucceeded(id);
      },
    };
    deleteHook.mutate(id, enhancedOptions);
  };

  const handleDeleteMany = (
    ids: In["id"][],
    options?: MutateOptions<void, CustomError, In["id"][]>
  ) => {
    const enhancedOptions = {
      ...options,
      onSuccess: () => {
        options?.onSuccess?.(undefined, ids, undefined);
        reducer.handleDeleteManySucceeded(ids);
      },
    };
    deleteMany.mutate(ids, enhancedOptions);
  };

  const getLoadingById = (id: In["id"]) =>
    !!reducer.state[String(id)]?.isLoading;
  const getById = (id: In["id"]) => reducer.state[String(id)]?.element;

  return {
    data: useMemo(
      () => Object.values(reducer.state).map((o) => o.element),
      [reducer.state]
    ),
    loadings: {
      ...loadings,
      fetch: fetchList.isLoading,
      create: create.isLoading,
      edit: edit.isLoading,
      fetchOne: fetchOne.isLoading,
      delete: deleteHook.isLoading,
      deleteMany: deleteMany.isLoading,
      byId: getLoadingById,
    },
    errors: {
      ...errors,
      fetch: fetchList.error,
      create: create.error,
      edit: edit.error,
      fetchOne: fetchOne.error,
      delete: deleteHook.error,
      deleteMany: deleteMany.error,
    },
    status: {
      ...statuses,
      fetch: fetchList.status,
      create: create.status,
      edit: edit.status,
      fetchOne: fetchOne.status,
      delete: deleteHook.status,
      deleteMany: deleteMany.status,
    },
    methods: {
      ...reducer.customMethods,
      create: handleCreate,
      edit: handleEdit,
      refetch: fetchList.refetch,
      fetchOne: handleFetchOne,
      delete: handleDelete,
      deleteMany: handleDeleteMany,
      getById,
    },
    mutationReseter: {
      ...mutationReseters,
      fetch: () => {},
      create: create.reset,
      edit: edit.reset,
      fetchOne: fetchOne.reset,
      delete: deleteHook.reset,
      deleteMany: deleteMany.reset,
    },
  };
};

export default useResource;
