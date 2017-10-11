export const isFunction = f => typeof f === "function";
export const isThenable = p =>
  p instanceof Promise ||
  (Boolean(p) &&
    (typeof p === "object" || typeof p === "function") &&
    isFunction(p.then));
// eslint-disable-next-line prefer-destructuring
export const isArray = Array.isArray;
export const isAction = a => isFunction(a) || isThenable(a);
