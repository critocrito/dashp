import {of} from "./Future";
import {curry3, curry4} from "./internal/curryN";
import identity from "./internal/identity";
import action from "./internal/action";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

/**
 * Make a conditional test and either call the left or the right branch.
 *
 * @example
 * const pred = userExists;
 * const cons = updateUser;
 * const alt = createUser;
 * whenElse(userExists, updateUser, createUser, user);
 *
 * @param {Function} predicate Test if a condition is `true` or `false`. This
 * predicate can either return a boolean value, or a promise that resolves to
 * a boolean value.
 * @param {Function} consequent Apply `a` to this function if the
 * predicate returns `true`;
 * @param {Function} alternative Apply `a` to this function if the
 * predicate returns `false`;
 * @param {Promise.<*>} a Test this value to decide whether to call the
 * consequent or the alternative.
 * @returns {Promise.<*>} A promise that resolves to a value, that is the
 * result of either calling the `consequent` or the `alternative` with
 * `a`.
 */
export const whenElse = curry4((predicate, consequent, alternative, a) => {
  if (!isFunction(predicate)) invalidFunction("Future#whenElse", 0, predicate);
  if (!isFunction(consequent))
    invalidFunction("Future#whenElse", 1, consequent);
  if (!isFunction(alternative))
    invalidFunction("Future#whenElse", 2, alternative);

  return action(a).then(x =>
    // eslint-disable-next-line promise/no-nesting
    of(predicate(x)).then(
      bool => (bool === true ? consequent(x) : alternative(x))
    )
  );
});

/**
 * Like `whenElse`, only call the `consequent` if the predicate returns
 * `false`, and the `alternative` if the predicate returns `true`;
 */
export const unlessElse = curry4((predicate, consequent, alternative, a) => {
  if (!isFunction(predicate))
    invalidFunction("Future#unlessElse", 0, predicate);
  if (!isFunction(consequent))
    invalidFunction("Future#unlessElse", 1, consequent);
  if (!isFunction(alternative))
    invalidFunction("Future#unlessElse", 2, alternative);
  return whenElse(predicate, alternative, consequent, a);
});

/**
 * Like `whenElse`, but have no alternative. If the predicate returns `false`,
 * simply return the `a`.
 */
export const when = curry3((predicate, consequent, a) => {
  if (!isFunction(predicate)) invalidFunction("Future#when", 0, predicate);
  if (!isFunction(consequent)) invalidFunction("Future#when", 1, consequent);
  return whenElse(predicate, consequent, identity, a);
});

/**
 * Like `unlessElse`, but have no alternative. If the predicate returns `true`,
 * simply return the `a`.
 */
export const unless = curry3((predicate, consequent, a) => {
  if (!isFunction(predicate)) invalidFunction("Future#unless", 0, predicate);
  if (!isFunction(consequent)) invalidFunction("Future#unless", 1, consequent);
  return unlessElse(predicate, consequent, identity, a);
});

export default {whenElse, unlessElse, when, unless};
