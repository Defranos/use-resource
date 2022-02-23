import { Dispatch, useEffect, useMemo } from "react";
import { MutateOptions, useQuery } from "react-query";
import { AxiosError } from "axios";
import { keys, mergeDeepRight } from "ramda";

import useResourceReducer from "./useResourceReducer";
import {
  ExtraPropertiesType,
  ICustomReducer,
  IParser,
  IWithId,
  IAction,
} from "./types";
import useCreate from "./useCreate";
import useEdit from "./useEdit";
import useFetchList from "./useFetchList";
import useFetchOne from "./useFetchOne";
import useDelete from "./useDelete";
import useDeleteMany from "./useDeleteMany";

interface IProps<In extends IWithId, Out, Properties> {
  readonly endpoint: string;
  readonly parser: IParser<In, Out>;
  readonly extraProperties?: ExtraPropertiesType<Properties>;
  readonly customReducer?: ICustomReducer<In>;
}

type DispatchableMethod = (
  dispatch: Dispatch<IAction<string, any>>
) => (payload: any) => void;

type Methods<Properties> = {
  [Property in keyof Properties]: DispatchableMethod;
};
const useResource = <
  In extends IWithId,
  Out extends IWithId,
  Properties = {},
  CustomError = Error
>({
  endpoint,
  parser,
  extraProperties,
  customReducer,
}: IProps<In, Out, Properties>) => {
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

  const reducer = useResourceReducer<In, Properties>(methods, customReducer);
  const create = useCreate<In, Out, CustomError>(endpoint, parser);
  const edit = useEdit<In, Out, CustomError>(endpoint, parser);
  const fetchList = useFetchList<In, Out, CustomError>(endpoint, parser);
  const fetchOne = useFetchOne<In, Out, CustomError>(endpoint, parser);
  const deleteHook = useDelete<In, CustomError>(endpoint);
  const deleteMany = useDeleteMany<In, CustomError>(endpoint);

  const registerList = () => reducer.populate(fetchList.data);
  useEffect(registerList, [fetchList.data, fetchList.isFetching]);

  const handleCreate = (
    payload: Partial<In>,
    options?: MutateOptions<Out, AxiosError<CustomError> | null, Partial<In>>
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
    options?: MutateOptions<Out, AxiosError<CustomError> | null, In>
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
    options?: MutateOptions<void, AxiosError<CustomError> | null, In["id"]>
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
    options?: MutateOptions<void, AxiosError<CustomError> | null, In["id"][]>
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

  const getLoadingById = (id: In["id"] | null | undefined) =>
    !!reducer.state[String(id)]?.isLoading;
  const getById = (id: In["id"] | null | undefined) =>
    reducer.state[String(id)]?.element;

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
