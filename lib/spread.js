import {of} from "./Future";
import {curry2} from "./internal/curryN";

export default curry2("spread", (f, p) =>
  of(p).then(args => {
    if (Array.isArray(args)) return f(...args);
    return f(args);
  })
);
