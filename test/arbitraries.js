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

export const plus = curry((x, y) => x + y);
export const plusP = curry((x, y) => Promise.resolve(plus(x, y)));
export const plusMaybeP = curry((x, y) => maybePromisify(plus(x, y)));
export const minus = curry((x, y) => x - y);
export const minusP = curry((x, y) => Promise.resolve(minus(x, y)));
export const minusMaybeP = curry((x, y) => maybePromisify(minus(x, y)));

export const anyArb = jsc.oneof([
  jsc.number,
  jsc.char,
  jsc.string,
  jsc.json,
  jsc.bool,
  jsc.array(jsc.number),
  jsc.array(jsc.char),
  jsc.array(jsc.string),
  jsc.array(jsc.json),
  jsc.array(jsc.bool),
]);

export default {
  isEqualAry,
  maybePromisify,
  plus,
  plusP,
  plusMaybeP,
  minus,
  minusP,
  minusMaybeP,
  anyArb,
};
