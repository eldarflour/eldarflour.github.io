"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transpileStyleSheet = transpileStyleSheet;

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function _regeneratorRuntime() {
      return exports;
    };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return (
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }),
      obj[key]
    );
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return (obj[key] = value);
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator =
        outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return (
      (generator._invoke = (function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state)
            throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg; ; ) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method)
              context.sent = context._sent = context.arg;
            else if ("throw" === context.method) {
              if ("suspendedStart" === state)
                throw ((state = "completed"), context.arg);
              context.dispatchException(context.arg);
            } else
              "return" === context.method &&
                context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (
                ((state = context.done ? "completed" : "suspendedYield"),
                record.arg === ContinueSentinel)
              )
                continue;
              return { value: record.arg, done: context.done };
            }
            "throw" === record.type &&
              ((state = "completed"),
              (context.method = "throw"),
              (context.arg = record.arg));
          }
        };
      })(innerFn, self, context)),
      generator
    );
  }
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype &&
    NativeIteratorPrototype !== Op &&
    hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
    (IteratorPrototype = NativeIteratorPrototype);
  var Gp =
    (GeneratorFunctionPrototype.prototype =
    Generator.prototype =
      Object.create(IteratorPrototype));
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value &&
          "object" == _typeof(value) &&
          hasOwn.call(value, "__await")
          ? PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke("next", value, resolve, reject);
              },
              function (err) {
                invoke("throw", err, resolve, reject);
              }
            )
          : PromiseImpl.resolve(value).then(
              function (unwrapped) {
                (result.value = unwrapped), resolve(result);
              },
              function (error) {
                return invoke("throw", error, resolve, reject);
              }
            );
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return (previousPromise = previousPromise
        ? previousPromise.then(
            callInvokeWithMethodAndArg,
            callInvokeWithMethodAndArg
          )
        : callInvokeWithMethodAndArg());
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (((context.delegate = null), "throw" === context.method)) {
        if (
          delegate.iterator.return &&
          ((context.method = "return"),
          (context.arg = undefined),
          maybeInvokeDelegate(delegate, context),
          "throw" === context.method)
        )
          return ContinueSentinel;
        (context.method = "throw"),
          (context.arg = new TypeError(
            "The iterator does not provide a 'throw' method"
          ));
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return (
        (context.method = "throw"),
        (context.arg = record.arg),
        (context.delegate = null),
        ContinueSentinel
      );
    var info = record.arg;
    return info
      ? info.done
        ? ((context[delegate.resultName] = info.value),
          (context.next = delegate.nextLoc),
          "return" !== context.method &&
            ((context.method = "next"), (context.arg = undefined)),
          (context.delegate = null),
          ContinueSentinel)
        : info
      : ((context.method = "throw"),
        (context.arg = new TypeError("iterator result is not an object")),
        (context.delegate = null),
        ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };
    1 in locs && (entry.catchLoc = locs[1]),
      2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
      this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    (record.type = "normal"), delete record.arg, (entry.completion = record);
  }
  function Context(tryLocsList) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      tryLocsList.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length; ) {
              if (hasOwn.call(iterable, i))
                return (next.value = iterable[i]), (next.done = !1), next;
            }
            return (next.value = undefined), (next.done = !0), next;
          };
        return (next.next = next);
      }
    }
    return { next: doneResult };
  }
  function doneResult() {
    return { value: undefined, done: !0 };
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    define(Gp, "constructor", GeneratorFunctionPrototype),
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction),
    (GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    )),
    (exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return (
        !!ctor &&
        (ctor === GeneratorFunction ||
          "GeneratorFunction" === (ctor.displayName || ctor.name))
      );
    }),
    (exports.mark = function (genFun) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
          : ((genFun.__proto__ = GeneratorFunctionPrototype),
            define(genFun, toStringTagSymbol, "GeneratorFunction")),
        (genFun.prototype = Object.create(Gp)),
        genFun
      );
    }),
    (exports.awrap = function (arg) {
      return { __await: arg };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function (
      innerFn,
      outerFn,
      self,
      tryLocsList,
      PromiseImpl
    ) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn)
        ? iter
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
    }),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, "Generator"),
    define(Gp, iteratorSymbol, function () {
      return this;
    }),
    define(Gp, "toString", function () {
      return "[object Generator]";
    }),
    (exports.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      return (
        keys.reverse(),
        function next() {
          for (; keys.length; ) {
            var key = keys.pop();
            if (key in object)
              return (next.value = key), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (exports.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = undefined),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = undefined),
          this.tryEntries.forEach(resetTryEntry),
          !skipTempReset)
        )
          for (var name in this) {
            "t" === name.charAt(0) &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1)) &&
              (this[name] = undefined);
          }
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return (
            (record.type = "throw"),
            (record.arg = exception),
            (context.next = loc),
            caught && ((context.method = "next"), (context.arg = undefined)),
            !!caught
          );
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally)
                throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (
            entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc
          ) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry &&
          ("break" === type || "continue" === type) &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc &&
          (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return (
          (record.type = type),
          (record.arg = arg),
          finallyEntry
            ? ((this.method = "next"),
              (this.next = finallyEntry.finallyLoc),
              ContinueSentinel)
            : this.complete(record)
        );
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return (
          "break" === record.type || "continue" === record.type
            ? (this.next = record.arg)
            : "return" === record.type
            ? ((this.rval = this.arg = record.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === record.type && afterLoc && (this.next = afterLoc),
          ContinueSentinel
        );
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc)
            return (
              this.complete(entry.completion, entry.afterLoc),
              resetTryEntry(entry),
              ContinueSentinel
            );
        }
      },
      catch: function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return (
          (this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          }),
          "next" === this.method && (this.arg = undefined),
          ContinueSentinel
        );
      }
    }),
    exports
  );
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
        arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e2) {
          throw _e2;
        },
        f: F
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e3) {
      didErr = true;
      err = _e3;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

// src/engine.ts
var Comparator;

(function (Comparator2) {
  Comparator2[(Comparator2["LESS_THAN"] = 0)] = "LESS_THAN";
  Comparator2[(Comparator2["LESS_OR_EQUAL"] = 1)] = "LESS_OR_EQUAL";
  Comparator2[(Comparator2["GREATER_THAN"] = 2)] = "GREATER_THAN";
  Comparator2[(Comparator2["GREATER_OR_EQUAL"] = 3)] = "GREATER_OR_EQUAL";
})(Comparator || (Comparator = {}));

var ContainerConditionType;

(function (ContainerConditionType2) {
  ContainerConditionType2[(ContainerConditionType2["SizeQuery"] = 0)] =
    "SizeQuery";
  ContainerConditionType2[
    (ContainerConditionType2["ContainerConditionConjunction"] = 1)
  ] = "ContainerConditionConjunction";
  ContainerConditionType2[
    (ContainerConditionType2["ContainerConditionDisjunction"] = 2)
  ] = "ContainerConditionDisjunction";
  ContainerConditionType2[
    (ContainerConditionType2["ContainerConditionNegation"] = 3)
  ] = "ContainerConditionNegation";
})(ContainerConditionType || (ContainerConditionType = {}));

function uid() {
  return Array.from(
    {
      length: 16
    },
    function () {
      return Math.floor(Math.random() * 256).toString(16);
    }
  ).join("");
}

function translateToLogicalProp(feature) {
  switch (feature.toLowerCase()) {
    case "inlinesize":
      return "inlineSize";

    case "blocksize":
      return "blockSize";

    case "width":
      return "inlineSize";

    case "height":
      return "blockSize";

    default:
      throw Error(
        "Unknown feature name ".concat(feature, " in container query")
      );
  }
}

function isSizeQueryFulfilled(condition, borderBox) {
  var value = borderBox[translateToLogicalProp(condition.feature)];

  switch (condition.comparator) {
    case 3:
      return value >= condition.threshold;

    case 2:
      return value > condition.threshold;

    case 1:
      return value <= condition.threshold;

    case 0:
      return value < condition.threshold;
  }
}

function isQueryFullfilled_internal(condition, borderBox) {
  switch (condition.type) {
    case 1:
      return (
        isQueryFullfilled_internal(condition.left, borderBox) &&
        isQueryFullfilled_internal(condition.right, borderBox)
      );

    case 2:
      return (
        isQueryFullfilled_internal(condition.left, borderBox) ||
        isQueryFullfilled_internal(condition.right, borderBox)
      );

    case 3:
      return !isQueryFullfilled_internal(condition.right, borderBox);

    case 0:
      return isSizeQueryFulfilled(condition, borderBox);

    default:
      throw Error("wtf?");
  }
}

function isQueryFullfilled(condition, entry) {
  var borderBox;

  if ("borderBoxSize" in entry) {
    var _entry$borderBoxSize$, _entry$borderBoxSize;

    borderBox =
      (_entry$borderBoxSize$ =
        (_entry$borderBoxSize = entry.borderBoxSize) === null ||
        _entry$borderBoxSize === void 0
          ? void 0
          : _entry$borderBoxSize[0]) !== null &&
      _entry$borderBoxSize$ !== void 0
        ? _entry$borderBoxSize$
        : entry.borderBoxSize;
  } else {
    var computed = getComputedStyle(entry.target);
    borderBox = {
      blockSize: entry.contentRect.height,
      inlineSize: entry.contentRect.width
    };
    borderBox.blockSize +=
      parseInt(computed.paddingBlockStart.slice(0, -2)) +
      parseInt(computed.paddingBlockEnd.slice(0, -2));
    borderBox.inlineSize +=
      parseInt(computed.paddingInlineStart.slice(0, -2)) +
      parseInt(computed.paddingInlineEnd.slice(0, -2));
  }

  return isQueryFullfilled_internal(condition, borderBox);
}

function findParentContainer(el, name) {
  while (el) {
    el = el.parentElement;
    if (!containerNames.has(el)) continue;

    if (name) {
      var containerName = containerNames.get(el);
      if (!containerName.includes(name)) continue;
    }

    return el;
  }

  return null;
}

var containerNames = new WeakMap();

function registerContainer(el, name) {
  containerRO.observe(el);

  if (!containerNames.has(el)) {
    containerNames.set(el, []);
  }

  containerNames.get(el).push(name);
}

var queries = [];

function registerContainerQuery(cqd) {
  queries.push(cqd);
}

var containerRO = new ResizeObserver(function (entries) {
  var changedContainers = new Map(
    entries.map(function (entry) {
      return [entry.target, entry];
    })
  );

  var _iterator = _createForOfIteratorHelper(queries),
    _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var query = _step.value;

      var _iterator2 = _createForOfIteratorHelper(query.rules),
        _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var selector = _step2.value.selector;
          var els = document.querySelectorAll(selector);

          var _iterator3 = _createForOfIteratorHelper(els),
            _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var el = _step3.value;
              var container = findParentContainer(el, query.name);
              if (!container) continue;
              if (!changedContainers.has(container)) continue;
              var entry = changedContainers.get(container);
              el.classList.toggle(
                query.className,
                isQueryFullfilled(query.condition, entry)
              );
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});
var watchedContainerSelectors = [];
var containerMO = new MutationObserver(function (entries) {
  var _iterator4 = _createForOfIteratorHelper(entries),
    _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      var entry = _step4.value;

      var _iterator5 = _createForOfIteratorHelper(entry.removedNodes),
        _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var node = _step5.value;
          if (!(node instanceof HTMLElement)) continue;
          containerRO.unobserve(node);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var _iterator6 = _createForOfIteratorHelper(entry.addedNodes),
        _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
          var _node = _step6.value;
          if (!(_node instanceof HTMLElement)) continue;

          var _iterator7 = _createForOfIteratorHelper(
              watchedContainerSelectors
            ),
            _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
              var watchedContainerSelector = _step7.value;

              if (_node.matches(watchedContainerSelector.selector)) {
                registerContainer(_node, watchedContainerSelector.name);
              }

              var _iterator8 = _createForOfIteratorHelper(
                  _node.querySelectorAll(watchedContainerSelector.selector)
                ),
                _step8;

              try {
                for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
                  var container = _step8.value;
                  registerContainer(container, watchedContainerSelector.name);
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
});
containerMO.observe(document.documentElement, {
  childList: true,
  subtree: true
});

function transpileStyleSheet(sheetSrc, srcUrl) {
  var p = {
    sheetSrc: sheetSrc,
    index: 0,
    name: srcUrl
  };

  while (p.index < p.sheetSrc.length) {
    eatWhitespace(p);
    if (p.index >= p.sheetSrc.length) break;

    if (lookAhead("/*", p)) {
      while (lookAhead("/*", p)) {
        eatComment(p);
        eatWhitespace(p);
      }

      continue;
    }

    if (lookAhead("@container", p)) {
      var _parseContainerQuery = parseContainerQuery(p),
        query = _parseContainerQuery.query,
        startIndex = _parseContainerQuery.startIndex,
        endIndex = _parseContainerQuery.endIndex;

      var replacement = stringifyContainerQuery(query);
      replacePart(startIndex, endIndex, replacement, p);
      registerContainerQuery(query);
    } else {
      var rule = parseQualifiedRule(p);
      if (!rule) continue;
      handleContainerProps(rule, p);
    }
  }

  if (!srcUrl) {
    return p.sheetSrc;
  }

  p.sheetSrc = p.sheetSrc.replace(
    /url\(["']*([^)"']+)["']*\)/g,
    function (match, url) {
      return "url(".concat(new URL(url, srcUrl), ")");
    }
  );
  return p.sheetSrc;
}

function handleContainerProps(rule, p) {
  var hasLongHand = rule.block.contents.includes("container-");
  var hasShortHand = rule.block.contents.includes("container:");
  if (!hasLongHand && !hasShortHand) return;
  var containerName, containerType;

  if (hasLongHand) {
    var _exec;

    containerName =
      (_exec = /container-name\s*:([^;}]+)/.exec(rule.block.contents)) ===
        null || _exec === void 0
        ? void 0
        : _exec[1].trim();
    rule.block.contents = rule.block.contents.replace(
      "container-type",
      "contain"
    );
  }

  if (hasShortHand) {
    var _exec2;

    var containerShorthand =
      (_exec2 = /container\s*:([^;}]+)/.exec(rule.block.contents)) === null ||
      _exec2 === void 0
        ? void 0
        : _exec2[1];

    var _containerShorthand$s = containerShorthand.split("/").map(function (v) {
      return v.trim();
    });

    var _containerShorthand$s2 = _slicedToArray(_containerShorthand$s, 2);

    containerType = _containerShorthand$s2[0];
    containerName = _containerShorthand$s2[1];
    rule.block.contents = rule.block.contents.replace(
      /container: ([^;}]+)/,
      "contain: ".concat(containerType, ";")
    );
  }

  if (!containerName) {
    containerName = uid();
  }

  replacePart(
    rule.block.startIndex,
    rule.block.endIndex,
    rule.block.contents,
    p
  );
  watchedContainerSelectors.push({
    name: containerName,
    selector: rule.selector
  });

  var _iterator9 = _createForOfIteratorHelper(
      document.querySelectorAll(rule.selector)
    ),
    _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
      var el = _step9.value;
      registerContainer(el, containerName);
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
}

