import {fc, testProp} from "ava-fast-check";
import {curry as loCurry, every, isEqual, range, times} from "lodash/fp";

import curries from "../src/internal/curry";
import {random} from "./_helpers";

const randomApplication = (f, args) => {
  const max = random(1, args.length);
  const xs = args.slice(0, max);
  if (xs.length === args.length) return f(...xs);
  return randomApplication(f(...xs), args.slice(xs.length));
};

range(2, 11).forEach((i) => {
  const arbs = times(() => fc.nat(), i);

  testProp(
    `curry${i} is equivalent to the original function and lodash's curry`,
    arbs,
    (t, ...args) => {
      const f = (...rest) => rest.reduce((memo, a) => memo + a, 0);
      const f1 = loCurry(f);
      const f2 = curries[`curry${i}`](`f${i}`, f);

      t.true(
        every(isEqual(f(...args)), [
          f1(...args),
          f2(...args),
          args.reduce((memo, a) => memo(a), f2),
          randomApplication(f2, args),
        ]),
      );
    },
  );

  testProp(`variadic function pattern for curry${i}`, arbs, (t, ...args) => {
    const curry = curries[`curry${i}`];
    const sum = (...xs) => xs.reduce((memo, a) => memo + a, 0);
    const f = curry(`f${i}`, sum);

    t.is(sum(...args), f(...args.concat(args)));
  });

  testProp(`curry${i} sets the function name`, [fc.string(1, 50)], (t, s) => {
    const curry = curries[`curry${i}`];
    const f = curry(s, (...xs) => xs.reduce((memo, a) => memo + a, 0));
    const [, name, count] = /^(.*)-([\d]*)$/.exec(f.name);
    t.is(name, s);
    t.is(parseInt(count, 10), i);
  });
});
