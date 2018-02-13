const nameFn = (name, fn) => {
  Object.defineProperty(fn, "name", {value: name, configureable: true});
  return fn;
};

export default nameFn;