function replacePart(start, end, replacement, p) {
  p.sheetSrc = p.sheetSrc.slice(0, start) + replacement + p.sheetSrc.slice(end);

  if (p.index >= end) {
    var delta = p.index - end;
    p.index = start + replacement.length + delta;
  }
}

function eatComment(p) {
  assertString(p, "/*");
  eatUntil("*/", p);
  assertString(p, "*/");
}

function advance(p) {
  p.index++;

  if (p.index > p.sheetSrc.length) {
    throw parseError(p, "Advanced beyond the end");
  }
}

function eatUntil(s, p) {
  var startIndex = p.index;

  while (!lookAhead(s, p)) {
    advance(p);
  }

  return p.sheetSrc.slice(startIndex, p.index);
}

function lookAhead(s, p) {
  return p.sheetSrc.substr(p.index, s.length) == s;
}

function parseSelector(p) {
  var startIndex = p.index;
  eatUntil("{", p);

  if (startIndex === p.index) {
    throw Error("Empty selector");
  }

  return p.sheetSrc.slice(startIndex, p.index);
}

function parseQualifiedRule(p) {
  var startIndex = p.index;
  var selector = parseSelector(p);
  if (!selector) return;
  var block = eatBlock(p);
  var endIndex = p.index;
  return {
    selector: selector,
    block: block,
    startIndex: startIndex,
    endIndex: endIndex
  };
}

