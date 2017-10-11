import {of} from "./Future";
import {curry2} from "./internal/curryN";

export default curry2("flow", (fs, x) =>
  fs.reduce((memo, f) => memo.then(f), of(x))
);
