import {of} from "./Future";
import {curry3} from "./internal/curry";
import checkTypes from "./internal/checkTypes";

export default curry3(
  "compose",
  checkTypes(["function", "function"], (f, g, x) =>
    of(x)
      .then(f)
      .then(g),
  ),
);
