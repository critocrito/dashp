import composeApi from "./combinators/compose";
import flowApi from "./combinators/flow";
import foldApi from "./combinators/fold";
import mapApi from "./combinators/map";

export const compose = composeApi;
export const flow = flowApi;
export const fold = foldApi;
export const map = mapApi;

export default {compose, flow, fold, map};
