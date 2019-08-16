import { toPath, get } from "lodash";
import createPointerOp, { pointerOpStore } from "./createPointerOp";

export default function globalPointerOp(path, onWakeupIfNotCreated) {
  path = toPath(path);
  var p = pointerOpStore[path[0]];
  if (!p) {
    pointerOpStore[path[0]] = createPointerOp(path, onWakeupIfNotCreated, true);
    p = pointerOpStore[path[0]]
  } else {
    p.wakeUp();
  }
  //console.log("selector", path, selector);
  return p;
}

window.globalPointerOp = globalPointerOp;
