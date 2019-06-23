import Ref, { RefExtension } from "./Ref";
import { useSelector, useDispatch } from "react-redux";
import { get, set, cloneDeep } from "lodash";
import { useState } from "react";
import useSelectorRef from "./useSelectorRef";

export class ReduxRefExtension extends RefExtension {
  //For make it able to implement makeNotExtension that optimal
  public rootRef: ReduxRef;
  public parentRef: ReduxRef | ReduxRefExtension;
  public targetExtension: string;
  public targetExtensionFromRoot: string;

  constructor(
    rootRef: ReduxRef,
    parentRef: ReduxRef | ReduxRefExtension,
    targetExtension?: any
  ) {
    super([...parentRef.getTarget(), targetExtension], parentRef);
    this.targetExtension = targetExtension;
    this.rootRef = rootRef;
    this.parentRef = parentRef;

    this.targetExtensionFromRoot = this.getTarget().slice(
      rootRef.getTarget().length
    );
  }

  protected performNext(query: any) {
    return new ReduxRefExtension(this.rootRef, this, query);
  }
  public get() {
    return get(this.parentRef.get(), this.targetExtension);
  }
  public getCurrent() {
    return get(this.parentRef.getCurrent(), this.targetExtension);
  }
  public stage(newvalue: any) {
    var curr_root_var = cloneDeep(this.rootRef.getCurrent());
    set(curr_root_var, this.targetExtensionFromRoot, newvalue);
    this.rootRef.stage(curr_root_var);
  }
  public commit(message?: any, path: Array<string> = []) {
    this.rootRef.commit(message, [...this.targetExtensionFromRoot, ...path]);
  }

  public makeNotExtension(): ReduxRef {
    return new ReduxRef(this.getTarget());
  }
}

export default class ReduxRef extends Ref {
  private selector_result;
  private current_var;
  private set_current_var;
  private dispatch;

  //for react non-sense setState async fixing
  private staging_var;
  private commited_var;

  constructor(input?: any, parentRef?: ReduxRef) {
    super(input, parentRef);

    if (!parentRef && this.getTarget().length > 1) {
      var curr = useSelectorRef(this.getTarget()[0]);
      for (var i = 1; i < this.getTarget().length; i++) {
        curr = curr(this.getTarget()[i]);
      }
      return curr;
    }

    this.selector_result = useSelector(state => get(state, this.target));
    [this.current_var, this.set_current_var] = useState(this.selector_result);
    this.dispatch = useDispatch();
  }

  protected performNext(query: any) {
    return new ReduxRefExtension(this, this, query);
  }
  public get() {
    if (typeof this.commited_var === "undefined") {
      return this.selector_result;
    } else {
      return this.commited_var;
    }
  }
  public getCurrent() {
    if (typeof this.staging_var === "undefined") {
      return this.current_var;
    } else {
      return this.staging_var;
    }
  }
  public stage(newvalue: any) {
    var setvalue = cloneDeep(newvalue);
    this.set_current_var(setvalue);
    this.staging_var = setvalue;
  }
  public commit(message?: any, path: Array<string> = []) {
    /*console.log(
      this.target + (path ? "." + path : ""),
      path ? get(this.getCurrent(), path) : this.getCurrent()
    );*/
    this.dispatch({
      type: "$Chomtana.RefCommit",
      path: [...this.target, ...path],
      value: path.length > 0 ? get(this.getCurrent(), path) : this.getCurrent(),
      message: message
    });
    this.commited_var = this.getCurrent();
  }
}
