import { toPath, get } from "lodash";
import { useSelector } from "react-redux";
import { pointerStore } from "./createGlobalPointer";

export default function usePointer(path) {
  path = toPath(path);
  const selector = useSelector(state =>
    get(state, ["__chomtana_global_states", ...path])
  );
  //console.log("selector", selector);
  return pointerStore[path[0]];
}
