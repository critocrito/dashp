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
import {
  flatmap as flatmapApi,
  flatmap2 as flatmap2Api,
  flatmap3 as flatmap3Api,
  flatmap4 as flatmap4Api,
  flatmap5 as flatmap5Api,
} from "./combinators/flatmap";
import {
  when as whenApi,
  whenElse as whenElseApi,
  unless as unlessApi,
  unlessElse as unlessElseApi,
} from "./combinators/when";
import lift2Api from "./combinators/lift2";
import spreadApi from "./combinators/spread";
import delayApi from "./combinators/delay";

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
export const flatmap = flatmapApi;
export const flatmap2 = flatmap2Api;
export const flatmap3 = flatmap3Api;
export const flatmap4 = flatmap4Api;
export const flatmap5 = flatmap5Api;
export const when = whenApi;
export const whenElse = whenElseApi;
export const unless = unlessApi;
export const unlessElse = unlessElseApi;
export const lift2 = lift2Api;
export const spread = spreadApi;
export const delay = delayApi;
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
  flatmap,
  flatmap2,
  flatmap3,
  flatmap4,
  flatmap5,
  when,
  whenElse,
  unless,
  unlessElse,
  lift2,
  spread,
  delay,
  isPromise,
};
