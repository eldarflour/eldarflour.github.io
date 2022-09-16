(() => {
  // src/init/lib/classList.js
  if ("document" in self) {
    if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
      (function(view) {
        "use strict";
        if (!("Element" in view))
          return;
        var classListProp = "classList", protoProp = "prototype", elemCtrProto = view.Element[protoProp], objCtr = Object, strTrim = String[protoProp].trim || function() {
          return this.replace(/^\s+|\s+$/g, "");
        }, arrIndexOf = Array[protoProp].indexOf || function(item) {
          var i = 0, len = this.length;
          for (; i < len; i++) {
            if (i in this && this[i] === item) {
              return i;
            }
          }
          return -1;
        }, DOMEx = function(type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        }, checkTokenAndGetIndex = function(classList, token) {
          if (token === "") {
            throw new DOMEx("SYNTAX_ERR", "The token must not be empty.");
          }
          if (/\s/.test(token)) {
            throw new DOMEx("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
          }
          return arrIndexOf.call(classList, token);
        }, ClassList = function(elem) {
          var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""), classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [], i = 0, len = classes.length;
          for (; i < len; i++) {
            this.push(classes[i]);
          }
          this._updateClassName = function() {
            elem.setAttribute("class", this.toString());
          };
        }, classListProto = ClassList[protoProp] = [], classListGetter = function() {
          return new ClassList(this);
        };
        DOMEx[protoProp] = Error[protoProp];
        classListProto.item = function(i) {
          return this[i] || null;
        };
        classListProto.contains = function(token) {
          return ~checkTokenAndGetIndex(this, token + "");
        };
        classListProto.add = function() {
          var tokens = arguments, i = 0, l = tokens.length, token, updated = false;
          do {
            token = tokens[i] + "";
            if (!~checkTokenAndGetIndex(this, token)) {
              this.push(token);
              updated = true;
            }
          } while (++i < l);
          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.remove = function() {
          var tokens = arguments, i = 0, l = tokens.length, token, updated = false, index;
          do {
            token = tokens[i] + "";
            index = checkTokenAndGetIndex(this, token);
            while (~index) {
              this.splice(index, 1);
              updated = true;
              index = checkTokenAndGetIndex(this, token);
            }
          } while (++i < l);
          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.toggle = function(token, force) {
          var result = this.contains(token), method = result ? force !== true && "remove" : force !== false && "add";
          if (method) {
            this[method](token);
          }
          if (force === true || force === false) {
            return force;
          } else {
            return !result;
          }
        };
        classListProto.replace = function(token, replacement_token) {
          var index = checkTokenAndGetIndex(token + "");
          if (~index) {
            this.splice(index, 1, replacement_token);
            this._updateClassName();
          }
        };
        classListProto.toString = function() {
          return this.join(" ");
        };
        if (objCtr.defineProperty) {
          var classListPropDesc = {
            get: classListGetter,
            enumerable: true,
            configurable: true
          };
          try {
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          } catch (ex) {
            if (ex.number === void 0 || ex.number === -2146823252) {
              classListPropDesc.enumerable = false;
              objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
            }
          }
        } else if (objCtr[protoProp].__defineGetter__) {
          elemCtrProto.__defineGetter__(classListProp, classListGetter);
        }
      })(self);
    }
    (function() {
      "use strict";
      var testElement = document.createElement("_");
      testElement.classList.add("c1", "c2");
      if (!testElement.classList.contains("c2")) {
        var createMethod = function(method) {
          var original = DOMTokenList.prototype[method];
          DOMTokenList.prototype[method] = function(token) {
            var i, len = arguments.length;
            for (i = 0; i < len; i++) {
              token = arguments[i];
              original.call(this, token);
            }
          };
        };
        createMethod("add");
        createMethod("remove");
      }
      testElement.classList.toggle("c3", false);
      if (testElement.classList.contains("c3")) {
        var _toggle = DOMTokenList.prototype.toggle;
        DOMTokenList.prototype.toggle = function(token, force) {
          if (1 in arguments && !this.contains(token) === !force) {
            return force;
          } else {
            return _toggle.call(this, token);
          }
        };
      }
      if (!("replace" in document.createElement("_").classList)) {
        DOMTokenList.prototype.replace = function(token, replacement_token) {
          var tokens = this.toString().split(" "), index = tokens.indexOf(token + "");
          if (~index) {
            tokens = tokens.slice(index);
            this.remove.apply(this, tokens);
            this.add(replacement_token);
            this.add.apply(this, tokens.slice(1));
          }
        };
      }
      testElement = null;
    })();
  }

  // src/init/lib/closest.js
  function polyfill(window2) {
    const ElementPrototype = window2.Element.prototype;
    if (typeof ElementPrototype.matches !== "function") {
      ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.webkitMatchesSelector || function matches(selector) {
        let element = this;
        const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
        let index = 0;
        while (elements[index] && elements[index] !== element) {
          ++index;
        }
        return Boolean(elements[index]);
      };
    }
    if (typeof ElementPrototype.closest !== "function") {
      ElementPrototype.closest = function closest(selector) {
        let element = this;
        while (element && element.nodeType === 1) {
          if (element.matches(selector)) {
            return element;
          }
          element = element.parentNode;
        }
        return null;
      };
    }
  }

  // src/init/init.js
  polyfill(window);

  // src/main/main.js
  function start_highlighter() {
    let body_classes = document.body.classList;
    window.addEventListener("click", function(event) {
      let parent_link = event.target.closest("a");
      let inside_link = parent_link !== null;
      let link_is_local = inside_link ? parent_link.href.includes("#") : false;
      if (!inside_link || link_is_local) {
        body_classes.toggle("highlighting-active");
      }
    });
    body_classes.add("highlighting");
  }
  function fix_external_links() {
    let external_links = document.querySelectorAll("a[href*=':']");
    for (let i = 0; i < external_links.length; i++) {
      let external_link = external_links[i];
      external_link.setAttribute("target", "_blank");
    }
  }
  function show_body() {
    let styleNode = document.createElement("style");
    let style = `
		body,
		body::before,
		body::after {
			user-select: auto;
			pointer-events: auto;
		}

		body::before,
		body::after {
			opacity: 0;
		}

		body {
			opacity: 1;
		}
	`;
    styleNode.innerText = style;
    document.head.appendChild(styleNode);
  }
  function main() {
    start_highlighter();
    fix_external_links();
    show_body();
  }
  function when_ready(f) {
    if (document.readyState != "loading") {
      f();
    } else {
      document.addEventListener("DOMContentLoaded", f);
    }
  }
  when_ready(main);

  // usr/script.js
  function highlight() {
    if (!window.location.hash && document.querySelector(".page a")) {
      document.body.classList.add("highlighting-active");
    }
  }
  function main2() {
    highlight();
  }
  function when_ready2(f) {
    if (document.readyState != "loading") {
      f();
    } else {
      document.addEventListener("DOMContentLoaded", f);
    }
  }
  when_ready2(main2);
})();
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
