import {of} from "./Future";
import nameFn from "./internal/namefn";

export default nameFn("constant", x => () => of(x));
