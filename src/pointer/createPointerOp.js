import { toPath, debounce } from "lodash";
import { store } from "./pointerStore";
import PointerOp from "./pointerOp";

export const pointerOpStore = {};

export default function createGlobalPointerOp(path, onWakeup, wakeUp) {
  path = toPath(path);
  /*if (typeof pointerStore[path[0]] !== "undefined") {
    throw new Error("ReduxRef " + path + " already defined");
  }*/

  var hook = debounce(() => {
    //store.dispatch({ type: "$Chomtana.UpdateGlobalOp", path: path });
    setTimeout(()=>store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: "xxx" }), 50);
  }, 100);

  var p = new PointerOp(onWakeup, wakeUp);
  hook();
  p.hook("rerender", hook);
  p.hook("ready", hook);
  pointerOpStore[path[0]] = p;
  return p;
}
