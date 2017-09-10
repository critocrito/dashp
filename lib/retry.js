import {curry2, curry3, curry4} from "./internal/curryN";

import delay from "./delay";
import caught from "./caught";
import isPromise from "./is-promise";

// times is 0-indexed. A times value of 4, actually makes 5 retries.
const retrier = (times, waitTime) => (action, ...args) => {
  const delayModifier = 1.5;
  const f = isPromise(action) ? () => action : action;

  const resolver = (iter, waitMs) => {
    if (iter <= 0) return f(...args);
    return caught(
      () =>
        delay(waitMs, null).then(() =>
          resolver(iter - 1, waitMs * delayModifier)
        ),
      f(...args)
    );
  };

  return resolver(times, waitTime);
};

/**
 * Call an action, and retry it in case it fails. An action is retried up to
 * five times with an increasing timeout.
 *
 * @example
 * // Retries `fetchUser` in case of failure.
 * retry(fetchUser).then(console.log).catch(console.error);
 *                        
 *
 * @param {Promise|Function} action A function or a promise that should be
 * retried in case of failure.
 * @returns {Promise.<*>} A promise that resolves to the return value of
 * `action`, or that is rejected with the last exception that `action` failed
 * with.
 */
export const retry = retrier(4, 250);

// Using curry allows to fix the number of arguments for functions that are
// implemented as variadic functions.
/**
 * Like `retry`, but accept one additional argument that is applied to
 * `action`.
 *
 * @example
 * // Retries `fetchUser` in case of failure.
 * retry(fetchUser, 23).then(console.log).catch(console.error);
 *
 * @param {Promise|Function} action A function or a promise that should be
 * retried in case of failure.
 * @param {*} arg The argument to apply to `action`.
 * @returns {Promise.<*>} A promise that resolves to the return value of
 * `action`, or that is rejected with the last exception that `action` failed
 * with.
 */
export const retry2 = curry2(retrier(4, 250));

/**
 * Like `retry2`, but accept two arguments to apply to `action`.
 */
export const retry3 = curry3(retrier(4, 250));
/**
 * Like `retry2`, but accept three arguments to apply to `action`.
 */
export const retry4 = curry4(retrier(4, 250));

export default {retry, retry2, retry3};
