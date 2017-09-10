import {of} from "./Future";

/**
 * Create a function that always returns the same value.
 *
 * @example
 * const f = constant("Hello");
 * f().then(console.log); // Returns "Hello"
 *
 * @param {(Promise.<*>|*)} x The value to return. This can either be a value
 * or a promise for a value.
 * @returns {Promise.<*>} A promise that resolves to `x`.
 */
const constant = x => () => of(x);

export default constant;
