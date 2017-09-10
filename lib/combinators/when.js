import {of} from "../Future";
import {curry3, curry4} from "../curryN";
import identity from "../identity";
import promisify from "../promisify";

/**
 * Make a conditional test and either call the left or the right branch.
 *
 * @example
 * const pred = userExists;
 * const cons = updateUser;
 * const alt = createUser;
 * whenElse(userExists, updateUser, createUser, user);
 *
 * @param {Function} predicate Test if a condition is `true` or `false`.
 * @param {Function} consequent Apply `value` to this function if the
 * predicate return `true`;
 * @param {Function} alternative Apply `value` to this function if the
 * predicate return `false`;
 * @param {Promise|*} value Test this value to decide whether to call the
 * consequent or the alternative.
 * @returns {Promise.<*>} A promise that resolves to a value, that is the
 * result of either calling the `consequent` or the `alternative` with
 * `value`.
 */
export const whenElse = curry4(
  promisify((predicate, consequent, alternative, value) => {
    const chooseFn = bool =>
      bool === true ? consequent(value) : alternative(value);
    return of(predicate(value)).then(chooseFn);
  })
);

/**
 * Like `whenElse`, only call the `consequent` if the predicate returns
 * `false`, and the `alternative` if the predicate returns `true`;
 */
export const unlessElse = curry4((predicate, consequent, alternative, value) =>
  whenElse(predicate, alternative, consequent, value)
);

/**
 * Like `whenElse`, but have no alternative. If the predicate returns `false`,
 * simply return the `value`.
 */
export const when = curry3((predicate, consequent, value) =>
  whenElse(predicate, consequent, identity, value)
);

/**
 * Like `unlessElse`, but have no alternative. If the predicate returns `true`,
 * simply return the `value`.
 */
export const unless = curry3((predicate, consequent, value) =>
  unlessElse(predicate, consequent, identity, value)
);

export default {whenElse, unlessElse, when, unless};
