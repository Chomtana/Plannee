import { get } from "lodash";
import { BasePointer } from './pointer';

function convertCompOp(x) {
  switch (x) {
    case "=":
      return "==";
    case "<>":
      return "!=";
    default:
      return x;
  }
}

function toCompExpr(x) {
  var res = [];
  var level2 = false;
  for (var y of x) {
    if (Array.isArray(y)) {
      var expr = toCompExpr(y);
      res.push(expr);
      level2 = true;
    }
  }

  if (!level2) {
    return;
  } else {
    return "(" + expr.join("&&") + ")";
  }
}

function performLevel1Check(x, cond) {
  var compop;
  var targetval;
  if (typeof x === "undefined") {
    return false;
  }
  if (x.length == 3) {
    compop = convertCompOp(cond[1]);
    targetval = cond[2];
  } else {
    compop = "==";
    targetval = cond[1];
  }

  switch (compop) {
    case "==":
      return get(x, cond[0]) === targetval;
    case ">":
      return get(x, cond[0]) > targetval;
    case "<":
      return get(x, cond[0]) < targetval;
    case "!=":
      return get(x, cond[0]) === targetval;

    default:
      return false;
  }
}

function toCompFunc(cond) {
  return function(x) {
    var level2 = false;
    //console.log(x);
    for (var y of cond) {
      if (Array.isArray(y)) {
        level2 = true;
        if (!performLevel1Check(y, cond)) {
          return false;
        }
      } else {
        break;
      }
    }

    if (!level2) {
      return performLevel1Check(x, cond);
    }

    return true;
  };
}

export default function defaultOpRenderer(raw_pointer, params, op_pointer) {
  if (params instanceof BasePointer) params = params();
  if (!params) params = {};
  var p = raw_pointer;
  if (params.find) {
    //find mode
    var compfunc = toCompFunc(params.find);
    var pval = p();
    for (var i = 0; i < pval.length; i++) {
      //console.log(p(i)())
      if (compfunc(p(i)())) {
        return p(i);
      }
    }

    return undefined;
  }
  if (params.limit) {
    p = p.limit(params.limit, params.start);
  }

  op_pointer.mark("$RawLength", raw_pointer().length);
  return p;
}
