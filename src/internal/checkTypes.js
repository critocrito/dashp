import {isFunction, isArray, isThenable} from "./is";
import {invalidFunction, invalidArray, invalidThenable} from "./throw";

const checksMap = {
  function: isFunction,
  array: isArray,
  thenable: isThenable,
};

export default (checks, f) => {
  const checkArgs = (...args) => {
    const {name} = checkArgs;
    checks.forEach((check, i) => {
      const checkFn = checksMap[check];
      if (checkFn == null) return;
      if (!checkFn(args[i])) {
        // eslint-disable-next-line default-case
        switch (check) {
          case "function":
            invalidFunction(name, i, args[i]);
            break;
          case "array":
            invalidArray(name, i, args[i]);
            break;
          case "thenable":
            invalidThenable(name, i, args[i]);
            break;
        }
      }
    });

    return f(...args);
  };

  return checkArgs;
};
