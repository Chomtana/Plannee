import { toPath } from "lodash";
import Pointer from "./pointer";
import store from "./store";

export const pointerStore = {};

export default function createGlobalPointer(path, value) {
  path = toPath(path);
  /*if (typeof pointerStore[path[0]] !== "undefined") {
    throw new Error("ReduxRef " + path + " already defined");
  }*/
  var p = new Pointer(value);
  store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: path });
  p.hook("afterDeleteCache", () =>
    store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: path })
  );
  p._stageRef.hook("afterDeleteCache", () =>
    store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: path })
  );
  p.hook("afterMarkBP", () =>
    store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: path })
  );
  p._stageRef.hook("afterMarkBP", () =>
    store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: path })
  );
  pointerStore[path[0]] = p;
  return p;
}
