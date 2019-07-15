import {of} from "./Future";
import {curry3} from "./internal/curry";

export default curry3("compose", (f, g, x) =>
  of(x)
    .then(f)
    .then(g),
);
