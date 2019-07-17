import Ref from "./Ref";
import { get, set, clone, cloneDeep } from "lodash";

import store from "../store";

var valueStore = "{}";
var stageStore = "{}";

var valueStoreCache = {};
var stageStoreCache = {};

var primitiveStageCache = {};
var primitiveValueCache = {};

export default class GlobalRef extends Ref {
  constructor(input?: any, parentRef?: GlobalRef) {
    super(input, parentRef);

    if (!parentRef && this.getTarget().length > 1) {
      //console.log(this.getTarget())
      var curr = new GlobalRef(this.getTarget()[0]);
      for (var i = 1; i < this.getTarget().length; i++) {
        curr = curr(this.getTarget()[i], curr);
      }
      return curr;
    }
  }

  protected performNext(query: any) {
    return new GlobalRef([...this.target, query], this);
  }
  public get() {
    return get(JSON.parse(valueStore), this.target);
  }
  public getCurrent() {
    return get(JSON.parse(stageStore), this.target);
  }
  public stage(newvalue: any, path?: any) {
    let fuck = JSON.parse(stageStore);
    set(fuck, [...this.target, ...(path || [])], cloneDeep(newvalue));
    stageStore = JSON.stringify(fuck);
    stageStoreCache = JSON.parse(stageStore);

    if (typeof newvalue !== "object") {
      primitiveStageCache[this.getTarget()] = newvalue;
    } else {
      delete primitiveStageCache[this.getTarget()];
    }

    /*console.log(stageStore, valueStore);
    try {
      console.log(valueStoreCache.z[1].a);
    } catch (err) {}*/
    store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: this.target });
  }
  public commit(message?: any, path?: any) {
    let fuck = JSON.parse(valueStore);
    let realpath = [...this.target, ...(path || [])];
    let newvalue = get(JSON.parse(stageStore), realpath);
    set(fuck, realpath, newvalue);
    valueStore = JSON.stringify(fuck);
    valueStoreCache = JSON.parse(valueStore);

    if (typeof newvalue !== "object") {
      primitiveValueCache[this.getTarget()] = newvalue;
    } else {
      delete primitiveValueCache[this.getTarget()];
    }

    store.dispatch({ type: "$Chomtana.UpdateGlobalState", path: this.target });
  }
}
