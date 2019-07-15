import {curry, isEqual} from "lodash/fp";
import fc from "fast-check";

export const mapArb = fc.object().map((o) => new Map(Object.entries(o)));

export const singleValueArb = () =>
  fc.anything().filter((x) => !Array.isArray(x));

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const isEqualAry = (xs) => isEqual(...xs);

export const throws = async (f, error = Error, msg) => {
  try {
    await f();
  } catch (e) {
    if (e instanceof error) {
      if (msg instanceof RegExp) return msg.test(e.message);
      return msg == null || e.message === msg;
    }
  }
  return false;
};

export const plus = curry((x, y) => x + y);

export const plusP = curry((x, y) => Promise.resolve(plus(x, y)));

export const minus = curry((x, y) => x - y);

export const minusP = curry((x, y) => Promise.resolve(minus(x, y)));
