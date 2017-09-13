import {isFunction, isThenable} from "./is";

export default a => {
  if (isThenable(a)) return a;
  if (isFunction(a)) return Promise.resolve(a());
  return Promise.resolve(a);
};
