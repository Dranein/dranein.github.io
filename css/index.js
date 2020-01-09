/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_index_scss__);



let burgerMenus = document.querySelectorAll(".burger_menu-button");
burgerMenus.forEach(burgerMenu => {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.parentNode.classList.toggle("active");
  });
})


let navtab = document.querySelector("nav.navtab");
let  navtabItems = document.querySelectorAll("li.navtab-item");
navtabItems.forEach((navtabItem, activeIndex) => {
  navtabItem.addEventListener("click", () => {
    navtabItems.forEach(navtabItem => navtabItem.classList.remove("active"));
    navtabItem.classList.add("active");
    navtab.style.setProperty("--active-index",activeIndex);
  })
})


let worldDoms = document.querySelectorAll('.world_item');
worldDoms.forEach(worldDom => {
  let worldNumber = worldDom.textContent.length;
  worldDom.style.setProperty('--world-number', worldNumber);
})


// 文字特效案例三
let worldItem3 = document.querySelector(".world_item3");
let arr = worldItem3.textContent.split('');
worldItem3.textContent = ' ';
let arrIndex = 0;
setInterval(() => {
  arrIndex++;
  worldItem3.textContent = arr.slice(0, arrIndex).join('');
  if (arrIndex > arr.length) arrIndex = 0;
}, 150)




