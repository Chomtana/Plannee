import { toPath, get } from "lodash";
import { useSelector } from "react-redux";
import createGlobalPointer, { pointerStore } from "./createGlobalPointer";

export default function usePointer(path) {
  path = toPath(path);
  var p = pointerStore[path[0]];
  if (!p) {
    createGlobalPointer(path, undefined);
  }
  const selector = useSelector(state =>
    get(state, ["__chomtana_global_states", "xxx"/*...path*/])
  );
  //console.log("selector", path, selector);
  return p;
}
