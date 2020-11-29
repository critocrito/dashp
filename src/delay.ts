import {curry2} from "./internal/curry";

interface Thunk<T> extends Promise<T> {
  cancel: () => void;
}

export default curry2(
  "delay",
  <T extends unknown>(ms: number, value: T): Thunk<T> => {
    // The stub cancel function will be set when constructing the delay.
    let cancel = (): void => {};

    // eslint-disable-next-line promise/avoid-new
    const thunk: Partial<Thunk<T>> = new Promise((resolve, reject) => {
      let timeOut: ReturnType<typeof setTimeout> | undefined = setTimeout(() => resolve(value), ms);
      cancel = (): void => {
        if (timeOut) {
          clearTimeout(timeOut);
          timeOut = undefined;
        }
        reject(new Error("Promise canceled"));
      };
    });
    thunk.cancel = cancel;
    return thunk as Thunk<T>;
  },
);
