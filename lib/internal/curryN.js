const ncurry = n => {
  const localCurry = (name, f, ...args) => {
    const g = (...largs) => {
      const rest = args.concat(largs);

      if (rest.length < n) return localCurry(name, f, ...rest);
      return f(...rest);
    };
    Object.defineProperty(g, "name", {value: name, configureable: true});
    return g;
  };

  return localCurry;
};

export const curry2 = ncurry(2);
export const curry3 = ncurry(3);
export const curry4 = ncurry(4);

export default {curry2, curry3, curry4};
