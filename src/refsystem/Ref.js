import { cloneDeep, toPath, merge } from "lodash";
//Credit: https://stackoverflow.com/questions/36871299/how-to-extend-function-with-es6-classes
class ExtensibleFunction extends Function {
    constructor(f) {
        super();
        return Object.setPrototypeOf(f, new.target.prototype);
    }
}
/*export type PassedRef<Target = any, Value = any> = [Target, typeof Ref, Value];

export function isExtendsRef(x: any): Boolean {
  return x === Ref || x.prototype instanceof Ref;
}

//we cannot check deeper information, it is language limitation
export function isPassedRef(x: any): x is PassedRef {
  if (!Array.isArray(x)) return false;
  if (x.length != 3) return false;
  if (!isExtendsRef(x[1])) return false;
  return true;
}*/
export default class Ref extends ExtensibleFunction {
    get value() {
        return this.get();
    }
    set value(newvalue) {
        this.set(newvalue);
    }
    get current() {
        return this.getCurrent();
    }
    set current(newvalue) {
        this.stage(newvalue);
    }
    constructor(input, parent) {
        super((query) => {
            if (typeof query !== "undefined") {
                return this.performNext(query);
            }
            else {
                return this.get();
            }
        });
        if (!input)
            input = [];
        this.parent_ref = parent;
        //default is target = input
        //so that we can use constructor to make new ref
        if (Array.isArray(input)) {
            this.target = cloneDeep(input);
        }
        else {
            this.target = toPath(input);
        }
    }
    getTarget() {
        return this.target;
    }
    set(newvalue) {
        this.stage(newvalue);
        this.commit();
    }
    parent() {
        return this.parent_ref;
    }
    /**
     * Reset current value to last commit
     */
    reset() {
        this.stage(this.get());
    }
    makeNotExtension() {
        return this;
    }
    //Helper functions
    delete() {
        const parent = this.parent();
        const parent_val = cloneDeep(parent.get());
        if (typeof parent_val === "object") {
            parent.pop(this.target[this.target.length - 1]);
        }
    }
    //Array Helper functions
    perform_array_helper(getfn, setfn, arrayfn, ...x) {
        if (Array.isArray(getfn.call(this))) {
            var newarray = cloneDeep(getfn.call(this));
            var callreturn = arrayfn.call(newarray, ...x);
            setfn.call(this, newarray);
            return callreturn;
        }
        throw new Error("Not an array");
    }
    //Array Helper functions: set
    push(...x) {
        return this.perform_array_helper(this.get, this.set, Array.prototype.push, ...x);
    }
    pop(pos) {
        if (typeof pos === "undefined") {
            return this.perform_array_helper(this.get, this.set, Array.prototype.pop);
        }
        else {
            if (Array.isArray(this.get())) {
                //console.log(pos);
                return this.perform_array_helper(this.get, this.set, Array.prototype.splice, pos, 1);
            }
            else {
                var newval = cloneDeep(this.get());
                delete newval[pos];
                this.set(newval);
            }
        }
    }
    //Array Helper functions: stage
    stagePush(...x) {
        return this.perform_array_helper(this.getCurrent, this.stage, Array.prototype.push, ...x);
    }
    stagePop(x) {
        if (typeof x === "undefined") {
            return this.perform_array_helper(this.getCurrent, this.stage, Array.prototype.pop);
        }
        else {
            return this.perform_array_helper(this.getCurrent, this.stage, Array.prototype.slice, x, 1);
        }
    }
    //Array/ Object helper function: loop
    map(callback) {
        const a = cloneDeep(this.get());
        if (typeof a === "object") {
            for (var key in a) {
                a[key] = callback(this(key), key);
            }
            return a;
        }
        else {
            throw new Error(this.target.join(".") + " is not an array/object");
        }
    }
    /**
     * Map value that are available in staging but not in commited
     * @param callback (value,key) callback function of map
     */
    stageMap(callback) {
        const a = cloneDeep(this.getCurrent());
        if (typeof a === "object") {
            for (var key in a) {
                if (this(key).is_staging()) {
                    a[key] = callback(this(key), key);
                }
            }
            return a;
        }
        else {
            throw new Error(this.target.join(".") + " is not an array/object");
        }
    }
    allMap(callback) {
        const a = cloneDeep(merge(this.get(), this.getCurrent()));
        if (typeof a === "object") {
            for (var key in a) {
                a[key] = callback(this(key), key);
            }
            return a;
        }
        else {
            throw new Error(this.target.join(".") + " is not an array/object");
        }
    }
    childRefs() {
        try {
            return this.map((value, key) => value);
        }
        catch (err) {
            console.error(err);
            return { __chomtana_ref_not_has: true };
        }
    }
    //General helper function
    has() {
        return typeof this.get() !== "undefined";
    }
    is_staging() {
        return this.get() !== this.getCurrent();
    }
}
export class RefExtension extends Ref {
}
