import {isThenable} from "./internal/is";
/**
 * Test if an object is a promise.
 *
 * @example
 * const p = F.of(23);
 * isPromise(p); // Returns true;
 *
 * @param {*} p The object to test.
 * @returns {boolean} Returns `true` if the object is a promise, otherwise
 * `false`;
 */
const isPromise = isThenable;

export default isPromise;
