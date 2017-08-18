/**
 * Lift a value into a promise. This is equivalent to `Promise.resolve`.
 *
 * @example
 * const x = future(23);
 * const f = a => future(a + 1);
 *
 * @param {(Promise.<*>|*)} x The value to lift into a promise. This can
 * either be a value, or a promise that resolves to a value.
 * @returns {Promise.<*>} The value inside a promise.
 */
const future = x => Promise.resolve(x);

export default future;
