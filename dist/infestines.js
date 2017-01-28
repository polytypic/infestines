(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.I = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipe2U = pipe2U;
exports.seq = seq;
exports.seqPartial = seqPartial;
exports.whereEqU = whereEqU;
exports.hasKeysOfU = hasKeysOfU;
exports.acyclicEqualsU = acyclicEqualsU;
exports.unzipObjIntoU = unzipObjIntoU;
exports.keys = keys;
exports.values = values;
exports.assocPartialU = assocPartialU;
exports.dissocPartialU = dissocPartialU;
exports.inherit = inherit;
var ary1of2 = function ary1of2(fn) {
  return function (x0, x1) {
    switch (arguments.length) {
      case 0:
      case 1:
        return fn(x0);
      default:
        return fn(x0)(x1);
    }
  };
};

var ary2of2 = function ary2of2(fn) {
  return function (x0, x1) {
    switch (arguments.length) {
      case 0:
      case 1:
        return function (x1) {
          return fn(x0, x1);
        };
      default:
        return fn(x0, x1);
    }
  };
};

var ary1of3 = function ary1of3(fn) {
  return function (x0, x1, x2) {
    switch (arguments.length) {
      case 0:
      case 1:
        return curryN(2, fn(x0));
      case 2:
        return curryN(2, fn(x0))(x1);
      default:
        return curryN(2, fn(x0))(x1, x2);
    }
  };
};

var ary2of3 = function ary2of3(fn) {
  return function (x0, x1, x2) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary1of2(function (x1) {
          return fn(x0, x1);
        });
      case 2:
        return fn(x0, x1);
      default:
        return fn(x0, x1)(x2);
    }
  };
};

var ary3of3 = function ary3of3(fn) {
  return function (x0, x1, x2) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary2of2(function (x1, x2) {
          return fn(x0, x1, x2);
        });
      case 2:
        return function (x2) {
          return fn(x0, x1, x2);
        };
      default:
        return fn(x0, x1, x2);
    }
  };
};

var ary1of4 = function ary1of4(fn) {
  return function (x0, x1, x2, x3) {
    switch (arguments.length) {
      case 0:
      case 1:
        return curryN(3, fn(x0));
      case 2:
        return curryN(3, fn(x0))(x1);
      case 3:
        return curryN(3, fn(x0))(x1, x2);
      default:
        return curryN(3, fn(x0))(x1, x2, x3);
    }
  };
};

var ary2of4 = function ary2of4(fn) {
  return function (x0, x1, x2, x3) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary1of3(function (x1) {
          return fn(x0, x1);
        });
      case 2:
        return curryN(2, fn(x0, x1));
      case 3:
        return curryN(2, fn(x0, x1))(x2);
      default:
        return curryN(2, fn(x0, x1))(x2, x3);
    }
  };
};

var ary3of4 = function ary3of4(fn) {
  return function (x0, x1, x2, x3) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary2of3(function (x1, x2) {
          return fn(x0, x1, x2);
        });
      case 2:
        return ary1of2(function (x2) {
          return fn(x0, x1, x2);
        });
      case 3:
        return fn(x0, x1, x2);
      default:
        return fn(x0, x1, x2)(x3);
    }
  };
};

var ary4of4 = function ary4of4(fn) {
  return function (x0, x1, x2, x3) {
    switch (arguments.length) {
      case 0:
      case 1:
        return ary3of3(function (x1, x2, x3) {
          return fn(x0, x1, x2, x3);
        });
      case 2:
        return ary2of2(function (x2, x3) {
          return fn(x0, x1, x2, x3);
        });
      case 3:
        return function (x3) {
          return fn(x0, x1, x2, x3);
        };
      default:
        return fn(x0, x1, x2, x3);
    }
  };
};

var ary0of0 = function ary0of0(fn) {
  return fn.length === 0 ? fn : function () {
    return fn();
  };
};
var ary1of1 = function ary1of1(fn) {
  return fn.length === 1 ? fn : function (x) {
    return fn(x);
  };
};

