const ncurry = n => {
  const localCurry = (f, ...args) => (...largs) => {
    const rest = args.concat(largs);

    if (rest.length < n) return localCurry(f, ...rest);
    return f(...rest);
  };
  return localCurry;
};

export const curry2 = ncurry(2);
export const curry3 = ncurry(3);
export const curry4 = ncurry(4);

export default {curry2, curry3, curry4};
