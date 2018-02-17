import {curry2} from "./internal/curry";

export default curry2("delay", (ms, value) => {
  let cancel;

  // eslint-disable-next-line promise/avoid-new
  const thunk = new Promise((resolve, reject) => {
    let timeOut = setTimeout(() => resolve(value), ms);
    cancel = () => {
      if (timeOut) {
        clearTimeout(timeOut);
        timeOut = null;
      }
      reject(new Error("Promise canceled"));
    };
  });
  thunk.cancel = cancel;
  return thunk;
});
