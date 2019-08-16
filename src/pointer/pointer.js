import { set, get, cloneDeep, toPath, difference, merge, find } from "lodash";
import ExtensibleFunction from "./ExtensibleFunction";

var next_local_id = 1;
var update_ite = 1;

export var pvalueStore = {};

window.pvalueStore = pvalueStore;

export function resolvePointer(p) {
  if (p instanceof BasePointer) {
    return p();
  }
  return p;
}

export class BasePointer extends ExtensibleFunction {
  _root;
  _rootpath;
  _pvaluepath;

  _hook = {};
  _mark = {};

  _child = {};

  _last_update = -1;

  randid = 0;

  //_child_hook = {};

  constructor(value, options) {
    if (!options) options = {};
    //console.log("options", options);

    super(x => {
      if (typeof x === "undefined") return this.get();
      return this.next(x);
    });

    var thiss = this;

    if (typeof options.parent !== "undefined") {
      this._parent = options.parent;
      this._parentkey = options.parentkey;
      this._root = this._parent._root;
      this._rootpath = [...this._parent._rootpath, this._parentkey];
      this._pvaluepath = [...this._parent._pvaluepath, this._parentkey];
    } else {
      this._root = this;
      //console.log("root", this._root);
      if (typeof options.name === "undefined") {
        options.name = "$Chomtana$local_" + next_local_id++;
        this._rootname = options.name;
      }
      this._rootpath = [];
      this._pvaluepath = [this._rootname];
    }

    if (!options.dummy) this.set(value);

    this.randid = Math.random();
    this.pureid = Math.random();

    this.hook("afterSetBP", () => {
      this.randid = Math.random();
      //console.log(this._pvaluepath);
    }, {baseOnly: true});

    this[Symbol.iterator] = function*() {
      var start = this.resolveHOP(thiss);
      var startVal = start.get();
      for (var key in startVal) {
        yield start.next(key);
      }
    };

    /*this.hook("afterSetBP", () => {
      this._backprop_perform(p => {
        if (p.stage) {
          var stage = p.stage();
          if (stage) stage._isStaging = false;
        }
      });
    }, {baseOnly: true});*/

    //console.log("rootbafter", this._root);
  }

  _backprop_perform(fn) {
    fn(this);
    if (typeof this._parent !== "undefined") {
      this._parent._backprop_perform(fn);
    }
  }

  get isHOP() {
    if (get(pvalueStore, this._pvaluepath) instanceof BasePointer)
      this._isHOP = true;
    else this._isHOP = false;
    return this._isHOP;
  }

  set(value, options) {
    //console.log("setwork", value);
    //console.log(new Error().stack);
    //console.log("set", value);

    //console.log(value);

    if (value instanceof BasePointer) {
      this._isHOP = true;
    } else {
      this._isHOP = false;
    }

    var oldVal = this.get();
    this.performHook("beforeSet", value, oldVal, this, options);
    this.performHookBackprop("beforeSetBP", value, oldVal, this, options);
    set(pvalueStore, this._pvaluepath, value);
    this._backprop_perform(p => (p._last_update = update_ite++));
    this.performHook("afterSet", value, oldVal, this, options);
    this.performHookBackprop("afterSetBP", value, oldVal, this, options);
  }

  setIn(path, value, options) {
    this.next(path).set(value, options);
  }

  pget(options) {
    this.performHook("beforePGet", this);
    this.performHookBackprop("beforePGetBP", this);
    var res = get(pvalueStore, this._pvaluepath);
    this.performHook("afterPGet", res, this);
    this.performHookBackprop("afterPGetBP", res, this);
    return res;
  }

  get(options) {
    this.performHook("beforeGet", this);
    this.performHookBackprop("beforeGetBP", this);
    var res = this.pget(options);
    if (res instanceof BasePointer) {
      this._isHOP = true;
    }
    //console.log(get(pvalueStore, this._pvaluepath));
    res = this.isHOP ? res() : res;
    this.performHook("afterGet", res, this);
    this.performHookBackprop("afterGetBP", res, this);
    return res;
  }

