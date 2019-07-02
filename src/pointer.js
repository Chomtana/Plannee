import { difference, toPath } from "lodash";
import ExtensibleFunction from "./ExtensibleFunction";
import { cloneDeep, isEqual } from "lodash";

class BasePointer extends ExtensibleFunction {
  _child = {};
  _hook = {};
  _mark = {};

  constructor(value, parent, parentkey) {
    super(x => {
      if (!x) return this.get();
      return this.next(x);
    });
    var thiss = this;
    ////console.log("thiss",thiss.stage);
    ////console.log(this.appendChainObj.__proto__)

    if (typeof value !== "undefined") {
      this.set(value);
    } else {
      this._undefined = true;
    }
    this._parent = parent;
    this._parentkey = parentkey;
    ////console.log("parent", parent);
  }

  mark(key, value) {
    //get Mark
    if (typeof value === "undefined") return this._mark[key];

    //set Mark
    var oldVal = this._mark[key];
    this.performHook("beforeMark", key, value, oldVal, this);
    this.performHookBackprop("beforeMarkBP", key, value, oldVal, this);
    this._mark[key] = value;
    this.performHook("afterMark", key, value, oldVal, this);
    this.performHookBackprop("afterMarkBP", key, value, oldVal, this);
    return value;
  }

  performHook(name, ...args) {
    if (typeof this._hook[name] !== "undefined") {
      if (
        !this.mark("$Chomtana$lockHook") &&
        !this.mark("$Chomtana$lockHook_inner")
      ) {
        for (var f of this._hook[name]) {
          this._mark["$Chomtana$lockHook"] = true;
          f(...args);
          this._mark["$Chomtana$lockHook"] = false;
        }
      }
    }
  }

  performHookBackprop(name, ...args) {
    this.performHook(name, ...args);
    if (this._parent) {
      this._parent.performHook(name, ...args);
    }
  }

  hook(name, fn, options) {
    if (!options) options = {};
    if (!this._hook[name]) this._hook[name] = [];

    if (options.unique) {
      if (this._hook[name].indexOf(fn) !== -1) {
        return;
      }
    }

    this._hook[name].push(fn);
  }

  newObject() {
    return this._prototype.constructor.name === "Array"
      ? []
      : Object.create(this._prototype);
    /*let appendChainObj = Object.create({
      ...this._prototype,
      $: this
    });
    var res = appendChainObj;
    //res.$ = this;
    ////console.log("eqcheck", res.$ === this);
    return res;*/
  }

  newPrimitive(p) {
    return p;
    /*let appendChainObj = Object.create({
      ...this._prototype,
      $: this,
      $isPrimitive: true,
      valueOf() {
        return p;
      },
      [Symbol.toPrimitive](hint) {
        return p;
      }
    });
    let res = Object.setPrototypeOf(
      new p.constructor(p),
      appendChainObj.__proto__
    );
    ////console.log("eqcheck", res.$ == this);
    return res;*/
  }

  next(target) {
    if (typeof target !== "object") {
      if (this._child[target]) return this._child[target];
      this._child[target] = new this.constructor(undefined, this, target);
      return this._child[target];
    } else {
      var curr = this;
      for (var x of target) curr = curr.next(x);
      return curr;
    }
  }

  _backprop_delcache() {
    this.performHook("beforeDeleteCache", this);
    delete this._cacheVal;
    this.performHook("afterDeleteCache", this);
    if (this._parent) {
      this._parent._backprop_delcache();
    }
  }

  _backprop_defined() {
    this._undefined = false;
    if (this._parent) {
      this._parent._backprop_defined();
    }
  }

