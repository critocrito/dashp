/* eslint @typescript-eslint/no-explicit-any: off */

export type Tuple<A = any> = ReadonlyArray<A>;

export type Ret<T extends unknown> = T | Promise<T>;

export interface Func {
  (...args: any[]): any;
}

export type Fn<P extends Tuple = any, R extends any = any> = ((...args: P) => R) & Func;

export interface DashFn<P extends Tuple, R extends unknown> extends Func {
  (...args: P): R | Promise<R>;
}
