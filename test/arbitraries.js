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

export const add = curry((x, y) => x + y);
export const addP = curry((x, y) => Promise.resolve(add(x, y)));
export const addMaybeP = curry((x, y) => maybePromisify(add(x, y)));

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
  add,
  addP,
  addMaybeP,
  anyArb,
};
