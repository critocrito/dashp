import future from "./future";

/**
 * Create a function that always returns the same value.
 *
 * @example
 * const f = constant("Hello");
 * f().then(console.log); // Returns "Hello"
 *
 * @param {*} x The value to return. This can either be a value or a promise
 * for a value.
 * @returns {Promise.<*>} A promise that resolves to `x`.
 */
const constant = x => () => future(x);

export default constant;
