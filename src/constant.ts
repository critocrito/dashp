import {of} from "./future";
import nameFn from "./internal/namefn";

export default nameFn("constant", <T extends unknown>(x: T): (() => Promise<T>) => (): Promise<T> =>
  of(x),
);
