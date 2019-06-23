import Ref, { RefExtension } from "./Ref";
import { useSelector, useDispatch } from "react-redux";
import { get, set, cloneDeep } from "lodash";
import { useState } from "react";
import useSelectorRef from "./useSelectorRef";
export class ReduxRefExtension extends RefExtension {
    constructor(rootRef, parentRef, targetExtension) {
        super([...parentRef.getTarget(), targetExtension], parentRef);
        this.targetExtension = targetExtension;
        this.rootRef = rootRef;
        this.parentRef = parentRef;
        this.targetExtensionFromRoot = this.getTarget().slice(rootRef.getTarget().length);
    }
    performNext(query) {
        return new ReduxRefExtension(this.rootRef, this, query);
    }
    get() {
        return get(this.parentRef.get(), this.targetExtension);
    }
    getCurrent() {
        return get(this.parentRef.getCurrent(), this.targetExtension);
    }
    stage(newvalue) {
        var curr_root_var = cloneDeep(this.rootRef.getCurrent());
        set(curr_root_var, this.targetExtensionFromRoot, newvalue);
        this.rootRef.stage(curr_root_var);
    }
    commit(message, path = []) {
        this.rootRef.commit(message, [...this.targetExtensionFromRoot, ...path]);
    }
    makeNotExtension() {
        return new ReduxRef(this.getTarget());
    }
}
export default class ReduxRef extends Ref {
    constructor(input, parentRef) {
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
    performNext(query) {
        return new ReduxRefExtension(this, this, query);
    }
    get() {
        if (typeof this.commited_var === "undefined") {
            return this.selector_result;
        }
        else {
            return this.commited_var;
        }
    }
    getCurrent() {
        if (typeof this.staging_var === "undefined") {
            return this.current_var;
        }
        else {
            return this.staging_var;
        }
    }
    stage(newvalue) {
        var setvalue = cloneDeep(newvalue);
        this.set_current_var(setvalue);
        this.staging_var = setvalue;
    }
    commit(message, path = []) {
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
