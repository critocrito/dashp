import {of} from "./future";
import nameFn from "./internal/namefn";

export default nameFn("all", <T extends unknown>(xs: T[]): (() => Promise<T[]>) => (): Promise<
  T[]
> => of(xs).then((ys: T[]) => Promise.all(ys.map(of))));