let glowInTexts = document.querySelectorAll(".glowIn");
let setGlowInText = () => {
  glowInTexts.forEach(glowInText => {
    let letters = glowInText.textContent.split("");
    glowInText.textContent = "";
    letters.forEach((letter, i) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${i * 0.03}s`;
      glowInText.append(span);
    });
  });
};
setGlowInText();

setTimeout(() => {
  setGlowInText();
}, 8000)



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(2);
            var content = __webpack_require__(3);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = {};

function modulesToDom(moduleId, list, options) {
  for (var i = 0; i < list.length; i++) {
    var part = {
      css: list[i][1],
      media: list[i][2],
      sourceMap: list[i][3]
    };

    if (stylesInDom[moduleId][i]) {
      stylesInDom[moduleId][i](part);
    } else {
      stylesInDom[moduleId].push(addStyle(part, options));
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : null;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (moduleId, list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  moduleId = options.base ? moduleId + options.base : moduleId;
  list = list || [];

  if (!stylesInDom[moduleId]) {
    stylesInDom[moduleId] = [];
  }

  modulesToDom(moduleId, list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    if (!stylesInDom[moduleId]) {
      stylesInDom[moduleId] = [];
    }

    modulesToDom(moduleId, newList, options);

    for (var j = newList.length; j < stylesInDom[moduleId].length; j++) {
      stylesInDom[moduleId][j]();
    }

    stylesInDom[moduleId].length = newList.length;

    if (stylesInDom[moduleId].length === 0) {
      delete stylesInDom[moduleId];
    }
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato);"]);
// Module
exports.push([module.i, "body,html{padding:0;margin:0;background:#6b9096}*{box-sizing:border-box}#app{padding:20px}#app .item{margin-bottom:20px;background:azure;box-shadow:0 0 8px -2px rgba(0,0,0,0.5)}#app .item_title{height:40px;line-height:40px;background:rosybrown;padding-left:20px;color:#fff}#app .item_content{padding:20px}#app .item_tip{position:relative;background:#c5c5c5;color:#2f2323;font-size:14px;padding:20px;border-radius:5px;margin-bottom:20px}#app .item_tip p{padding:0;margin:0}#app .item_tip::after{content:',tip';font-size:30px;font-weight:bold;position:absolute;right:10px;bottom:10px;color:rgba(0,0,0,0.2)}#app .bing{position:relative;height:200px;width:200px;background:rosybrown;border-radius:50%;box-shadow:-4px 4px 6px -3px #000;background-image:linear-gradient(90deg, rosybrown 50%, #111 0)}#app .bing::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:50%;background:rosybrown;border-radius:0 100% 100% 0 / 50%;transform-origin:left;animation:co1 3s linear infinite,co2 6s steps(1, end) infinite}@keyframes co1{to{transform:rotateZ(0.5turn)}}@keyframes co2{50%{background:#111}}#app .sassfor_case{display:flex;flex-direction:row;align-items:flex-end}#app .sassfor_case .line{position:relative;overflow:hidden;width:50px;margin:10px}#app .sassfor_case .line::after{content:'';position:absolute;bottom:0;left:0;right:0;height:80px;border-radius:8px 8px 0 0;background:#2f2323;transform:translateY(110%);animation:animation_up 3s ease-in-out infinite;animation-fill-mode:forwards;animation-direction:alternate}#app .sassfor_case .line:nth-child(1){height:15px}#app .sassfor_case .line:nth-child(1)::after{height:15px}#app .sassfor_case .line:nth-child(2){height:30px}#app .sassfor_case .line:nth-child(2)::after{height:30px}#app .sassfor_case .line:nth-child(3){height:45px}#app .sassfor_case .line:nth-child(3)::after{height:45px}#app .sassfor_case .line:nth-child(4){height:60px}#app .sassfor_case .line:nth-child(4)::after{height:60px}#app .sassfor_case .line:nth-child(5){height:75px}#app .sassfor_case .line:nth-child(5)::after{height:75px}#app .sassfor_case .line:nth-child(6){height:90px}#app .sassfor_case .line:nth-child(6)::after{height:90px}#app .sassfor_case .line:nth-child(7){height:105px}#app .sassfor_case .line:nth-child(7)::after{height:105px}#app .sassfor_case .line:nth-child(8){height:120px}#app .sassfor_case .line:nth-child(8)::after{height:120px}@keyframes animation_up{to{transform:translateY(0%)}}#app .burger_menu-warpper{width:100%;display:flex;justify-content:space-between}#app .burger_menu{--menu-item-number: 4;--menu-width: 50px;--menu-item-width: 40px;position:relative;z-index:2;width:var(--menu-width);height:var(--menu-width);border:solid 2px #184f54;background:#184f54;border-radius:50%;transition:0.6s ease-in-out}#app .burger_menu-button{position:relative;z-index:2;height:100%;background:#184f54;border-radius:50%;outline:none;cursor:pointer}#app .burger_menu-button .line{position:absolute;left:25%;width:50%;height:3px;background:#ddd;overflow:hidden;transition:all 0.5s ease}#app .burger_menu-button .line:nth-child(1){top:30%}#app .burger_menu-button .line:nth-child(2){top:calc(50% - 1.5px)}#app .burger_menu-button .line:nth-child(3){bottom:30%}#app .burger_menu-button .line::after{position:absolute;content:\"\";top:0;left:0;width:100%;height:100%;background:#c5c5c5;transform:translateX(-110%);transition:all 0.25s ease}#app .burger_menu-button .line:nth-child(2)::after{transition-delay:0.1s}#app .burger_menu-button .line:nth-child(3)::after{transition-delay:0.2s}#app .burger_menu-button:hover .line::after{transform:translateX(0)}#app .burger_menu-content{position:absolute;display:flex;flex-direction:row;align-items:center;justify-content:center;transform:scale(0);transition:transform 0.3s ease-in-out}#app .burger_menu-content>div{width:var(--menu-item-width);height:var(--menu-item-width);border-radius:50%;background:#184f54;color:white;font-size:12px;display:flex;align-items:center;justify-content:center;transition:0.5s ease-in-out;cursor:pointer}#app .burger_menu-left .burger_menu-content,#app .burger_menu-right .burger_menu-content{margin-left:10px;top:0;bottom:0}#app .burger_menu-left .burger_menu-content>div,#app .burger_menu-right .burger_menu-content>div{margin-right:10px}#app .burger_menu-right .burger_menu-content{left:100%}#app .burger_menu-right .burger_menu-content>div:nth-child(1){transform:translate(calc(1 * var(--menu-item-width) * -1 - 1 * 10px))}#app .burger_menu-right .burger_menu-content>div:nth-child(2){transform:translate(calc(2 * var(--menu-item-width) * -1 - 2 * 10px))}#app .burger_menu-right .burger_menu-content>div:nth-child(3){transform:translate(calc(3 * var(--menu-item-width) * -1 - 3 * 10px))}#app .burger_menu-right .burger_menu-content>div:nth-child(4){transform:translate(calc(4 * var(--menu-item-width) * -1 - 4 * 10px))}#app .burger_menu-left .burger_menu-content{right:100%;flex-direction:row-reverse;justify-content:flex-end}#app .burger_menu-left .burger_menu-content>div:nth-child(1){transform:translate(calc(1 * var(--menu-item-width) + 1 * 10px))}#app .burger_menu-left .burger_menu-content>div:nth-child(2){transform:translate(calc(2 * var(--menu-item-width) + 2 * 10px))}#app .burger_menu-left .burger_menu-content>div:nth-child(3){transform:translate(calc(3 * var(--menu-item-width) + 3 * 10px))}#app .burger_menu-left .burger_menu-content>div:nth-child(4){transform:translate(calc(4 * var(--menu-item-width) + 4 * 10px))}#app .burger_menu-top .burger_menu-content,#app .burger_menu-bottom .burger_menu-content{flex-direction:column;margin-bottom:10px;left:0;right:0}#app .burger_menu-top .burger_menu-content>div,#app .burger_menu-bottom .burger_menu-content>div{margin-top:10px}#app .burger_menu-top .burger_menu-content{bottom:100%;flex-direction:column-reverse;justify-content:flex-end}#app .burger_menu-top .burger_menu-content>div:nth-child(1){transform:translateY(calc(1 * var(--menu-item-width) + 1 * 10px))}#app .burger_menu-top .burger_menu-content>div:nth-child(2){transform:translateY(calc(2 * var(--menu-item-width) + 2 * 10px))}#app .burger_menu-top .burger_menu-content>div:nth-child(3){transform:translateY(calc(3 * var(--menu-item-width) + 3 * 10px))}#app .burger_menu-top .burger_menu-content>div:nth-child(4){transform:translateY(calc(4 * var(--menu-item-width) + 4 * 10px))}#app .burger_menu-bottom .burger_menu-content{top:100%;flex-direction:column}#app .burger_menu-bottom .burger_menu-content>div:nth-child(1){transform:translateY(calc(1 * var(--menu-item-width) * -1 - 1 * 10px))}#app .burger_menu-bottom .burger_menu-content>div:nth-child(2){transform:translateY(calc(2 * var(--menu-item-width) * -1 - 2 * 10px))}#app .burger_menu-bottom .burger_menu-content>div:nth-child(3){transform:translateY(calc(3 * var(--menu-item-width) * -1 - 3 * 10px))}#app .burger_menu-bottom .burger_menu-content>div:nth-child(4){transform:translateY(calc(4 * var(--menu-item-width) * -1 - 4 * 10px))}#app .burger_menu.active{overflow:visible;z-index:10;box-shadow:0 0 0 1000px #bc8f8f}#app .burger_menu.active .line:nth-child(1){top:50%;transform:rotate(45deg)}#app .burger_menu.active .line:nth-child(2){transform:scaleX(0)}#app .burger_menu.active .line:nth-child(3){bottom:50%;transform:rotate(-45deg)}#app .burger_menu.active .burger_menu-content{transform:scale(1)}#app .burger_menu.active .burger_menu-content>div{transform:translate(0);background:#146d75}#app .navtab{--navtab-width: 100%;--active-index: 1;--navtab-item-active-width: 30%;--active-number: 4;position:relative;z-index:1;width:var(--navtab-width);height:80px;background:#2f2323;border:1em solid #2f2323;border-radius:8% 8% / 55% 55%;overflow:hidden}#app .navtab ul{display:flex;justify-content:center;align-items:center;width:100%;height:100%;padding:0;margin:0;list-style-type:none}#app .navtab ul li.navtab-item{display:flex;justify-content:center;align-items:center;z-index:2;flex-direction:column;width:calc(var(--navtab-width) / var(--active-number));height:100%;color:#fff;cursor:pointer;transition:0.5s ease,\r color 0.2s ease;font-size:14px;user-select:none;transition:0.5s ease}#app .navtab ul li.navtab-item.active{flex-shrink:0;width:var(--navtab-item-active-width);color:#184f54;font-weight:bold}#app .navtab::after{position:absolute;content:\"\";top:0;height:100%;width:var(--navtab-item-active-width);left:calc((100% - var(--navtab-item-active-width)) / (var(--active-number) - 1) * var(--active-index));background:#b3e5fc;border-radius:5px;transition:0.5s ease}#app .world_item{--world-number: 0;position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;background:#f0ffff;color:#666;font-size:15px;margin-bottom:10px}#app .world_item.world_item1::after{content:'';position:absolute;left:0;width:100%;top:0;bottom:0;background:#f0ffff;animation:calc(var(--world-number) * 0.15s) ease-in-out typing infinite}@keyframes typing{to{transform:translateX(calc(var(--world-number) * 1em))}}#app .world_item.world_item2{text-overflow:inherit;width:0;border-right:1px solid #666;animation:calc(var(--world-number) * 0.2s) steps(calc(var(--world-number) + 1)) typing2 infinite,0.5s borderRight step-end infinite}@keyframes typing2{to{width:calc(var(--world-number) * 1em + 1em)}}@keyframes borderRight{50%{border-right:1px solid transparent}}#app .world_item.world_item3{height:20px;line-height:20px;border-right:1px solid #666;animation:0.5s borderRight step-end infinite;display:inline-block}@keyframes borderRight{50%{border-right:1px solid transparent}}#app .glowIn{background:#111111;text-align:left;line-height:1.8;color:#ab5104}#app .glowIn.glowIn-title{font-size:25px;font-weight:bold;text-align:center}#app .glowIn span{animation:glowIn 0.8s ease both}@keyframes glowIn{from{opacity:0}65%{opacity:1;text-shadow:0 0 10px #ab5104}75%{opacity:1}to{opacity:0.7}}#app .worldNeon{margin-top:20px;padding:10px;background:#111;text-align:center;color:#cce7f8;font-size:2.5rem;animation:shining 0.2s alternate infinite}@keyframes shining{from{text-shadow:0 0 6px rgba(182,211,207,0.9),0 0 30px rgba(182,211,207,0.3),0 0 12px rgba(15,115,223,0.5),0 0 21px rgba(15,115,223,0.9),0 0 34px rgba(15,115,223,0.8),0 0 54px rgba(15,115,223,0.9)}to{text-shadow:0 0 6px #b6d3cf,0 0 30px rgba(182,211,207,0.4),0 0 12px rgba(15,115,223,0.6),0 0 22px rgba(15,115,223,0.8),0 0 38px rgba(15,115,223,0.9),0 0 60px #0f73df}}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    for (var i = 0; i < modules.length; i++) {
      var item = [].concat(modules[i]);

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ })
/******/ ]);