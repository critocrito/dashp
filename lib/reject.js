import {isError} from "./internal/is";
import nameFn from "./internal/namefn";

const reject = e => {
  if (isError(e)) return Promise.reject(e);
  return Promise.reject(new Error(e));
};

export default nameFn("reject", reject);
