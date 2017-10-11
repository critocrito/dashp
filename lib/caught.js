import {of} from "./Future";
import {curry2} from "./internal/curryN";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

export default curry2("caught", (f, p) => {
  if (!isFunction(f)) invalidFunction("Future#caught", 0, f);
  return of(p).catch(f);
});
