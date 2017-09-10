import {curry2} from "./internal/curryN";

/**
 * Delay the resolution of a promise chain.
 *
 * @example
 * delay(100).then(console.log) // Waits 100 ms.
 *
 * @param {number} ms The time to wait in milliseconds.
 * @param {Promise.<*>|*} value The promise or value to resolve after the
 * delay.
 * @returns {Promise} A promise that resolved to value, or whatever value
 * resolves to.
 */
const delay = curry2((ms, value) => {
  let cancel;

  // eslint-disable-next-line promise/avoid-new
  const thunk = new Promise((resolve, reject) => {
    let timeOut = setTimeout(() => resolve(value), ms);
    cancel = () => {
      if (timeOut) {
        clearTimeout(timeOut);
        timeOut = null;
      }
      reject(new Error("Promise canceled"));
    };
  });
  thunk.cancel = cancel;
  return thunk;
});

export default delay;
