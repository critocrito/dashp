import nameFn from "./namefn";

const ncurry = (n) => {
  const localCurry = (name, f, ...args) => {
    // This allows checkTypes to throw nicer error messages
    const localF = nameFn(`Future#${name}`, f);

    const g = (...largs) => {
      const rest = args.concat(largs);

      if (rest.length < n) return localCurry(name, localF, ...rest);
      return localF(...rest);
    };
    return nameFn(`${name}-${n - args.length}`, g);
  };

  return localCurry;
};

export const curry2 = ncurry(2);
export const curry3 = ncurry(3);
export const curry4 = ncurry(4);
export const curry5 = ncurry(5);
