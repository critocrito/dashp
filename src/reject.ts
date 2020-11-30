import {isError} from "./internal/is";
import nameFn from "./internal/namefn";

export default nameFn("reject", (e: Error) => {
  if (isError(e)) return Promise.reject(e);
  return Promise.reject(new Error(e));
});
