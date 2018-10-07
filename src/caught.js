import {of} from "./Future";
import {curry2} from "./internal/curry";
import checkTypes from "./internal/checkTypes";

export default curry2(
  "caught",
  checkTypes(["function"], (f, p) => of(p).catch(f)),
);
