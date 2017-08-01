import fmap from "./fmap";
import {curry2} from "../curryN";

/**
 * Apply a function wrapped in a promise to a promisified value.
 *
 * @param {Promise.<Function>} pf A promise that resolves to a function.
 * @param {Promise.<Any>} p A promise that resolves to a value.
 * @returns {Promise.<Any>} A promise resolving to x applied to the function
 * that f resolves to.
 * @example
 * const pf = future(v => v + 1);
 * const p = future(1);
 * apply(pf, f).then(console.log); // Returns 2.
 */
const apply = curry2((pf, p) => fmap(f => fmap(f, p), pf));

export default apply;
