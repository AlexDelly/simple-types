// 1. Partial<T>
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// 1а. Partial except K
type MyPartialExcept<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]?: T[P];
} & Pick<T, K>;

// 2. Required<T>
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

// 3. Readonly<T>
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 4. Record
type MyRecord<K extends keyof any, V> = {
  [P in K]: V;
};

// 5. Pick
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 6. Omit
type MyOmit<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P];
};

// 7. Exclude
type MyExclude<T, K> = T extends K ? never : T;

// 8. Extract
type MyExtract<T, U> = T extends U ? T : never;

// 9. Non nullable
type MyNonNullable<T> = T extends null | undefined ? never : T;

// 10. Parameters
type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// 11. Constructor parameters
type MyConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

// 12. Return type
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

// 13. Instance type
type MyInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;

// 14. This parameter type
type MyThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown;

// 15. Omit this parameter
type MyOmitThisParameter<T> = T extends (this: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;

// 16. FirstChar
type FirstChar<T extends string> = T extends `${infer U}${string}` ? U : never;

// 17. LastChar
type LastChar<T extends string> = T extends `${infer First}${infer Rest}`
  ? Rest extends ""
    ? First
    : LastChar<Rest>
  : never;

// 18. Tuple to union
type TupleToUnion<T extends any[]> = T[number];

// 19. FirstItem
type FirstItem<T extends any[]> = T extends [infer U, ...infer _] ? U : never;

// 20. IsNever
type IsNever<T> = [T] extends [never] ? true : false;

// 21. LastItem
type LastItem<T extends any[]> = T extends [...infer _, infer Last]
  ? Last
  : never;

// 22. StringToTuple
type StringToTuple<T extends string> = T extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : [];

// 23. TupleLength
type LengthOfTuple<T extends any[]> = T["length"];

// 24. StringLength
type LengthOfString<
  T extends string,
  Acc extends any[] = []
> = T extends `${infer First}${infer Rest}`
  ? LengthOfString<Rest, [...Acc, First]>
  : Acc["length"];

// 25. UnwrapPromise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : Error;

// 26. ReverseTuple
type ReverseTuple<T extends any[]> = T extends [infer H, ...infer R]
  ? [...ReverseTuple<R>, H]
  : [];

// 27. Flat
type Flat<T extends unknown[]> = T extends [infer H, ...infer R]
  ? [...(H extends unknown[] ? Flat<H> : [H]), ...Flat<R>]
  : [];

// 28. IsEmptyType
type IsEmptyType<T> = T extends Record<string, string>
  ? [keyof T] extends [never]
    ? true
    : false
  : false;

// 29. Shift
type Shift<T extends any[]> = T extends [any, ...infer Rest] ? Rest : [];

// 30. IsAny
type IsAny<T> = 0 extends 1 & T ? true : false;

// 31. Push
type Push<T extends any[], I> = [...T, I];

// 32. Repeat String
type RepeatString<
  T extends string,
  C extends number,
  Acc extends string = "",
  Count extends any[] = []
> = Count["length"] extends C
  ? Acc
  : RepeatString<T, C, `${Acc}${T}`, [...Count, any]>;

// 33. Tuple to string
type TupleToString<T extends any[], Result extends string = ""> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends string
    ? TupleToString<Rest, `${Result}${First}`>
    : TupleToString<Rest, Result>
  : Result;

// 34. Repeat
type Repeat<
  T,
  C extends number,
  Result extends T[] = []
> = Result["length"] extends C ? Result : Repeat<T, C, [...Result, T]>;

// 35. Filter
type Filter<T extends any[], A> = T extends [infer First, ...infer Rest]
  ? [A] extends [First] // Handle `any` correctly
    ? [First, ...Filter<Rest, A>]
    : First extends A
    ? [First, ...Filter<Rest, A>]
    : Filter<Rest, A>
  : [];

// 36. Larger than
type LargerThan<A extends number, B extends number> = A extends B
  ? false
  : BuildArray<A> extends [...BuildArray<B>, ...infer _]
  ? true
  : false;

type BuildArray<N extends number, T extends any[] = []> = T["length"] extends N
  ? T
  : BuildArray<N, [...T, any]>;

// or
type LargerThanAnother<
  A extends number,
  B extends number,
  S extends number[] = []
> = S["length"] extends A
  ? false
  : S["length"] extends B
  ? true
  : LargerThanAnother<A, B, [A, ...S]>;

// 37. Smaller than
type SmallerThan<
  A extends number,
  B extends number,
  Count extends any[] = []
> = Count["length"] extends B
  ? false
  : Count["length"] extends A
  ? true
  : SmallerThan<A, B, [...Count, any]>;

// 38. Add
type Tuple<T extends number, U extends any[] = []> = U["length"] extends T
  ? U
  : Tuple<T, [...U, any]>;
type Add<A extends number, B extends number> = [
  ...Tuple<A>,
  ...Tuple<B>
]["length"];

// 39. ToNumber
type ToNumber<
  T extends string,
  U extends number[] = []
> = `${U["length"]}` extends T ? U["length"] : ToNumber<T, [...U, 1]>;

// 40. UnionToIntersection
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

// 41. FindIndex
type FindIndex<
  T extends any[],
  E extends any,
  A extends any[] = []
> = T extends [infer U, ...infer R]
  ? Equal<U, E> extends true
    ? A["length"]
    : FindIndex<R, E, [...A, any]>
  : never;

// 42. Equal
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

// 43. Trim
type Trim<T extends string> = T extends ` ${infer R}`
  ? Trim<R>
  : T extends `${infer L} `
  ? Trim<L>
  : T;

// 44. ReplaceAll
type ReplaceAll<
  S extends string,
  F extends string,
  T extends string
> = F extends ""
  ? S
  : S extends `${infer A}${F}${infer B}`
  ? `${A}${T}${ReplaceAll<B, F, T>}`
  : S;

// 45. Slice
type LessThan<
  A extends number,
  B extends number,
  S extends any[] = []
> = S["length"] extends B
  ? false
  : S["length"] extends A
  ? true
  : LessThan<A, B, [...S, ""]>;

type Slice<
  A extends any[], // Array
  S extends number = 0, // start
  E extends number = A["length"], // end
  I extends any[] = [], // current index
  O extends any[] = [] // output array
> = A extends [infer F, ...infer R]
  ? LessThan<I["length"], S> extends false // index >= start
    ? LessThan<I["length"], E> extends true // index < end
      ? Slice<R, S, E, [...I, ""], [...O, F]>
      : O // index >= start && index >= end => index >= end => return
    : Slice<R, S, E, [...I, ""], O> // index < start
  : O; // A == []

// 46. Subtract
type TupleType<T extends number, U extends any[] = []> = U["length"] extends T
  ? U
  : TupleType<T, [...U, any]>;

type Subtract<A extends number, B extends number> = TupleType<A> extends [
  ...TupleType<B>,
  ...infer R
]
  ? R["length"]
  : never;

// 47. Multiply
type Multiply<
  A extends number,
  B extends number,
  Acc extends any[] = [],
  Counter extends any[] = []
> = Counter["length"] extends B
  ? Acc["length"]
  : Multiply<A, B, [...TupleType<A>, ...Acc], [...Counter, any]>;

// 48. Divide
type Helper<
  T extends any[],
  U extends any[],
  Y extends any[] = []
> = T extends [...U, ...infer R] ? Helper<R, U, [...Y, any]> : Y["length"];

type Divide<A extends number, B extends number> = B extends 0
  ? never
  : Helper<TupleType<A>, TupleType<B>>;

// 49. Assert never
declare function assertsNever(item: never): void;

// 50. Sort
type Larger<
  A extends any,
  B extends any,
  R extends 0[] = []
> = R["length"] extends A
  ? false
  : R["length"] extends B
  ? true
  : Larger<A, B, [...R, 0]>;

type SortLinear<T extends any[]> = T extends [infer A, infer B, ...infer C]
  ? Larger<A, B> extends true
    ? [B, ...SortLinear<[A, ...C]>]
    : [A, ...SortLinear<[B, ...C]>]
  : T;

type Sort<T extends any[]> = SortLinear<T> extends [...infer F, infer L]
  ? [...Sort<F>, L]
  : T;
