// 1. Partial<T>
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

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
