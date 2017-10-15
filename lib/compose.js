import {of} from "./Future";
import {curry3} from "./internal/curryN";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

export default curry3("compose", (f, g, x) => {
  if (!isFunction(f)) invalidFunction("Future#compose", 0, f);
  if (!isFunction(g)) invalidFunction("Future#compose", 1, g);

  return of(x)
    .then(f)
    .then(g);
});