  getIn(path, options) {
    return get(this.get(options), toPath(path));
  }

  getShallow(options) {
    if (!options) options = {};

    if (!options.start) options.start = 0;

    var curr = this.get();
    if (typeof curr !== "object") return curr;

    var res = Array.isArray(curr) ? [] : {};
    var count = 0;

    if (Array.isArray(curr)) {
      for (var key in curr) {
        if (
          typeof options.limit !== "undefined" &&
          count - options.start >= options.limit
        )
          return res;
        if (count >= options.start && this.next(key).isReady) res.push(this.next(key));
        else {
          //hotfix
          if (this.pnext(key).isHOP && !this.next(key).isReady) {
            this.pnext(key).delete();
          }
        }
        count++;
      }
    } else {
      return Object.keys(curr).map(key => this.next(key));
    }

    return res;
  }

  last() {
    return this.next(this.get().length - 1);
  }

  map(fn) {
    //console.log("shallow", this.getShallow()[1]());
    return this.getShallow().map(fn);
  }

  limit(amount, start) {
    return this.getShallow({ limit: amount, start: start });
  }

  get key() {
    return this._parentkey;
  }

  get_last_update() {
    if (!this._parent) {
      return this._last_update;
    } else {
      return Math.max(this._parent.get_last_update(), this._last_update);
    }
  }

  mark(key, value) {
    //console.log(key, value);
    //get Mark
    if (typeof value === "undefined") return this._mark[key];

    //set Mark
    var oldVal = this._mark[key];
    //console.log(this._hook);
    this.performHook("beforeMark", key, value, oldVal, this);
    this.performHookBackprop("beforeMarkBP", key, value, oldVal, this);
    this._mark[key] = value;
    this.performHook("afterMark", key, value, oldVal, this);
    this.performHookBackprop("afterMarkBP", key, value, oldVal, this);
    return value;
  }

  childTemplate(value) {
    return this.mark("$Chomtana$childTemplate", value);
  }

  template(value) {
    if (this._parent) {
      return this._parent.childTemplate(value);
    } else {
      return this.mark("$Chomtana$template", value);
    }
  }

  performHookForce(name, ...args) {
    var promises = [];
    if (typeof this._hook[name] !== "undefined") {
      for (var f of this._hook[name]) {
        promises.push(Promise.resolve(f(...args)));
      }
    }
    return promises;
  }

  performHook(name, ...args) {
    //perform ready hook
    if (typeof this._hook[name] !== "undefined") {
      if (
        !this.mark("$Chomtana$lockHook$" + name) &&
        !this.mark("$Chomtana$lockHook_inner")
      ) {
        //console.log(name);
        //console.log("hook", this.mark("$Chomtana$lockHook"));
        this._mark["$Chomtana$lockHook$" + name] = true;
        var promises = this.performHookForce(name, ...args);
        //console.log(promises);
        Promise.all(promises).then(() => {
          this._mark["$Chomtana$lockHook$" + name] = false;
          //console.log("release hoook");
        });
      }
    }
  }

  performHookBackpropForce(name, ...args) {
    this.performHookForce(name, ...args);
    //console.log(name,this._rootpath, this._parent)
    if (this._parent) {
      this._parent.performHookBackpropForce(name, ...args);
    }
  }

  performHookBackprop(name, ...args) {
    this.performHook(name, ...args);
    //console.log(name,this._rootpath, this._parent)
    if (this._parent) {
      this._parent.performHookBackprop(name, ...args);
    }
  }

  lockHook(lock) {
    if (typeof lock === "undefined") lock = true;
    this.mark("$Chomtana$lockHook", lock);
  }

  hook(name, fn, options) {
    if (!options) options = {};
    if (!this._hook[name]) this._hook[name] = [];

    if (options.unique) {
      if (this._hook[name].indexOf(fn) !== -1) {
        console.log("unique filtered");
        return;
      }
    }

    fn.$isHooked = true;
    this._hook[name].push(fn);
  }