function fileName(p) {
  if (p.name) {
    return p.name;
  }

  return "<anonymous file>";
}

function parseError(p, msg) {
  return Error("(".concat(fileName(p), "): ").concat(msg));
}

function assertString(p, s) {
  if (p.sheetSrc.substr(p.index, s.length) != s) {
    throw parseError(p, "Did not find expected sequence ".concat(s));
  }

  p.index += s.length;
}

var whitespaceMatcher = /\s*/g;

function eatWhitespace(p) {
  whitespaceMatcher.lastIndex = p.index;
  var match = whitespaceMatcher.exec(p.sheetSrc);

  if (match) {
    p.index += match[0].length;
  }
}

function peek(p) {
  return p.sheetSrc[p.index];
}

var identMatcher = /[\w\\\@_-]+/g;

function parseIdentifier(p) {
  identMatcher.lastIndex = p.index;
  var match = identMatcher.exec(p.sheetSrc);

  if (!match) {
    throw parseError(p, "Expected an identifier");
  }

  p.index += match[0].length;
  return match[0];
}

function parseMeasurementName(p) {
  return parseIdentifier(p).toLowerCase();
}

var numberMatcher = /[0-9.]*/g;

function parseThreshold(p) {
  numberMatcher.lastIndex = p.index;
  var match = numberMatcher.exec(p.sheetSrc);

  if (!match) {
    throw parseError(p, "Expected a number");
  }

  p.index += match[0].length;
  assertString(p, "px");
  var value = parseFloat(match[0]);

  if (Number.isNaN(value)) {
    throw parseError(p, "".concat(match[0], " is not a valid number"));
  }

  return value;
}

