## Usage

#### Create your resource types

```
// types.ts

// model of the frontend resource
export type FM = {
  // ...properties
}

// model of the backend resource
export type BM = {
  // ...properties
}

```

#### Generate context

```
// context.ts

import { createResourceContext } from "@use-resource/context";
import { FM, BM } from "./types";

const MyContext = createResourceContext<FM, BM>(name);

```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `name`    | `string` | **Required**. The name of your resource |

#### Create your parser

```
// parser.ts

import { FM, BM } from "./types";

const parser: IParser<FM, BM> = {
  in,
  out,
  partialOut,
  axiosResponse: ({ data }) => data,
};

export default parser;
```

| Parameter       | Type                                    | Description                                                                                               |
| :-------------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `in`            | `(payload: BM) => FM`                   | **Required**. Parses your resource from backend to frontend                                               |
| `out`           | `(payload: FM) => BM`                   | **Required**. Parses your resource from frontend to backend                                               |
| `partialOut`    | `(payload: Partial<FM>) => Partial<BM>` | **Required**. Parses your resource from a partial of the frontend model to a partial of the backend model |
| `axiosResponse` | `(payload: unknown) => any`             | **Required**. Parses the axios response                                                                   |

#### Generate context values

```
// useContextValue.ts

import useResource, { IParser } from "@use-resource/context";
import { FM, BM } from "./types";
import parser from "./parser";

const endpoint = "http://my-resource-endpoint";

export default () => useResource<FM, BM>({ endpoint, parser });

```

#### Declare your context in your react tree

```
// somewhereInMyApp.ts

import React from "react";
import useContextValue from "./useContextValue";
import Context from "./context";

export default () => {
  const contextValue = useContextValue();

  return (
    <Context.Provider value={contextValue}>
      {...}
    </Context.Provider>
  );
};

```

#### Use it from anywhere in the children of the context

```
// someChildren.ts

import React, { useContext } from "react";
import Context from "./context";

export default () => {
  const resource = useContext(Context);
  // do stuff
};

```

resource will have the following properties:

```
  data: FM[];
  loadings: {
    fetch: boolean;
    create: boolean;
    edit: boolean;
    fetchOne: boolean;
    delete: boolean;
    deleteMany: boolean;
    byId: (id: In["id"] | null | undefined) => boolean;
  };
  errors: {
    fetch: Error | null;
    create: Error | null;
    edit: Error | null;
    fetchOne: Error | null;
    delete: Error | null;
    deleteMany: Error | null;
  };
   status: {
    fetch: ReturnType<typeof useQuery>["status"] | null;
    create: ReturnType<typeof useQuery>["status"] | null;
    edit: ReturnType<typeof useQuery>["status"] | null;
    fetchOne: ReturnType<typeof useQuery>["status"] | null;
    delete: ReturnType<typeof useQuery>["status"] | null;
    deleteMany: ReturnType<typeof useQuery>["status"] | null;
  };
   methods: {
     create: (
      payload: Partial<In>,
      options?: MutateOptions<Out, CustomError | null, Partial<In>>
    ) => void;
     edit: (
      payload: In,
      options?: MutateOptions<Out, CustomError | null, In>
    ) => void;
     refetch: () => void;
     getById: (id: In["id"] | undefined | null) => In | undefined;
     delete: (id: In["id"]) => void;
     deleteMany: (ids: In["id"][]) => void;
     fetchOne: (id: In["id"]) => void;
  }
  mutationReseter: {
    fetch: () => void;
    create: () => void;
    edit: () => void;
    fetchOne: () => void;
    delete: () => void;
    deleteMany: () => void;
  };
```
