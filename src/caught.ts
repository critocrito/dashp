import {of} from "./future";
import {curry2} from "./internal/curry";

export default curry2("caught", <T extends unknown>(f: (e: Error) => void, p: Promise<T>) =>
  of(p).catch(f),
);