function eatBlock(p) {
  var startIndex = p.index;
  assertString(p, "{");
  var level = 1;

  while (level != 0) {
    if (p.sheetSrc[p.index] === "{") {
      level++;
    } else if (p.sheetSrc[p.index] === "}") {
      level--;
    }

    advance(p);
  }

  var endIndex = p.index;
  var contents = p.sheetSrc.slice(startIndex, endIndex);
  return {
    startIndex: startIndex,
    endIndex: endIndex,
    contents: contents
  };
}

function parseLegacySizeQuery(p) {
  var measurement = parseMeasurementName(p);
  eatWhitespace(p);
  assertString(p, ":");
  eatWhitespace(p);
  var threshold = parseThreshold(p);
  eatWhitespace(p);
  assertString(p, ")");
  eatWhitespace(p);
  var comparator;

  if (measurement.startsWith("min-")) {
    comparator = 3;
  } else if (measurement.startsWith("max-")) {
    comparator = 1;
  } else {
    throw Error("Unknown legacy container query ".concat(measurement));
  }

  return {
    type: 0,
    feature: translateToLogicalProp(measurement.slice(4)),
    comparator: comparator,
    threshold: threshold
  };
}

function parseComparator(p) {
  if (lookAhead(">=", p)) {
    assertString(p, ">=");
    return 3;
  }

  if (lookAhead(">", p)) {
    assertString(p, ">");
    return 2;
  }

  if (lookAhead("<=", p)) {
    assertString(p, "<=");
    return 1;
  }

  if (lookAhead("<", p)) {
    assertString(p, "<");
    return 0;
  }

  throw Error("Unknown comparator");
}

