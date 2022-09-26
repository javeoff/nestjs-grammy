export type TFilter<T extends any[], F> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? Head extends F
    ? TFilter<Tail, F>
    : [Head, ...TFilter<Tail, F>]
  : [];
