import futureApi from "./combinators/future";
import fmapApi from "./combinators/fmap";
import applyApi from "./combinators/apply";
import constantApi from "./combinators/constant";
import allApi from "./combinators/all";
import composeApi from "./combinators/compose";
import flowApi from "./combinators/flow";
import foldApi from "./combinators/fold";
import {
  map as mapApi,
  map2 as map2Api,
  map3 as map3Api,
  map4 as map4Api,
  map5 as map5Api,
} from "./combinators/map";
import lift2Api from "./combinators/lift2";
import spreadApi from "./combinators/spread";

import isPromiseApi from "./utils/is-promise";

export const future = futureApi;
export const fmap = fmapApi;
export const apply = applyApi;
export const constant = constantApi;
export const all = allApi;
export const compose = composeApi;
export const flow = flowApi;
export const fold = foldApi;
export const map = mapApi;
export const map2 = map2Api;
export const map3 = map3Api;
export const map4 = map4Api;
export const map5 = map5Api;
export const lift2 = lift2Api;
export const spread = spreadApi;
export const isPromise = isPromiseApi;

export default {
  future,
  fmap,
  apply,
  constant,
  all,
  compose,
  flow,
  fold,
  map,
  map2,
  map3,
  map4,
  map5,
  lift2,
  spread,
  isPromise,
};
