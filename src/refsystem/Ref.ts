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

export default abstract class Ref extends ExtensibleFunction {
  protected target: any;
  protected parent_ref: Ref;

  public get value(): any {
    return this.get();
  }
  public set value(newvalue: any) {
    this.set(newvalue);
  }

  public get current(): any {
    return this.getCurrent();
  }
  public set current(newvalue: any) {
    this.stage(newvalue);
  }

  constructor(input?: any, parent?: Ref) {
    super(
      (query?: any): Ref => {
        if (typeof query !== "undefined") {
          return this.performNext(query);
        } else {
          return this.get();
        }
      }
    );

    if (!input) input = [];

    this.parent_ref = parent;

    //default is target = input
    //so that we can use constructor to make new ref
    if (Array.isArray(input)) {
      this.target = cloneDeep(input);
    } else {
      this.target = toPath(input);
    }
  }

  public getTarget() {
    return this.target;
  }

  protected abstract performNext(query: any);

  public abstract get(): any;
  public set(newvalue: any) {
    this.stage(newvalue);
    this.commit();
  }

  public abstract getCurrent(): any;
  public abstract stage(newvalue: any);

  public abstract commit(message?: any, path?: any);

  public parent(): Ref {
    return this.parent_ref;
  }

  /**
   * Reset current value to last commit
   */
  public reset() {
    this.stage(this.get());
  }

  public makeNotExtension(): Ref {
    return this;
  }

  //Helper functions
  public delete() {
    const parent = this.parent();
    const parent_val = cloneDeep(parent.get());
    if (typeof parent_val === "object") {
      parent.pop(this.target[this.target.length - 1]);
    }
  }

  //Array Helper functions
  private perform_array_helper(
    getfn: Function,
    setfn: Function,
    arrayfn: Function,
    ...x
  ) {
    if (Array.isArray(getfn.call(this))) {
      var newarray = cloneDeep(getfn.call(this));
      var callreturn = arrayfn.call(newarray, ...x);
      setfn.call(this, newarray);
      return callreturn;
    }
    throw new Error("Not an array");
  }

  //Array Helper functions: set
  public push(...x): number {
    return this.perform_array_helper(
      this.get,
      this.set,
      Array.prototype.push,
      ...x
    );
  }

  public pop(pos?: number | string): any {
    if (typeof pos === "undefined") {
      return this.perform_array_helper(this.get, this.set, Array.prototype.pop);
    } else {
      if (Array.isArray(this.get())) {
        //console.log(pos);
        return this.perform_array_helper(
          this.get,
          this.set,
          Array.prototype.splice,
          pos,
          1
        );
      } else {
        var newval = cloneDeep(this.get());
        delete newval[pos];
        this.set(newval);
      }
    }
  }

  //Array Helper functions: stage
  public stagePush(...x): number {
    return this.perform_array_helper(
      this.getCurrent,
      this.stage,
      Array.prototype.push,
      ...x
    );
  }

  public stagePop(x?: number): any {
    if (typeof x === "undefined") {
      return this.perform_array_helper(
        this.getCurrent,
        this.stage,
        Array.prototype.pop
      );
    } else {
      return this.perform_array_helper(
        this.getCurrent,
        this.stage,
        Array.prototype.slice,
        x,
        1
      );
    }
  }

  //Array/ Object helper function: loop
  public map(callback: (value: any, key: string | number) => any) {
    const a = cloneDeep(this.get());
    if (typeof a === "object") {
      for (var key in a) {
        a[key] = callback(this(key), key);
      }
      return a;
    } else {
      throw new Error(this.target.join(".") + " is not an array/object");
    }
  }

  /**
   * Map value that are available in staging but not in commited
   * @param callback (value,key) callback function of map
   */
  public stageMap(callback: (value: any, key: string | number) => any) {
    const a = cloneDeep(this.getCurrent());
    if (typeof a === "object") {
      for (var key in a) {
        if (this(key).is_staging()) {
          a[key] = callback(this(key), key);
        }
      }
      return a;
    } else {
      throw new Error(this.target.join(".") + " is not an array/object");
    }
  }

  public allMap(callback: (value: any, key: string | number) => any) {
    const a = cloneDeep(merge(this.get(), this.getCurrent()));
    if (typeof a === "object") {
      for (var key in a) {
        a[key] = callback(this(key), key);
      }
      return a;
    } else {
      throw new Error(this.target.join(".") + " is not an array/object");
    }
  }

  public childRefs() {
    try {
      return this.map((value, key) => value);
    } catch (err) {
      console.error(err);
      return { __chomtana_ref_not_has: true };
    }
  }

  //General helper function
  public has() {
    return typeof this.get() !== "undefined";
  }

  public is_staging() {
    return this.get() !== this.getCurrent();
  }
}

export abstract class RefExtension extends Ref {
  public abstract makeNotExtension(): Ref;
}
