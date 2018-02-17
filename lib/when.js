import {of} from "./Future";
import {curry3, curry4} from "./internal/curry";
import identity from "./internal/identity";
import {isFunction, isThenable} from "./internal/is";
import {invalidFunction, invalidThenable} from "./internal/throw";

export const whenElse = curry4(
  "whenElse",
  (predicate, consequent, alternative, p) => {
    if (!isFunction(predicate))
      invalidFunction("Future#whenElse", 0, predicate);
    if (!isFunction(consequent))
      invalidFunction("Future#whenElse", 1, consequent);
    if (!isFunction(alternative))
      invalidFunction("Future#whenElse", 2, alternative);
    if (!isThenable(p)) invalidThenable("Future#whenElse", 3, p);

    const branch = x =>
      of(predicate(x)).then(
        bool => (bool === true ? consequent(x) : alternative(x))
      );
    return of(p).then(branch);
  }
);

export const unlessElse = curry4(
  "unlessElse",
  (predicate, consequent, alternative, p) => {
    if (!isFunction(predicate))
      invalidFunction("Future#unlessElse", 0, predicate);
    if (!isFunction(consequent))
      invalidFunction("Future#unlessElse", 1, consequent);
    if (!isFunction(alternative))
      invalidFunction("Future#unlessElse", 2, alternative);
    if (!isThenable(p)) invalidThenable("Future#unlessElse", 3, p);

    return whenElse(predicate, alternative, consequent, p);
  }
);

export const when = curry3("when", (predicate, consequent, p) => {
  if (!isFunction(predicate)) invalidFunction("Future#when", 0, predicate);
  if (!isFunction(consequent)) invalidFunction("Future#when", 1, consequent);
  if (!isThenable(p)) invalidThenable("Future#when", 2, p);

  return whenElse(predicate, consequent, identity, p);
});

export const unless = curry3("unless", (predicate, consequent, p) => {
  if (!isFunction(predicate)) invalidFunction("Future#unless", 0, predicate);
  if (!isFunction(consequent)) invalidFunction("Future#unless", 1, consequent);
  if (!isThenable(p)) invalidThenable("Future#unless", 2, p);

  return unlessElse(predicate, consequent, identity, p);
});
