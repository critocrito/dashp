import {of} from "./future";
import {curry3} from "./internal/curry";

export default curry3("fold", (f, acc, xs) =>
  xs.reduce((memo, x) => memo.then((y) => f(y, x)), of(acc)),
);
