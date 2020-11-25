import {of} from "./future";
import nameFn from "./internal/namefn";

export default nameFn("constant", (x) => () => of(x));
