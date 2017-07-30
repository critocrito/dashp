import composeApi from "./combinators/compose";
import flowApi from "./combinators/flow";
import foldApi from "./combinators/fold";

export const compose = composeApi;
export const flow = flowApi;
export const fold = foldApi;

export default {compose, flow, fold};
