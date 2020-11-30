/* eslint @typescript-eslint/no-explicit-any: off */

export type Tuple<A = any> = ReadonlyArray<A>;

export interface Func {
  (...args: any[]): any;
}

export interface DashFn<P extends Tuple, R extends unknown> extends Func {
  (...args: P): R | Promise<R>;
}
