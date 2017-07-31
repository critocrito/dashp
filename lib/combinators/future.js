import Promise from "bluebird";

/**
 * Lift a value into a promise. This is equivalent to `Promise.resolve`.
 *
 * @example
 * const x = future(23);
 * const f = a => future(a + 1);
 *
 * @param {*} x The value to lift into a promise.
 * @returns {Promise.<*>} The value inside a promise.
 */
const future = Promise.resolve;

export default future;
