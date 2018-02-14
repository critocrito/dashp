import {of} from "./Future";
import {curry2} from "./internal/curryN";
import {isArray} from "./internal/is";

export default curry2("spread", (f, p) =>
  of(p).then(args => {
    if (isArray(args)) return f(...args);
    return f(args);
  })
);
