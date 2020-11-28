import {of} from "./future";
import nameFn from "./internal/namefn";

export default nameFn("all", (xs: Promise<unknown>[]) => (): Promise<unknown[]> =>
  of(xs).then((ys) => Promise.all(ys.map(of))),
);
