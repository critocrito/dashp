import {of} from "./future";
import {curry2} from "./internal/curry";
import {isArray} from "./internal/is";

export default curry2("spread", (f, p) =>
  of(p).then((args) => {
    if (isArray(args)) return f(...args);
    return f(args);
  }),
);
