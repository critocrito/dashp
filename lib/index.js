export {default as future} from "./combinators/future";
export {default as tap} from "./combinators/tap";
export {default as fmap} from "./combinators/fmap";
export {default as apply} from "./combinators/apply";
export {default as constant} from "./combinators/constant";
export {default as all} from "./combinators/all";
export {default as compose} from "./combinators/compose";
export {default as flow} from "./combinators/flow";
export {default as fold} from "./combinators/fold";
export {map, map2, map3, map4, map5} from "./combinators/map";
export {
  flatmap,
  flatmap2,
  flatmap3,
  flatmap4,
  flatmap5,
} from "./combinators/flatmap";
export {default as caught} from "./combinators/caught";
export {when, whenElse, unless, unlessElse} from "./combinators/when";
export {default as lift2} from "./combinators/lift2";
export {default as spread} from "./combinators/spread";
export {default as delay} from "./combinators/delay";
export {retry, retry2, retry3, retry4} from "./combinators/retry";
export {default as isPromise} from "./utils/is-promise";
