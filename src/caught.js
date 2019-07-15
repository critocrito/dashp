import {of} from "./Future";
import {curry2} from "./internal/curry";

export default curry2("caught", (f, p) => of(p).catch(f));
