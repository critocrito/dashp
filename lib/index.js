import futureApi from "./combinators/future";
import composeApi from "./combinators/compose";
import flowApi from "./combinators/flow";
import foldApi from "./combinators/fold";
import mapApi from "./combinators/map";

export const future = futureApi;
export const compose = composeApi;
export const flow = flowApi;
export const fold = foldApi;
export const map = mapApi;

export default {future, compose, flow, fold, map};