function parseSizeQuery(p) {
  assertString(p, "(");

  if (lookAhead("(", p)) {
    var cond = parseContainerCondition(p);
    assertString(p, ")");
    return cond;
  }

  eatWhitespace(p);

  if (lookAhead("min-", p) || lookAhead("max-", p)) {
    return parseLegacySizeQuery(p);
  }

  var feature = parseIdentifier(p).toLowerCase();
  eatWhitespace(p);
  var comparator = parseComparator(p);
  eatWhitespace(p);
  var threshold = parseThreshold(p);
  eatWhitespace(p);
  assertString(p, ")");
  eatWhitespace(p);
  return {
    type: 0,
    feature: feature,
    comparator: comparator,
    threshold: threshold
  };
}

function parseSizeOrStyleQuery(p) {
  eatWhitespace(p);
  if (lookAhead("(", p)) return parseSizeQuery(p);
  else if (lookAhead("size", p)) {
    assertString(p, "size");
    eatWhitespace(p);
    return parseSizeQuery(p);
  } else if (lookAhead("style", p)) {
    throw Error("Style query not implement yet");
  } else {
    throw Error("Unknown container query type");
  }
}

function parseNegatedContainerCondition(p) {
  if (lookAhead("not", p)) {
    assertString(p, "not");
    eatWhitespace(p);
    return {
      type: 3,
      right: parseSizeOrStyleQuery(p)
    };
  }

  return parseSizeOrStyleQuery(p);
}

