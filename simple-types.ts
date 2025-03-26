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
