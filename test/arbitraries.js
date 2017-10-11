import {curry, isEqual} from "lodash/fp";
import jsc from "jsverify";

export const isEqualAry = xs => isEqual(...xs);

export const maybePromisify = val => {
  switch (jsc.random(0, 1)) {
    case 0:
      return val;
    default:
      return Promise.resolve(val);
  }
};

export const actionize = val => {
  switch (jsc.random(0, 2)) {
    case 0:
      return Promise.resolve(val);
    case 1:
      return () => Promise.resolve(val);
    default:
      return val;
  }
};

export const plus = curry((x, y) => x + y);
export const plusP = curry((x, y) => Promise.resolve(plus(x, y)));
export const plusMaybeP = curry((x, y) => maybePromisify(plus(x, y)));
export const minus = curry((x, y) => x - y);
export const minusP = curry((x, y) => Promise.resolve(minus(x, y)));
export const minusMaybeP = curry((x, y) => maybePromisify(minus(x, y)));

export const primitiveArb = jsc.oneof([
  jsc.number,
  jsc.char,
  jsc.string,
  jsc.bool,
]);

export const dictArb = jsc.dict(primitiveArb);

export const arrayArb = jsc.oneof([
  jsc.array(primitiveArb),
  jsc.array(dictArb),
]);

export const collectionArb = jsc.oneof([arrayArb, dictArb]);

export const anyArb = jsc.oneof([primitiveArb, collectionArb]);

export default {
  isEqualAry,
  maybePromisify,
  actionize,
  plus,
  plusP,
  plusMaybeP,
  minus,
  minusP,
  minusMaybeP,
  primitiveArb,
  arrayArb,
  dictArb,
  anyArb,
};
