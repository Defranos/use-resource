import { createContext } from "react";
import { IResourceContextState, IWithId } from "../hooks/types";

const createResourceContext = <
  In extends IWithId,
  Out extends IWithId,
  Properties = unknown,
  CustomError = Error | null
>(
  name: string,
  extraProperties: string[] = []
) => {
  return createContext<IResourceContextState<In, Out, Properties, CustomError>>(
    {
      data: [],
      loadings: {
        ...extraProperties.reduce(
          (acc, key) => ({ ...acc, [key]: false }),
          {} as {
            readonly [Property in keyof Properties]: boolean;
          }
        ),
        fetch: false,
        create: false,
        edit: false,
        fetchOne: false,
        delete: false,
        deleteMany: false,
        byId: (/* payload: In["id"] */) => {
          console.warn(
            `[${name} context] method loadings by id not initialized`
          );
          return false;
        },
      },
      errors: {
        fetch: null,
        create: null,
        edit: null,
        fetchOne: null,
        delete: null,
        deleteMany: null,
        ...extraProperties.reduce(
          (acc, key) => ({ ...acc, [key]: null }),
          {} as {
            readonly [Property in keyof Properties]: null;
          }
        ),
      },
      status: {
        fetch: null,
        create: null,
        edit: null,
        fetchOne: null,
        delete: null,
        deleteMany: null,
        ...extraProperties.reduce(
          (acc, key) => ({ ...acc, [key]: null }),
          {} as {
            readonly [Property in keyof Properties]: null;
          }
        ),
      },
      mutationReseter: {
        fetch: () => {
          console.warn(
            `[${name} context] mutation reset method fetch not initialized`
          );
        },
        create: () => {
          console.warn(
            `[${name} context] mutation reset method create not initialized`
          );
        },
        edit: () => {
          console.warn(
            `[${name} context] mutation reset method edit not initialized`
          );
        },
        fetchOne: () => {
          console.warn(
            `[${name} context] mutation reset method fetchOne not initialized`
          );
        },
        delete: () => {
          console.warn(
            `[${name} context] mutation reset method delete not initialized`
          );
        },
        deleteMany: () => {
          console.warn(
            `[${name} context] mutation reset method delete many not initialized`
          );
        },
        ...extraProperties.reduce(
          (acc, key) => ({
            ...acc,
            [key]: () => {
              console.warn(
                `("[${name} context] mutation reset method ${key} not initialized"`
              );
            },
          }),
          {} as {
            readonly [Property in keyof Properties]: () => void;
          }
        ),
      },
      methods: {
        create: (/* payload: Partial<In> */) => {
          console.warn(`("[${name} context] method create not initialized"`);
        },
        edit: (/* payload: In */) => {
          console.warn(`("[${name} context] method edit not initialized"`);
        },
        refetch: () => {
          console.warn(`("[${name} context] method refetch not initialized"`);
        },
        fetchOne: (/* payload: In["id"] */) => {
          console.warn(`("[${name} context] method fetchOne not initialized"`);
        },
        delete: (/* payload: In["id"] */) => {
          console.warn(`("[${name} context] method delete not initialized"`);
        },
        deleteMany: (/* payload: In["id"] */) => {
          console.warn(`[${name} context] method delete many not initialized`);
        },
        getById: (/* payload: In["id"] */) => {
          console.warn(`("[${name} context] method getById not initialized"`);
          return undefined;
        },
        ...extraProperties.reduce(
          (acc, key) => ({
            ...acc,
            [key]: () => {
              console.warn(
                `("[${name} context] method ${key} not initialized"`
              );
            },
          }),
          {} as {
            readonly [Property in keyof Properties]: (payload: any) => void;
          }
        ),
      },
    }
  );
};

export default createResourceContext;