var C = [[ary0of0], [ary1of1, ary1of1], [void 0, ary1of2, ary2of2], [void 0, ary1of3, ary2of3, ary3of3], [void 0, ary1of4, ary2of4, ary3of4, ary4of4]];

var curryN = exports.curryN = function curryN(n, f) {
  return C[n][Math.min(n, f.length)](f);
};
var arityN = exports.arityN = function arityN(n, f) {
  return C[n][n](f);
};
var curry = exports.curry = function curry(f) {
  return arityN(f.length, f);
};

//

var id = exports.id = function id(x) {
  return x;
};
var always = exports.always = function always(x) {
  return function (_) {
    return x;
  };
};
var applyU = exports.applyU = function applyU(x2y, x) {
  return x2y(x);
};
var sndU = exports.sndU = function sndU(_, y) {
  return y;
};

//

var array0 = exports.array0 = Object.freeze([]);
var object0 = exports.object0 = Object.freeze({});

//

var isDefined = exports.isDefined = function isDefined(x) {
  return x !== undefined;
};

//

var isFunction = exports.isFunction = function isFunction(x) {
  return typeof x === "function";
};
var isString = exports.isString = function isString(x) {
  return typeof x === "string";
};
var isNumber = exports.isNumber = function isNumber(x) {
  return typeof x === "number";
};

// The idea here is that any valid JSON object will be categorized correctly.
// Cases where there is no explicit attempt to create Array/Object lookalikes
// will also categorize correctly.

var isArray = exports.isArray = function isArray(x) {
  return x ? x.constructor === Array : false;
};

function hasObjectConstructor(x) {
  var c = x.constructor;
  return c === Object || !isFunction(c) && Object.getPrototypeOf(x).constructor === Object;
}

var isObject = exports.isObject = function isObject(x) {
  return x ? hasObjectConstructor(x) : false;
};

//

function pipe2U(fn1, fn2) {
  var n = fn1.length;
  return n === 1 ? function (x) {
    return fn2(fn1(x));
  } : arityN(n, function () {
    return fn2(fn1.apply(undefined, arguments));
  });
}

var compose2U = exports.compose2U = function compose2U(fn1, fn2) {
  return pipe2U(fn2, fn1);
};

//

function seq(x) {
  for (var _len = arguments.length, fns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fns[_key - 1] = arguments[_key];
  }

  for (var i = 0, n = fns.length; i < n; ++i) {
    x = fns[i](x);
  }return x;
}

function seqPartial(x) {
  for (var _len2 = arguments.length, fns = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    fns[_key2 - 1] = arguments[_key2];
  }

  for (var i = 0, n = fns.length; isDefined(x) && i < n; ++i) {
    x = fns[i](x);
  }return x;
}

//

var identicalU = exports.identicalU = function identicalU(a, b) {
  return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
};

//

function whereEqU(t, o) {
  for (var k in t) {
    var bk = o[k];
    if (!isDefined(bk) && !(k in o) || !acyclicEqualsU(t[k], bk)) return false;
  }
  return true;
}

//

function hasKeysOfU(t, o) {
  for (var k in t) {
    if (!(k in o)) return false;
  }return true;
}

//

var acyclicEqualsObject = exports.acyclicEqualsObject = function acyclicEqualsObject(a, b) {
  return whereEqU(a, b) && hasKeysOfU(b, a);
};

function acyclicEqualsArray(a, b) {
  var n = a.length;
  if (n !== b.length) return false;
  for (var i = 0; i < n; ++i) {
    if (!acyclicEqualsU(a[i], b[i])) return false;
  }return true;
}

