import {curry as loCurry, every, isEqual, range, times} from "lodash/fp";
import {testProp, fc} from "ava-fast-check";

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
    (...args) => {
      const f = (...rest) => rest.reduce((memo, a) => memo + a, 0);
      const f1 = loCurry(f);
      const f2 = curries[`curry${i}`](`f${i}`, f);
      return every(isEqual(f(...args)), [
        f1(...args),
        f2(...args),
        args.reduce((memo, a) => memo(a), f2),
        randomApplication(f2, args),
      ]);
    },
  );

  testProp(`variadic function pattern for curry${i}`, arbs, (...args) => {
    const curry = curries[`curry${i}`];
    const sum = (...xs) => xs.reduce((memo, a) => memo + a, 0);
    const f = curry(`f${i}`, sum);
    return isEqual(sum(...args), f(...args.concat(args)));
  });

  testProp(`curry${i} sets the function name`, [fc.string(1, 50)], (s) => {
    const curry = curries[`curry${i}`];
    const f = curry(s, (...xs) => xs.reduce((memo, a) => memo + a, 0));
    const [, name, count] = /^(.*)-([\d]*)$/.exec(f.name);
    return isEqual(name, s) && isEqual(parseInt(count, 10), i);
  });
});
