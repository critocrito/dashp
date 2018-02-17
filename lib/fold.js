import {of} from "./Future";
import {curry3} from "./internal/curry";
import {isFunction, isArray} from "./internal/is";
import {invalidFunction, invalidArray} from "./internal/throw";

export default curry3("fold", (f, acc, xs) => {
  if (!isFunction(f)) invalidFunction("Future#fold", 0, f);
  if (!isArray(xs)) invalidArray("Future#fold", 3, xs);
  return xs.reduce((memo, x) => memo.then(y => f(y, x)), of(acc));
});