function acyclicEqualsU(a, b) {
  if (identicalU(a, b)) return true;
  if (!a || !b) return false;
  var c = a.constructor;
  if (c !== b.constructor) return false;
  switch (c) {
    case Array:
      return acyclicEqualsArray(a, b);
    case Object:
      return acyclicEqualsObject(a, b);
    default:
      if (isFunction(a.equals)) return a.equals(b);
      return false;
  }
}

//

function unzipObjIntoU(o, ks, vs) {
  for (var k in o) {
    if (ks) ks.push(k);
    if (vs) vs.push(o[k]);
  }
}

function keys(o) {
  if (o instanceof Object) {
    if (hasObjectConstructor(o)) {
      var ks = [];
      unzipObjIntoU(o, ks, 0);
      return ks;
    } else {
      return Object.keys(o);
    }
  }
}

function values(o) {
  if (o instanceof Object) {
    if (hasObjectConstructor(o)) {
      var vs = [];
      unzipObjIntoU(o, 0, vs);
      return vs;
    } else {
      var xs = Object.keys(o),
          n = xs.length;
      for (var i = 0; i < n; ++i) {
        xs[i] = o[xs[i]];
      }return xs;
    }
  }
}

//

function assocPartialU(k, v, o) {
  var r = {};
  if (o instanceof Object) {
    if (!hasObjectConstructor(o)) o = Object.assign({}, o);
    for (var l in o) {
      if (l !== k) {
        r[l] = o[l];
      } else {
        r[k] = v;
        k = undefined;
      }
    }
  }
  if (isDefined(k)) r[k] = v;
  return r;
}

function dissocPartialU(k, o) {
  var r = void 0;
  if (o instanceof Object) {
    if (!hasObjectConstructor(o)) o = Object.assign({}, o);
    for (var l in o) {
      if (l !== k) {
        if (!r) r = {};
        r[l] = o[l];
      } else {
        k = undefined;
      }
    }
  }
  return r;
}

//

