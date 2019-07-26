import { toPath, debounce } from "lodash";
import Pointer, { BasePointer } from "./pointer";
import { store } from "./pointerStore";
import globalPointer from "./globalPointer";

export const pointerStore = {};

window.pointerStore = pointerStore;

var hook = debounce(() => {
  //store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: path });
  console.log("hook");
  setTimeout(()=>store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: "xxx" }), 50);
}, 100);

export default function createGlobalPointer(path, value) {
  path = toPath(path);
  /*if (typeof pointerStore[path[0]] !== "undefined") {
    throw new Error("ReduxRef " + path + " already defined");
  }*/
  
  if (pointerStore[path[0]] instanceof BasePointer) {
	pointerStore[path[0]].set(value);
	//hook();
	return pointerStore[path[0]];
  }



  var p = new Pointer(value);
  hook();
  p.hook("afterSetBP", hook);
  //p.stage().hook("afterSetBP", hook);
  p.hook("afterMarkBP", hook);
  //p.stage().hook("afterMarkBP", hook);
  pointerStore[path[0]] = p;
  return p;
}

window.createGlobalPointer = createGlobalPointer
window.globalPointer = globalPointer;