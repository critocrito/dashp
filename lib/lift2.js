import {curry3} from "./internal/curryN";

export default curry3((f, x, y) => Promise.all([x, y]).then(xs => f(...xs)));
