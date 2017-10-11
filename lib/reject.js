import {isError} from "./internal/is";

const reject = e => {
  if (isError(e)) return Promise.reject(e);
  return Promise.reject(new Error(e));
};

export default reject;