  _set(value, options, oldVal) {
    if (!options) options = {};
    if (typeof value !== "undefined") this._backprop_defined();

    this.performHook("beforeSetDeep", value, oldVal, this, options);

    if (!options.backpropagate) {
      delete this._cacheVal;
      if (typeof value !== "undefined" && value !== null) {
        this._prototype = value.prototype || value.__proto__;
        delete this._prototype.$;
      } else {
        delete this._prototype;
      }
      if (value == null) {
        delete this._primitive;
        for (let key in this._child) {
          delete this._child[key];
        }
      } else if (typeof value === "object" && !value.$isPrimitive) {
        var keys = Object.keys(value);
        for (let key of keys) {
          ////console.log(key);
          if (typeof this._child[key] === "undefined") {
            this._child[key] = new this.constructor(value[key], this, key);
          } else {
            this._child[key]._set(value[key]);
          }
        }

        var needdel = difference(Object.keys(this._child), keys);
        for (let key of needdel) {
          delete this._child[key];
        }
        delete this._primitive;
      } else {
        if (typeof value === "object") {
          ////console.log("value", value);
          this._primitive = value.valueOf();
        } else {
          this._primitive = value;
        }
        for (let key in this._child) {
          delete this._child[key];
        }
      }
    } else {
      ////console.log("delcache");
      delete this._cacheVal;
    }

    //backpropagate to parent
    this._backprop_delcache();
    /*if (this._parent && this._parentkey) {
      this._parent._set({ [this._parentkey]: value }, { backpropagate: true });
      //console.log("backpropset", this._parent.get());
    }*/

    this.performHook("afterSetDeep", value, oldVal, this, options);
  }

  set(value, options) {
    var oldVal = this._get();
    this.performHook("beforeSet", value, oldVal, this, options);
    this._set(value, options, oldVal);
    this.performHook("afterSet", value, oldVal, this, options);
  }

  _setIn_inner(path, value, options) {
    //for optimization
    //console.log("setpath", path, path.length);
    if (path.length > 0) {
      var next = path.pop();
      this.next(next)._setIn_inner(path, value, options);
    } else {
      //console.log(this.get());
      this.set(value, options);
    }
  }

  setIn(path, value, options) {
    path = toPath(path).reverse();
    this._setIn_inner(path, value, options);
  }

  _get(options) {
    if (!options) options = {};
    this.performHook("beforeGetDeep", this);

    var res = (() => {
      if (this._undefined) return undefined;
      if (typeof this._cacheVal !== "undefined") return this._cacheVal;
      if (typeof this._primitive !== "undefined")
        if (!options.clean) return this.newPrimitive(this._primitive);
        else return this._primitive;
      if (typeof this._prototype === "undefined")
        this._prototype = Object.prototype;
      var res = options.clean
        ? Object.create(this._prototype)
        : this.newObject();
      if (this._prototype.constructor.name === "Array") {
        var curri = 0;
        while (typeof this._child[curri] !== "undefined") {
          var value = this._child[curri]._get();
          if (typeof value === "undefined") break;
          res[curri] = value;
          curri++;
        }

        /*var keys = Object.keys(this._child).sort(
          (a, b) => parseInt(a) - parseInt(b)
        );
        for (var key of keys) {
          if (!isNaN(key)) {
            let value = this._child[key]._get();
            if (typeof value !== "undefined") res.push(value);
          }
        }
        this._lastKey = keys[keys.length - 1];
        if (typeof this._lastKey === "undefined") this._lastKey = -1;
        this._lastKey = parseInt(this._lastKey);*/
        //console.log("lastKey",keys)
      } else {
        for (var key in this._child) {
          res[key] = this._child[key]._get();
          if (typeof res[key] === "undefined") delete res[key];
        }
      }

      return (this._cacheVal = res);
    })();

    this.performHook("afterGetDeep", res, this);
    return res;
  }

  get(options) {
    this.performHook("beforeGet", this);
    var res = this._get(options);
    this.performHook("afterGet", res, this);
    return res;
  }

  _getIn_inner(path, options) {
    if (path.length > 0) {
      var next = path.pop();
      ////console.log(next);
      return this.next(next)._getIn_inner(path, options);
    } else {
      return this.get(options);
    }
  }

  getIn(path, options) {
    path = toPath(path).reverse();
    return this._getIn_inner(path, options);
  }

  push(...val) {
    var curr = this.get();
    this.performHook("beforePush", val, curr, this);
    if (Array.isArray(curr)) {
      //console.log(this._lastKey);
      for (var x = 0; x < val.length; x++) {
        this._child[curr.length + x] = new this.constructor(
          val[x],
          this,
          curr.length + x
        );
      }
      //curr.push(...val);
      this._backprop_delcache();
    }
    this.performHook("afterPush", val, curr, this);
  }