  waitForReadyPolling() {
    if (typeof this._waitForReadyPolling === "undefined") {
      var fn = ()=>{
        if (this.isReady) {
          //console.log("wait for ready")
          this.performHookForce("ready", this);
          clearInterval(this._waitForReadyPolling);
          this._waitForReadyPolling = undefined;
        }
      }
      this._waitForReadyPolling = setInterval(fn, 250);
      fn();
    }
  }

  waitForReady() {
    var res = new Promise((resolve, reject) => {
      this.hook("ready", resolve)
    });
    this.waitForReadyPolling();
    return res;
  }

  /**
   * for array only!
   *
   * used for automatically perform something to each child
   * even after push it will automatically work
   *
   * @param {Function} fn function to perform
   */
  childPerform(fn) {
    var shallow = this.getShallow();
    for (var child of shallow) {
      fn(child);
    }

    this.hook("afterPush", (x, curr, thiss, newp) => {
      fn(newp);
    });
  }

  resolveHOP(child) {
    while (child.isHOP) {
      child = child.pget();
    }
    return child;
  }

  pnext(target) {
    target = toPath(target);
    if (target.length === 1) {
      if (this._child[target[0]]) return this._child[target[0]];
      this._child[target[0]] = new this.constructor(undefined, {
        parent: this,
        parentkey: target[0],
        dummy: true
      });
      /*if (!this._child[target[0]]._root)
        this._child[target[0]]._root = this._root;*/
      return this._child[target[0]];
    } else {
      var curr = this;
      for (var x of target) curr = curr.next(x);
      //if (!curr._root) curr._root = this._root;
      return curr;
    }
  }

  next(target) {
    //console.log(this._pvaluepath)

    var start = this.resolveHOP(this);

    target = toPath(target);
    if (target.length === 1) {
      if (start._child[target[0]])
        return this.resolveHOP(start._child[target[0]]);
      start._child[target[0]] = new this.constructor(undefined, {
        parent: start,
        parentkey: target[0],
        dummy: true
      });
      /*if (!this._child[target[0]]._root)
        this._child[target[0]]._root = this._root;*/
      return this.resolveHOP(start._child[target[0]]);
    } else {
      var curr = start;
      for (var x of target) curr = this.resolveHOP(curr.next(x));
      //if (!curr._root) curr._root = this._root;
      return curr;
    }
  }

  get parent() {
    return this._parent;
  }

  push(...val) {
    //if (Array.isArray(this.get())) {
    //this.get().push(...val);
    //}
    if (val.length == 0) {
      var template = cloneDeep(this.childTemplate())
      val = [template];
    }

    var curr = this.get();
    for (var x of val) {
      this.performHook("beforePush", x, curr, this);
      this.performHookBackprop(
        "beforeSetBP",
        x,
        undefined,
        this.next(curr.length),
        {
          type: "push"
        }
      );
      curr.push(x);
      this.performHook("afterPush", x, curr, this, this.next(curr.length - 1));
      this.performHookBackprop(
        "afterSetBP",
        x,
        undefined,
        this.next(curr.length - 1),
        {
          type: "push"
        }
      );
    }
    //console.log(curr);
  }

  delete() {
    if (this._parent) {
      this._parent.pop(this._parentkey);
    } else {
      this.set(undefined);
    }
  }

  pop(key) {
    var curr = this.get();
    this.performHookBackprop(
      "beforeSetBP",
      undefined,
      this.next(key).get(),
      this.next(key),
      {
        type: "pop"
      }
    );
    if (typeof key === "undefined") {
      curr.pop();
    } else {
      if (Array.isArray(curr)) {
        curr.splice(key, 1);
      } else {
        delete curr[key];
      }
    }
    this.performHookBackprop(
      "afterSetBP",
      undefined,
      this.next(key).get(),
      this.next(key),
      {
        type: "pop"
      }
    );
  }

