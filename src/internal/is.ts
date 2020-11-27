// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFunction = (f: unknown): f is (...args: any[]) => any => typeof f === "function";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isThenable = (p: any): boolean =>
  p instanceof Promise ||
  (Boolean(p) && (typeof p === "object" || typeof p === "function") && isFunction(p.then));

export const {isArray} = Array;

export const isError = (e: unknown): e is Error => e instanceof Error;