function parseContainerCondition(p) {
  var left = parseNegatedContainerCondition(p);

  while (true) {
    if (lookAhead("and", p)) {
      assertString(p, "and");
      eatWhitespace(p);
      var right = parseNegatedContainerCondition(p);
      eatWhitespace(p);
      left = {
        type: 1,
        left: left,
        right: right
      };
    } else if (lookAhead("or", p)) {
      assertString(p, "or");
      eatWhitespace(p);

      var _right = parseNegatedContainerCondition(p);

      eatWhitespace(p);
      left = {
        type: 2,
        left: left,
        right: _right
      };
    } else {
      break;
    }
  }

  return left;
}

function parseContainerQuery(p) {
  var startIndex = p.index;
  assertString(p, "@container");
  eatWhitespace(p);
  var name = "";

  if (peek(p) !== "(" && !lookAhead("size", p) && !lookAhead("style", p)) {
    name = parseIdentifier(p);
    eatWhitespace(p);
  }

  var condition = parseContainerCondition(p);
  eatWhitespace(p);
  assertString(p, "{");
  eatWhitespace(p);
  var rules = [];

  while (peek(p) !== "}") {
    rules.push(parseQualifiedRule(p));
    eatWhitespace(p);
  }

  assertString(p, "}");
  var endIndex = p.index;
  eatWhitespace(p);
  var className = "cq_".concat(uid());
  return {
    query: {
      condition: condition,
      className: className,
      name: name,
      rules: rules
    },
    startIndex: startIndex,
    endIndex: endIndex
  };
}

function stringifyContainerQuery(query) {
  return query.rules
    .map(function (rule) {
      return ":is("
        .concat(rule.selector, ").")
        .concat(query.className, " ")
        .concat(rule.block.contents);
    })
    .join("\n");
} // src/cqfill.ts

function init() {
  var sheetObserver = new MutationObserver(function (entries) {
    var _iterator10 = _createForOfIteratorHelper(entries),
      _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done; ) {
        var entry = _step10.value;

        var _iterator11 = _createForOfIteratorHelper(entry.addedNodes),
          _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done; ) {
            var addedNode = _step11.value;

            if (addedNode instanceof HTMLStyleElement) {
              handleStyleTag(addedNode);
            }

            if (addedNode instanceof HTMLLinkElement) {
              handleLinkedStylesheet(addedNode);
            }
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
  });
  sheetObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  function handleStyleTag(el) {
    if (el.innerHTML.trim().length === 0) return;
    var newSrc = transpileStyleSheet(el.innerHTML);
    el.innerHTML = newSrc;
  }

  function handleLinkedStylesheet(_x) {
    return _handleLinkedStylesheet.apply(this, arguments);
  }

  function _handleLinkedStylesheet() {
    _handleLinkedStylesheet = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(el) {
        var srcUrl, src, newSrc, blob;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                if (!(el.rel !== "stylesheet")) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                srcUrl = new URL(el.href, document.baseURI);

                if (!(srcUrl.origin !== location.origin)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                _context.next = 7;
                return fetch(srcUrl.toString()).then(function (r) {
                  return r.text();
                });

              case 7:
                src = _context.sent;
                newSrc = transpileStyleSheet(src, srcUrl.toString());
                blob = new Blob([newSrc], {
                  type: "text/css"
                });
                el.href = URL.createObjectURL(blob);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })
    );
    return _handleLinkedStylesheet.apply(this, arguments);
  }

  document.querySelectorAll("style").forEach(function (tag) {
    return handleStyleTag(tag);
  });
  document.querySelectorAll("link").forEach(function (tag) {
    return handleLinkedStylesheet(tag);
  });
}

var supportsContainerQueries = "container" in document.documentElement.style;

if (!supportsContainerQueries) {
  init();
}