  find(comp, fromIndex) {
    var curr = this.get();
    for (var key in curr) {
      var p = this.next(key);
      var val = find([p()], comp);
      //console.log(val);
      if (typeof val !== "undefined") return p;
    }
    return undefined;
  }

  filter(comp, fromIndex) {
    var curr = this.get();
    var res = []
    for (var key in curr) {
      var p = this.next(key);
      var val = find([p()], comp);
      //console.log(val);
      if (typeof val !== "undefined") {
        res.push(p)
      }
    }
    return res;
  }

  get value() {
    return this.get();
  }

  get isReady() {
    return typeof this.get() !== "undefined";
  }

  get whyNotReady() {
    return typeof this.get() !== "undefined" ? "undefined" : "";
  }
}

export class DummyPointer extends BasePointer {
  constructor(value, options) {
    if (!options) options = {};
    super(value, { ...options, dummy: true });
  }
}

export class ComputedPointer extends DummyPointer {
  constructor(fn, setfn) {
    super();
    this._fn = fn;
    this._setfn = setfn;
  }

  get(options) {
    return this._fn(options);
  }

  set(value, options) {
    this._setfn(value, options);
  }
}

export class DiffPointer extends BasePointer {
  _child = {};

  _basePointer = null;

  constructor(value, options) {
    if (!options) options = {};
    options.dummy = true;

    super(undefined, options);

    if (typeof options._parent === "undefined") {
      this._basePointer = options.basePointer;
    } else {
      this._basePointer = this._parent._basePointer.next(this._parentkey);
    }

    /*super(x => {
      //console.log("called", x);
      if (typeof x === "undefined") return this.get();
      return this.next(x);
    });*/
    var thiss = this;

    if (typeof value !== "undefined") {
      this.set(value);
      //console.log("init", value, this.get());
    } else {
      this._undefined = true;
    }

    this._isStaging = false;

    this.basePointer.hook("afterSet", () => {
      this._isStaging = false;
    }, {baseOnly: true});

    ////console.log("thiss",thiss.stage);
    ////console.log(this.appendChainObj.__proto__)
  }

  get basePointer() {
    return this._root
      ? this._root._basePointer.next(this._rootpath)
      : this._basePointer;
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

  childTemplate(value) {
    return this.basePointer.childTemplate(value);
  }

  tempate(value) {
    return this.basePointer.tempate(value);
  }

  _backprop_delcache() {
    this.performHook("beforeDeleteCache", this);
    delete this._cacheVal;
    this._last_update = update_ite++;
    this._isStaging = true;
    this.performHook("afterDeleteCache", this);
    if (this._parent) {
      this._parent._backprop_delcache();
    }
  }

  _backprop_defined() {
    this._undefined = false;
    if (typeof this._prototype === "undefined") {
      this._prototype =
        this.basePointer.get() && this.basePointer.get().__proto__;
    }
    if (this._parent) {
      //console.log("defined_parent",this._parent);
      this._parent._backprop_defined();
    }
  }

  _set(value, options, oldVal) {
    if (!options) options = {};
    if (value instanceof BasePointer) return super.set(value, options);
    if (typeof value !== "undefined") this._backprop_defined();

    this._isHOP = false;

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
            this._child[key] = new this.constructor(value[key], {
              parent: this,
              parentkey: key
            });
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
      this.performHook("beforeDeleteCache", this);
      //to perform cache
      //this._get();
      delete this._cacheVal;
      //var key = Object.keys(value)[0];
      //this._cacheVal[key] = value[key];
      this.performHook("afterDeleteCache", this);

      this.performHook("beforeSetBP", this._cacheVal, oldVal, this, options);
      if (this._parent && this._parentkey) {
        this._parent._set(
          { [this._parentkey]: value },
          { backpropagate: true },
          oldVal
        );

        //console.log("backpropset", this._parent.get());
      }
      this.performHook("afterSetBP", this._cacheVal, oldVal, this, options);
    }

    //backpropagate to parent
    //this._backprop_delcache();

    this.performHook("afterSetDeep", value, oldVal, this, options);
  }

