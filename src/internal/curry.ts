/* eslint @typescript-eslint/no-explicit-any: off */
import nameFn from "./namefn";
import {DashFn, Tuple} from "./types";

export interface Curry1<T1, R> {
  (): Curry1<T1, R>;
  (t1: T1): R;
}

export interface Curry2<T1, T2, R> {
  (): Curry2<T1, T2, R>;
  (t1: T1): Curry1<T2, R>;
  (t1: T1, t2: T2): R;
}

export interface Curry3<T1, T2, T3, R> {
  (): Curry3<T1, T2, T3, R>;
  (t1: T1): Curry2<T2, T3, R>;
  (t1: T1, t2: T2): Curry1<T3, R>;
  (t1: T1, t2: T2, t3: T3): R;
}

export interface Curry4<T1, T2, T3, T4, R> {
  (): Curry4<T1, T2, T3, T4, R>;
  (t1: T1): Curry3<T2, T3, T4, R>;
  (t1: T1, t2: T2): Curry2<T3, T4, R>;
  (t1: T1, t2: T2, t3: T3): Curry1<T4, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): R;
}

export interface Curry5<T1, T2, T3, T4, T5, R> {
  (): Curry5<T1, T2, T3, T4, T5, R>;
  (t1: T1): Curry4<T2, T3, T4, T5, R>;
  (t1: T1, t2: T2): Curry3<T3, T4, T5, R>;
  (t1: T1, t2: T2, t3: T3): Curry2<T4, T5, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): Curry1<T5, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
}

export interface Curry6<T1, T2, T3, T4, T5, T6, R> {
  (): Curry6<T1, T2, T3, T4, T5, T6, R>;
  (t1: T1): Curry5<T2, T3, T4, T5, T6, R>;
  (t1: T1, t2: T2): Curry4<T3, T4, T5, T6, R>;
  (t1: T1, t2: T2, t3: T3): Curry3<T4, T5, T6, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): Curry2<T5, T6, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): Curry1<T6, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R;
}

export interface Curry7<T1, T2, T3, T4, T5, T6, T7, R> {
  (): Curry7<T1, T2, T3, T4, T5, T6, T7, R>;
  (t1: T1): Curry6<T2, T3, T4, T5, T6, T7, R>;
  (t1: T1, t2: T2): Curry5<T3, T4, T5, T6, T7, R>;
  (t1: T1, t2: T2, t3: T3): Curry4<T4, T5, T6, T7, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): Curry3<T5, T6, T7, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): Curry2<T6, T7, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): Curry1<T7, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): R;
}

export interface Curry8<T1, T2, T3, T4, T5, T6, T7, T8, R> {
  (): Curry8<T1, T2, T3, T4, T5, T6, T7, T8, R>;
  (t1: T1): Curry7<T2, T3, T4, T5, T6, T7, T8, R>;
  (t1: T1, t2: T2): Curry6<T3, T4, T5, T6, T7, T8, R>;
  (t1: T1, t2: T2, t3: T3): Curry5<T4, T5, T6, T7, T8, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): Curry4<T5, T6, T7, T8, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): Curry3<T6, T7, T8, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): Curry2<T7, T8, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): Curry1<T8, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): R;
}

export interface Curry9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> {
  (): Curry9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>;
  (t1: T1): Curry8<T2, T3, T4, T5, T6, T7, T8, T9, R>;
  (t1: T1, t2: T2): Curry7<T3, T4, T5, T6, T7, T8, T9, R>;
  (t1: T1, t2: T2, t3: T3): Curry6<T4, T5, T6, T7, T8, T9, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): Curry5<T5, T6, T7, T8, T9, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): Curry4<T6, T7, T8, T9, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): Curry3<T7, T8, T9, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): Curry2<T8, T9, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): Curry1<T9, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9): R;
}

export interface Curry10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R> {
  (): Curry10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R>;
  (t1: T1): Curry9<T2, T3, T4, T5, T6, T7, T8, T9, T10, R>;
  (t1: T1, t2: T2): Curry8<T3, T4, T5, T6, T7, T8, T9, T10, R>;
  (t1: T1, t2: T2, t3: T3): Curry7<T4, T5, T6, T7, T8, T9, T10, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): Curry6<T5, T6, T7, T8, T9, T10, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): Curry5<T6, T7, T8, T9, T10, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): Curry4<T7, T8, T9, T10, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): Curry3<T8, T9, T10, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): Curry2<T9, T10, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9): Curry1<T10, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9, t10: T10): R;
}

const ncurry = (n: number): ((...args: any[]) => any) => {
  const localCurry = <T extends DashFn<Tuple, unknown>>(
    name: string,
    f: T,
    ...args: Parameters<T>
  ): DashFn<Tuple, unknown> => {
    // This allows checkTypes to throw nicer error messages.
    const localF = nameFn(`Future#${name}`, f);

    const g = (...largs: any[]): DashFn<Tuple, unknown> | unknown => {
      const rest = args.concat(largs);

      if (rest.length < n || rest.length === 0) return localCurry(name, localF, ...rest);
      // This allows for the curried variadic function pattern.
      return localF(...rest.slice(0, n));
    };
    return nameFn(`${name}-${n - args.length}`, g);
  };

  return localCurry;
};

export const curry2: (
  name: string,
  func: DashFn<[any, any], any>,
) => Curry2<any, any, any> = ncurry(2);

export const curry3: (
  name: string,
  func: DashFn<[any, any, any], any>,
) => Curry3<any, any, any, any> = ncurry(3);

export const curry4: (
  name: string,
  func: DashFn<[any, any, any, any], any>,
) => Curry4<any, any, any, any, any> = ncurry(4);

export const curry5: (
  name: string,
  func: DashFn<[any, any, any, any, any], any>,
) => Curry5<any, any, any, any, any, any> = ncurry(5);

export const curry6: (
  name: string,
  func: DashFn<[any, any, any, any, any, any], any>,
) => Curry6<any, any, any, any, any, any, any> = ncurry(6);

export const curry7: (
  name: string,
  func: DashFn<[any, any, any, any, any, any, any], any>,
) => Curry7<any, any, any, any, any, any, any, any> = ncurry(7);

export const curry8: (
  name: string,
  func: DashFn<[any, any, any, any, any, any, any, any], any>,
) => Curry8<any, any, any, any, any, any, any, any, any> = ncurry(8);

export const curry9: (
  name: string,
  func: DashFn<[any, any, any, any, any, any, any, any, any], any>,
) => Curry9<any, any, any, any, any, any, any, any, any, any> = ncurry(9);

export const curry10: (
  name: string,
  func: DashFn<[any, any, any, any, any, any, any, any, any, any], any>,
) => Curry10<any, any, any, any, any, any, any, any, any, any, any> = ncurry(10);

export default {
  curry2,
  curry3,
  curry4,
  curry5,
  curry6,
  curry7,
  curry8,
  curry9,
  curry10,
};
