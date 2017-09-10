import {of} from "../Future";
import {curry2} from "../curryN";

/**
 * Catch an exception on a promise and call a exception handler. This is
 * equivalent to `Promise.catch`.
 *
 * @example
 * const f = () => new Error("Boom");
 * caught(console.error, f()); // Prints the exception.
 *
 * @param {Function} f The handler to call when the promise `p` get's
 * rejected.
 * @param {Promise.<*>|*} p A value or a promise that get's resolved.
 * @returns {Promise.<*>} A promise that resolves either to the value of `p`
 * or to the return value of `f`.
 */
const caught = curry2((f, p) => of(p).catch(f));

export default caught;
