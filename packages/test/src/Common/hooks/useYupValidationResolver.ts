import { useCallback } from "react";
import { Resolver } from "react-hook-form";

interface IError {
  readonly type: string;
  readonly message: string;
  readonly path: string;
}

type IErrors = {
  readonly [key: string]: {
    readonly type: string;
    readonly message: string;
  };
};

const useYupValidationResolver = <T>(validationSchema: any): Resolver<T> =>
  useCallback(
    async (data) => {
      try {
        const values = await (typeof validationSchema === "function"
          ? validationSchema(data)
          : validationSchema
        ).validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: IErrors, currentError: IError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {} as IErrors
          ),
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;