  pop(index) {
    var curr = this.get();
    if (Array.isArray(curr)) {
      if (typeof index === "undefined") curr.pop();
      else curr.splice(index, 1);
      this.set(curr);
    } else {
      if (typeof index === "undefined") {
        var keys = Object.keys(this._child);
        index = keys[keys.length - 1];
      }
      delete curr[index];
      this.set(curr);
    }
    return;
  }

  delete(index) {
    if (typeof index !== "undefined") {
      return this.pop(index);
    }

    if (this._parent) {
      var parentval = this._parent.get();
      if (typeof parentval === "object") {
        return this._parent.pop(this._parentkey);
      } else {
        throw new Error("Cannot delete since parent is not object.");
      }
    } else {
      this._child = {};
      this.performHook("afterDelete", this);
      this._backprop_delcache();
      return this;
    }
  }

  map(fn) {
    var res = this.get();
    for (var key in res) {
      res[key] = fn(this.next(key), key);
    }
    return res;
  }
}

export default class Pointer extends BasePointer {
  constructor(value, parent, parentkey) {
    //console.log("parentkey",parentkey, parent && parent.get())
    super(value, parent, parentkey);
    if (!parent) {
      this._stageRef = new BasePointer();
      this._stageRef.set(value);
    }

    this.hook("afterSet", value => this.stage(value));
    this.hook("afterPush", value => this.stage().push(...value));
    //this.hook("afterDelete", delp => delp.stage().delete());
  }

  _getCurrentIn_inner(path, options) {
    if (this._parent) {
      if (typeof this._parentkey !== "undefined") {
        path.push(this._parentkey);
        return this._parent._getCurrentIn_inner(path, options);
      } else {
        throw new Error("No parent key, maybe bug");
      }
    } else {
      ////console.log(this._stageRef.get());
      return this._stageRef._getIn_inner(path, options);
    }
  }

  getCurrentIn(path, options) {
    path = toPath(path).reverse();
    return this._getCurrentIn_inner(path, options);
  }

  getCurrent(options) {
    if (this._parent) {
      if (typeof this._parentkey !== "undefined") {
        return this._parent._getCurrentIn_inner([this._parentkey], options);
      } else {
        throw new Error("No parent key, maybe bug");
      }
    } else {
      return this._stageRef.get(options);
    }
  }

  _stageIn_inner(path, value, options) {
    //console.log("path", path);
    if (this._parent) {
      if (typeof this._parentkey !== "undefined") {
        path.push(this._parentkey);
        //console.log("nextpath", path);
        this._parent._stageIn_inner(path, value, options);
      } else {
        throw new Error("No parent key, maybe bug");
      }
    } else {
      this._stageRef._setIn_inner(path, value, options);
      //console.log("rootres", this.getCurrent());
    }
  }

  stageIn(path, value, options) {
    if (this._parent) {
      if (typeof this._parentkey !== "undefined") {
        path = toPath(path).reverse();
        this._stageIn_inner(path, value, options);
      } else {
        throw new Error("No parent key, maybe bug");
      }
    } else {
      this._stageRef.setIn(path, value, options);
    }
  }

  getStageRef(path) {
    if (!this._parent) return this._stageRef.next(path);
    return this._parent.getStageRef([this._parentkey]);
  }

  stage(value, options) {
    if (typeof value === "undefined") {
      return this.getStageRef([]);
    }
    if (this._parent) {
      if (typeof this._parentkey !== "undefined") {
        var path = new Array(this._parentkey);
        //console.log("parentkey", path);
        this._parent._stageIn_inner(path, value, options);
        //console.log("backprop", this._parentkey);
      } else {
        throw new Error("No parent key, maybe bug");
      }
    } else {
      this._stageRef.set(value, options);
    }
  }

  commit(msg) {
    this.set(this.getCurrent());
  }

  reset(msg) {
    this.stage(this.get());
  }

  isStaging() {
    var value = this.get();
    var current = this.getCurrent();
    return !isEqual(value, current);
  }

  get current() {
    return this.getCurrent();
  }

  get value() {
    return this.get();
  }
}
