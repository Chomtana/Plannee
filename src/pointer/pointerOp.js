import Pointer, { BasePointer, resolvePointer } from "./pointer";
import {merge, debounce} from "lodash"
import usePointer from "./usePointer";

class PointerOpNotReady {
  get isReady() {
    return false;
  }

  whyNotReady = "Unknown Reason";

  constructor(whyNotReady) {
    if (typeof whyNotReady !== "undefined") this.whyNotReady = whyNotReady;
  }
}

export class PointerOpInner extends Pointer {
  _params;
  _raw_pointer;
  _renderer;
  _opdata;

  constructor(raw_pointer, renderer, default_params, opdata) {
    if (typeof renderer !== "function") {
      return new BasePointer(raw_pointer, renderer);
    }
    if (!(default_params instanceof BasePointer)) {
      default_params = new BasePointer(default_params);
    }
    super(undefined, {});
    this._raw_pointer = raw_pointer;
    this._renderer = renderer;
    this._params = default_params;
    this._opdata = opdata;

    /*this.hook("afterSet", value =>
      value.hook("afterMark", () => this.rerender())
    );*/
    this.hook("afterMark", () => this.rerender_debounce())

    this.rerender();

    this.initParamsHook();
  }

  get randid() {
    var val = this.get();
    var res = 0;
    for(var key in val) {
      if (!(val[key] instanceof BasePointer)) res += this.next(key).randid;
      else res += val[key].randid;
    }
    return res;
  }

  set randid(val) {}

  mark(key, value) {
    //console.log(key, value, this._raw_pointer.mark(key,value));
    return this._raw_pointer.mark(key,value);
  }

  rerender_debounce = debounce(this.rerender,100)

  force_rerender_hook() {
    this._opdata.op.performHook(
      "rerender",
      this,
      this._opdata.section,
      this._opdata.format,
      this._opdata.op
    );
    this.performHook(
      "rerender",
      this,
      this._opdata.section,
      this._opdata.format,
      this._opdata.op
    );
  }

  rerender() {
    var oldp = this;
    var newp = resolvePointer(this._renderer(this._raw_pointer, this._params, this, this._opdata));
    /*var mark;
    if (oldp && newp) {
      mark = merge(oldp._mark, newp._mark);
    } else {
      mark = newp._mark;
    }*/
    this.set(newp);
    //this._mark = mark;

    this.force_rerender_hook();
  };

  initParamsHook() {
    this._params.hook("afterSetBP", () => {
      this.rerender_debounce();
    });
  }

  get raw() {
    return this._raw_pointer;
  }

  set raw(p) {
    this._raw_pointer = p;
    this.rerender();
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(r) {
    this._renderer = r;
    this.rerender();
  }

  get params() {
    return this._params;
  }

  set params(p) {
    if (p instanceof BasePointer) {
      this._params.set(p.get());
    } else {
      this._params.set(p);
    }

    this.rerender();
  }

  get op() {
    return this._opdata.op;
  }

  get section() {
    return this._opdata.section;
  }

  get format() {
    return this._opdata.format;
  }

  render(params, raw_pointer) {
    return this._renderer(
      raw_pointer || this._raw_pointer,
      params || this._params
    );
  }
}

export default class PointerOp {
  /**
   * data = {
   *  format: {
   *    section: {
   *      pointer: PointerOpInner
   *    },
   *    ... ,
   *    _raw_pointer: Pointer,
   *    _renderer: Function,
   *    _default_params: {}
   * },
   * ...
   */
  data = {};
  _hook = {};
  _isReady = false;
  _isWakedUp = false;
  _isWakedUpPending = false;
  whyNotReady = "Not initialized yet";
  _onWakeup;

  constructor(onWakeup, wakeUp) {
    this._onWakeup = onWakeup;
    if (wakeUp) this.wakeUp();
  }

  wakeUp() {
    if (!this._isWakedUp && !this._isWakedUpPending) {
      Promise.resolve(this._onWakeup(this)).then(() => {
        this._isWakedUp = true;
      });
      this._isWakedUpPending = true;
    }
    return this;
  }

  performHook(name, ...args) {
    if (typeof this._hook[name] === "undefined") return;

    for (var f of this._hook[name]) {
      f(...args);
    }

    //special case
    if (name === "ready") {
      this._hook[name] = [];
    }
  }

  hook(name, fn, options) {
    if (!options) options = {};
    if (!this._hook[name]) this._hook[name] = [];

    //special case
    if (name === "ready") {
      if (this.isReady) {
        fn(this);
        return;
      }
    }

    if (options.unique) {
      if (this._hook[name].indexOf(fn) !== -1) {
        console.log("unique filtered");
        return;
      }
    }

    this._hook[name].push(fn);
  }

  get isReady() {
    return this._isReady;
  }
  set isReady(ready) {
    this._isReady = ready;
    if (ready) this.performHook("ready", this);
  }

  waitForReady() {
    return new Promise((resolve, reject) => {
      setTimeout(()=>this.hook("ready", resolve),10);
    });
  }

  makeReady() {
    this.isReady = true;
  }

  setRawPointer(format, raw_pointer) {
    if (!this.data[format]) this.data[format] = {};
    this.data[format]._raw_pointer = raw_pointer;
  }

  setRenderer(format, renderer) {
    if (!this.data[format]) this.data[format] = {};
    this.data[format]._renderer = renderer;
  }

  setDefaultParams(format, default_params) {
    if (!this.data[format]) this.data[format] = {};
    this.data[format]._default_params = default_params;
  }

  initSection(section, format) {
    this.wakeUp();
    if (!section) section = "default";
    if (!format) format = "default";
    if (!this.isReady) {
      return new PointerOpNotReady(this.whyNotReady);
    }
    if (!this.data[format])
      return new PointerOpNotReady("No format " + format + " in PointerOp");

    if (!this.data[format][section]) {
      this.data[format][section] = {
        pointer: new PointerOpInner(
          this.data[format]._raw_pointer,
          this.data[format]._renderer,
          this.data[format]._default_params || {},
          { op: this, format, section }
        )
      };
    }

    return this.data[format][section];
  }

  use(section, format) {
    this.wakeUp();
    if (!section) section = "default";
    if (!format) format = "default";
    if (!this.isReady) {
      return new PointerOpNotReady(this.whyNotReady);
    }
    if (!this.data[format])
      return new PointerOpNotReady("No format " + format + " in PointerOp");

    var p = this.initSection(section, format).pointer;
    if (!p.isReady) p.rerender();
    return p;
  }

  useReact(section, format) {
    var res = this.use(section,format);
    usePointer(res._pvaluepath[0]);
    return res;
  }
}
