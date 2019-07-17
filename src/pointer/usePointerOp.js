import { toPath, get } from "lodash";
import { useSelector } from "react-redux";
import { pointerOpStore } from "./createPointerOp";

export default function usePointerOp(path) {
  path = toPath(path);
  const selector = useSelector(state =>
    get(state, [/*"__chomtana_global_op"*/"__chomtana_global_states", "xxx"])
  );
  //console.log("selector", selector);
  var op = pointerOpStore[path[0]];
  //console.log(pointerOpStore)
  op.wakeUp();
  return op;
}
