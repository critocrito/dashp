import {curry3, curry4, curry5} from "./internal/curryN";

const lift = (f, ...args) => Promise.all(args).then(xs => f(...xs));

export const lift2 = curry3("lift2", lift);
export const lift3 = curry4("lift3", lift);
export const lift4 = curry5("lift4", lift);
