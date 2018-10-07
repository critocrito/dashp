import {of} from "./Future";
import {curry3} from "./internal/curry";
import checkTypes from "./internal/checkTypes";

export default curry3(
  "fold",
  checkTypes(["function", "any", "array"], (f, acc, xs) =>
    xs.reduce((memo, x) => memo.then((y) => f(y, x)), of(acc)),
  ),
);
