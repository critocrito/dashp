import futureApi from "./combinators/future";
import fmapApi from "./combinators/fmap";
import constantApi from "./combinators/constant";
import allApi from "./combinators/all";
import composeApi from "./combinators/compose";
import flowApi from "./combinators/flow";
import foldApi from "./combinators/fold";
import mapApi from "./combinators/map";

export const future = futureApi;
export const fmap = fmapApi;
export const constant = constantApi;
export const all = allApi;
export const compose = composeApi;
export const flow = flowApi;
export const fold = foldApi;
export const map = mapApi;

export default {future, fmap, constant, all, compose, flow, fold, map};
