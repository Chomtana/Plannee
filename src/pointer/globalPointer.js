import { toPath, get } from "lodash";
import createGlobalPointer, { pointerStore } from "./createGlobalPointer";

export default function globalPointer(path, defaultValue) {
  path = toPath(path);
  var p = pointerStore[path[0]];
  if (!p) {
    pointerStore[path[0]] = createGlobalPointer(path, defaultValue);
    p = pointerStore[path[0]];
  }
  //console.log("selector", path, selector);
  return p;
}

window.globalPointer = globalPointer;