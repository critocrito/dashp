import futureApi from "./combinators/future";
import constantApi from "./combinators/constant";
import composeApi from "./combinators/compose";
import flowApi from "./combinators/flow";
import foldApi from "./combinators/fold";
import mapApi from "./combinators/map";

export const future = futureApi;
export const constant = constantApi;
export const compose = composeApi;
export const flow = flowApi;
export const fold = foldApi;
export const map = mapApi;

export default {future, constant, compose, flow, fold, map};
