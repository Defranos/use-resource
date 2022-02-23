export interface IParser<In, Out> {
  in: (data: Out) => In;
  out: (data: In) => Out;
  partialOut: (data: Partial<In>) => Partial<Out>;
}
