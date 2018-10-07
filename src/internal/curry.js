import nameFn from "./namefn";

const ncurry = (n) => {
  const localCurry = (name, f, ...args) => {
    // This allows checkTypes to throw nicer error messages.
    const localF = nameFn(`Future#${name}`, f);

    const g = (...largs) => {
      const rest = args.concat(largs);

      if (rest.length < n) return localCurry(name, localF, ...rest);
      // This allows for the curried variadic function pattern.
      return localF(...rest.slice(0, n));
    };
    return nameFn(`${name}-${n - args.length}`, g);
  };

  return localCurry;
};

export const curry2 = ncurry(2);
export const curry3 = ncurry(3);
export const curry4 = ncurry(4);
export const curry5 = ncurry(5);
export const curry6 = ncurry(6);
export const curry7 = ncurry(7);
export const curry8 = ncurry(8);
export const curry9 = ncurry(9);
export const curry10 = ncurry(10);

export default {
  curry2,
  curry3,
  curry4,
  curry5,
  curry6,
  curry7,
  curry8,
  curry9,
  curry10,
};
