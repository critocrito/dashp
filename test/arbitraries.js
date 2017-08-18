import {curry, isEqual} from "lodash/fp";
import {oneof, array, number, char, string, json, bool, random} from "jsverify";

export const isEqualAry = xs => isEqual(...xs);

export const maybePromisify = val => {
  switch (random(0, 1)) {
    case 0:
      return val;
    default:
      return Promise.resolve(val);
  }
};

export const add = curry((x, y) => x + y);
export const addP = curry((x, y) => Promise.resolve(add(x, y)));
export const addMaybeP = curry((x, y) => maybePromisify(add(x, y)));

export const anyArb = oneof([
  number,
  char,
  string,
  json,
  bool,
  array(number),
  array(char),
  array(string),
  array(json),
  array(bool),
]);

export default {
  isEqualAry,
  maybePromisify,
  add,
  addP,
  addMaybeP,
  anyArb,
};
