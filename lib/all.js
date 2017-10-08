import {of} from "./Future";

export default xs => () => of(xs).then(ys => Promise.all(ys.map(of)));