function inherit(Derived, Base, fns) {
  var p = Derived.prototype = Object.create(Base.prototype);
  p.constructor = Derived;
  for (var k in fns) {
    p[k] = fns[k];
  }
}

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5mZXN0aW5lcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDdUlnQixNLEdBQUEsTTtRQVdBLEcsR0FBQSxHO1FBTUEsVSxHQUFBLFU7UUFhQSxRLEdBQUEsUTtRQVdBLFUsR0FBQSxVO1FBcUJBLGMsR0FBQSxjO1FBb0JBLGEsR0FBQSxhO1FBT0EsSSxHQUFBLEk7UUFZQSxNLEdBQUEsTTtRQWlCQSxhLEdBQUEsYTtRQW1CQSxjLEdBQUEsYztRQW9CQSxPLEdBQUEsTztBQXBTaEIsSUFBTSxVQUFVLFNBQVYsT0FBVTtBQUFBLFNBQU0sVUFBVSxFQUFWLEVBQWMsRUFBZCxFQUFrQjtBQUN0QyxZQUFRLFVBQVUsTUFBbEI7QUFDRSxXQUFLLENBQUw7QUFDQSxXQUFLLENBQUw7QUFBUSxlQUFPLEdBQUcsRUFBSCxDQUFQO0FBQ1I7QUFBUyxlQUFPLEdBQUcsRUFBSCxFQUFPLEVBQVAsQ0FBUDtBQUhYO0FBS0QsR0FOZTtBQUFBLENBQWhCOztBQVFBLElBQU0sVUFBVSxTQUFWLE9BQVU7QUFBQSxTQUFNLFVBQVUsRUFBVixFQUFjLEVBQWQsRUFBa0I7QUFDdEMsWUFBUSxVQUFVLE1BQWxCO0FBQ0UsV0FBSyxDQUFMO0FBQ0EsV0FBSyxDQUFMO0FBQVEsZUFBTztBQUFBLGlCQUFNLEdBQUcsRUFBSCxFQUFPLEVBQVAsQ0FBTjtBQUFBLFNBQVA7QUFDUjtBQUFTLGVBQU8sR0FBRyxFQUFILEVBQU8sRUFBUCxDQUFQO0FBSFg7QUFLRCxHQU5lO0FBQUEsQ0FBaEI7O0FBUUEsSUFBTSxVQUFVLFNBQVYsT0FBVTtBQUFBLFNBQU0sVUFBVSxFQUFWLEVBQWMsRUFBZCxFQUFrQixFQUFsQixFQUFzQjtBQUMxQyxZQUFRLFVBQVUsTUFBbEI7QUFDRSxXQUFLLENBQUw7QUFDQSxXQUFLLENBQUw7QUFBUSxlQUFPLE9BQU8sQ0FBUCxFQUFVLEdBQUcsRUFBSCxDQUFW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QSxNQUFJLGFBQWEsTUFBakIsRUFBeUI7QUFDdkIsUUFBSSxDQUFDLHFCQUFxQixDQUFyQixDQUFMLEVBQ0UsSUFBSSxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLENBQWxCLENBQUo7QUFDRixTQUFLLElBQU0sQ0FBWCxJQUFnQixDQUFoQixFQUFtQjtBQUNqQixVQUFJLE1BQU0sQ0FBVixFQUFhO0FBQ1gsWUFBSSxDQUFDLENBQUwsRUFDRSxJQUFJLEVBQUo7QUFDRixVQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBUDtBQUNELE9BSkQsTUFJTztBQUNMLFlBQUksU0FBSjtBQUNEO0FBQ0Y7QUFDRjtBQUNELFNBQU8sQ0FBUDtBQUNEOztBQUVEOztBQUVPLFNBQVMsT0FBVCxDQUFpQixPQUFqQixFQUEwQixJQUExQixFQUFnQyxHQUFoQyxFQUFxQztBQUMxQyxNQUFNLElBQUksUUFBUSxTQUFSLEdBQW9CLE9BQU8sTUFBUCxDQUFjLEtBQUssU0FBbkIsQ0FBOUI7QUFDQSxJQUFFLFdBQUYsR0FBZ0IsT0FBaEI7QUFDQSxPQUFLLElBQU0sQ0FBWCxJQUFnQixHQUFoQjtBQUNFLE1BQUUsQ0FBRixJQUFPLElBQUksQ0FBSixDQUFQO0FBREY7QUFFRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBhcnkxb2YyID0gZm4gPT4gZnVuY3Rpb24gKHgwLCB4MSkge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgY2FzZSAxOiByZXR1cm4gZm4oeDApXG4gICAgZGVmYXVsdDogcmV0dXJuIGZuKHgwKSh4MSlcbiAgfVxufVxuXG5jb25zdCBhcnkyb2YyID0gZm4gPT4gZnVuY3Rpb24gKHgwLCB4MSkge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgY2FzZSAxOiByZXR1cm4geDEgPT4gZm4oeDAsIHgxKVxuICAgIGRlZmF1bHQ6IHJldHVybiBmbih4MCwgeDEpXG4gIH1cbn1cblxuY29uc3QgYXJ5MW9mMyA9IGZuID0+IGZ1bmN0aW9uICh4MCwgeDEsIHgyKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICBjYXNlIDE6IHJldHVybiBjdXJyeU4oMiwgZm4oeDApKVxuICAgIGNhc2UgMjogcmV0dXJuIGN1cnJ5TigyLCBmbih4MCkpKHgxKVxuICAgIGRlZmF1bHQ6IHJldHVybiBjdXJyeU4oMiwgZm4oeDApKSh4MSwgeDIpXG4gIH1cbn1cblxuY29uc3QgYXJ5Mm9mMyA9IGZuID0+IGZ1bmN0aW9uICh4MCwgeDEsIHgyKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICBjYXNlIDE6IHJldHVybiBhcnkxb2YyKHgxID0+IGZuKHgwLCB4MSkpXG4gICAgY2FzZSAyOiByZXR1cm4gZm4oeDAsIHgxKVxuICAgIGRlZmF1bHQ6IHJldHVybiBmbih4MCwgeDEpKHgyKVxuICB9XG59XG5cbmNvbnN0IGFyeTNvZjMgPSBmbiA9PiBmdW5jdGlvbiAoeDAsIHgxLCB4Mikge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgY2FzZSAxOiByZXR1cm4gYXJ5Mm9mMigoeDEsIHgyKSA9PiBmbih4MCwgeDEsIHgyKSlcbiAgICBjYXNlIDI6IHJldHVybiB4MiA9PiBmbih4MCwgeDEsIHgyKVxuICAgIGRlZmF1bHQ6IHJldHVybiBmbih4MCwgeDEsIHgyKVxuICB9XG59XG5cbmNvbnN0IGFyeTFvZjQgPSBmbiA9PiBmdW5jdGlvbiAoeDAsIHgxLCB4MiwgeDMpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgIGNhc2UgMTogcmV0dXJuIGN1cnJ5TigzLCBmbih4MCkpXG4gICAgY2FzZSAyOiByZXR1cm4gY3VycnlOKDMsIGZuKHgwKSkoeDEpXG4gICAgY2FzZSAzOiByZXR1cm4gY3VycnlOKDMsIGZuKHgwKSkoeDEsIHgyKVxuICAgIGRlZmF1bHQ6IHJldHVybiBjdXJyeU4oMywgZm4oeDApKSh4MSwgeDIsIHgzKVxuICB9XG59XG5cbmNvbnN0IGFyeTJvZjQgPSBmbiA9PiBmdW5jdGlvbiAoeDAsIHgxLCB4MiwgeDMpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgIGNhc2UgMTogcmV0dXJuIGFyeTFvZjMoeDEgPT4gZm4oeDAsIHgxKSlcbiAgICBjYXNlIDI6IHJldHVybiBjdXJyeU4oMiwgZm4oeDAsIHgxKSlcbiAgICBjYXNlIDM6IHJldHVybiBjdXJyeU4oMiwgZm4oeDAsIHgxKSkoeDIpXG4gICAgZGVmYXVsdDogcmV0dXJuIGN1cnJ5TigyLCBmbih4MCwgeDEpKSh4MiwgeDMpXG4gIH1cbn1cblxuY29uc3QgYXJ5M29mNCA9IGZuID0+IGZ1bmN0aW9uICh4MCwgeDEsIHgyLCB4Mykge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgY2FzZSAxOiByZXR1cm4gYXJ5Mm9mMygoeDEsIHgyKSA9PiBmbih4MCwgeDEsIHgyKSlcbiAgICBjYXNlIDI6IHJldHVybiBhcnkxb2YyKHgyID0+IGZuKHgwLCB4MSwgeDIpKVxuICAgIGNhc2UgMzogcmV0dXJuIGZuKHgwLCB4MSwgeDIpXG4gICAgZGVmYXVsdDogcmV0dXJuIGZuKHgwLCB4MSwgeDIpKHgzKVxuICB9XG59XG5cbmNvbnN0IGFyeTRvZjQgPSBmbiA9PiBmdW5jdGlvbiAoeDAsIHgxLCB4MiwgeDMpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgIGNhc2UgMTogcmV0dXJuIGFyeTNvZjMoKHgxLCB4MiwgeDMpID0+IGZuKHgwLCB4MSwgeDIsIHgzKSlcbiAgICBjYXNlIDI6IHJldHVybiBhcnkyb2YyKCh4MiwgeDMpID0+IGZuKHgwLCB4MSwgeDIsIHgzKSlcbiAgICBjYXNlIDM6IHJldHVybiB4MyA9PiBmbih4MCwgeDEsIHgyLCB4MylcbiAgICBkZWZhdWx0OiByZXR1cm4gZm4oeDAsIHgxLCB4MiwgeDMpXG4gIH1cbn1cblxuY29uc3QgYXJ5MG9mMCA9IGZuID0+IGZuLmxlbmd0aCA9PT0gMCA/IGZuIDogKCkgPT4gZm4oKVxuY29uc3QgYXJ5MW9mMSA9IGZuID0+IGZuLmxlbmd0aCA9PT0gMSA/IGZuIDogeCAgPT4gZm4oeClcblxuY29uc3QgQyA9IFtbYXJ5MG9mMF0sXG4gICAgICAgICAgIFthcnkxb2YxLCBhcnkxb2YxXSxcbiAgICAgICAgICAgWyB2b2lkIDAsIGFyeTFvZjIsIGFyeTJvZjJdLFxuICAgICAgICAgICBbIHZvaWQgMCwgYXJ5MW9mMywgYXJ5Mm9mMywgYXJ5M29mM10sXG4gICAgICAgICAgIFsgdm9pZCAwLCBhcnkxb2Y0LCBhcnkyb2Y0LCBhcnkzb2Y0LCBhcnk0b2Y0XV1cblxuZXhwb3J0IGNvbnN0IGN1cnJ5TiA9IChuLCBmKSA9PiBDW25dW01hdGgubWluKG4sIGYubGVuZ3RoKV0oZilcbmV4cG9ydCBjb25zdCBhcml0eU4gPSAobiwgZikgPT4gQ1tuXVtuXShmKVxuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZiA9PiBhcml0eU4oZi5sZW5ndGgsIGYpXG5cbi8vXG5cbmV4cG9ydCBjb25zdCBpZCA9IHggPT4geFxuZXhwb3J0IGNvbnN0IGFsd2F5cyA9IHggPT4gXyA9PiB4XG5leHBvcnQgY29uc3QgYXBwbHlVID0gKHgyeSwgeCkgPT4geDJ5KHgpXG5leHBvcnQgY29uc3Qgc25kVSA9IChfLCB5KSA9PiB5XG5cbi8vXG5cbmV4cG9ydCBjb25zdCBhcnJheTAgPSBPYmplY3QuZnJlZXplKFtdKVxuZXhwb3J0IGNvbnN0IG9iamVjdDAgPSBPYmplY3QuZnJlZXplKHt9KVxuXG4vL1xuXG5leHBvcnQgY29uc3QgaXNEZWZpbmVkID0geCA9PiB4ICE9PSB1bmRlZmluZWRcblxuLy9cblxuZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb24gPSB4ID0+IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCJcbmV4cG9ydCBjb25zdCBpc1N0cmluZyA9IHggPT4gdHlwZW9mIHggPT09IFwic3RyaW5nXCJcbmV4cG9ydCBjb25zdCBpc051bWJlciA9IHggPT4gdHlwZW9mIHggPT09IFwibnVtYmVyXCJcblxuLy8gVGhlIGlkZWEgaGVyZSBpcyB0aGF0IGFueSB2YWxpZCBKU09OIG9iamVjdCB3aWxsIGJlIGNhdGVnb3JpemVkIGNvcnJlY3RseS5cbi8vIENhc2VzIHdoZXJlIHRoZXJlIGlzIG5vIGV4cGxpY2l0IGF0dGVtcHQgdG8gY3JlYXRlIEFycmF5L09iamVjdCBsb29rYWxpa2VzXG4vLyB3aWxsIGFsc28gY2F0ZWdvcml6ZSBjb3JyZWN0bHkuXG5cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0geCA9PiB4ID8geC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgOiBmYWxzZVxuXG5mdW5jdGlvbiBoYXNPYmplY3RDb25zdHJ1Y3Rvcih4KSB7XG4gIGNvbnN0IGMgPSB4LmNvbnN0cnVjdG9yXG4gIHJldHVybiBjID09PSBPYmplY3QgfHxcbiAgICAhaXNGdW5jdGlvbihjKSAmJlxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZih4KS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IHggPT4geCA/IGhhc09iamVjdENvbnN0cnVjdG9yKHgpIDogZmFsc2VcblxuLy9cblxuZXhwb3J0IGZ1bmN0aW9uIHBpcGUyVShmbjEsIGZuMikge1xuICBjb25zdCBuID0gZm4xLmxlbmd0aFxuICByZXR1cm4gbiA9PT0gMVxuICAgID8geCA9PiBmbjIoZm4xKHgpKVxuICAgIDogYXJpdHlOKG4sICguLi54cykgPT4gZm4yKGZuMSguLi54cykpKVxufVxuXG5leHBvcnQgY29uc3QgY29tcG9zZTJVID0gKGZuMSwgZm4yKSA9PiBwaXBlMlUoZm4yLCBmbjEpXG5cbi8vXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXEoeCwgLi4uZm5zKSB7XG4gIGZvciAobGV0IGk9MCwgbj1mbnMubGVuZ3RoOyBpPG47ICsraSlcbiAgICB4ID0gZm5zW2ldKHgpXG4gIHJldHVybiB4XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXFQYXJ0aWFsKHgsIC4uLmZucykge1xuICBmb3IgKGxldCBpPTAsIG49Zm5zLmxlbmd0aDsgaXNEZWZpbmVkKHgpICYmIGk8bjsgKytpKVxuICAgIHggPSBmbnNbaV0oeClcbiAgcmV0dXJuIHhcbn1cblxuLy9cblxuZXhwb3J0IGNvbnN0IGlkZW50aWNhbFUgPSAoYSwgYikgPT5cbiAgYSA9PT0gYiAmJiAoYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGIpIHx8IGEgIT09IGEgJiYgYiAhPT0gYlxuXG4vL1xuXG5leHBvcnQgZnVuY3Rpb24gd2hlcmVFcVUodCwgbykge1xuICBmb3IgKGNvbnN0IGsgaW4gdCkge1xuICAgIGNvbnN0IGJrID0gb1trXVxuICAgIGlmICghaXNEZWZpbmVkKGJrKSAmJiAhKGsgaW4gbykgfHwgIWFjeWNsaWNFcXVhbHNVKHRba10sIGJrKSlcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vXG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNLZXlzT2ZVKHQsIG8pIHtcbiAgZm9yIChjb25zdCBrIGluIHQpXG4gICAgaWYgKCEoayBpbiBvKSlcbiAgICAgIHJldHVybiBmYWxzZVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vL1xuXG5leHBvcnQgY29uc3QgYWN5Y2xpY0VxdWFsc09iamVjdCA9IChhLCBiKSA9PiB3aGVyZUVxVShhLCBiKSAmJiBoYXNLZXlzT2ZVKGIsIGEpXG5cbmZ1bmN0aW9uIGFjeWNsaWNFcXVhbHNBcnJheShhLCBiKSB7XG4gIGNvbnN0IG4gPSBhLmxlbmd0aFxuICBpZiAobiAhPT0gYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlXG4gIGZvciAobGV0IGk9MDsgaTxuOyArK2kpXG4gICAgaWYgKCFhY3ljbGljRXF1YWxzVShhW2ldLCBiW2ldKSlcbiAgICAgIHJldHVybiBmYWxzZVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN5Y2xpY0VxdWFsc1UoYSwgYikge1xuICBpZiAoaWRlbnRpY2FsVShhLCBiKSlcbiAgICByZXR1cm4gdHJ1ZVxuICBpZiAoIWEgfHwgIWIpXG4gICAgcmV0dXJuIGZhbHNlXG4gIGNvbnN0IGMgPSBhLmNvbnN0cnVjdG9yXG4gIGlmIChjICE9PSBiLmNvbnN0cnVjdG9yKVxuICAgIHJldHVybiBmYWxzZVxuICBzd2l0Y2ggKGMpIHtcbiAgICBjYXNlIEFycmF5OiByZXR1cm4gYWN5Y2xpY0VxdWFsc0FycmF5KGEsIGIpXG4gICAgY2FzZSBPYmplY3Q6IHJldHVybiBhY3ljbGljRXF1YWxzT2JqZWN0KGEsIGIpXG4gICAgZGVmYXVsdDpcbiAgICAgIGlmIChpc0Z1bmN0aW9uKGEuZXF1YWxzKSlcbiAgICAgICAgcmV0dXJuIGEuZXF1YWxzKGIpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vL1xuXG5leHBvcnQgZnVuY3Rpb24gdW56aXBPYmpJbnRvVShvLCBrcywgdnMpIHtcbiAgZm9yIChjb25zdCBrIGluIG8pIHtcbiAgICBpZiAoa3MpIGtzLnB1c2goaylcbiAgICBpZiAodnMpIHZzLnB1c2gob1trXSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ga2V5cyhvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgaWYgKGhhc09iamVjdENvbnN0cnVjdG9yKG8pKSB7XG4gICAgICBjb25zdCBrcz1bXVxuICAgICAgdW56aXBPYmpJbnRvVShvLCBrcywgMClcbiAgICAgIHJldHVybiBrc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMobylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlcyhvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgaWYgKGhhc09iamVjdENvbnN0cnVjdG9yKG8pKSB7XG4gICAgICBjb25zdCB2cz1bXVxuICAgICAgdW56aXBPYmpJbnRvVShvLCAwLCB2cylcbiAgICAgIHJldHVybiB2c1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB4cyA9IE9iamVjdC5rZXlzKG8pLCBuID0geHMubGVuZ3RoXG4gICAgICBmb3IgKGxldCBpPTA7IGk8bjsgKytpKVxuICAgICAgICB4c1tpXSA9IG9beHNbaV1dXG4gICAgICByZXR1cm4geHNcbiAgICB9XG4gIH1cbn1cblxuLy9cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc29jUGFydGlhbFUoaywgdiwgbykge1xuICBjb25zdCByID0ge31cbiAgaWYgKG8gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICBpZiAoIWhhc09iamVjdENvbnN0cnVjdG9yKG8pKVxuICAgICAgbyA9IE9iamVjdC5hc3NpZ24oe30sIG8pXG4gICAgZm9yIChjb25zdCBsIGluIG8pIHtcbiAgICAgIGlmIChsICE9PSBrKSB7XG4gICAgICAgIHJbbF0gPSBvW2xdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByW2tdID0gdlxuICAgICAgICBrID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChpc0RlZmluZWQoaykpXG4gICAgcltrXSA9IHZcbiAgcmV0dXJuIHJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3NvY1BhcnRpYWxVKGssIG8pIHtcbiAgbGV0IHJcbiAgaWYgKG8gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICBpZiAoIWhhc09iamVjdENvbnN0cnVjdG9yKG8pKVxuICAgICAgbyA9IE9iamVjdC5hc3NpZ24oe30sIG8pXG4gICAgZm9yIChjb25zdCBsIGluIG8pIHtcbiAgICAgIGlmIChsICE9PSBrKSB7XG4gICAgICAgIGlmICghcilcbiAgICAgICAgICByID0ge31cbiAgICAgICAgcltsXSA9IG9bbF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGsgPSB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJcbn1cblxuLy9cblxuZXhwb3J0IGZ1bmN0aW9uIGluaGVyaXQoRGVyaXZlZCwgQmFzZSwgZm5zKSB7XG4gIGNvbnN0IHAgPSBEZXJpdmVkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZS5wcm90b3R5cGUpXG4gIHAuY29uc3RydWN0b3IgPSBEZXJpdmVkXG4gIGZvciAoY29uc3QgayBpbiBmbnMpXG4gICAgcFtrXSA9IGZuc1trXVxufVxuIl19
