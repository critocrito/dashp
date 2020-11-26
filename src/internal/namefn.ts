// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nameFn = <F extends (...args: any[]) => any>(
  name: string,
  fn: F,
): ((...funcArgs: Parameters<F>) => ReturnType<F>) => {
  Object.defineProperty(fn, "name", {value: name, configurable: true});
  return fn;
};

export default nameFn;
