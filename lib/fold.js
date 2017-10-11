import {of} from "./Future";
import {curry3} from "./internal/curryN";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

export default curry3("fold", (f, acc, xs) => {
  if (!isFunction(f)) invalidFunction("Future#fold", 0, f);
  return xs.reduce((memo, x) => memo.then(y => f(y, x)), of(acc));
});
