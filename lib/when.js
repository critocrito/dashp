import {of} from "./Future";
import {curry3, curry4} from "./internal/curryN";
import identity from "./internal/identity";
import action from "./internal/action";
import {isFunction} from "./internal/is";
import {invalidFunction} from "./internal/throw";

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

export const unlessElse = curry4((predicate, consequent, alternative, a) => {
  if (!isFunction(predicate))
    invalidFunction("Future#unlessElse", 0, predicate);
  if (!isFunction(consequent))
    invalidFunction("Future#unlessElse", 1, consequent);
  if (!isFunction(alternative))
    invalidFunction("Future#unlessElse", 2, alternative);
  return whenElse(predicate, alternative, consequent, a);
});

export const when = curry3((predicate, consequent, a) => {
  if (!isFunction(predicate)) invalidFunction("Future#when", 0, predicate);
  if (!isFunction(consequent)) invalidFunction("Future#when", 1, consequent);
  return whenElse(predicate, consequent, identity, a);
});

export const unless = curry3((predicate, consequent, a) => {
  if (!isFunction(predicate)) invalidFunction("Future#unless", 0, predicate);
  if (!isFunction(consequent)) invalidFunction("Future#unless", 1, consequent);
  return unlessElse(predicate, consequent, identity, a);
});