  set(value, options) {
    var oldVal = this._get();
    this.performHook("beforeSet", value, oldVal, this, options);

    this._set(value, options, oldVal);

    //to perform cache
    //this._get();

    this._backprop_perform(p => (p._isStaging = true));

    this.performHook("beforeSetBP", value, oldVal, this, options);
    if (this._parent && this._parentkey) {
      this._parent._set({ [this._parentkey]: value }, { backpropagate: true });
      //console.log("backpropset", this._parent.get());
    }
    this.performHook("afterSetBP", value, oldVal, this, options);

    //this._backprop_delcache();

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

  get isStaging() {
    if (typeof this._parent === "undefined") return this._isStaging;
    return this._isStaging && this._parent.isStaging;
    //return this._isStaging;
  }

  _get(options) {
    if (!options) options = {};
    if (this.isHOP) return super.get(options);
    this.performHook("beforeGetDeep", this);

    /*if (this.basePointer) {
      console.log(this.get_last_update(), this.basePointer.get_last_update());
    } else {
      console.log("basePointer bug", this._parent);
    }*/

    //console.log(this.isStaging, this._rootpath);

    var baseValue = this.basePointer.get();
    //console.log(this.isStaging);

    if (this.basePointer && !this.isStaging) {
      delete this._cacheVal;
      return baseValue;
    }

    if (typeof baseValue === "object" && baseValue !== null) {
      var keys = merge(Object.keys(this._child), Object.keys(baseValue));
      var keys_contain = {};
      for (var key of keys) keys_contain[key] = true;
      //console.log("keys", keys);
    }

    var res = (() => {
      if (this._undefined) return undefined;
      if (typeof this._cacheVal !== "undefined") return this._cacheVal;
      if (typeof this._primitive !== "undefined")
        if (!options.clean) return this.newPrimitive(this._primitive);
        else return this._primitive;
      if (typeof this._prototype === "undefined") return null;
      var res = options.clean
        ? Object.create(this._prototype)
        : this.newObject();
      if (this._prototype.constructor.name === "Array") {
        var curri = 0;
        while (keys_contain[curri]) {
          //console.log("fsdfdsf", curri, this.next(curri)._get())
          var value = this.next(curri)._get();
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
        for (var key of keys) {
          //console.log("run", key, this._child[key]._get(), this._child[key]);
          res[key] = this.next(key) && this.next(key)._get();
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
    this.performHookBackprop("beforeGetBP", this);
    var res = this._get(options);
    this.performHook("afterGet", res, this);
    this.performHookBackprop("afterGetBP", res, this);
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

    this._backprop_perform(p => (p._isStaging = true));

    if (Array.isArray(curr)) {
      //console.log(this._lastKey);
      for (var x = 0; x < val.length; x++) {
        this.performHook("beforePush", val[x], curr, this);
        this._child[curr.length + x] = new this.constructor(val[x], {
          parent: this,
          parentkey: curr.length + x
        });
        this._child[curr.length + x]._isStaging = true;
        this.performHook(
          "afterPush",
          val[x],
          curr,
          this,
          this._child[curr.length + x]
        );
      }
      //curr.push(...val);
    }
    this._backprop_delcache();
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
    this._backprop_delcache();
    return curr[index];
  }

  delete(index) {
    if (typeof index !== "undefined") {
      return this.pop(index);
    }

    if (this._parent) {
      var parentval = this._parent.get();
      if (typeof parentval === "object") {
        //console.log(this._parent.get().length);
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

  fittemplate() {
    var templatekeys = Object.keys(this.template() || {});
    var currvalue = this.get();
    var filteredvalue = {};
    if (Array.isArray(currvalue)) {
      filteredvalue = [];
      for(let key in currvalue) {
        filteredvalue.push(this.next(key).fittemplate());
      }
    } else {
      //console.log(currvalue);
      if (typeof currvalue === "object" && currvalue !== null) {
        if (templatekeys.length > 0) {
          for (let key in currvalue) {
            if (templatekeys.indexOf(key) !== -1)
              filteredvalue[key] = currvalue[key];
            if (typeof filteredvalue[key] === "object") {
              filteredvalue[key] = this.next(key).fittemplate();
            }
          }
        } else return currvalue;
      } else return currvalue;
    }
    return filteredvalue;
  }

  commit(msg) {
    var filteredvalue = this.fittemplate();

    console.log("commit", filteredvalue, this._hook);

    this.performHook("beforeCommit", filteredvalue, this, msg);
    this.performHookBackprop("beforeCommitBP", filteredvalue, this, msg);
    this.basePointer.set(this.get());
    this.performHook("afterCommit", filteredvalue, this, msg);
    this.performHookBackprop("afterCommitBP", filteredvalue, this, msg);

    this._isStaging = false;
  }

  reset() {
    this.set(this.basePointer.get());

    this._isStaging = false;
  }

  /*isStaging() {
    return this._last_update > this.basePointer._last_update;
  }*/

  getShallow(options) {
    if (!options) options = {};

    if (this._undefined) return undefined;
    //if (typeof this._cacheVal !== "undefined") return this._cacheVal;
    if (typeof this._primitive !== "undefined")
      if (!options.clean) return this.newPrimitive(this._primitive);
      else return this._primitive;
    if (typeof this._prototype === "undefined")
      this._prototype = Object.prototype;

    var res = [];
    var counter = 0;

    if (this._prototype.constructor.name === "Array") {
      var curri = 0;
      while (typeof this._child[curri] !== "undefined") {
        var value = this._child[curri];
        if (value._undefined) break;
        if (typeof options.start === "undefined" || counter >= options.start) {
          res.push(value);
          //console.log(options.start, counter);
        }
        curri++;
        counter++;
        if (typeof options.limit !== "undefined") {
          if (res.length >= options.limit) return res;
        }
      }
    } else {
      var addedcounter = 0;

      for (var key in this._child) {
        var value = this._child[key];
        if (value._undefined) continue;
        if (typeof options.start === "undefined" || counter >= options.start) {
          res[key] = value;
          addedcounter++;
          //console.log(options.start, counter);
        }
        if (typeof options.limit !== "undefined") {
          if (addedcounter >= options.limit) return res;
        }
        counter++;
      }
    }

    //console.log(res);
    return res;
  }
}

export default class Pointer extends BasePointer {
  constructor(value, options) {
    super(value, options);
    if (typeof this._parent === "undefined") {
      this._stageDiff = new DiffPointer(undefined, { basePointer: this });
      //console.log("rootafter", this._stageDiff._root);
    }
  }

  hook(name, fn, options) {
    if (!options) options = {};
    if (options.baseOnly) {
      return super.hook(name,fn,options);
    } else {
      super.hook(name,fn,options);
      var stageDiff = this.getStageDiff();
      //for prevent hook in super constructor
      if (stageDiff) stageDiff.hook(name,fn,options);
    }
  }

  getStageDiff() {
    if (!this._root._stageDiff) return null;
    return this._root._stageDiff.next(this._rootpath);
  }

  stage(value) {
    var stageDiff = this.getStageDiff();
    //console.log("stageDiff", stageDiff);
    if (typeof value === "undefined") return stageDiff;
    stageDiff.set(value);
  }

  stageIn(path, value) {
    var stageDiff = this.getStageDiff();
    if (typeof value === "undefined") return stageDiff.next(path);
    stageDiff.setIn(path, value);
  }

  commit(msg) {
    var stageDiff = this.getStageDiff();
    stageDiff.commit(msg);
  }

  reset(msg) {
    var stageDiff = this.getStageDiff();
    stageDiff.reset();
  }

  getCurrent() {
    var stageDiff = this.getStageDiff();
    return stageDiff.get();
  }

  get current() {
    return this.getCurrent();
  }
}
