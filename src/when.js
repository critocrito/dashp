import {of} from "./Future";
import {curry3, curry4} from "./internal/curry";
import identity from "./internal/identity";

export const whenElse = curry4(
  "whenElse",
  (predicate, consequent, alternative, p) => {
    const branch = (x) =>
      of(predicate(x)).then((bool) =>
        bool === true ? consequent(x) : alternative(x),
      );
    return of(p).then(branch);
  },
);

export const unlessElse = curry4(
  "unlessElse",
  (predicate, consequent, alternative, p) =>
    whenElse(predicate, alternative, consequent, p),
);

export const when = curry3("when", (predicate, consequent, p) =>
  whenElse(predicate, consequent, identity, p),
);

export const unless = curry3("unless", (predicate, consequent, p) =>
  unlessElse(predicate, consequent, identity, p),
);
