import fc from "fast-check";
import {curry} from "lodash/fp";

export const mapArb = fc.object().map((o) => new Map(Object.entries(o)));

export const singleValueArb = (): unknown => fc.anything().filter((x) => !Array.isArray(x));

export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

export const throws = async (
  f: () => Promise<unknown>,
  error = Error,
  msg: string | RegExp,
): Promise<boolean> => {
  try {
    await f();
  } catch (error_) {
    if (error_ instanceof error) {
      if (msg instanceof RegExp) return msg.test(error_.message);
      // eslint-disable-next-line unicorn/no-null
      return msg == null || error_.message === msg;
    }
  }
  return false;
};

export const identity = <T extends unknown>(x: T): T => x;

export const plus = curry((x: number, y: number) => x + y);

export const plusP = curry((x: number, y: number) => Promise.resolve(plus(x, y)));

export const minus = curry((x: number, y: number) => x - y);

export const minusP = curry((x: number, y: number) => Promise.resolve(minus(x, y)));

export const sum = (...xs: number[]): number => xs.reduce((memo, a) => memo + a, 0);
