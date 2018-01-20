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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 478);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(26)
  , hide      = __webpack_require__(12)
  , redefine  = __webpack_require__(13)
  , ctx       = __webpack_require__(27)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(73)('wks')
  , uid        = __webpack_require__(44)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1)
  , IE8_DOM_DEFINE = __webpack_require__(133)
  , toPrimitive    = __webpack_require__(24)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(19);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(32);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , hide      = __webpack_require__(12)
  , has       = __webpack_require__(10)
  , SRC       = __webpack_require__(44)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(26).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , defined = __webpack_require__(19)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(54)
  , defined = __webpack_require__(19);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(55)
  , createDesc     = __webpack_require__(32)
  , toIObject      = __webpack_require__(15)
  , toPrimitive    = __webpack_require__(24)
  , has            = __webpack_require__(10)
  , IE8_DOM_DEFINE = __webpack_require__(133)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(10)
  , toObject    = __webpack_require__(9)
  , IE_PROTO    = __webpack_require__(96)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return root; });
/* harmony export (immutable) */ __webpack_exports__["b"] = Selection;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectAll__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enter__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exit__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__merge__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__order__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sort__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__call__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nodes__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__size__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__empty__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__each__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__attr__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__style__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__property__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__classed__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__text__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__html__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__raise__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__lower__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__append__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__insert__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__remove__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__datum__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__on__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__dispatch__ = __webpack_require__(382);






























var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: __WEBPACK_IMPORTED_MODULE_0__select__["a" /* default */],
  selectAll: __WEBPACK_IMPORTED_MODULE_1__selectAll__["a" /* default */],
  filter: __WEBPACK_IMPORTED_MODULE_2__filter__["a" /* default */],
  data: __WEBPACK_IMPORTED_MODULE_3__data__["a" /* default */],
  enter: __WEBPACK_IMPORTED_MODULE_4__enter__["a" /* default */],
  exit: __WEBPACK_IMPORTED_MODULE_5__exit__["a" /* default */],
  merge: __WEBPACK_IMPORTED_MODULE_6__merge__["a" /* default */],
  order: __WEBPACK_IMPORTED_MODULE_7__order__["a" /* default */],
  sort: __WEBPACK_IMPORTED_MODULE_8__sort__["a" /* default */],
  call: __WEBPACK_IMPORTED_MODULE_9__call__["a" /* default */],
  nodes: __WEBPACK_IMPORTED_MODULE_10__nodes__["a" /* default */],
  node: __WEBPACK_IMPORTED_MODULE_11__node__["a" /* default */],
  size: __WEBPACK_IMPORTED_MODULE_12__size__["a" /* default */],
  empty: __WEBPACK_IMPORTED_MODULE_13__empty__["a" /* default */],
  each: __WEBPACK_IMPORTED_MODULE_14__each__["a" /* default */],
  attr: __WEBPACK_IMPORTED_MODULE_15__attr__["a" /* default */],
  style: __WEBPACK_IMPORTED_MODULE_16__style__["b" /* default */],
  property: __WEBPACK_IMPORTED_MODULE_17__property__["a" /* default */],
  classed: __WEBPACK_IMPORTED_MODULE_18__classed__["a" /* default */],
  text: __WEBPACK_IMPORTED_MODULE_19__text__["a" /* default */],
  html: __WEBPACK_IMPORTED_MODULE_20__html__["a" /* default */],
  raise: __WEBPACK_IMPORTED_MODULE_21__raise__["a" /* default */],
  lower: __WEBPACK_IMPORTED_MODULE_22__lower__["a" /* default */],
  append: __WEBPACK_IMPORTED_MODULE_23__append__["a" /* default */],
  insert: __WEBPACK_IMPORTED_MODULE_24__insert__["a" /* default */],
  remove: __WEBPACK_IMPORTED_MODULE_25__remove__["a" /* default */],
  datum: __WEBPACK_IMPORTED_MODULE_26__datum__["a" /* default */],
  on: __WEBPACK_IMPORTED_MODULE_27__on__["c" /* default */],
  dispatch: __WEBPACK_IMPORTED_MODULE_28__dispatch__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["a"] = (selection);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(27)
  , IObject  = __webpack_require__(54)
  , toObject = __webpack_require__(9)
  , toLength = __webpack_require__(8)
  , asc      = __webpack_require__(189);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(26)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(11);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(149)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(73)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(152)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(6)){
  var LIBRARY             = __webpack_require__(37)
    , global              = __webpack_require__(2)
    , fails               = __webpack_require__(3)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(74)
    , $buffer             = __webpack_require__(103)
    , ctx                 = __webpack_require__(27)
    , anInstance          = __webpack_require__(36)
    , propertyDesc        = __webpack_require__(32)
    , hide                = __webpack_require__(12)
    , redefineAll         = __webpack_require__(41)
    , toInteger           = __webpack_require__(33)
    , toLength            = __webpack_require__(8)
    , toIndex             = __webpack_require__(43)
    , toPrimitive         = __webpack_require__(24)
    , has                 = __webpack_require__(10)
    , same                = __webpack_require__(146)
    , classof             = __webpack_require__(53)
    , isObject            = __webpack_require__(4)
    , toObject            = __webpack_require__(9)
    , isArrayIter         = __webpack_require__(88)
    , create              = __webpack_require__(38)
    , getPrototypeOf      = __webpack_require__(17)
    , gOPN                = __webpack_require__(39).f
    , getIterFn           = __webpack_require__(105)
    , uid                 = __webpack_require__(44)
    , wks                 = __webpack_require__(5)
    , createArrayMethod   = __webpack_require__(22)
    , createArrayIncludes = __webpack_require__(64)
    , speciesConstructor  = __webpack_require__(97)
    , ArrayIterators      = __webpack_require__(106)
    , Iterators           = __webpack_require__(49)
    , $iterDetect         = __webpack_require__(70)
    , setSpecies          = __webpack_require__(42)
    , arrayFill           = __webpack_require__(81)
    , arrayCopyWithin     = __webpack_require__(126)
    , $DP                 = __webpack_require__(7)
    , $GOPD               = __webpack_require__(16)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(44)('meta')
  , isObject = __webpack_require__(4)
  , has      = __webpack_require__(10)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(119)
  , normalizeOpts = __webpack_require__(175)
  , isCallable    = __webpack_require__(445)
  , contains      = __webpack_require__(120)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(462)() ? Symbol : __webpack_require__(464);


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1)
  , dPs         = __webpack_require__(139)
  , enumBugKeys = __webpack_require__(84)
  , IE_PROTO    = __webpack_require__(96)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(83)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(86).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(141)
  , hiddenKeys = __webpack_require__(84).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(141)
  , enumBugKeys = __webpack_require__(84);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , dP          = __webpack_require__(7)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function constant() {
    return x;
  };
});


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = L;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(27)
  , call        = __webpack_require__(135)
  , isArrayIter = __webpack_require__(88)
  , anObject    = __webpack_require__(1)
  , toLength    = __webpack_require__(8)
  , getIterFn   = __webpack_require__(105)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(10)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(19)
  , fails   = __webpack_require__(3)
  , spaces  = __webpack_require__(101)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALL = exports.NONE = exports.EDIT_APPEND = exports.APPEND = exports.DELETE = exports.EDIT = exports.CREATE = exports.freeDraw = exports.edgesKey = exports.notifyDeferredKey = exports.modesKey = exports.instanceKey = exports.defaultOptions = exports.polygons = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Flags = __webpack_require__(61);

Object.defineProperty(exports, 'CREATE', {
  enumerable: true,
  get: function get() {
    return _Flags.CREATE;
  }
});
Object.defineProperty(exports, 'EDIT', {
  enumerable: true,
  get: function get() {
    return _Flags.EDIT;
  }
});
Object.defineProperty(exports, 'DELETE', {
  enumerable: true,
  get: function get() {
    return _Flags.DELETE;
  }
});
Object.defineProperty(exports, 'APPEND', {
  enumerable: true,
  get: function get() {
    return _Flags.APPEND;
  }
});
Object.defineProperty(exports, 'EDIT_APPEND', {
  enumerable: true,
  get: function get() {
    return _Flags.EDIT_APPEND;
  }
});
Object.defineProperty(exports, 'NONE', {
  enumerable: true,
  get: function get() {
    return _Flags.NONE;
  }
});
Object.defineProperty(exports, 'ALL', {
  enumerable: true,
  get: function get() {
    return _Flags.ALL;
  }
});

var _leaflet = __webpack_require__(46);

var _d3Selection = __webpack_require__(370);

var _d3Shape = __webpack_require__(404);

var _es6Set = __webpack_require__(457);

var _es6Set2 = _interopRequireDefault(_es6Set);

var _es6WeakMap = __webpack_require__(466);

var _es6WeakMap2 = _interopRequireDefault(_es6WeakMap);

var _es6Symbol = __webpack_require__(35);

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _Layer = __webpack_require__(62);

var _Polygon = __webpack_require__(63);

var _Simplify = __webpack_require__(123);

var _Simplify2 = _interopRequireDefault(_Simplify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constant polygons
 * @type {WeakMap}
 */
var polygons = exports.polygons = new _es6WeakMap2.default();

/**
 * @constant defaultOptions
 * @type {Object}
 */
var defaultOptions = exports.defaultOptions = {
  mode: _Flags.ALL,
  smoothFactor: 0.3,
  elbowDistance: 10,
  simplifyFactor: 1.1,
  mergePolygons: true,
  concavePolygon: true,
  maximumPolygons: Infinity,
  recreateAfterEdit: false,
  notifyAfterEditExit: false,
  leaveModeAfterCreate: false,
  strokeWidth: 2
};

/**
 * @constant instanceKey
 * @type {Symbol}
 */
var instanceKey = exports.instanceKey = (0, _es6Symbol2.default)('freedraw/instance');

/**
 * @constant modesKey
 * @type {Symbol}
 */
var modesKey = exports.modesKey = (0, _es6Symbol2.default)('freedraw/modes');

/**
 * @constant notifyDeferredKey
 * @type {Symbol}
 */
var notifyDeferredKey = exports.notifyDeferredKey = (0, _es6Symbol2.default)('freedraw/notify-deferred');

/**
 * @constant edgesKey
 * @type {Symbol}
 */
var edgesKey = exports.edgesKey = (0, _es6Symbol2.default)('freedraw/edges');

/**
 * @constant cancelKey
 * @type {Symbol}
 */
var cancelKey = (0, _es6Symbol2.default)('freedraw/cancel');

var FreeDraw = function (_FeatureGroup) {
  _inherits(FreeDraw, _FeatureGroup);

  /**
   * @constructor
   * @param {Object} [options = {}]
   * @return {void}
   */
  function FreeDraw() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

    _classCallCheck(this, FreeDraw);

    var _this = _possibleConstructorReturn(this, (FreeDraw.__proto__ || Object.getPrototypeOf(FreeDraw)).call(this));

    _this.options = _extends({}, defaultOptions, options);
    return _this;
  }

  /**
   * @method onAdd
   * @param {Object} map
   * @return {void}
   */


  _createClass(FreeDraw, [{
    key: 'onAdd',
    value: function onAdd(map) {

      // Memorise the map instance.
      this.map = map;

      // Attach the cancel function and the instance to the map.
      map[cancelKey] = function () {};
      map[instanceKey] = this;
      map[notifyDeferredKey] = function () {};

      // Setup the dependency injection for simplifying the polygon.
      map.simplifyPolygon = _Simplify2.default;

      // Add the item to the map.
      polygons.set(map, new _es6Set2.default());

      // Set the initial mode.
      (0, _Flags.modeFor)(map, this.options.mode, this.options);

      // Instantiate the SVG layer that sits on top of the map.
      var svg = this.svg = (0, _d3Selection.select)(map._container).append('svg').classed('free-draw', true).attr('width', '100%').attr('height', '100%').style('pointer-events', 'none').style('z-index', '1001').style('position', 'relative');

      // Set the mouse events.
      this.listenForEvents(map, svg, this.options);
    }

    /**
     * @method onRemove
     * @param {Object} map
     * @return {void}
     */

  }, {
    key: 'onRemove',
    value: function onRemove(map) {

      // Remove the item from the map.
      polygons.delete(map);

      // Remove the SVG layer.
      this.svg.remove();

      // Remove the appendages from the map container.
      delete map[cancelKey];
      delete map[instanceKey];
      delete map.simplifyPolygon;
    }

    /**
     * @method create
     * @param {LatLng[]} latLngs
     * @return {Object}
     */

  }, {
    key: 'create',
    value: function create(latLngs) {
      return (0, _Polygon.createFor)(this.map, latLngs, this.options);
    }

    /**
     * @method remove
     * @param {Object} polygon
     * @return {void}
     */

  }, {
    key: 'remove',
    value: function remove(polygon) {
      polygon ? (0, _Polygon.removeFor)(this.map, polygon) : _get(FreeDraw.prototype.__proto__ || Object.getPrototypeOf(FreeDraw.prototype), 'remove', this).call(this);
    }

    /**
     * @method clear
     * @return {void}
     */

  }, {
    key: 'clear',
    value: function clear() {
      (0, _Polygon.clearFor)(this.map);
      (0, _Layer.updateFor)(this.map, 'clear');
    }

    /**
     * @method setMode
     * @param {Number} [mode = null]
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      var _mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      // Set mode when passed `mode` is numeric, and then yield the current mode.
      typeof _mode === 'number' && (0, _Flags.modeFor)(this.map, _mode, this.options);
      return this.map[modesKey];
    }

    /**
     * @method size
     * @return {Number}
     */

  }, {
    key: 'size',
    value: function size() {
      return polygons.get(this.map).size;
    }

    /**
     * @method all
     * @return {Array}
     */

  }, {
    key: 'all',
    value: function all() {
      return Array.from(polygons.get(this.map));
    }

    /**
     * @method cancel
     * @return {void}
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      this.map[cancelKey]();
    }

    /**
     * @method listenForEvents
     * @param {Object} map
     * @param {Object} svg
     * @param {Object} options
     * @return {void}
     */

  }, {
    key: 'listenForEvents',
    value: function listenForEvents(map, svg, options) {
      var _this2 = this;

      /**
       * @method mouseDown
       * @param {Object} event
       * @return {void}
       */
      var mouseDown = function mouseDown(event) {

        if (!(map[modesKey] & _Flags.CREATE)) {

          // Polygons can only be created when the mode includes create.
          return;
        }

        /**
         * @constant latLngs
         * @type {Set}
         */
        var latLngs = new _es6Set2.default();

        // Create the line iterator and move it to its first `yield` point, passing in the start point
        // from the mouse down event.
        var lineIterator = _this2.createPath(map, svg, map.latLngToContainerPoint(event.latlng), options.strokeWidth);

        /**
         * @method mouseMove
         * @param {Object} event
         * @return {void}
         */
        var mouseMove = function mouseMove(event) {

          // Resolve the pixel point to the latitudinal and longitudinal equivalent.
          var point = map.mouseEventToContainerPoint(event.originalEvent);

          // Push each lat long value into the points set.
          latLngs.add(map.containerPointToLatLng(point));

          // Invoke the generator by passing in the starting point for the path.
          lineIterator(new _leaflet.Point(point.x, point.y));
        };

        // Create the path when the user moves their cursor.
        map.on('mousemove touchmove', mouseMove);

        /**
         * @method mouseUp
         * @param {Object} event
         * @param {Boolean} [create = true]
         * @return {Function}
         */
        var mouseUp = function mouseUp(event) {
          var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


          // Remove the ability to invoke `cancel`.
          map[cancelKey] = function () {};

          // Stop listening to the events.
          map.off('mouseup', mouseUp);
          map.off('mousemove', mouseMove);
          'body' in document && document.body.removeEventListener('mouseleave', mouseUp);

          // Clear the SVG canvas.
          svg.selectAll('*').remove();

          if (create) {

            // ...And finally if we have any lat longs in our set then we can attempt to
            // create the polygon.
            latLngs.size && (0, _Polygon.createFor)(map, Array.from(latLngs), options);

            // Finally invoke the callback for the polygon regions.
            (0, _Layer.updateFor)(map, 'create');

            // Exit the `CREATE` mode if the options permit it.
            options.leaveModeAfterCreate && _this2.mode(_this2.mode() ^ _Flags.CREATE);
          }
        };

        // Clear up the events when the user releases the mouse.
        map.on('mouseup touchend', mouseUp);
        'body' in document && document.body.addEventListener('mouseleave', mouseUp);

        // Setup the function to invoke when `cancel` has been invoked.
        map[cancelKey] = function () {
          return mouseUp({}, false);
        };
      };

      map.on('mousedown touchstart', mouseDown);
    }

    /**
     * @method createPath
     * @param {Object} map
     * @param {Object} svg
     * @param {Point} fromPoint
     * @param {Number} strokeWidth
     * @return {void}
     */

  }, {
    key: 'createPath',
    value: function createPath(map, svg, fromPoint, strokeWidth) {
      var lineFunction = (0, _d3Shape.line)().curve(_d3Shape.curveMonotoneX).x(function (d) {
        return d.x;
      }).y(function (d) {
        return d.y;
      });
      var lastPoint = fromPoint;
      return function (toPoint) {
        var lineData = [lastPoint, toPoint];
        lastPoint = toPoint;
        // Draw SVG line based on the last movement of the mouse's position.
        svg.append('path').classed('leaflet-line', true).attr('d', lineFunction(lineData)).attr('fill', 'none').attr('stroke', 'black').attr('stroke-width', strokeWidth);
      };
    }
  }]);

  return FreeDraw;
}(_leaflet.FeatureGroup);

/**
 * @method freeDraw
 * @return {Object}
 */


exports.default = FreeDraw;
var freeDraw = exports.freeDraw = function freeDraw(options) {
  return new FreeDraw(options);
};

if (typeof window !== 'undefined') {

  // Attach to the `window` as `FreeDraw` if it exists, as this would prevent `new FreeDraw.default` when
  // using the web version.
  window.FreeDraw = FreeDraw;
  FreeDraw.CREATE = _Flags.CREATE;
  FreeDraw.EDIT = _Flags.EDIT;
  FreeDraw.DELETE = _Flags.DELETE;
  FreeDraw.APPEND = _Flags.APPEND;
  FreeDraw.EDIT_APPEND = _Flags.EDIT_APPEND;
  FreeDraw.NONE = _Flags.NONE;
  FreeDraw.ALL = _Flags.ALL;
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18)
  , TAG = __webpack_require__(5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_path__ = __webpack_require__(369);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_path__["a"]; });



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return atan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return epsilon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return halfPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return tau; });
/* harmony export (immutable) */ __webpack_exports__["l"] = acos;
/* harmony export (immutable) */ __webpack_exports__["k"] = asin;
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
});


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
});


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(176)()
	? Object.setPrototypeOf
	: __webpack_require__(177);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modeFor = exports.ALL = exports.EDIT_APPEND = exports.APPEND = exports.DELETE = exports.EDIT = exports.CREATE = exports.NONE = undefined;

var _leaflet = __webpack_require__(46);

var _FreeDraw = __webpack_require__(52);

var _Layer = __webpack_require__(62);

/**
 * @constant NONE
 * @type {Number}
 */
var NONE = exports.NONE = 0;

/**
 * @constant CREATE
 * @type {Number}
 */
var CREATE = exports.CREATE = 1;

/**
 * @constant EDIT
 * @type {Number}
 */
var EDIT = exports.EDIT = 2;

/**
 * @constant DELETE
 * @type {Number}
 */
var DELETE = exports.DELETE = 4;

/**
 * @constant APPEND
 * @type {Number}
 */
var APPEND = exports.APPEND = 8;

/**
 * @constant EDIT_APPEND
 * @type {Number}
 */
var EDIT_APPEND = exports.EDIT_APPEND = EDIT | APPEND;

/**
 * @constant ALL
 * @type {number}
 */
var ALL = exports.ALL = CREATE | EDIT | DELETE | APPEND;

/**
 * @method modeFor
 * @param {Object} map
 * @param {Number} mode
 * @param {Object} options
 * @return {Number}
 */
var modeFor = exports.modeFor = function modeFor(map, mode, options) {

  // Update the mode.
  map[_FreeDraw.modesKey] = mode;

  // Fire the updated mode.
  map[_FreeDraw.instanceKey].fire('mode', { mode: mode });

  // Disable the map if the `CREATE` mode is a default flag.
  mode & CREATE ? map.dragging.disable() : map.dragging.enable();

  Array.from(_FreeDraw.polygons.get(map)).forEach(function (polygon) {

    polygon[_FreeDraw.edgesKey].forEach(function (edge) {

      // Modify the edge class names based on whether edit mode is enabled.
      mode & EDIT ? _leaflet.DomUtil.removeClass(edge._icon, 'disabled') : _leaflet.DomUtil.addClass(edge._icon, 'disabled');
    });
  });

  // Apply the conditional class names to the map container.
  (0, _Layer.classesFor)(map, mode);

  // Fire the event for having manipulated the polygons if the `hasManipulated` is `true` and the
  // `notifyAfterEditExit` option is equal to `true`, and then reset the `notifyDeferredKey`.
  options.notifyAfterEditExit && map[_FreeDraw.notifyDeferredKey]();
  map[_FreeDraw.notifyDeferredKey] = function () {};

  return mode;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.classesFor = exports.updateFor = undefined;

var _leaflet = __webpack_require__(46);

var _FreeDraw = __webpack_require__(52);

var _Flags = __webpack_require__(61);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @method updateFor
 * @param {Object} map
 * @param {String} eventType
 * @return {void}
 */
var updateFor = exports.updateFor = function updateFor(map, eventType) {

    var latLngs = Array.from(_FreeDraw.polygons.get(map)).map(function (polygon) {

        // Ensure the polygon has been closed.
        var latLngs = polygon.getLatLngs();
        return [].concat(_toConsumableArray(latLngs[0]), [latLngs[0][0]]);
    });

    // Fire the current set of lat lngs.
    map[_FreeDraw.instanceKey].fire('markers', { latLngs: latLngs, eventType: eventType });
};

/**
 * @method classesFor
 * @param {Object} map
 * @param {Number} mode
 * @return {void}
 */
var classesFor = exports.classesFor = function classesFor(map, mode) {
    var _modeMap;

    /**
     * @constant modeMap
     * @type {Object}
     */
    var modeMap = (_modeMap = {}, _defineProperty(_modeMap, _Flags.NONE, 'mode-none'), _defineProperty(_modeMap, _Flags.CREATE, 'mode-create'), _defineProperty(_modeMap, _Flags.EDIT, 'mode-edit'), _defineProperty(_modeMap, _Flags.DELETE, 'mode-delete'), _defineProperty(_modeMap, _Flags.APPEND, 'mode-append'), _modeMap);

    Object.keys(modeMap).forEach(function (key) {

        var className = modeMap[key];
        var isModeActive = mode & key;

        // Remove the class name if it's set already on the map container.
        _leaflet.DomUtil.removeClass(map._container, className);

        // Apply the class names to the node container depending on whether the mode is active.
        isModeActive && _leaflet.DomUtil.addClass(map._container, className);
    });
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearFor = exports.removeFor = exports.createFor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _leaflet = __webpack_require__(46);

var _FreeDraw = __webpack_require__(52);

var _Layer = __webpack_require__(62);

var _Edges = __webpack_require__(185);

var _Edges2 = _interopRequireDefault(_Edges);

var _Flags = __webpack_require__(61);

var _Polygon = __webpack_require__(63);

var _Polygon2 = _interopRequireDefault(_Polygon);

var _Concave = __webpack_require__(184);

var _Concave2 = _interopRequireDefault(_Concave);

var _Merge = __webpack_require__(122);

var _Merge2 = _interopRequireDefault(_Merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @method appendEdgeFor
 * @param {Object} map
 * @param {Object} polygon
 * @param {Object} options
 * @param {Array} parts
 * @param {Object} newPoint
 * @param {Object} startPoint
 * @param {Object} endPoint
 * @return {void}
 */
var appendEdgeFor = function appendEdgeFor(map, polygon, options, _ref) {
    var parts = _ref.parts,
        newPoint = _ref.newPoint,
        startPoint = _ref.startPoint,
        endPoint = _ref.endPoint;


    var latLngs = parts.reduce(function (accumulator, point, index) {

        var nextPoint = parts[index + 1] || parts[0];

        if (point === startPoint && nextPoint === endPoint) {

            return [].concat(_toConsumableArray(accumulator), [map.containerPointToLatLng(point), map.containerPointToLatLng(newPoint)]);
        }

        return [].concat(_toConsumableArray(accumulator), [map.containerPointToLatLng(point)]);
    }, []);

    // Update the lat longs with the newly inserted edge.
    polygon.setLatLngs(latLngs);

    // Remove the current set of edges for the polygon, and then recreate them, assigning the
    // new set of edges back into the polygon.
    polygon[_FreeDraw.edgesKey].map(function (edge) {
        return map.removeLayer(edge);
    });
    polygon[_FreeDraw.edgesKey] = (0, _Edges2.default)(map, polygon, options);
};

/**
 * @method createFor
 * @param {Object} map
 * @param {Array} latLngs
 * @param {Object} [options = defaultOptions]
 * @param {Boolean} [preventMutations = false]
 * @return {Array|Boolean}
 */
var createFor = exports.createFor = function createFor(map, latLngs) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _FreeDraw.defaultOptions;
    var preventMutations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


    // Determine whether we've reached the maximum polygons.
    var limitReached = _FreeDraw.polygons.get(map).size === options.maximumPolygons;

    // Apply the concave hull algorithm to the created polygon if the options allow.
    var concavedLatLngs = !preventMutations && options.concavePolygon ? (0, _Concave2.default)(map, latLngs) : latLngs;

    // Simplify the polygon before adding it to the map.
    var addedPolygons = limitReached ? [] : map.simplifyPolygon(map, concavedLatLngs, options).map(function (latLngs) {

        var polygon = new _leaflet.Polygon(latLngs, _extends({}, _FreeDraw.defaultOptions, options, { className: 'leaflet-polygon'
        })).addTo(map);

        // Attach the edges to the polygon.
        polygon[_FreeDraw.edgesKey] = (0, _Edges2.default)(map, polygon, options);

        // Disable the propagation when you click on the marker.
        _leaflet.DomEvent.disableClickPropagation(polygon);

        // Yield the click handler to the `handlePolygonClick` function.
        polygon.off('click');
        polygon.on('click', (0, _Polygon2.default)(map, polygon, options));

        return polygon;
    });

    // Append the current polygon to the master set.
    addedPolygons.forEach(function (polygon) {
        return _FreeDraw.polygons.get(map).add(polygon);
    });

    if (!limitReached && !preventMutations && _FreeDraw.polygons.get(map).size > 1 && options.mergePolygons) {

        // Attempt a merge of all the polygons if the options allow, and the polygon count is above one.
        var addedMergedPolygons = (0, _Merge2.default)(map, Array.from(_FreeDraw.polygons.get(map)), options);

        // Clear the set, and added all of the merged polygons into the master set.
        _FreeDraw.polygons.get(map).clear();
        addedMergedPolygons.forEach(function (polygon) {
            return _FreeDraw.polygons.get(map).add(polygon);
        });

        return addedMergedPolygons;
    }

    return addedPolygons;
};

/**
 * @method removeFor
 * @param {Object} map
 * @param {Object} polygon
 * @return {void}
 */
var removeFor = exports.removeFor = function removeFor(map, polygon) {

    // Remove polygon and all of its associated edges.
    map.removeLayer(polygon);
    _FreeDraw.edgesKey in polygon && polygon[_FreeDraw.edgesKey].map(function (edge) {
        return map.removeLayer(edge);
    });

    // Remove polygon from the master set.
    _FreeDraw.polygons.get(map).delete(polygon);
};

/**
 * @method clearFor
 * @param {Object} map
 * @return {void}
 */
var clearFor = exports.clearFor = function clearFor(map) {
    Array.from(_FreeDraw.polygons.get(map).values()).forEach(function (polygon) {
        return removeFor(map, polygon);
    });
};

/**
 * @param {Object} map
 * @param {Object} polygon
 * @param {Object} options
 * @return {Function}
 */

exports.default = function (map, polygon, options) {

    return function (event) {

        // Gather all of the points from the lat longs of the current polygon.
        var newPoint = map.mouseEventToContainerPoint('originalEvent' in event ? event.originalEvent : event);
        var parts = polygon.getLatLngs()[0].map(function (latLng) {
            return map.latLngToContainerPoint(latLng);
        });

        var _parts$reduce = parts.reduce(function (accumulator, point, index) {

            var startPoint = point;
            var endPoint = parts[index + 1] || parts[0];
            var distance = _leaflet.LineUtil.pointToSegmentDistance(newPoint, startPoint, endPoint);

            if (distance < accumulator.lowestDistance) {

                // If the distance is less than the previous then we'll update the accumulator.
                return { lowestDistance: distance, startPoint: startPoint, endPoint: endPoint };
            }

            // Otherwise we'll simply yield the previous accumulator.
            return accumulator;
        }, { lowestDistance: Infinity, startPoint: new _leaflet.Point(), endPoint: new _leaflet.Point() }),
            startPoint = _parts$reduce.startPoint,
            endPoint = _parts$reduce.endPoint,
            lowestDistance = _parts$reduce.lowestDistance;

        // Setup the conditions for the switch statement to make the cases clearer.


        var mode = map[_FreeDraw.modesKey];
        var isDelete = Boolean(mode & _Flags.DELETE);
        var isAppend = Boolean(mode & _Flags.APPEND);
        var isDeleteAndAppend = Boolean(mode & _Flags.DELETE && mode & _Flags.APPEND);

        // Partially apply the remove and append functions.
        var removePolygon = function removePolygon() {
            return removeFor(map, polygon);
        };
        var appendEdge = function appendEdge() {
            return appendEdgeFor(map, polygon, options, { parts: parts, newPoint: newPoint, startPoint: startPoint, endPoint: endPoint });
        };

        switch (true) {

            // If both modes DELETE and APPEND are active then we need to do a little work to determine
            // which action to take based on where the user clicked on the polygon.
            case isDeleteAndAppend:
                lowestDistance > options.elbowDistance ? removePolygon() : appendEdge();
                break;

            case isDelete:
                removePolygon();
                break;

            case isAppend:
                appendEdge();
                break;

        }

        // Trigger the event for having deleted a polygon or appended an edge.
        (isDelete || isAppend) && (0, _Layer.updateFor)(map, isDelete ? 'remove' : 'append');
    };
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15)
  , toLength  = __webpack_require__(8)
  , toIndex   = __webpack_require__(43);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(13)
  , redefineAll       = __webpack_require__(41)
  , meta              = __webpack_require__(31)
  , forOf             = __webpack_require__(48)
  , anInstance        = __webpack_require__(36)
  , isObject          = __webpack_require__(4)
  , fails             = __webpack_require__(3)
  , $iterDetect       = __webpack_require__(70)
  , setToStringTag    = __webpack_require__(50)
  , inheritIfRequired = __webpack_require__(87);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(12)
  , redefine = __webpack_require__(13)
  , fails    = __webpack_require__(3)
  , defined  = __webpack_require__(19)
  , wks      = __webpack_require__(5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 68 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4)
  , cof      = __webpack_require__(18)
  , MATCH    = __webpack_require__(5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(37)|| !__webpack_require__(3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 72 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , hide   = __webpack_require__(12)
  , uid    = __webpack_require__(44)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = point;
/* harmony export (immutable) */ __webpack_exports__["b"] = Basis;
function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Basis(context);
});


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = point;
/* harmony export (immutable) */ __webpack_exports__["b"] = Cardinal;
function point(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Linear(context);
});


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call((function () { return arguments; }()));

module.exports = function (x) { return (toString.call(x) === id); };


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString.call(x) === id))) || false;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(43)
  , toLength = __webpack_require__(8);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(32);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 84 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(4)
  , setPrototypeOf = __webpack_require__(95).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(49)
  , ITERATOR   = __webpack_require__(5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(38)
  , descriptor     = __webpack_require__(32)
  , setToStringTag = __webpack_require__(50)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(37)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(13)
  , hide           = __webpack_require__(12)
  , has            = __webpack_require__(10)
  , Iterators      = __webpack_require__(49)
  , $iterCreate    = __webpack_require__(90)
  , setToStringTag = __webpack_require__(50)
  , getPrototypeOf = __webpack_require__(17)
  , ITERATOR       = __webpack_require__(5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 92 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 93 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(102).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(18)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4)
  , anObject = __webpack_require__(1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(27)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(73)('keys')
  , uid    = __webpack_require__(44);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(1)
  , aFunction = __webpack_require__(11)
  , SPECIES   = __webpack_require__(5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , defined   = __webpack_require__(19);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(69)
  , defined  = __webpack_require__(19);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(33)
  , defined   = __webpack_require__(19);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(27)
  , invoke             = __webpack_require__(68)
  , html               = __webpack_require__(86)
  , cel                = __webpack_require__(83)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(18)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , DESCRIPTORS    = __webpack_require__(6)
  , LIBRARY        = __webpack_require__(37)
  , $typed         = __webpack_require__(74)
  , hide           = __webpack_require__(12)
  , redefineAll    = __webpack_require__(41)
  , fails          = __webpack_require__(3)
  , anInstance     = __webpack_require__(36)
  , toInteger      = __webpack_require__(33)
  , toLength       = __webpack_require__(8)
  , gOPN           = __webpack_require__(39).f
  , dP             = __webpack_require__(7).f
  , arrayFill      = __webpack_require__(81)
  , setToStringTag = __webpack_require__(50)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(26)
  , LIBRARY        = __webpack_require__(37)
  , wksExt         = __webpack_require__(148)
  , defineProperty = __webpack_require__(7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(53)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(49);
module.exports = __webpack_require__(26).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(47)
  , step             = __webpack_require__(136)
  , Iterators        = __webpack_require__(49)
  , toIObject        = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(91)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespace__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__namespaces__ = __webpack_require__(109);



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === __WEBPACK_IMPORTED_MODULE_1__namespaces__["b" /* xhtml */] && document.documentElement.namespaceURI === __WEBPACK_IMPORTED_MODULE_1__namespaces__["b" /* xhtml */]
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__namespace__["a" /* default */])(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
});


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespaces__ = __webpack_require__(109);


/* harmony default export */ __webpack_exports__["a"] = (function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return __WEBPACK_IMPORTED_MODULE_0__namespaces__["a" /* default */].hasOwnProperty(prefix) ? {space: __WEBPACK_IMPORTED_MODULE_0__namespaces__["a" /* default */][prefix], local: name} : name;
});


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return xhtml; });
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ __webpack_exports__["a"] = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
});


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return event; });
/* harmony export (immutable) */ __webpack_exports__["b"] = customEvent;
var filterEvents = {};

var event = null;

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).
    event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event = event0;
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ __webpack_exports__["c"] = (function(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
});

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event = event0;
  }
}


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function none() {}

/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
});


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_on__ = __webpack_require__(111);


/* harmony default export */ __webpack_exports__["a"] = (function() {
  var current = __WEBPACK_IMPORTED_MODULE_0__selection_on__["a" /* event */], source;
  while (source = current.sourceEvent) current = source;
  return current;
});


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
});


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = point;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cardinal__ = __webpack_require__(76);



function point(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > __WEBPACK_IMPORTED_MODULE_0__math__["a" /* epsilon */]) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > __WEBPACK_IMPORTED_MODULE_0__math__["a" /* epsilon */]) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new __WEBPACK_IMPORTED_MODULE_1__cardinal__["b" /* Cardinal */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__curve_linear__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(118);





/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x = __WEBPACK_IMPORTED_MODULE_3__point__["a" /* x */],
      y = __WEBPACK_IMPORTED_MODULE_3__point__["b" /* y */],
      defined = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(true),
      context = null,
      curve = __WEBPACK_IMPORTED_MODULE_2__curve_linear__["a" /* default */],
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
});


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = sum;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(59);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var sums = series.map(sum);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).sort(function(a, b) { return sums[a] - sums[b]; });
});

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = x;
/* harmony export (immutable) */ __webpack_exports__["b"] = y;
function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(440)()
	? Object.assign
	: __webpack_require__(441);


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(451)()
	? String.prototype.contains
	: __webpack_require__(452);


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear    = __webpack_require__(172)
  , assign   = __webpack_require__(119)
  , callable = __webpack_require__(30)
  , value    = __webpack_require__(25)
  , d        = __webpack_require__(34)
  , autoBind = __webpack_require__(368)
  , Symbol   = __webpack_require__(35)

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _leaflet = __webpack_require__(46);

var _flatten = __webpack_require__(471);

var _flatten2 = _interopRequireDefault(_flatten);

var _clipperLib = __webpack_require__(124);

var _Polygon = __webpack_require__(63);

var _Simplify = __webpack_require__(123);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} map
 * @param {Array} polygons
 * @param {Object} options
 * @return {Array}
 */
exports.default = function (map, polygons, options) {

    // Transform all of the polygon lat longs into Clipper point models.
    var points = polygons.map(function (polygon) {
        return (0, _Simplify.latLngsToClipperPoints)(map, polygon.getLatLngs()[0]);
    });

    // Merge all of the polygons.
    var mergePolygons = _clipperLib.Clipper.SimplifyPolygons(points, _clipperLib.PolyFillType.pftNonZero);

    // Remove all of the existing polygons on the map.
    polygons.forEach(function (polygon) {
        return (0, _Polygon.removeFor)(map, polygon);
    });

    return (0, _flatten2.default)(mergePolygons.map(function (polygon) {

        var latLngs = polygon.map(function (model) {
            return map.layerPointToLatLng(new _leaflet.Point(model.X, model.Y));
        });

        // Create the polygon, but this time prevent any merging, otherwise we'll find ourselves
        // in an infinite loop.
        return (0, _Polygon.createFor)(map, latLngs, options, true);
    }));
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.latLngsToClipperPoints = undefined;

var _leaflet = __webpack_require__(46);

var _clipperLib = __webpack_require__(124);

/**
 * @method latLngsToClipperPoints
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @return {Array}
 */
var latLngsToClipperPoints = exports.latLngsToClipperPoints = function latLngsToClipperPoints(map, latLngs) {

    return latLngs.map(function (latLng) {
        var point = map.latLngToLayerPoint(latLng);
        return { X: point.x, Y: point.y };
    });
};

/**
 * @method clipperPolygonsToLatLngs
 * @param {Object} map
 * @param {Array} polygons
 * @return {Array}
 */
var clipperPolygonsToLatLngs = function clipperPolygonsToLatLngs(map, polygons) {

    return polygons.map(function (polygon) {

        return polygon.map(function (point) {
            var updatedPoint = new _leaflet.Point(point.X, point.Y);
            return map.layerPointToLatLng(updatedPoint);
        });
    });
};

/**
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @param {Object} options
 * @return {LatLng[]}
 */

exports.default = function (map, latLngs, options) {

    var points = _clipperLib.Clipper.CleanPolygon(latLngsToClipperPoints(map, latLngs), options.simplifyFactor);
    var polygons = _clipperLib.Clipper.SimplifyPolygon(points, _clipperLib.PolyFillType.pftNonZero);

    return clipperPolygonsToLatLngs(map, polygons);
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// rev 482
/********************************************************************************
 *                                                                              *
 * Author    :  Angus Johnson                                                   *
 * Version   :  6.2.1                                                          *
 * Date      :  31 October 2014                                                 *
 * Website   :  http://www.angusj.com                                           *
 * Copyright :  Angus Johnson 2010-2014                                         *
 *                                                                              *
 * License:                                                                     *
 * Use, modification & distribution is subject to Boost Software License Ver 1. *
 * http://www.boost.org/LICENSE_1_0.txt                                         *
 *                                                                              *
 * Attributions:                                                                *
 * The code in this library is an extension of Bala Vatti's clipping algorithm: *
 * "A generic solution to polygon clipping"                                     *
 * Communications of the ACM, Vol 35, Issue 7 (July 1992) pp 56-63.             *
 * http://portal.acm.org/citation.cfm?id=129906                                 *
 *                                                                              *
 * Computer graphics and geometric modeling: implementation and algorithms      *
 * By Max K. Agoston                                                            *
 * Springer; 1 edition (January 4, 2005)                                        *
 * http://books.google.com/books?q=vatti+clipping+agoston                       *
 *                                                                              *
 * See also:                                                                    *
 * "Polygon Offsetting by Computing Winding Numbers"                            *
 * Paper no. DETC2005-85513 pp. 565-575                                         *
 * ASME 2005 International Design Engineering Technical Conferences             *
 * and Computers and Information in Engineering Conference (IDETC/CIE2005)      *
 * September 24-28, 2005 , Long Beach, California, USA                          *
 * http://www.me.berkeley.edu/~mcmains/pubs/DAC05OffsetPolygon.pdf              *
 *                                                                              *
 *******************************************************************************/
/*******************************************************************************
 *                                                                              *
 * Author    :  Timo                                                            *
 * Version   :  6.2.1.0                                                         *
 * Date      :  17 June 2016                                                 *
 *                                                                              *
 * This is a translation of the C# Clipper library to Javascript.               *
 * Int128 struct of C# is implemented using JSBN of Tom Wu.                     *
 * Because Javascript lacks support for 64-bit integers, the space              *
 * is a little more restricted than in C# version.                              *
 *                                                                              *
 * C# version has support for coordinate space:                                 *
 * +-4611686018427387903 ( sqrt(2^127 -1)/2 )                                   *
 * while Javascript version has support for space:                              *
 * +-4503599627370495 ( sqrt(2^106 -1)/2 )                                      *
 *                                                                              *
 * Tom Wu's JSBN proved to be the fastest big integer library:                  *
 * http://jsperf.com/big-integer-library-test                                   *
 *                                                                              *
 * This class can be made simpler when (if ever) 64-bit integer support comes.  *
 *                                                                              *
 *******************************************************************************/
/*******************************************************************************
 *                                                                              *
 * Basic JavaScript BN library - subset useful for RSA encryption.              *
 * http://www-cs-students.stanford.edu/~tjw/jsbn/                               *
 * Copyright (c) 2005  Tom Wu                                                   *
 * All Rights Reserved.                                                         *
 * See "LICENSE" for details:                                                   *
 * http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE                        *
 *                                                                              *
 *******************************************************************************/
(function ()
{
  "use strict";
  //use_int32: When enabled 32bit ints are used instead of 64bit ints. This
  //improve performance but coordinate values are limited to the range +/- 46340
  var use_int32 = false;
  //use_xyz: adds a Z member to IntPoint. Adds a minor cost to performance.
  var use_xyz = false;
  //UseLines: Enables open path clipping. Adds a very minor cost to performance.
  var use_lines = true;

  var ClipperLib = {};
  var isNode = false;
  if (typeof module !== 'undefined' && module.exports)
  {
    module.exports = ClipperLib;
    isNode = true;
  }
  else
  {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (ClipperLib),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    if (typeof (document) !== "undefined") window.ClipperLib = ClipperLib;
    else self['ClipperLib'] = ClipperLib;
  }
  var navigator_appName;
  if (!isNode)
  {
    var nav = navigator.userAgent.toString().toLowerCase();
    navigator_appName = navigator.appName;
  }
  else
  {
    var nav = "chrome"; // Node.js uses Chrome's V8 engine
    navigator_appName = "Netscape"; // Firefox, Chrome and Safari returns "Netscape", so Node.js should also
  }
  // Browser test to speedup performance critical functions
  var browser = {};
  if (nav.indexOf("chrome") != -1 && nav.indexOf("chromium") == -1) browser.chrome = 1;
  else browser.chrome = 0;
  if (nav.indexOf("chromium") != -1) browser.chromium = 1;
  else browser.chromium = 0;
  if (nav.indexOf("safari") != -1 && nav.indexOf("chrome") == -1 && nav.indexOf("chromium") == -1) browser.safari = 1;
  else browser.safari = 0;
  if (nav.indexOf("firefox") != -1) browser.firefox = 1;
  else browser.firefox = 0;
  if (nav.indexOf("firefox/17") != -1) browser.firefox17 = 1;
  else browser.firefox17 = 0;
  if (nav.indexOf("firefox/15") != -1) browser.firefox15 = 1;
  else browser.firefox15 = 0;
  if (nav.indexOf("firefox/3") != -1) browser.firefox3 = 1;
  else browser.firefox3 = 0;
  if (nav.indexOf("opera") != -1) browser.opera = 1;
  else browser.opera = 0;
  if (nav.indexOf("msie 10") != -1) browser.msie10 = 1;
  else browser.msie10 = 0;
  if (nav.indexOf("msie 9") != -1) browser.msie9 = 1;
  else browser.msie9 = 0;
  if (nav.indexOf("msie 8") != -1) browser.msie8 = 1;
  else browser.msie8 = 0;
  if (nav.indexOf("msie 7") != -1) browser.msie7 = 1;
  else browser.msie7 = 0;
  if (nav.indexOf("msie ") != -1) browser.msie = 1;
  else browser.msie = 0;
  ClipperLib.biginteger_used = null;

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // See "LICENSE" for details.
  // Basic JavaScript BN library - subset useful for RSA encryption.
  // Bits per digit
  var dbits;
  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary & 0xffffff) == 0xefcafe);
  // (public) Constructor
  function BigInteger(a, b, c)
  {
    // This test variable can be removed,
    // but at least for performance tests it is useful piece of knowledge
    // This is the only ClipperLib related variable in BigInteger library
    ClipperLib.biginteger_used = 1;
    if (a != null)
      if ("number" == typeof a && "undefined" == typeof (b)) this.fromInt(a); // faster conversion
      else if ("number" == typeof a) this.fromNumber(a, b, c);
    else if (b == null && "string" != typeof a) this.fromString(a, 256);
    else this.fromString(a, b);
  }
  // return new, unset BigInteger
  function nbi()
  {
    return new BigInteger(null,undefined,undefined);
  }
  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i, x, w, j, c, n)
  {
    while (--n >= 0)
    {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i, x, w, j, c, n)
  {
    var xl = x & 0x7fff,
      xh = x >> 15;
    while (--n >= 0)
    {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i, x, w, j, c, n)
  {
    var xl = x & 0x3fff,
      xh = x >> 14;
    while (--n >= 0)
    {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }
    return c;
  }
  if (j_lm && (navigator_appName == "Microsoft Internet Explorer"))
  {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if (j_lm && (navigator_appName != "Netscape"))
  {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else
  { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1 << dbits) - 1);
  BigInteger.prototype.DV = (1 << dbits);
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP;
  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr, vv;
  rr = "0".charCodeAt(0);
  for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n)
  {
    return BI_RM.charAt(n);
  }

  function intAt(s, i)
  {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
  }
  // (protected) copy this to r
  function bnpCopyTo(r)
  {
    for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }
  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x)
  {
    this.t = 1;
    this.s = (x < 0) ? -1 : 0;
    if (x > 0) this[0] = x;
    else if (x < -1) this[0] = x + this.DV;
    else this.t = 0;
  }
  // return bigint initialized to value
  function nbv(i)
  {
    var r = nbi();
    r.fromInt(i);
    return r;
  }
  // (protected) set from string and radix
  function bnpFromString(s, b)
  {
    var k;
    if (b == 16) k = 4;
    else if (b == 8) k = 3;
    else if (b == 256) k = 8; // byte array
    else if (b == 2) k = 1;
    else if (b == 32) k = 5;
    else if (b == 4) k = 2;
    else
    {
      this.fromRadix(s, b);
      return;
    }
    this.t = 0;
    this.s = 0;
    var i = s.length,
      mi = false,
      sh = 0;
    while (--i >= 0)
    {
      var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
      if (x < 0)
      {
        if (s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if (sh == 0)
        this[this.t++] = x;
      else if (sh + k > this.DB)
      {
        this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
        this[this.t++] = (x >> (this.DB - sh));
      }
      else
        this[this.t - 1] |= x << sh;
      sh += k;
      if (sh >= this.DB) sh -= this.DB;
    }
    if (k == 8 && (s[0] & 0x80) != 0)
    {
      this.s = -1;
      if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
    }
    this.clamp();
    if (mi) BigInteger.ZERO.subTo(this, this);
  }
  // (protected) clamp off excess high words
  function bnpClamp()
  {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c)--this.t;
  }
  // (public) return string representation in given radix
  function bnToString(b)
  {
    if (this.s < 0) return "-" + this.negate().toString(b);
    var k;
    if (b == 16) k = 4;
    else if (b == 8) k = 3;
    else if (b == 2) k = 1;
    else if (b == 32) k = 5;
    else if (b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1 << k) - 1,
      d, m = false,
      r = "",
      i = this.t;
    var p = this.DB - (i * this.DB) % k;
    if (i-- > 0)
    {
      if (p < this.DB && (d = this[i] >> p) > 0)
      {
        m = true;
        r = int2char(d);
      }
      while (i >= 0)
      {
        if (p < k)
        {
          d = (this[i] & ((1 << p) - 1)) << (k - p);
          d |= this[--i] >> (p += this.DB - k);
        }
        else
        {
          d = (this[i] >> (p -= k)) & km;
          if (p <= 0)
          {
            p += this.DB;
            --i;
          }
        }
        if (d > 0) m = true;
        if (m) r += int2char(d);
      }
    }
    return m ? r : "0";
  }
  // (public) -this
  function bnNegate()
  {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
  }
  // (public) |this|
  function bnAbs()
  {
    return (this.s < 0) ? this.negate() : this;
  }
  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a)
  {
    var r = this.s - a.s;
    if (r != 0) return r;
    var i = this.t;
    r = i - a.t;
    if (r != 0) return (this.s < 0) ? -r : r;
    while (--i >= 0)
      if ((r = this[i] - a[i]) != 0) return r;
    return 0;
  }
  // returns bit length of the integer x
  function nbits(x)
  {
    var r = 1,
      t;
    if ((t = x >>> 16) != 0)
    {
      x = t;
      r += 16;
    }
    if ((t = x >> 8) != 0)
    {
      x = t;
      r += 8;
    }
    if ((t = x >> 4) != 0)
    {
      x = t;
      r += 4;
    }
    if ((t = x >> 2) != 0)
    {
      x = t;
      r += 2;
    }
    if ((t = x >> 1) != 0)
    {
      x = t;
      r += 1;
    }
    return r;
  }
  // (public) return the number of bits in "this"
  function bnBitLength()
  {
    if (this.t <= 0) return 0;
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
  }
  // (protected) r = this << n*DB
  function bnpDLShiftTo(n, r)
  {
    var i;
    for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
    for (i = n - 1; i >= 0; --i) r[i] = 0;
    r.t = this.t + n;
    r.s = this.s;
  }
  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n, r)
  {
    for (var i = n; i < this.t; ++i) r[i - n] = this[i];
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
  }
  // (protected) r = this << n
  function bnpLShiftTo(n, r)
  {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB),
      c = (this.s << bs) & this.DM,
      i;
    for (i = this.t - 1; i >= 0; --i)
    {
      r[i + ds + 1] = (this[i] >> cbs) | c;
      c = (this[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
  }
  // (protected) r = this >> n
  function bnpRShiftTo(n, r)
  {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t)
    {
      r.t = 0;
      return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i)
    {
      r[i - ds - 1] |= (this[i] & bm) << cbs;
      r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
    r.t = this.t - ds;
    r.clamp();
  }
  // (protected) r = this - a
  function bnpSubTo(a, r)
  {
    var i = 0,
      c = 0,
      m = Math.min(a.t, this.t);
    while (i < m)
    {
      c += this[i] - a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t)
    {
      c -= a.s;
      while (i < this.t)
      {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else
    {
      c += this.s;
      while (i < a.t)
      {
        c -= a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c < -1) r[i++] = this.DV + c;
    else if (c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }
  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a, r)
  {
    var x = this.abs(),
      y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) r[i] = 0;
    for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    r.s = 0;
    r.clamp();
    if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
  }
  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r)
  {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) r[i] = 0;
    for (i = 0; i < x.t - 1; ++i)
    {
      var c = x.am(i, x[i], r, 2 * i, 0, 1);
      if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV)
      {
        r[i + x.t] -= x.DV;
        r[i + x.t + 1] = 1;
      }
    }
    if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    r.s = 0;
    r.clamp();
  }
  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m, q, r)
  {
    var pm = m.abs();
    if (pm.t <= 0) return;
    var pt = this.abs();
    if (pt.t < pm.t)
    {
      if (q != null) q.fromInt(0);
      if (r != null) this.copyTo(r);
      return;
    }
    if (r == null) r = nbi();
    var y = nbi(),
      ts = this.s,
      ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
    if (nsh > 0)
    {
      pm.lShiftTo(nsh, y);
      pt.lShiftTo(nsh, r);
    }
    else
    {
      pm.copyTo(y);
      pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) return;
    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt,
      d2 = (1 << this.F1) / yt,
      e = 1 << this.F2;
    var i = r.t,
      j = i - ys,
      t = (q == null) ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0)
    {
      r[r.t++] = 1;
      r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y); // "negative" y so we can replace sub with am later
    while (y.t < ys) y[y.t++] = 0;
    while (--j >= 0)
    {
      // Estimate quotient digit
      var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
      if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd)
      { // Try it out
        y.dlShiftTo(j, t);
        r.subTo(t, r);
        while (r[i] < --qd) r.subTo(t, r);
      }
    }
    if (q != null)
    {
      r.drShiftTo(ys, q);
      if (ts != ms) BigInteger.ZERO.subTo(q, q);
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
    if (ts < 0) BigInteger.ZERO.subTo(r, r);
  }
  // (public) this mod a
  function bnMod(a)
  {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
    return r;
  }
  // Modular reduction using "classic" algorithm
  function Classic(m)
  {
    this.m = m;
  }

  function cConvert(x)
  {
    if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }

  function cRevert(x)
  {
    return x;
  }

  function cReduce(x)
  {
    x.divRemTo(this.m, null, x);
  }

  function cMulTo(x, y, r)
  {
    x.multiplyTo(y, r);
    this.reduce(r);
  }

  function cSqrTo(x, r)
  {
    x.squareTo(r);
    this.reduce(r);
  }
  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;
  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit()
  {
    if (this.t < 1) return 0;
    var x = this[0];
    if ((x & 1) == 0) return 0;
    var y = x & 3; // y == 1/x mod 2^2
    y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
    y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y > 0) ? this.DV - y : -y;
  }
  // Montgomery reduction
  function Montgomery(m)
  {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << (m.DB - 15)) - 1;
    this.mt2 = 2 * m.t;
  }
  // xR mod m
  function montConvert(x)
  {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
    return r;
  }
  // x/R mod m
  function montRevert(x)
  {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }
  // x = x/R mod m (HAC 14.32)
  function montReduce(x)
  {
    while (x.t <= this.mt2) // pad x so am has enough room later
      x[x.t++] = 0;
    for (var i = 0; i < this.m.t; ++i)
    {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i] & 0x7fff;
      var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i + this.m.t;
      x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
      // propagate carry
      while (x[j] >= x.DV)
      {
        x[j] -= x.DV;
        x[++j]++;
      }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
  }
  // r = "x^2/R mod m"; x != r
  function montSqrTo(x, r)
  {
    x.squareTo(r);
    this.reduce(r);
  }
  // r = "xy/R mod m"; x,y != r
  function montMulTo(x, y, r)
  {
    x.multiplyTo(y, r);
    this.reduce(r);
  }
  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;
  // (protected) true iff this is even
  function bnpIsEven()
  {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
  }
  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e, z)
  {
    if (e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(),
      r2 = nbi(),
      g = z.convert(this),
      i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0)
    {
      z.sqrTo(r, r2);
      if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
      else
      {
        var t = r;
        r = r2;
        r2 = t;
      }
    }
    return z.revert(r);
  }
  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e, m)
  {
    var z;
    if (e < 256 || m.isEven()) z = new Classic(m);
    else z = new Montgomery(m);
    return this.exp(e, z);
  }
  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;
  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;
  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);
  // Copyright (c) 2005-2009  Tom Wu
  // All Rights Reserved.
  // See "LICENSE" for details.
  // Extended JavaScript BN functions, required for RSA private ops.
  // Version 1.1: new BigInteger("0", 10) returns "proper" zero
  // Version 1.2: square() API, isProbablePrime fix
  // (public)
  function bnClone()
  {
    var r = nbi();
    this.copyTo(r);
    return r;
  }
  // (public) return value as integer
  function bnIntValue()
  {
    if (this.s < 0)
    {
      if (this.t == 1) return this[0] - this.DV;
      else if (this.t == 0) return -1;
    }
    else if (this.t == 1) return this[0];
    else if (this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
  }
  // (public) return value as byte
  function bnByteValue()
  {
    return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
  }
  // (public) return value as short (assumes DB>=16)
  function bnShortValue()
  {
    return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
  }
  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r)
  {
    return Math.floor(Math.LN2 * this.DB / Math.log(r));
  }
  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum()
  {
    if (this.s < 0) return -1;
    else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }
  // (protected) convert to radix string
  function bnpToRadix(b)
  {
    if (b == null) b = 10;
    if (this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b, cs);
    var d = nbv(a),
      y = nbi(),
      z = nbi(),
      r = "";
    this.divRemTo(d, y, z);
    while (y.signum() > 0)
    {
      r = (a + z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d, y, z);
    }
    return z.intValue().toString(b) + r;
  }
  // (protected) convert from radix string
  function bnpFromRadix(s, b)
  {
    this.fromInt(0);
    if (b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b, cs),
      mi = false,
      j = 0,
      w = 0;
    for (var i = 0; i < s.length; ++i)
    {
      var x = intAt(s, i);
      if (x < 0)
      {
        if (s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b * w + x;
      if (++j >= cs)
      {
        this.dMultiply(d);
        this.dAddOffset(w, 0);
        j = 0;
        w = 0;
      }
    }
    if (j > 0)
    {
      this.dMultiply(Math.pow(b, j));
      this.dAddOffset(w, 0);
    }
    if (mi) BigInteger.ZERO.subTo(this, this);
  }
  // (protected) alternate constructor
  function bnpFromNumber(a, b, c)
  {
    if ("number" == typeof b)
    {
      // new BigInteger(int,int,RNG)
      if (a < 2) this.fromInt(1);
      else
      {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1)) // force MSB set
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
        if (this.isEven()) this.dAddOffset(1, 0); // force odd
        while (!this.isProbablePrime(b))
        {
          this.dAddOffset(2, 0);
          if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
        }
      }
    }
    else
    {
      // new BigInteger(int,RNG)
      var x = new Array(),
        t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) x[0] &= ((1 << t) - 1);
      else x[0] = 0;
      this.fromString(x, 256);
    }
  }
  // (public) convert to bigendian byte array
  function bnToByteArray()
  {
    var i = this.t,
      r = new Array();
    r[0] = this.s;
    var p = this.DB - (i * this.DB) % 8,
      d, k = 0;
    if (i-- > 0)
    {
      if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
        r[k++] = d | (this.s << (this.DB - p));
      while (i >= 0)
      {
        if (p < 8)
        {
          d = (this[i] & ((1 << p) - 1)) << (8 - p);
          d |= this[--i] >> (p += this.DB - 8);
        }
        else
        {
          d = (this[i] >> (p -= 8)) & 0xff;
          if (p <= 0)
          {
            p += this.DB;
            --i;
          }
        }
        if ((d & 0x80) != 0) d |= -256;
        if (k == 0 && (this.s & 0x80) != (d & 0x80))++k;
        if (k > 0 || d != this.s) r[k++] = d;
      }
    }
    return r;
  }

  function bnEquals(a)
  {
    return (this.compareTo(a) == 0);
  }

  function bnMin(a)
  {
    return (this.compareTo(a) < 0) ? this : a;
  }

  function bnMax(a)
  {
    return (this.compareTo(a) > 0) ? this : a;
  }
  // (protected) r = this op a (bitwise)
  function bnpBitwiseTo(a, op, r)
  {
    var i, f, m = Math.min(a.t, this.t);
    for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
    if (a.t < this.t)
    {
      f = a.s & this.DM;
      for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
      r.t = this.t;
    }
    else
    {
      f = this.s & this.DM;
      for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
      r.t = a.t;
    }
    r.s = op(this.s, a.s);
    r.clamp();
  }
  // (public) this & a
  function op_and(x, y)
  {
    return x & y;
  }

  function bnAnd(a)
  {
    var r = nbi();
    this.bitwiseTo(a, op_and, r);
    return r;
  }
  // (public) this | a
  function op_or(x, y)
  {
    return x | y;
  }

  function bnOr(a)
  {
    var r = nbi();
    this.bitwiseTo(a, op_or, r);
    return r;
  }
  // (public) this ^ a
  function op_xor(x, y)
  {
    return x ^ y;
  }

  function bnXor(a)
  {
    var r = nbi();
    this.bitwiseTo(a, op_xor, r);
    return r;
  }
  // (public) this & ~a
  function op_andnot(x, y)
  {
    return x & ~y;
  }

  function bnAndNot(a)
  {
    var r = nbi();
    this.bitwiseTo(a, op_andnot, r);
    return r;
  }
  // (public) ~this
  function bnNot()
  {
    var r = nbi();
    for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
    r.t = this.t;
    r.s = ~this.s;
    return r;
  }
  // (public) this << n
  function bnShiftLeft(n)
  {
    var r = nbi();
    if (n < 0) this.rShiftTo(-n, r);
    else this.lShiftTo(n, r);
    return r;
  }
  // (public) this >> n
  function bnShiftRight(n)
  {
    var r = nbi();
    if (n < 0) this.lShiftTo(-n, r);
    else this.rShiftTo(n, r);
    return r;
  }
  // return index of lowest 1-bit in x, x < 2^31
  function lbit(x)
  {
    if (x == 0) return -1;
    var r = 0;
    if ((x & 0xffff) == 0)
    {
      x >>= 16;
      r += 16;
    }
    if ((x & 0xff) == 0)
    {
      x >>= 8;
      r += 8;
    }
    if ((x & 0xf) == 0)
    {
      x >>= 4;
      r += 4;
    }
    if ((x & 3) == 0)
    {
      x >>= 2;
      r += 2;
    }
    if ((x & 1) == 0)++r;
    return r;
  }
  // (public) returns index of lowest 1-bit (or -1 if none)
  function bnGetLowestSetBit()
  {
    for (var i = 0; i < this.t; ++i)
      if (this[i] != 0) return i * this.DB + lbit(this[i]);
    if (this.s < 0) return this.t * this.DB;
    return -1;
  }
  // return number of 1 bits in x
  function cbit(x)
  {
    var r = 0;
    while (x != 0)
    {
      x &= x - 1;
      ++r;
    }
    return r;
  }
  // (public) return number of set bits
  function bnBitCount()
  {
    var r = 0,
      x = this.s & this.DM;
    for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
    return r;
  }
  // (public) true iff nth bit is set
  function bnTestBit(n)
  {
    var j = Math.floor(n / this.DB);
    if (j >= this.t) return (this.s != 0);
    return ((this[j] & (1 << (n % this.DB))) != 0);
  }
  // (protected) this op (1<<n)
  function bnpChangeBit(n, op)
  {
    var r = BigInteger.ONE.shiftLeft(n);
    this.bitwiseTo(r, op, r);
    return r;
  }
  // (public) this | (1<<n)
  function bnSetBit(n)
  {
    return this.changeBit(n, op_or);
  }
  // (public) this & ~(1<<n)
  function bnClearBit(n)
  {
    return this.changeBit(n, op_andnot);
  }
  // (public) this ^ (1<<n)
  function bnFlipBit(n)
  {
    return this.changeBit(n, op_xor);
  }
  // (protected) r = this + a
  function bnpAddTo(a, r)
  {
    var i = 0,
      c = 0,
      m = Math.min(a.t, this.t);
    while (i < m)
    {
      c += this[i] + a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t)
    {
      c += a.s;
      while (i < this.t)
      {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else
    {
      c += this.s;
      while (i < a.t)
      {
        c += a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c > 0) r[i++] = c;
    else if (c < -1) r[i++] = this.DV + c;
    r.t = i;
    r.clamp();
  }
  // (public) this + a
  function bnAdd(a)
  {
    var r = nbi();
    this.addTo(a, r);
    return r;
  }
  // (public) this - a
  function bnSubtract(a)
  {
    var r = nbi();
    this.subTo(a, r);
    return r;
  }
  // (public) this * a
  function bnMultiply(a)
  {
    var r = nbi();
    this.multiplyTo(a, r);
    return r;
  }
  // (public) this^2
  function bnSquare()
  {
    var r = nbi();
    this.squareTo(r);
    return r;
  }
  // (public) this / a
  function bnDivide(a)
  {
    var r = nbi();
    this.divRemTo(a, r, null);
    return r;
  }
  // (public) this % a
  function bnRemainder(a)
  {
    var r = nbi();
    this.divRemTo(a, null, r);
    return r;
  }
  // (public) [this/a,this%a]
  function bnDivideAndRemainder(a)
  {
    var q = nbi(),
      r = nbi();
    this.divRemTo(a, q, r);
    return new Array(q, r);
  }
  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n)
  {
    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
  }
  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n, w)
  {
    if (n == 0) return;
    while (this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while (this[w] >= this.DV)
    {
      this[w] -= this.DV;
      if (++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }
  // A "null" reducer
  function NullExp()
  {}

  function nNop(x)
  {
    return x;
  }

  function nMulTo(x, y, r)
  {
    x.multiplyTo(y, r);
  }

  function nSqrTo(x, r)
  {
    x.squareTo(r);
  }
  NullExp.prototype.convert = nNop;
  NullExp.prototype.revert = nNop;
  NullExp.prototype.mulTo = nMulTo;
  NullExp.prototype.sqrTo = nSqrTo;
  // (public) this^e
  function bnPow(e)
  {
    return this.exp(e, new NullExp());
  }
  // (protected) r = lower n words of "this * a", a.t <= n
  // "this" should be the larger one if appropriate.
  function bnpMultiplyLowerTo(a, n, r)
  {
    var i = Math.min(this.t + a.t, n);
    r.s = 0; // assumes a,this >= 0
    r.t = i;
    while (i > 0) r[--i] = 0;
    var j;
    for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
    for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
    r.clamp();
  }
  // (protected) r = "this * a" without lower n words, n > 0
  // "this" should be the larger one if appropriate.
  function bnpMultiplyUpperTo(a, n, r)
  {
    --n;
    var i = r.t = this.t + a.t - n;
    r.s = 0; // assumes a,this >= 0
    while (--i >= 0) r[i] = 0;
    for (i = Math.max(n - this.t, 0); i < a.t; ++i)
      r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
    r.clamp();
    r.drShiftTo(1, r);
  }
  // Barrett modular reduction
  function Barrett(m)
  {
    // setup Barrett
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
    this.mu = this.r2.divide(m);
    this.m = m;
  }

  function barrettConvert(x)
  {
    if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
    else if (x.compareTo(this.m) < 0) return x;
    else
    {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }
  }

  function barrettRevert(x)
  {
    return x;
  }
  // x = x mod m (HAC 14.42)
  function barrettReduce(x)
  {
    x.drShiftTo(this.m.t - 1, this.r2);
    if (x.t > this.m.t + 1)
    {
      x.t = this.m.t + 1;
      x.clamp();
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
    x.subTo(this.r2, x);
    while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
  }
  // r = x^2 mod m; x != r
  function barrettSqrTo(x, r)
  {
    x.squareTo(r);
    this.reduce(r);
  }
  // r = x*y mod m; x,y != r
  function barrettMulTo(x, y, r)
  {
    x.multiplyTo(y, r);
    this.reduce(r);
  }
  Barrett.prototype.convert = barrettConvert;
  Barrett.prototype.revert = barrettRevert;
  Barrett.prototype.reduce = barrettReduce;
  Barrett.prototype.mulTo = barrettMulTo;
  Barrett.prototype.sqrTo = barrettSqrTo;
  // (public) this^e % m (HAC 14.85)
  function bnModPow(e, m)
  {
    var i = e.bitLength(),
      k, r = nbv(1),
      z;
    if (i <= 0) return r;
    else if (i < 18) k = 1;
    else if (i < 48) k = 3;
    else if (i < 144) k = 4;
    else if (i < 768) k = 5;
    else k = 6;
    if (i < 8)
      z = new Classic(m);
    else if (m.isEven())
      z = new Barrett(m);
    else
      z = new Montgomery(m);
    // precomputation
    var g = new Array(),
      n = 3,
      k1 = k - 1,
      km = (1 << k) - 1;
    g[1] = z.convert(this);
    if (k > 1)
    {
      var g2 = nbi();
      z.sqrTo(g[1], g2);
      while (n <= km)
      {
        g[n] = nbi();
        z.mulTo(g2, g[n - 2], g[n]);
        n += 2;
      }
    }
    var j = e.t - 1,
      w, is1 = true,
      r2 = nbi(),
      t;
    i = nbits(e[j]) - 1;
    while (j >= 0)
    {
      if (i >= k1) w = (e[j] >> (i - k1)) & km;
      else
      {
        w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
        if (j > 0) w |= e[j - 1] >> (this.DB + i - k1);
      }
      n = k;
      while ((w & 1) == 0)
      {
        w >>= 1;
        --n;
      }
      if ((i -= n) < 0)
      {
        i += this.DB;
        --j;
      }
      if (is1)
      { // ret == 1, don't bother squaring or multiplying it
        g[w].copyTo(r);
        is1 = false;
      }
      else
      {
        while (n > 1)
        {
          z.sqrTo(r, r2);
          z.sqrTo(r2, r);
          n -= 2;
        }
        if (n > 0) z.sqrTo(r, r2);
        else
        {
          t = r;
          r = r2;
          r2 = t;
        }
        z.mulTo(r2, g[w], r);
      }
      while (j >= 0 && (e[j] & (1 << i)) == 0)
      {
        z.sqrTo(r, r2);
        t = r;
        r = r2;
        r2 = t;
        if (--i < 0)
        {
          i = this.DB - 1;
          --j;
        }
      }
    }
    return z.revert(r);
  }
  // (public) gcd(this,a) (HAC 14.54)
  function bnGCD(a)
  {
    var x = (this.s < 0) ? this.negate() : this.clone();
    var y = (a.s < 0) ? a.negate() : a.clone();
    if (x.compareTo(y) < 0)
    {
      var t = x;
      x = y;
      y = t;
    }
    var i = x.getLowestSetBit(),
      g = y.getLowestSetBit();
    if (g < 0) return x;
    if (i < g) g = i;
    if (g > 0)
    {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    while (x.signum() > 0)
    {
      if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
      if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
      if (x.compareTo(y) >= 0)
      {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      }
      else
      {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
    }
    if (g > 0) y.lShiftTo(g, y);
    return y;
  }
  // (protected) this % n, n < 2^26
  function bnpModInt(n)
  {
    if (n <= 0) return 0;
    var d = this.DV % n,
      r = (this.s < 0) ? n - 1 : 0;
    if (this.t > 0)
      if (d == 0) r = this[0] % n;
      else
        for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
    return r;
  }
  // (public) 1/this % m (HAC 14.61)
  function bnModInverse(m)
  {
    var ac = m.isEven();
    if ((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
    var u = m.clone(),
      v = this.clone();
    var a = nbv(1),
      b = nbv(0),
      c = nbv(0),
      d = nbv(1);
    while (u.signum() != 0)
    {
      while (u.isEven())
      {
        u.rShiftTo(1, u);
        if (ac)
        {
          if (!a.isEven() || !b.isEven())
          {
            a.addTo(this, a);
            b.subTo(m, b);
          }
          a.rShiftTo(1, a);
        }
        else if (!b.isEven()) b.subTo(m, b);
        b.rShiftTo(1, b);
      }
      while (v.isEven())
      {
        v.rShiftTo(1, v);
        if (ac)
        {
          if (!c.isEven() || !d.isEven())
          {
            c.addTo(this, c);
            d.subTo(m, d);
          }
          c.rShiftTo(1, c);
        }
        else if (!d.isEven()) d.subTo(m, d);
        d.rShiftTo(1, d);
      }
      if (u.compareTo(v) >= 0)
      {
        u.subTo(v, u);
        if (ac) a.subTo(c, a);
        b.subTo(d, b);
      }
      else
      {
        v.subTo(u, v);
        if (ac) c.subTo(a, c);
        d.subTo(b, d);
      }
    }
    if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
    if (d.compareTo(m) >= 0) return d.subtract(m);
    if (d.signum() < 0) d.addTo(m, d);
    else return d;
    if (d.signum() < 0) return d.add(m);
    else return d;
  }
  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
  // (public) test primality with certainty >= 1-.5^t
  function bnIsProbablePrime(t)
  {
    var i, x = this.abs();
    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1])
    {
      for (i = 0; i < lowprimes.length; ++i)
        if (x[0] == lowprimes[i]) return true;
      return false;
    }
    if (x.isEven()) return false;
    i = 1;
    while (i < lowprimes.length)
    {
      var m = lowprimes[i],
        j = i + 1;
      while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
      m = x.modInt(m);
      while (i < j)
        if (m % lowprimes[i++] == 0) return false;
    }
    return x.millerRabin(t);
  }
  // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
  function bnpMillerRabin(t)
  {
    var n1 = this.subtract(BigInteger.ONE);
    var k = n1.getLowestSetBit();
    if (k <= 0) return false;
    var r = n1.shiftRight(k);
    t = (t + 1) >> 1;
    if (t > lowprimes.length) t = lowprimes.length;
    var a = nbi();
    for (var i = 0; i < t; ++i)
    {
      //Pick bases at random, instead of starting at 2
      a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
      var y = a.modPow(r, this);
      if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0)
      {
        var j = 1;
        while (j++ < k && y.compareTo(n1) != 0)
        {
          y = y.modPowInt(2, this);
          if (y.compareTo(BigInteger.ONE) == 0) return false;
        }
        if (y.compareTo(n1) != 0) return false;
      }
    }
    return true;
  }
  // protected
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.fromNumber = bnpFromNumber;
  BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
  BigInteger.prototype.changeBit = bnpChangeBit;
  BigInteger.prototype.addTo = bnpAddTo;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
  BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
  BigInteger.prototype.modInt = bnpModInt;
  BigInteger.prototype.millerRabin = bnpMillerRabin;
  // public
  BigInteger.prototype.clone = bnClone;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.byteValue = bnByteValue;
  BigInteger.prototype.shortValue = bnShortValue;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.toByteArray = bnToByteArray;
  BigInteger.prototype.equals = bnEquals;
  BigInteger.prototype.min = bnMin;
  BigInteger.prototype.max = bnMax;
  BigInteger.prototype.and = bnAnd;
  BigInteger.prototype.or = bnOr;
  BigInteger.prototype.xor = bnXor;
  BigInteger.prototype.andNot = bnAndNot;
  BigInteger.prototype.not = bnNot;
  BigInteger.prototype.shiftLeft = bnShiftLeft;
  BigInteger.prototype.shiftRight = bnShiftRight;
  BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
  BigInteger.prototype.bitCount = bnBitCount;
  BigInteger.prototype.testBit = bnTestBit;
  BigInteger.prototype.setBit = bnSetBit;
  BigInteger.prototype.clearBit = bnClearBit;
  BigInteger.prototype.flipBit = bnFlipBit;
  BigInteger.prototype.add = bnAdd;
  BigInteger.prototype.subtract = bnSubtract;
  BigInteger.prototype.multiply = bnMultiply;
  BigInteger.prototype.divide = bnDivide;
  BigInteger.prototype.remainder = bnRemainder;
  BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
  BigInteger.prototype.modPow = bnModPow;
  BigInteger.prototype.modInverse = bnModInverse;
  BigInteger.prototype.pow = bnPow;
  BigInteger.prototype.gcd = bnGCD;
  BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
  // JSBN-specific extension
  BigInteger.prototype.square = bnSquare;
  var Int128 = BigInteger;
  // BigInteger interfaces not implemented in jsbn:
  // BigInteger(int signum, byte[] magnitude)
  // double doubleValue()
  // float floatValue()
  // int hashCode()
  // long longValue()
  // static BigInteger valueOf(long val)
  // Helper functions to make BigInteger functions callable with two parameters
  // as in original C# Clipper
  Int128.prototype.IsNegative = function ()
  {
    if (this.compareTo(Int128.ZERO) == -1) return true;
    else return false;
  };
  Int128.op_Equality = function (val1, val2)
  {
    if (val1.compareTo(val2) == 0) return true;
    else return false;
  };
  Int128.op_Inequality = function (val1, val2)
  {
    if (val1.compareTo(val2) != 0) return true;
    else return false;
  };
  Int128.op_GreaterThan = function (val1, val2)
  {
    if (val1.compareTo(val2) > 0) return true;
    else return false;
  };
  Int128.op_LessThan = function (val1, val2)
  {
    if (val1.compareTo(val2) < 0) return true;
    else return false;
  };
  Int128.op_Addition = function (lhs, rhs)
  {
    return new Int128(lhs).add(new Int128(rhs));
  };
  Int128.op_Subtraction = function (lhs, rhs)
  {
    return new Int128(lhs).subtract(new Int128(rhs));
  };
  Int128.Int128Mul = function (lhs, rhs)
  {
    return new Int128(lhs).multiply(new Int128(rhs));
  };
  Int128.op_Division = function (lhs, rhs)
  {
    return lhs.divide(rhs);
  };
  Int128.prototype.ToDouble = function ()
  {
    return parseFloat(this.toString()); // This could be something faster
  };
  // end of Int128 section
  /*
  // Uncomment the following two lines if you want to use Int128 outside ClipperLib
  if (typeof(document) !== "undefined") window.Int128 = Int128;
  else self.Int128 = Int128;
  */


  // ---------------------------------------------
  // Here starts the actual Clipper library:
  // Helper function to support Inheritance in Javascript
	var Inherit = function (ce, ce2)
	{
		var p;
		if (typeof (Object.getOwnPropertyNames) == 'undefined')
		{
			for (p in ce2.prototype)
				if (typeof (ce.prototype[p]) == 'undefined' || ce.prototype[p] == Object.prototype[p]) ce.prototype[p] = ce2.prototype[p];
			for (p in ce2)
				if (typeof (ce[p]) == 'undefined') ce[p] = ce2[p];
			ce.$baseCtor = ce2;
		}
		else
		{
			var props = Object.getOwnPropertyNames(ce2.prototype);
			for (var i = 0; i < props.length; i++)
				if (typeof (Object.getOwnPropertyDescriptor(ce.prototype, props[i])) == 'undefined') Object.defineProperty(ce.prototype, props[i], Object.getOwnPropertyDescriptor(ce2.prototype, props[i]));
			for (p in ce2)
				if (typeof (ce[p]) == 'undefined') ce[p] = ce2[p];
			ce.$baseCtor = ce2;
		}
	};
  ClipperLib.Path = function ()
  {
    return [];
  };
  ClipperLib.Paths = function ()
  {
    return []; // Was previously [[]], but caused problems when pushed
  };
  // Preserves the calling way of original C# Clipper
  // Is essential due to compatibility, because DoublePoint is public class in original C# version
  ClipperLib.DoublePoint = function ()
  {
    var a = arguments;
    this.X = 0;
    this.Y = 0;
    // public DoublePoint(DoublePoint dp)
    // public DoublePoint(IntPoint ip)
    if (a.length == 1)
    {
      this.X = a[0].X;
      this.Y = a[0].Y;
    }
    else if (a.length == 2)
    {
      this.X = a[0];
      this.Y = a[1];
    }
  }; // This is internal faster function when called without arguments
  ClipperLib.DoublePoint0 = function ()
  {
    this.X = 0;
    this.Y = 0;
  };
  // This is internal faster function when called with 1 argument (dp or ip)
  ClipperLib.DoublePoint1 = function (dp)
  {
    this.X = dp.X;
    this.Y = dp.Y;
  };
  // This is internal faster function when called with 2 arguments (x and y)
  ClipperLib.DoublePoint2 = function (x, y)
  {
    this.X = x;
    this.Y = y;
  };
  // PolyTree & PolyNode start
  // -------------------------------
  ClipperLib.PolyNode = function ()
  {
    this.m_Parent = null;
    this.m_polygon = new ClipperLib.Path();
    this.m_Index = 0;
    this.m_jointype = 0;
    this.m_endtype = 0;
    this.m_Childs = [];
    this.IsOpen = false;
  };
  ClipperLib.PolyNode.prototype.IsHoleNode = function ()
  {
    var result = true;
    var node = this.m_Parent;
    while (node !== null)
    {
      result = !result;
      node = node.m_Parent;
    }
    return result;
  };
  ClipperLib.PolyNode.prototype.ChildCount = function ()
  {
    return this.m_Childs.length;
  };
  ClipperLib.PolyNode.prototype.Contour = function ()
  {
    return this.m_polygon;
  };
  ClipperLib.PolyNode.prototype.AddChild = function (Child)
  {
    var cnt = this.m_Childs.length;
    this.m_Childs.push(Child);
    Child.m_Parent = this;
    Child.m_Index = cnt;
  };
  ClipperLib.PolyNode.prototype.GetNext = function ()
  {
    if (this.m_Childs.length > 0)
      return this.m_Childs[0];
    else
      return this.GetNextSiblingUp();
  };
  ClipperLib.PolyNode.prototype.GetNextSiblingUp = function ()
  {
    if (this.m_Parent === null)
      return null;
    else if (this.m_Index == this.m_Parent.m_Childs.length - 1)
      return this.m_Parent.GetNextSiblingUp();
    else
      return this.m_Parent.m_Childs[this.m_Index + 1];
  };
  ClipperLib.PolyNode.prototype.Childs = function ()
  {
    return this.m_Childs;
  };
  ClipperLib.PolyNode.prototype.Parent = function ()
  {
    return this.m_Parent;
  };
  ClipperLib.PolyNode.prototype.IsHole = function ()
  {
    return this.IsHoleNode();
  };
  // PolyTree : PolyNode
  ClipperLib.PolyTree = function ()
  {
    this.m_AllPolys = [];
    ClipperLib.PolyNode.call(this);
  };
  ClipperLib.PolyTree.prototype.Clear = function ()
  {
    for (var i = 0, ilen = this.m_AllPolys.length; i < ilen; i++)
      this.m_AllPolys[i] = null;
    this.m_AllPolys.length = 0;
    this.m_Childs.length = 0;
  };
  ClipperLib.PolyTree.prototype.GetFirst = function ()
  {
    if (this.m_Childs.length > 0)
      return this.m_Childs[0];
    else
      return null;
  };
  ClipperLib.PolyTree.prototype.Total = function ()
  {
		var result = this.m_AllPolys.length;
		//with negative offsets, ignore the hidden outer polygon ...
		if (result > 0 && this.m_Childs[0] != this.m_AllPolys[0]) result--;
		return result;
  };
  Inherit(ClipperLib.PolyTree, ClipperLib.PolyNode);
  // -------------------------------
  // PolyTree & PolyNode end
  ClipperLib.Math_Abs_Int64 = ClipperLib.Math_Abs_Int32 = ClipperLib.Math_Abs_Double = function (a)
  {
    return Math.abs(a);
  };
  ClipperLib.Math_Max_Int32_Int32 = function (a, b)
  {
    return Math.max(a, b);
  };
  /*
  -----------------------------------
  cast_32 speedtest: http://jsperf.com/truncate-float-to-integer/2
  -----------------------------------
  */
  if (browser.msie || browser.opera || browser.safari) ClipperLib.Cast_Int32 = function (a)
  {
    return a | 0;
  };
  else ClipperLib.Cast_Int32 = function (a)
  { // eg. browser.chrome || browser.chromium || browser.firefox
    return~~ a;
  };
  /*
  --------------------------
  cast_64 speedtests: http://jsperf.com/truncate-float-to-integer
  Chrome: bitwise_not_floor
  Firefox17: toInteger (typeof test)
  IE9: bitwise_or_floor
  IE7 and IE8: to_parseint
  Chromium: to_floor_or_ceil
  Firefox3: to_floor_or_ceil
  Firefox15: to_floor_or_ceil
  Opera: to_floor_or_ceil
  Safari: to_floor_or_ceil
  --------------------------
  */
  if (browser.chrome) ClipperLib.Cast_Int64 = function (a)
  {
    if (a < -2147483648 || a > 2147483647)
      return a < 0 ? Math.ceil(a) : Math.floor(a);
    else return~~ a;
  };
  else if (browser.firefox && typeof (Number.toInteger) == "function") ClipperLib.Cast_Int64 = function (a)
  {
    return Number.toInteger(a);
  };
  else if (browser.msie7 || browser.msie8) ClipperLib.Cast_Int64 = function (a)
  {
    return parseInt(a, 10);
  };
  else if (browser.msie) ClipperLib.Cast_Int64 = function (a)
  {
    if (a < -2147483648 || a > 2147483647)
      return a < 0 ? Math.ceil(a) : Math.floor(a);
    return a | 0;
  };
  // eg. browser.chromium || browser.firefox || browser.opera || browser.safari
  else ClipperLib.Cast_Int64 = function (a)
  {
    return a < 0 ? Math.ceil(a) : Math.floor(a);
  };
  ClipperLib.Clear = function (a)
  {
    a.length = 0;
  };
  //ClipperLib.MaxSteps = 64; // How many steps at maximum in arc in BuildArc() function
  ClipperLib.PI = 3.141592653589793;
  ClipperLib.PI2 = 2 * 3.141592653589793;
  ClipperLib.IntPoint = function ()
  {
    var a = arguments,
      alen = a.length;
    this.X = 0;
    this.Y = 0;
    if (use_xyz)
    {
      this.Z = 0;
      if (alen == 3) // public IntPoint(cInt x, cInt y, cInt z = 0)
      {
        this.X = a[0];
        this.Y = a[1];
        this.Z = a[2];
      }
      else if (alen == 2) // public IntPoint(cInt x, cInt y)
      {
        this.X = a[0];
        this.Y = a[1];
        this.Z = 0;
      }
      else if (alen == 1)
      {
        if (a[0] instanceof ClipperLib.DoublePoint) // public IntPoint(DoublePoint dp)
        {
          var dp = a[0];
          this.X = ClipperLib.Clipper.Round(dp.X);
          this.Y = ClipperLib.Clipper.Round(dp.Y);
          this.Z = 0;
        }
        else // public IntPoint(IntPoint pt)
        {
          var pt = a[0];
          if (typeof (pt.Z) == "undefined") pt.Z = 0;
          this.X = pt.X;
          this.Y = pt.Y;
          this.Z = pt.Z;
        }
      }
      else // public IntPoint()
      {
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
      }
    }
    else // if (!use_xyz)
    {
      if (alen == 2) // public IntPoint(cInt X, cInt Y)
      {
        this.X = a[0];
        this.Y = a[1];
      }
      else if (alen == 1)
      {
        if (a[0] instanceof ClipperLib.DoublePoint) // public IntPoint(DoublePoint dp)
        {
          var dp = a[0];
          this.X = ClipperLib.Clipper.Round(dp.X);
          this.Y = ClipperLib.Clipper.Round(dp.Y);
        }
        else // public IntPoint(IntPoint pt)
        {
          var pt = a[0];
          this.X = pt.X;
          this.Y = pt.Y;
        }
      }
      else // public IntPoint(IntPoint pt)
      {
        this.X = 0;
        this.Y = 0;
      }
    }
  };
  ClipperLib.IntPoint.op_Equality = function (a, b)
  {
    //return a == b;
    return a.X == b.X && a.Y == b.Y;
  };
  ClipperLib.IntPoint.op_Inequality = function (a, b)
  {
    //return a != b;
    return a.X != b.X || a.Y != b.Y;
  };
  /*
  ClipperLib.IntPoint.prototype.Equals = function (obj)
  {
    if (obj === null)
        return false;
    if (obj instanceof ClipperLib.IntPoint)
    {
        var a = Cast(obj, ClipperLib.IntPoint);
        return (this.X == a.X) && (this.Y == a.Y);
    }
    else
        return false;
  };
*/
  if (use_xyz)
  {
    ClipperLib.IntPoint0 = function ()
    {
      this.X = 0;
      this.Y = 0;
      this.Z = 0;
    };
    ClipperLib.IntPoint1 = function (pt)
    {
      this.X = pt.X;
      this.Y = pt.Y;
      this.Z = pt.Z;
    };
    ClipperLib.IntPoint1dp = function (dp)
    {
      this.X = ClipperLib.Clipper.Round(dp.X);
      this.Y = ClipperLib.Clipper.Round(dp.Y);
      this.Z = 0;
    };
    ClipperLib.IntPoint2 = function (x, y)
    {
      this.X = x;
      this.Y = y;
      this.Z = 0;
    };
    ClipperLib.IntPoint3 = function (x, y, z)
    {
      this.X = x;
      this.Y = y;
      this.Z = z;
    };
  }
  else // if (!use_xyz)
  {
    ClipperLib.IntPoint0 = function ()
    {
      this.X = 0;
      this.Y = 0;
    };
    ClipperLib.IntPoint1 = function (pt)
    {
      this.X = pt.X;
      this.Y = pt.Y;
    };
    ClipperLib.IntPoint1dp = function (dp)
    {
      this.X = ClipperLib.Clipper.Round(dp.X);
      this.Y = ClipperLib.Clipper.Round(dp.Y);
    };
    ClipperLib.IntPoint2 = function (x, y)
    {
      this.X = x;
      this.Y = y;
    };
  }
  ClipperLib.IntRect = function ()
  {
    var a = arguments,
      alen = a.length;
    if (alen == 4) // function (l, t, r, b)
    {
      this.left = a[0];
      this.top = a[1];
      this.right = a[2];
      this.bottom = a[3];
    }
    else if (alen == 1) // function (ir)
    {
      this.left = ir.left;
      this.top = ir.top;
      this.right = ir.right;
      this.bottom = ir.bottom;
    }
    else // function ()
    {
      this.left = 0;
      this.top = 0;
      this.right = 0;
      this.bottom = 0;
    }
  };
  ClipperLib.IntRect0 = function ()
  {
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
  };
  ClipperLib.IntRect1 = function (ir)
  {
    this.left = ir.left;
    this.top = ir.top;
    this.right = ir.right;
    this.bottom = ir.bottom;
  };
  ClipperLib.IntRect4 = function (l, t, r, b)
  {
    this.left = l;
    this.top = t;
    this.right = r;
    this.bottom = b;
  };
  ClipperLib.ClipType = {
    ctIntersection: 0,
    ctUnion: 1,
    ctDifference: 2,
    ctXor: 3
  };
  ClipperLib.PolyType = {
    ptSubject: 0,
    ptClip: 1
  };
  ClipperLib.PolyFillType = {
    pftEvenOdd: 0,
    pftNonZero: 1,
    pftPositive: 2,
    pftNegative: 3
  };
  ClipperLib.JoinType = {
    jtSquare: 0,
    jtRound: 1,
    jtMiter: 2
  };
  ClipperLib.EndType = {
    etOpenSquare: 0,
    etOpenRound: 1,
    etOpenButt: 2,
    etClosedLine: 3,
    etClosedPolygon: 4
  };
  ClipperLib.EdgeSide = {
    esLeft: 0,
    esRight: 1
  };
  ClipperLib.Direction = {
    dRightToLeft: 0,
    dLeftToRight: 1
  };
  ClipperLib.TEdge = function ()
  {
    this.Bot = new ClipperLib.IntPoint();
    this.Curr = new ClipperLib.IntPoint();
    this.Top = new ClipperLib.IntPoint();
    this.Delta = new ClipperLib.IntPoint();
    this.Dx = 0;
    this.PolyTyp = ClipperLib.PolyType.ptSubject;
    this.Side = ClipperLib.EdgeSide.esLeft;
    this.WindDelta = 0;
    this.WindCnt = 0;
    this.WindCnt2 = 0;
    this.OutIdx = 0;
    this.Next = null;
    this.Prev = null;
    this.NextInLML = null;
    this.NextInAEL = null;
    this.PrevInAEL = null;
    this.NextInSEL = null;
    this.PrevInSEL = null;
  };
  ClipperLib.IntersectNode = function ()
  {
    this.Edge1 = null;
    this.Edge2 = null;
    this.Pt = new ClipperLib.IntPoint();
  };
  ClipperLib.MyIntersectNodeSort = function () {};
  ClipperLib.MyIntersectNodeSort.Compare = function (node1, node2)
  {
    var i = node2.Pt.Y - node1.Pt.Y;
    if (i > 0) return 1;
    else if (i < 0) return -1;
    else return 0;
  };

  ClipperLib.LocalMinima = function ()
  {
    this.Y = 0;
    this.LeftBound = null;
    this.RightBound = null;
    this.Next = null;
  };
  ClipperLib.Scanbeam = function ()
  {
    this.Y = 0;
    this.Next = null;
  };
  ClipperLib.OutRec = function ()
  {
    this.Idx = 0;
    this.IsHole = false;
    this.IsOpen = false;
    this.FirstLeft = null;
    this.Pts = null;
    this.BottomPt = null;
    this.PolyNode = null;
  };
  ClipperLib.OutPt = function ()
  {
    this.Idx = 0;
    this.Pt = new ClipperLib.IntPoint();
    this.Next = null;
    this.Prev = null;
  };
  ClipperLib.Join = function ()
  {
    this.OutPt1 = null;
    this.OutPt2 = null;
    this.OffPt = new ClipperLib.IntPoint();
  };
  ClipperLib.ClipperBase = function ()
  {
    this.m_MinimaList = null;
    this.m_CurrentLM = null;
    this.m_edges = new Array();
    this.m_UseFullRange = false;
    this.m_HasOpenPaths = false;
    this.PreserveCollinear = false;
    this.m_MinimaList = null;
    this.m_CurrentLM = null;
    this.m_UseFullRange = false;
    this.m_HasOpenPaths = false;
  };
  // Ranges are in original C# too high for Javascript (in current state 2013 september):
  // protected const double horizontal = -3.4E+38;
  // internal const cInt loRange = 0x3FFFFFFF; // = 1073741823 = sqrt(2^63 -1)/2
  // internal const cInt hiRange = 0x3FFFFFFFFFFFFFFFL; // = 4611686018427387903 = sqrt(2^127 -1)/2
  // So had to adjust them to more suitable for Javascript.
  // If JS some day supports truly 64-bit integers, then these ranges can be as in C#
  // and biginteger library can be more simpler (as then 128bit can be represented as two 64bit numbers)
  ClipperLib.ClipperBase.horizontal = -9007199254740992; //-2^53
  ClipperLib.ClipperBase.Skip = -2;
  ClipperLib.ClipperBase.Unassigned = -1;
  ClipperLib.ClipperBase.tolerance = 1E-20;
  if (use_int32)
  {
    ClipperLib.ClipperBase.loRange = 0x7FFF;
    ClipperLib.ClipperBase.hiRange = 0x7FFF;
  }
  else
  {
    ClipperLib.ClipperBase.loRange = 47453132; // sqrt(2^53 -1)/2
    ClipperLib.ClipperBase.hiRange = 4503599627370495; // sqrt(2^106 -1)/2
  }

  ClipperLib.ClipperBase.near_zero = function (val)
  {
    return (val > -ClipperLib.ClipperBase.tolerance) && (val < ClipperLib.ClipperBase.tolerance);
  };
  ClipperLib.ClipperBase.IsHorizontal = function (e)
  {
    return e.Delta.Y === 0;
  };
  ClipperLib.ClipperBase.prototype.PointIsVertex = function (pt, pp)
  {
    var pp2 = pp;
    do {
      if (ClipperLib.IntPoint.op_Equality(pp2.Pt, pt))
        return true;
      pp2 = pp2.Next;
    }
    while (pp2 != pp)
    return false;
  };
  ClipperLib.ClipperBase.prototype.PointOnLineSegment = function (pt, linePt1, linePt2, UseFullRange)
  {
    if (UseFullRange)
      return ((pt.X == linePt1.X) && (pt.Y == linePt1.Y)) ||
        ((pt.X == linePt2.X) && (pt.Y == linePt2.Y)) ||
        (((pt.X > linePt1.X) == (pt.X < linePt2.X)) &&
        ((pt.Y > linePt1.Y) == (pt.Y < linePt2.Y)) &&
        (Int128.op_Equality(Int128.Int128Mul((pt.X - linePt1.X), (linePt2.Y - linePt1.Y)),
          Int128.Int128Mul((linePt2.X - linePt1.X), (pt.Y - linePt1.Y)))));
    else
      return ((pt.X == linePt1.X) && (pt.Y == linePt1.Y)) || ((pt.X == linePt2.X) && (pt.Y == linePt2.Y)) || (((pt.X > linePt1.X) == (pt.X < linePt2.X)) && ((pt.Y > linePt1.Y) == (pt.Y < linePt2.Y)) && ((pt.X - linePt1.X) * (linePt2.Y - linePt1.Y) == (linePt2.X - linePt1.X) * (pt.Y - linePt1.Y)));
  };
  ClipperLib.ClipperBase.prototype.PointOnPolygon = function (pt, pp, UseFullRange)
  {
    var pp2 = pp;
    while (true)
    {
      if (this.PointOnLineSegment(pt, pp2.Pt, pp2.Next.Pt, UseFullRange))
        return true;
      pp2 = pp2.Next;
      if (pp2 == pp)
        break;
    }
    return false;
  };
  ClipperLib.ClipperBase.prototype.SlopesEqual = ClipperLib.ClipperBase.SlopesEqual = function ()
  {
    var a = arguments,
      alen = a.length;
    var e1, e2, pt1, pt2, pt3, pt4, UseFullRange;
    if (alen == 3) // function (e1, e2, UseFullRange)
    {
      e1 = a[0];
      e2 = a[1];
      UseFullRange = a[2];
      if (UseFullRange)
        return Int128.op_Equality(Int128.Int128Mul(e1.Delta.Y, e2.Delta.X), Int128.Int128Mul(e1.Delta.X, e2.Delta.Y));
      else
        return ClipperLib.Cast_Int64((e1.Delta.Y) * (e2.Delta.X)) == ClipperLib.Cast_Int64((e1.Delta.X) * (e2.Delta.Y));
    }
    else if (alen == 4) // function (pt1, pt2, pt3, UseFullRange)
    {
      pt1 = a[0];
      pt2 = a[1];
      pt3 = a[2];
      UseFullRange = a[3];
      if (UseFullRange)
        return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt2.X - pt3.X), Int128.Int128Mul(pt1.X - pt2.X, pt2.Y - pt3.Y));
      else
        return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt2.X - pt3.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt2.Y - pt3.Y)) === 0;
    }
    else // function (pt1, pt2, pt3, pt4, UseFullRange)
    {
      pt1 = a[0];
      pt2 = a[1];
      pt3 = a[2];
      pt4 = a[3];
      UseFullRange = a[4];
      if (UseFullRange)
        return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt3.X - pt4.X), Int128.Int128Mul(pt1.X - pt2.X, pt3.Y - pt4.Y));
      else
        return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt3.X - pt4.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt3.Y - pt4.Y)) === 0;
    }
  };
  ClipperLib.ClipperBase.SlopesEqual3 = function (e1, e2, UseFullRange)
  {
    if (UseFullRange)
      return Int128.op_Equality(Int128.Int128Mul(e1.Delta.Y, e2.Delta.X), Int128.Int128Mul(e1.Delta.X, e2.Delta.Y));
    else
      return ClipperLib.Cast_Int64((e1.Delta.Y) * (e2.Delta.X)) == ClipperLib.Cast_Int64((e1.Delta.X) * (e2.Delta.Y));
  };
  ClipperLib.ClipperBase.SlopesEqual4 = function (pt1, pt2, pt3, UseFullRange)
  {
    if (UseFullRange)
      return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt2.X - pt3.X), Int128.Int128Mul(pt1.X - pt2.X, pt2.Y - pt3.Y));
    else
      return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt2.X - pt3.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt2.Y - pt3.Y)) === 0;
  };
  ClipperLib.ClipperBase.SlopesEqual5 = function (pt1, pt2, pt3, pt4, UseFullRange)
  {
    if (UseFullRange)
      return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt3.X - pt4.X), Int128.Int128Mul(pt1.X - pt2.X, pt3.Y - pt4.Y));
    else
      return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt3.X - pt4.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt3.Y - pt4.Y)) === 0;
  };
  ClipperLib.ClipperBase.prototype.Clear = function ()
  {
    this.DisposeLocalMinimaList();
    for (var i = 0, ilen = this.m_edges.length; i < ilen; ++i)
    {
      for (var j = 0, jlen = this.m_edges[i].length; j < jlen; ++j)
        this.m_edges[i][j] = null;
      ClipperLib.Clear(this.m_edges[i]);
    }
    ClipperLib.Clear(this.m_edges);
    this.m_UseFullRange = false;
    this.m_HasOpenPaths = false;
  };
  ClipperLib.ClipperBase.prototype.DisposeLocalMinimaList = function ()
  {
    while (this.m_MinimaList !== null)
    {
      var tmpLm = this.m_MinimaList.Next;
      this.m_MinimaList = null;
      this.m_MinimaList = tmpLm;
    }
    this.m_CurrentLM = null;
  };
  ClipperLib.ClipperBase.prototype.RangeTest = function (Pt, useFullRange)
  {
    if (useFullRange.Value)
    {
      if (Pt.X > ClipperLib.ClipperBase.hiRange || Pt.Y > ClipperLib.ClipperBase.hiRange || -Pt.X > ClipperLib.ClipperBase.hiRange || -Pt.Y > ClipperLib.ClipperBase.hiRange)
        ClipperLib.Error("Coordinate outside allowed range in RangeTest().");
    }
    else if (Pt.X > ClipperLib.ClipperBase.loRange || Pt.Y > ClipperLib.ClipperBase.loRange || -Pt.X > ClipperLib.ClipperBase.loRange || -Pt.Y > ClipperLib.ClipperBase.loRange)
    {
      useFullRange.Value = true;
      this.RangeTest(Pt, useFullRange);
    }
  };
  ClipperLib.ClipperBase.prototype.InitEdge = function (e, eNext, ePrev, pt)
  {
    e.Next = eNext;
    e.Prev = ePrev;
    //e.Curr = pt;
    e.Curr.X = pt.X;
    e.Curr.Y = pt.Y;
    e.OutIdx = -1;
  };
  ClipperLib.ClipperBase.prototype.InitEdge2 = function (e, polyType)
  {
    if (e.Curr.Y >= e.Next.Curr.Y)
    {
      //e.Bot = e.Curr;
      e.Bot.X = e.Curr.X;
      e.Bot.Y = e.Curr.Y;
      //e.Top = e.Next.Curr;
      e.Top.X = e.Next.Curr.X;
      e.Top.Y = e.Next.Curr.Y;
    }
    else
    {
      //e.Top = e.Curr;
      e.Top.X = e.Curr.X;
      e.Top.Y = e.Curr.Y;
      //e.Bot = e.Next.Curr;
      e.Bot.X = e.Next.Curr.X;
      e.Bot.Y = e.Next.Curr.Y;
    }
    this.SetDx(e);
    e.PolyTyp = polyType;
  };
  ClipperLib.ClipperBase.prototype.FindNextLocMin = function (E)
  {
    var E2;
    for (;;)
    {
      while (ClipperLib.IntPoint.op_Inequality(E.Bot, E.Prev.Bot) || ClipperLib.IntPoint.op_Equality(E.Curr, E.Top))
        E = E.Next;
      if (E.Dx != ClipperLib.ClipperBase.horizontal && E.Prev.Dx != ClipperLib.ClipperBase.horizontal)
        break;
      while (E.Prev.Dx == ClipperLib.ClipperBase.horizontal)
        E = E.Prev;
      E2 = E;
      while (E.Dx == ClipperLib.ClipperBase.horizontal)
        E = E.Next;
      if (E.Top.Y == E.Prev.Bot.Y)
        continue;
      //ie just an intermediate horz.
      if (E2.Prev.Bot.X < E.Bot.X)
        E = E2;
      break;
    }
    return E;
  };
  ClipperLib.ClipperBase.prototype.ProcessBound = function (E, LeftBoundIsForward)
  {
    var EStart;
    var Result = E;
    var Horz;

      if (Result.OutIdx == ClipperLib.ClipperBase.Skip)
      {
        //check if there are edges beyond the skip edge in the bound and if so
        //create another LocMin and calling ProcessBound once more ...
        E = Result;
        if (LeftBoundIsForward)
        {
          while (E.Top.Y == E.Next.Bot.Y) E = E.Next;
          while (E != Result && E.Dx == ClipperLib.ClipperBase.horizontal) E = E.Prev;
        }
        else
        {
          while (E.Top.Y == E.Prev.Bot.Y) E = E.Prev;
          while (E != Result && E.Dx == ClipperLib.ClipperBase.horizontal) E = E.Next;
        }
        if (E == Result)
        {
          if (LeftBoundIsForward) Result = E.Next;
          else Result = E.Prev;
        }
        else
        {
          //there are more edges in the bound beyond result starting with E
          if (LeftBoundIsForward)
            E = Result.Next;
          else
            E = Result.Prev;
          var locMin = new ClipperLib.LocalMinima();
          locMin.Next = null;
          locMin.Y = E.Bot.Y;
          locMin.LeftBound = null;
          locMin.RightBound = E;
          E.WindDelta = 0;
          Result = this.ProcessBound(E, LeftBoundIsForward);
          this.InsertLocalMinima(locMin);
        }
        return Result;
      }

      if (E.Dx == ClipperLib.ClipperBase.horizontal)
      {
        //We need to be careful with open paths because this may not be a
        //true local minima (ie E may be following a skip edge).
        //Also, consecutive horz. edges may start heading left before going right.
        if (LeftBoundIsForward) EStart = E.Prev;
        else EStart = E.Next;
        if (EStart.OutIdx != ClipperLib.ClipperBase.Skip)
        {
          if (EStart.Dx == ClipperLib.ClipperBase.horizontal) //ie an adjoining horizontal skip edge
          {
            if (EStart.Bot.X != E.Bot.X && EStart.Top.X != E.Bot.X)
              this.ReverseHorizontal(E);
          }
          else if (EStart.Bot.X != E.Bot.X)
            this.ReverseHorizontal(E);
        }
      }

      EStart = E;
      if (LeftBoundIsForward)
      {
        while (Result.Top.Y == Result.Next.Bot.Y && Result.Next.OutIdx != ClipperLib.ClipperBase.Skip)
          Result = Result.Next;
        if (Result.Dx == ClipperLib.ClipperBase.horizontal && Result.Next.OutIdx != ClipperLib.ClipperBase.Skip)
        {
          //nb: at the top of a bound, horizontals are added to the bound
          //only when the preceding edge attaches to the horizontal's left vertex
          //unless a Skip edge is encountered when that becomes the top divide
          Horz = Result;
          while (Horz.Prev.Dx == ClipperLib.ClipperBase.horizontal)
            Horz = Horz.Prev;
          if (Horz.Prev.Top.X == Result.Next.Top.X)
          {
            if (!LeftBoundIsForward)
              Result = Horz.Prev;
          }
          else if (Horz.Prev.Top.X > Result.Next.Top.X)
            Result = Horz.Prev;
        }
        while (E != Result)
        {
          E.NextInLML = E.Next;
          if (E.Dx == ClipperLib.ClipperBase.horizontal && E != EStart && E.Bot.X != E.Prev.Top.X)
            this.ReverseHorizontal(E);
          E = E.Next;
        }
        if (E.Dx == ClipperLib.ClipperBase.horizontal && E != EStart && E.Bot.X != E.Prev.Top.X)
          this.ReverseHorizontal(E);
        Result = Result.Next;
        //move to the edge just beyond current bound
      }
      else
      {
        while (Result.Top.Y == Result.Prev.Bot.Y && Result.Prev.OutIdx != ClipperLib.ClipperBase.Skip)
          Result = Result.Prev;
        if (Result.Dx == ClipperLib.ClipperBase.horizontal && Result.Prev.OutIdx != ClipperLib.ClipperBase.Skip)
        {
          Horz = Result;
          while (Horz.Next.Dx == ClipperLib.ClipperBase.horizontal)
            Horz = Horz.Next;
          if (Horz.Next.Top.X == Result.Prev.Top.X)
          {
            if (!LeftBoundIsForward)
              Result = Horz.Next;
          }
          else if (Horz.Next.Top.X > Result.Prev.Top.X)
            Result = Horz.Next;
        }
        while (E != Result)
        {
          E.NextInLML = E.Prev;
          if (E.Dx == ClipperLib.ClipperBase.horizontal && E != EStart && E.Bot.X != E.Next.Top.X)
            this.ReverseHorizontal(E);
          E = E.Prev;
        }
        if (E.Dx == ClipperLib.ClipperBase.horizontal && E != EStart && E.Bot.X != E.Next.Top.X)
          this.ReverseHorizontal(E);
        Result = Result.Prev;
        //move to the edge just beyond current bound
      }

    return Result;
  };

  ClipperLib.ClipperBase.prototype.AddPath = function (pg, polyType, Closed)
  {
    if (use_lines)
    {
      if (!Closed && polyType == ClipperLib.PolyType.ptClip)
        ClipperLib.Error("AddPath: Open paths must be subject.");
    }
    else
    {
      if (!Closed)
        ClipperLib.Error("AddPath: Open paths have been disabled.");
    }
    var highI = pg.length - 1;
    if (Closed)
      while (highI > 0 && (ClipperLib.IntPoint.op_Equality(pg[highI], pg[0])))
    --highI;
    while (highI > 0 && (ClipperLib.IntPoint.op_Equality(pg[highI], pg[highI - 1])))
    --highI;
    if ((Closed && highI < 2) || (!Closed && highI < 1))
      return false;
    //create a new edge array ...
    var edges = new Array();
    for (var i = 0; i <= highI; i++)
      edges.push(new ClipperLib.TEdge());
    var IsFlat = true;
    //1. Basic (first) edge initialization ...

    //edges[1].Curr = pg[1];
    edges[1].Curr.X = pg[1].X;
    edges[1].Curr.Y = pg[1].Y;

    var $1 = {Value: this.m_UseFullRange};
    this.RangeTest(pg[0], $1);
    this.m_UseFullRange = $1.Value;

    $1.Value = this.m_UseFullRange;
    this.RangeTest(pg[highI], $1);
    this.m_UseFullRange = $1.Value;

    this.InitEdge(edges[0], edges[1], edges[highI], pg[0]);
    this.InitEdge(edges[highI], edges[0], edges[highI - 1], pg[highI]);
    for (var i = highI - 1; i >= 1; --i)
    {
      $1.Value = this.m_UseFullRange;
      this.RangeTest(pg[i], $1);
      this.m_UseFullRange = $1.Value;

      this.InitEdge(edges[i], edges[i + 1], edges[i - 1], pg[i]);
    }

    var eStart = edges[0];
    //2. Remove duplicate vertices, and (when closed) collinear edges ...
    var E = eStart,
      eLoopStop = eStart;
    for (;;)
    {
    //console.log(E.Next, eStart);
    	//nb: allows matching start and end points when not Closed ...
      if (E.Curr == E.Next.Curr && (Closed || E.Next != eStart))
      {
        if (E == E.Next)
          break;
        if (E == eStart)
          eStart = E.Next;
        E = this.RemoveEdge(E);
        eLoopStop = E;
        continue;
      }
      if (E.Prev == E.Next)
        break;
      else if (Closed && ClipperLib.ClipperBase.SlopesEqual(E.Prev.Curr, E.Curr, E.Next.Curr, this.m_UseFullRange) && (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(E.Prev.Curr, E.Curr, E.Next.Curr)))
      {
        //Collinear edges are allowed for open paths but in closed paths
        //the default is to merge adjacent collinear edges into a single edge.
        //However, if the PreserveCollinear property is enabled, only overlapping
        //collinear edges (ie spikes) will be removed from closed paths.
        if (E == eStart)
          eStart = E.Next;
        E = this.RemoveEdge(E);
        E = E.Prev;
        eLoopStop = E;
        continue;
      }
      E = E.Next;
      if ((E == eLoopStop) || (!Closed && E.Next == eStart)) break;
    }
    if ((!Closed && (E == E.Next)) || (Closed && (E.Prev == E.Next)))
      return false;
    if (!Closed)
    {
      this.m_HasOpenPaths = true;
      eStart.Prev.OutIdx = ClipperLib.ClipperBase.Skip;
    }
    //3. Do second stage of edge initialization ...
    E = eStart;
    do {
      this.InitEdge2(E, polyType);
      E = E.Next;
      if (IsFlat && E.Curr.Y != eStart.Curr.Y)
        IsFlat = false;
    }
    while (E != eStart)
    //4. Finally, add edge bounds to LocalMinima list ...
    //Totally flat paths must be handled differently when adding them
    //to LocalMinima list to avoid endless loops etc ...
    if (IsFlat)
    {
      if (Closed)
        return false;
      E.Prev.OutIdx = ClipperLib.ClipperBase.Skip;
      if (E.Prev.Bot.X < E.Prev.Top.X)
        this.ReverseHorizontal(E.Prev);
      var locMin = new ClipperLib.LocalMinima();
      locMin.Next = null;
      locMin.Y = E.Bot.Y;
      locMin.LeftBound = null;
      locMin.RightBound = E;
      locMin.RightBound.Side = ClipperLib.EdgeSide.esRight;
      locMin.RightBound.WindDelta = 0;
      while (E.Next.OutIdx != ClipperLib.ClipperBase.Skip)
      {
        E.NextInLML = E.Next;
        if (E.Bot.X != E.Prev.Top.X)
          this.ReverseHorizontal(E);
        E = E.Next;
      }
      this.InsertLocalMinima(locMin);
      this.m_edges.push(edges);
      return true;
    }
    this.m_edges.push(edges);
    var leftBoundIsForward;
    var EMin = null;

		//workaround to avoid an endless loop in the while loop below when
    //open paths have matching start and end points ...
    if(ClipperLib.IntPoint.op_Equality(E.Prev.Bot, E.Prev.Top))
    	E = E.Next;

    for (;;)
    {
      E = this.FindNextLocMin(E);
      if (E == EMin)
        break;
      else if (EMin == null)
        EMin = E;
      //E and E.Prev now share a local minima (left aligned if horizontal).
      //Compare their slopes to find which starts which bound ...
      var locMin = new ClipperLib.LocalMinima();
      locMin.Next = null;
      locMin.Y = E.Bot.Y;
      if (E.Dx < E.Prev.Dx)
      {
        locMin.LeftBound = E.Prev;
        locMin.RightBound = E;
        leftBoundIsForward = false;
        //Q.nextInLML = Q.prev
      }
      else
      {
        locMin.LeftBound = E;
        locMin.RightBound = E.Prev;
        leftBoundIsForward = true;
        //Q.nextInLML = Q.next
      }
      locMin.LeftBound.Side = ClipperLib.EdgeSide.esLeft;
      locMin.RightBound.Side = ClipperLib.EdgeSide.esRight;
      if (!Closed)
        locMin.LeftBound.WindDelta = 0;
      else if (locMin.LeftBound.Next == locMin.RightBound)
        locMin.LeftBound.WindDelta = -1;
      else
        locMin.LeftBound.WindDelta = 1;
      locMin.RightBound.WindDelta = -locMin.LeftBound.WindDelta;
      E = this.ProcessBound(locMin.LeftBound, leftBoundIsForward);
      if (E.OutIdx == ClipperLib.ClipperBase.Skip)
      	E = this.ProcessBound(E, leftBoundIsForward);
      var E2 = this.ProcessBound(locMin.RightBound, !leftBoundIsForward);
      if (E2.OutIdx == ClipperLib.ClipperBase.Skip) E2 = this.ProcessBound(E2, !leftBoundIsForward);
      if (locMin.LeftBound.OutIdx == ClipperLib.ClipperBase.Skip)
        locMin.LeftBound = null;
      else if (locMin.RightBound.OutIdx == ClipperLib.ClipperBase.Skip)
        locMin.RightBound = null;
      this.InsertLocalMinima(locMin);
      if (!leftBoundIsForward)
        E = E2;
    }
    return true;
  };
  ClipperLib.ClipperBase.prototype.AddPaths = function (ppg, polyType, closed)
  {
    //  console.log("-------------------------------------------");
    //  console.log(JSON.stringify(ppg));
    var result = false;
    for (var i = 0, ilen = ppg.length; i < ilen; ++i)
      if (this.AddPath(ppg[i], polyType, closed))
        result = true;
    return result;
  };
  //------------------------------------------------------------------------------
  ClipperLib.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3 = function (pt1, pt2, pt3)
  {
    if ((ClipperLib.IntPoint.op_Equality(pt1, pt3)) || (ClipperLib.IntPoint.op_Equality(pt1, pt2)) ||       (ClipperLib.IntPoint.op_Equality(pt3, pt2)))

   //if ((pt1 == pt3) || (pt1 == pt2) || (pt3 == pt2))
   return false;

    else if (pt1.X != pt3.X)
      return (pt2.X > pt1.X) == (pt2.X < pt3.X);
    else
      return (pt2.Y > pt1.Y) == (pt2.Y < pt3.Y);
  };
  ClipperLib.ClipperBase.prototype.RemoveEdge = function (e)
  {
    //removes e from double_linked_list (but without removing from memory)
    e.Prev.Next = e.Next;
    e.Next.Prev = e.Prev;
    var result = e.Next;
    e.Prev = null; //flag as removed (see ClipperBase.Clear)
    return result;
  };
  ClipperLib.ClipperBase.prototype.SetDx = function (e)
  {
    e.Delta.X = (e.Top.X - e.Bot.X);
    e.Delta.Y = (e.Top.Y - e.Bot.Y);
    if (e.Delta.Y === 0) e.Dx = ClipperLib.ClipperBase.horizontal;
    else e.Dx = (e.Delta.X) / (e.Delta.Y);
  };
  ClipperLib.ClipperBase.prototype.InsertLocalMinima = function (newLm)
  {
    if (this.m_MinimaList === null)
    {
      this.m_MinimaList = newLm;
    }
    else if (newLm.Y >= this.m_MinimaList.Y)
    {
      newLm.Next = this.m_MinimaList;
      this.m_MinimaList = newLm;
    }
    else
    {
      var tmpLm = this.m_MinimaList;
      while (tmpLm.Next !== null && (newLm.Y < tmpLm.Next.Y))
        tmpLm = tmpLm.Next;
      newLm.Next = tmpLm.Next;
      tmpLm.Next = newLm;
    }
  };
  ClipperLib.ClipperBase.prototype.PopLocalMinima = function ()
  {
    if (this.m_CurrentLM === null)
      return;
    this.m_CurrentLM = this.m_CurrentLM.Next;
  };
  ClipperLib.ClipperBase.prototype.ReverseHorizontal = function (e)
  {
    //swap horizontal edges' top and bottom x's so they follow the natural
    //progression of the bounds - ie so their xbots will align with the
    //adjoining lower edge. [Helpful in the ProcessHorizontal() method.]
    var tmp = e.Top.X;
    e.Top.X = e.Bot.X;
    e.Bot.X = tmp;
    if (use_xyz)
    {
      tmp = e.Top.Z;
      e.Top.Z = e.Bot.Z;
      e.Bot.Z = tmp;
    }
  };
  ClipperLib.ClipperBase.prototype.Reset = function ()
  {
    this.m_CurrentLM = this.m_MinimaList;
    if (this.m_CurrentLM == null)
      return;
    //ie nothing to process
    //reset all edges ...
    var lm = this.m_MinimaList;
    while (lm != null)
    {
      var e = lm.LeftBound;
      if (e != null)
      {
        //e.Curr = e.Bot;
        e.Curr.X = e.Bot.X;
        e.Curr.Y = e.Bot.Y;
        e.Side = ClipperLib.EdgeSide.esLeft;
        e.OutIdx = ClipperLib.ClipperBase.Unassigned;
      }
      e = lm.RightBound;
      if (e != null)
      {
        //e.Curr = e.Bot;
        e.Curr.X = e.Bot.X;
        e.Curr.Y = e.Bot.Y;
        e.Side = ClipperLib.EdgeSide.esRight;
        e.OutIdx = ClipperLib.ClipperBase.Unassigned;
      }
      lm = lm.Next;
    }
  };
  ClipperLib.Clipper = function (InitOptions) // public Clipper(int InitOptions = 0)
  {
    if (typeof (InitOptions) == "undefined") InitOptions = 0;
    this.m_PolyOuts = null;
    this.m_ClipType = ClipperLib.ClipType.ctIntersection;
    this.m_Scanbeam = null;
    this.m_ActiveEdges = null;
    this.m_SortedEdges = null;
    this.m_IntersectList = null;
    this.m_IntersectNodeComparer = null;
    this.m_ExecuteLocked = false;
    this.m_ClipFillType = ClipperLib.PolyFillType.pftEvenOdd;
    this.m_SubjFillType = ClipperLib.PolyFillType.pftEvenOdd;
    this.m_Joins = null;
    this.m_GhostJoins = null;
    this.m_UsingPolyTree = false;
    this.ReverseSolution = false;
    this.StrictlySimple = false;
    ClipperLib.ClipperBase.call(this);
    this.m_Scanbeam = null;
    this.m_ActiveEdges = null;
    this.m_SortedEdges = null;
    this.m_IntersectList = new Array();
    this.m_IntersectNodeComparer = ClipperLib.MyIntersectNodeSort.Compare;
    this.m_ExecuteLocked = false;
    this.m_UsingPolyTree = false;
    this.m_PolyOuts = new Array();
    this.m_Joins = new Array();
    this.m_GhostJoins = new Array();
    this.ReverseSolution = (1 & InitOptions) !== 0;
    this.StrictlySimple = (2 & InitOptions) !== 0;
    this.PreserveCollinear = (4 & InitOptions) !== 0;
    if (use_xyz)
    {
      this.ZFillFunction = null; // function (IntPoint vert1, IntPoint vert2, ref IntPoint intersectPt);
    }
  };
  ClipperLib.Clipper.ioReverseSolution = 1;
  ClipperLib.Clipper.ioStrictlySimple = 2;
  ClipperLib.Clipper.ioPreserveCollinear = 4;

  ClipperLib.Clipper.prototype.Clear = function ()
  {
    if (this.m_edges.length === 0)
      return;
    //avoids problems with ClipperBase destructor
    this.DisposeAllPolyPts();
    ClipperLib.ClipperBase.prototype.Clear.call(this);
  };

  ClipperLib.Clipper.prototype.DisposeScanbeamList = function ()
  {
    while (this.m_Scanbeam !== null)
    {
      var sb2 = this.m_Scanbeam.Next;
      this.m_Scanbeam = null;
      this.m_Scanbeam = sb2;
    }
  };
  ClipperLib.Clipper.prototype.Reset = function ()
  {
    ClipperLib.ClipperBase.prototype.Reset.call(this);
    this.m_Scanbeam = null;
    this.m_ActiveEdges = null;
    this.m_SortedEdges = null;

    var lm = this.m_MinimaList;
    while (lm !== null)
    {
      this.InsertScanbeam(lm.Y);
      lm = lm.Next;
    }
  };
  ClipperLib.Clipper.prototype.InsertScanbeam = function (Y)
  {
    if (this.m_Scanbeam === null)
    {
      this.m_Scanbeam = new ClipperLib.Scanbeam();
      this.m_Scanbeam.Next = null;
      this.m_Scanbeam.Y = Y;
    }
    else if (Y > this.m_Scanbeam.Y)
    {
      var newSb = new ClipperLib.Scanbeam();
      newSb.Y = Y;
      newSb.Next = this.m_Scanbeam;
      this.m_Scanbeam = newSb;
    }
    else
    {
      var sb2 = this.m_Scanbeam;
      while (sb2.Next !== null && (Y <= sb2.Next.Y))
        sb2 = sb2.Next;
      if (Y == sb2.Y)
        return;
      //ie ignores duplicates
      var newSb = new ClipperLib.Scanbeam();
      newSb.Y = Y;
      newSb.Next = sb2.Next;
      sb2.Next = newSb;
    }
  };
  // ************************************
  ClipperLib.Clipper.prototype.Execute = function ()
  {
    var a = arguments,
      alen = a.length,
      ispolytree = a[1] instanceof ClipperLib.PolyTree;
    if (alen == 4 && !ispolytree) // function (clipType, solution, subjFillType, clipFillType)
    {
      var clipType = a[0],
        solution = a[1],
        subjFillType = a[2],
        clipFillType = a[3];
      if (this.m_ExecuteLocked)
        return false;
      if (this.m_HasOpenPaths)
        ClipperLib.Error("Error: PolyTree struct is need for open path clipping.");
      this.m_ExecuteLocked = true;
      ClipperLib.Clear(solution);
      this.m_SubjFillType = subjFillType;
      this.m_ClipFillType = clipFillType;
      this.m_ClipType = clipType;
      this.m_UsingPolyTree = false;
      try
      {
        var succeeded = this.ExecuteInternal();
        //build the return polygons ...
        if (succeeded) this.BuildResult(solution);
      }
      finally
      {
        this.DisposeAllPolyPts();
        this.m_ExecuteLocked = false;
      }
      return succeeded;
    }
    else if (alen == 4 && ispolytree) // function (clipType, polytree, subjFillType, clipFillType)
    {
      var clipType = a[0],
        polytree = a[1],
        subjFillType = a[2],
        clipFillType = a[3];
      if (this.m_ExecuteLocked)
        return false;
      this.m_ExecuteLocked = true;
      this.m_SubjFillType = subjFillType;
      this.m_ClipFillType = clipFillType;
      this.m_ClipType = clipType;
      this.m_UsingPolyTree = true;
      try
      {
        var succeeded = this.ExecuteInternal();
        //build the return polygons ...
        if (succeeded) this.BuildResult2(polytree);
      }
      finally
      {
        this.DisposeAllPolyPts();
        this.m_ExecuteLocked = false;
      }
      return succeeded;
    }
    else if (alen == 2 && !ispolytree) // function (clipType, solution)
    {
      var clipType = a[0],
        solution = a[1];
      return this.Execute(clipType, solution, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);
    }
    else if (alen == 2 && ispolytree) // function (clipType, polytree)
    {
      var clipType = a[0],
        polytree = a[1];
      return this.Execute(clipType, polytree, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);
    }
  };
  ClipperLib.Clipper.prototype.FixHoleLinkage = function (outRec)
  {
    //skip if an outermost polygon or
    //already already points to the correct FirstLeft ...
    if (outRec.FirstLeft === null || (outRec.IsHole != outRec.FirstLeft.IsHole && outRec.FirstLeft.Pts !== null))
      return;
    var orfl = outRec.FirstLeft;
    while (orfl !== null && ((orfl.IsHole == outRec.IsHole) || orfl.Pts === null))
      orfl = orfl.FirstLeft;
    outRec.FirstLeft = orfl;
  };
  ClipperLib.Clipper.prototype.ExecuteInternal = function ()
  {
    try
    {
      this.Reset();
      if (this.m_CurrentLM === null)
        return false;
      var botY = this.PopScanbeam();
      do {
        this.InsertLocalMinimaIntoAEL(botY);
        ClipperLib.Clear(this.m_GhostJoins);
        this.ProcessHorizontals(false);
        if (this.m_Scanbeam === null)
          break;
        var topY = this.PopScanbeam();
        if (!this.ProcessIntersections(topY)) return false;

        this.ProcessEdgesAtTopOfScanbeam(topY);
        botY = topY;
      }
      while (this.m_Scanbeam !== null || this.m_CurrentLM !== null)
      //fix orientations ...
      for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
      {
        var outRec = this.m_PolyOuts[i];
        if (outRec.Pts === null || outRec.IsOpen)
          continue;
        if ((outRec.IsHole ^ this.ReverseSolution) == (this.Area(outRec) > 0))
          this.ReversePolyPtLinks(outRec.Pts);
      }
      this.JoinCommonEdges();
      for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
      {
        var outRec = this.m_PolyOuts[i];
        if (outRec.Pts !== null && !outRec.IsOpen)
          this.FixupOutPolygon(outRec);
      }
      if (this.StrictlySimple)
        this.DoSimplePolygons();
      return true;
    }
    finally
    {
      ClipperLib.Clear(this.m_Joins);
      ClipperLib.Clear(this.m_GhostJoins);
    }
  };
  ClipperLib.Clipper.prototype.PopScanbeam = function ()
  {
    var Y = this.m_Scanbeam.Y;
    this.m_Scanbeam = this.m_Scanbeam.Next;
    return Y;
  };

  ClipperLib.Clipper.prototype.DisposeAllPolyPts = function ()
  {
    for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; ++i)
      this.DisposeOutRec(i);
    ClipperLib.Clear(this.m_PolyOuts);
  };
  ClipperLib.Clipper.prototype.DisposeOutRec = function (index)
  {
    var outRec = this.m_PolyOuts[index];
    outRec.Pts = null;
    outRec = null;
    this.m_PolyOuts[index] = null;
  };

  ClipperLib.Clipper.prototype.AddJoin = function (Op1, Op2, OffPt)
  {
    var j = new ClipperLib.Join();
    j.OutPt1 = Op1;
    j.OutPt2 = Op2;
    //j.OffPt = OffPt;
    j.OffPt.X = OffPt.X;
    j.OffPt.Y = OffPt.Y;
    this.m_Joins.push(j);
  };
  ClipperLib.Clipper.prototype.AddGhostJoin = function (Op, OffPt)
  {
    var j = new ClipperLib.Join();
    j.OutPt1 = Op;
    //j.OffPt = OffPt;
    j.OffPt.X = OffPt.X;
    j.OffPt.Y = OffPt.Y;
    this.m_GhostJoins.push(j);
  };
  if (use_xyz)
  {
    ClipperLib.Clipper.prototype.SetZ = function (pt, e1, e2)
    {
      if (this.ZFillFunction !== null)
      {
        if (pt.Z != 0 || this.ZFillFunction === null) return;
        else if (ClipperLib.IntPoint.op_Equality(pt, e1.Bot)) pt.Z = e1.Bot.Z;
        else if (ClipperLib.IntPoint.op_Equality(pt, e1.Top)) pt.Z = e1.Top.Z;
        else if (ClipperLib.IntPoint.op_Equality(pt, e2.Bot)) pt.Z = e2.Bot.Z;
        else if (ClipperLib.IntPoint.op_Equality(pt, e2.Top)) pt.Z = e2.Top.Z;
        else ZFillFunction(e1.Bot, e1.Top, e2.Bot, e2.Top, pt);
      }
    };

    //------------------------------------------------------------------------------
  }

  ClipperLib.Clipper.prototype.InsertLocalMinimaIntoAEL = function (botY)
  {
    while (this.m_CurrentLM !== null && (this.m_CurrentLM.Y == botY))
    {
      var lb = this.m_CurrentLM.LeftBound;
      var rb = this.m_CurrentLM.RightBound;
      this.PopLocalMinima();
      var Op1 = null;
      if (lb === null)
      {
        this.InsertEdgeIntoAEL(rb, null);
        this.SetWindingCount(rb);
        if (this.IsContributing(rb))
          Op1 = this.AddOutPt(rb, rb.Bot);
      }
      else if (rb == null)
      {
        this.InsertEdgeIntoAEL(lb, null);
        this.SetWindingCount(lb);
        if (this.IsContributing(lb))
          Op1 = this.AddOutPt(lb, lb.Bot);
        this.InsertScanbeam(lb.Top.Y);
      }
      else
      {
        this.InsertEdgeIntoAEL(lb, null);
        this.InsertEdgeIntoAEL(rb, lb);
        this.SetWindingCount(lb);
        rb.WindCnt = lb.WindCnt;
        rb.WindCnt2 = lb.WindCnt2;
        if (this.IsContributing(lb))
          Op1 = this.AddLocalMinPoly(lb, rb, lb.Bot);
        this.InsertScanbeam(lb.Top.Y);
      }
      if (rb != null)
      {
        if (ClipperLib.ClipperBase.IsHorizontal(rb))
          this.AddEdgeToSEL(rb);
        else
          this.InsertScanbeam(rb.Top.Y);
      }
      if (lb == null || rb == null) continue;
      //if output polygons share an Edge with a horizontal rb, they'll need joining later ...
      if (Op1 !== null && ClipperLib.ClipperBase.IsHorizontal(rb) && this.m_GhostJoins.length > 0 && rb.WindDelta !== 0)
      {
        for (var i = 0, ilen = this.m_GhostJoins.length; i < ilen; i++)
        {
          //if the horizontal Rb and a 'ghost' horizontal overlap, then convert
          //the 'ghost' join to a real join ready for later ...
          var j = this.m_GhostJoins[i];

					if (this.HorzSegmentsOverlap(j.OutPt1.Pt.X, j.OffPt.X, rb.Bot.X, rb.Top.X))
            this.AddJoin(j.OutPt1, Op1, j.OffPt);
        }
      }
      if (lb.OutIdx >= 0 && lb.PrevInAEL !== null &&
        lb.PrevInAEL.Curr.X == lb.Bot.X &&
        lb.PrevInAEL.OutIdx >= 0 &&
        ClipperLib.ClipperBase.SlopesEqual(lb.PrevInAEL, lb, this.m_UseFullRange) &&
        lb.WindDelta !== 0 && lb.PrevInAEL.WindDelta !== 0)
      {
        var Op2 = this.AddOutPt(lb.PrevInAEL, lb.Bot);
        this.AddJoin(Op1, Op2, lb.Top);
      }
      if (lb.NextInAEL != rb)
      {
        if (rb.OutIdx >= 0 && rb.PrevInAEL.OutIdx >= 0 &&
          ClipperLib.ClipperBase.SlopesEqual(rb.PrevInAEL, rb, this.m_UseFullRange) &&
          rb.WindDelta !== 0 && rb.PrevInAEL.WindDelta !== 0)
        {
          var Op2 = this.AddOutPt(rb.PrevInAEL, rb.Bot);
          this.AddJoin(Op1, Op2, rb.Top);
        }
        var e = lb.NextInAEL;
        if (e !== null)
          while (e != rb)
          {
            //nb: For calculating winding counts etc, IntersectEdges() assumes
            //that param1 will be to the right of param2 ABOVE the intersection ...
            this.IntersectEdges(rb, e, lb.Curr, false);
            //order important here
            e = e.NextInAEL;
          }
      }
    }
  };
  ClipperLib.Clipper.prototype.InsertEdgeIntoAEL = function (edge, startEdge)
  {
    if (this.m_ActiveEdges === null)
    {
      edge.PrevInAEL = null;
      edge.NextInAEL = null;
      this.m_ActiveEdges = edge;
    }
    else if (startEdge === null && this.E2InsertsBeforeE1(this.m_ActiveEdges, edge))
    {
      edge.PrevInAEL = null;
      edge.NextInAEL = this.m_ActiveEdges;
      this.m_ActiveEdges.PrevInAEL = edge;
      this.m_ActiveEdges = edge;
    }
    else
    {
      if (startEdge === null)
        startEdge = this.m_ActiveEdges;
      while (startEdge.NextInAEL !== null && !this.E2InsertsBeforeE1(startEdge.NextInAEL, edge))
        startEdge = startEdge.NextInAEL;
      edge.NextInAEL = startEdge.NextInAEL;
      if (startEdge.NextInAEL !== null)
        startEdge.NextInAEL.PrevInAEL = edge;
      edge.PrevInAEL = startEdge;
      startEdge.NextInAEL = edge;
    }
  };
  ClipperLib.Clipper.prototype.E2InsertsBeforeE1 = function (e1, e2)
  {
    if (e2.Curr.X == e1.Curr.X)
    {
      if (e2.Top.Y > e1.Top.Y)
        return e2.Top.X < ClipperLib.Clipper.TopX(e1, e2.Top.Y);
      else
        return e1.Top.X > ClipperLib.Clipper.TopX(e2, e1.Top.Y);
    }
    else
      return e2.Curr.X < e1.Curr.X;
  };
  ClipperLib.Clipper.prototype.IsEvenOddFillType = function (edge)
  {
    if (edge.PolyTyp == ClipperLib.PolyType.ptSubject)
      return this.m_SubjFillType == ClipperLib.PolyFillType.pftEvenOdd;
    else
      return this.m_ClipFillType == ClipperLib.PolyFillType.pftEvenOdd;
  };
  ClipperLib.Clipper.prototype.IsEvenOddAltFillType = function (edge)
  {
    if (edge.PolyTyp == ClipperLib.PolyType.ptSubject)
      return this.m_ClipFillType == ClipperLib.PolyFillType.pftEvenOdd;
    else
      return this.m_SubjFillType == ClipperLib.PolyFillType.pftEvenOdd;
  };
  ClipperLib.Clipper.prototype.IsContributing = function (edge)
  {
    var pft, pft2;
    if (edge.PolyTyp == ClipperLib.PolyType.ptSubject)
    {
      pft = this.m_SubjFillType;
      pft2 = this.m_ClipFillType;
    }
    else
    {
      pft = this.m_ClipFillType;
      pft2 = this.m_SubjFillType;
    }
    switch (pft)
    {
    case ClipperLib.PolyFillType.pftEvenOdd:
      if (edge.WindDelta === 0 && edge.WindCnt != 1)
        return false;
      break;
    case ClipperLib.PolyFillType.pftNonZero:
      if (Math.abs(edge.WindCnt) != 1)
        return false;
      break;
    case ClipperLib.PolyFillType.pftPositive:
      if (edge.WindCnt != 1)
        return false;
      break;
    default:
      if (edge.WindCnt != -1)
        return false;
      break;
    }
    switch (this.m_ClipType)
    {
    case ClipperLib.ClipType.ctIntersection:
      switch (pft2)
      {
      case ClipperLib.PolyFillType.pftEvenOdd:
      case ClipperLib.PolyFillType.pftNonZero:
        return (edge.WindCnt2 !== 0);
      case ClipperLib.PolyFillType.pftPositive:
        return (edge.WindCnt2 > 0);
      default:
        return (edge.WindCnt2 < 0);
      }
    case ClipperLib.ClipType.ctUnion:
      switch (pft2)
      {
      case ClipperLib.PolyFillType.pftEvenOdd:
      case ClipperLib.PolyFillType.pftNonZero:
        return (edge.WindCnt2 === 0);
      case ClipperLib.PolyFillType.pftPositive:
        return (edge.WindCnt2 <= 0);
      default:
        return (edge.WindCnt2 >= 0);
      }
    case ClipperLib.ClipType.ctDifference:
      if (edge.PolyTyp == ClipperLib.PolyType.ptSubject)
        switch (pft2)
        {
        case ClipperLib.PolyFillType.pftEvenOdd:
        case ClipperLib.PolyFillType.pftNonZero:
          return (edge.WindCnt2 === 0);
        case ClipperLib.PolyFillType.pftPositive:
          return (edge.WindCnt2 <= 0);
        default:
          return (edge.WindCnt2 >= 0);
        }
      else
        switch (pft2)
        {
        case ClipperLib.PolyFillType.pftEvenOdd:
        case ClipperLib.PolyFillType.pftNonZero:
          return (edge.WindCnt2 !== 0);
        case ClipperLib.PolyFillType.pftPositive:
          return (edge.WindCnt2 > 0);
        default:
          return (edge.WindCnt2 < 0);
        }
    case ClipperLib.ClipType.ctXor:
      if (edge.WindDelta === 0)
        switch (pft2)
        {
        case ClipperLib.PolyFillType.pftEvenOdd:
        case ClipperLib.PolyFillType.pftNonZero:
          return (edge.WindCnt2 === 0);
        case ClipperLib.PolyFillType.pftPositive:
          return (edge.WindCnt2 <= 0);
        default:
          return (edge.WindCnt2 >= 0);
        }
      else
        return true;
    }
    return true;
  };
  ClipperLib.Clipper.prototype.SetWindingCount = function (edge)
  {
    var e = edge.PrevInAEL;
    //find the edge of the same polytype that immediately preceeds 'edge' in AEL
    while (e !== null && ((e.PolyTyp != edge.PolyTyp) || (e.WindDelta === 0)))
      e = e.PrevInAEL;
    if (e === null)
    {
      edge.WindCnt = (edge.WindDelta === 0 ? 1 : edge.WindDelta);
      edge.WindCnt2 = 0;
      e = this.m_ActiveEdges;
      //ie get ready to calc WindCnt2
    }
    else if (edge.WindDelta === 0 && this.m_ClipType != ClipperLib.ClipType.ctUnion)
    {
      edge.WindCnt = 1;
      edge.WindCnt2 = e.WindCnt2;
      e = e.NextInAEL;
      //ie get ready to calc WindCnt2
    }
    else if (this.IsEvenOddFillType(edge))
    {
      //EvenOdd filling ...
      if (edge.WindDelta === 0)
      {
        //are we inside a subj polygon ...
        var Inside = true;
        var e2 = e.PrevInAEL;
        while (e2 !== null)
        {
          if (e2.PolyTyp == e.PolyTyp && e2.WindDelta !== 0)
            Inside = !Inside;
          e2 = e2.PrevInAEL;
        }
        edge.WindCnt = (Inside ? 0 : 1);
      }
      else
      {
        edge.WindCnt = edge.WindDelta;
      }
      edge.WindCnt2 = e.WindCnt2;
      e = e.NextInAEL;
      //ie get ready to calc WindCnt2
    }
    else
    {
      //nonZero, Positive or Negative filling ...
      if (e.WindCnt * e.WindDelta < 0)
      {
        //prev edge is 'decreasing' WindCount (WC) toward zero
        //so we're outside the previous polygon ...
        if (Math.abs(e.WindCnt) > 1)
        {
          //outside prev poly but still inside another.
          //when reversing direction of prev poly use the same WC
          if (e.WindDelta * edge.WindDelta < 0)
            edge.WindCnt = e.WindCnt;
          else
            edge.WindCnt = e.WindCnt + edge.WindDelta;
        }
        else
          edge.WindCnt = (edge.WindDelta === 0 ? 1 : edge.WindDelta);
      }
      else
      {
        //prev edge is 'increasing' WindCount (WC) away from zero
        //so we're inside the previous polygon ...
        if (edge.WindDelta === 0)
          edge.WindCnt = (e.WindCnt < 0 ? e.WindCnt - 1 : e.WindCnt + 1);
        else if (e.WindDelta * edge.WindDelta < 0)
          edge.WindCnt = e.WindCnt;
        else
          edge.WindCnt = e.WindCnt + edge.WindDelta;
      }
      edge.WindCnt2 = e.WindCnt2;
      e = e.NextInAEL;
      //ie get ready to calc WindCnt2
    }
    //update WindCnt2 ...
    if (this.IsEvenOddAltFillType(edge))
    {
      //EvenOdd filling ...
      while (e != edge)
      {
        if (e.WindDelta !== 0)
          edge.WindCnt2 = (edge.WindCnt2 === 0 ? 1 : 0);
        e = e.NextInAEL;
      }
    }
    else
    {
      //nonZero, Positive or Negative filling ...
      while (e != edge)
      {
        edge.WindCnt2 += e.WindDelta;
        e = e.NextInAEL;
      }
    }
  };
  ClipperLib.Clipper.prototype.AddEdgeToSEL = function (edge)
  {
    //SEL pointers in PEdge are reused to build a list of horizontal edges.
    //However, we don't need to worry about order with horizontal edge processing.
    if (this.m_SortedEdges === null)
    {
      this.m_SortedEdges = edge;
      edge.PrevInSEL = null;
      edge.NextInSEL = null;
    }
    else
    {
      edge.NextInSEL = this.m_SortedEdges;
      edge.PrevInSEL = null;
      this.m_SortedEdges.PrevInSEL = edge;
      this.m_SortedEdges = edge;
    }
  };
  ClipperLib.Clipper.prototype.CopyAELToSEL = function ()
  {
    var e = this.m_ActiveEdges;
    this.m_SortedEdges = e;
    while (e !== null)
    {
      e.PrevInSEL = e.PrevInAEL;
      e.NextInSEL = e.NextInAEL;
      e = e.NextInAEL;
    }
  };
  ClipperLib.Clipper.prototype.SwapPositionsInAEL = function (edge1, edge2)
  {
    //check that one or other edge hasn't already been removed from AEL ...
    if (edge1.NextInAEL == edge1.PrevInAEL || edge2.NextInAEL == edge2.PrevInAEL)
      return;
    if (edge1.NextInAEL == edge2)
    {
      var next = edge2.NextInAEL;
      if (next !== null)
        next.PrevInAEL = edge1;
      var prev = edge1.PrevInAEL;
      if (prev !== null)
        prev.NextInAEL = edge2;
      edge2.PrevInAEL = prev;
      edge2.NextInAEL = edge1;
      edge1.PrevInAEL = edge2;
      edge1.NextInAEL = next;
    }
    else if (edge2.NextInAEL == edge1)
    {
      var next = edge1.NextInAEL;
      if (next !== null)
        next.PrevInAEL = edge2;
      var prev = edge2.PrevInAEL;
      if (prev !== null)
        prev.NextInAEL = edge1;
      edge1.PrevInAEL = prev;
      edge1.NextInAEL = edge2;
      edge2.PrevInAEL = edge1;
      edge2.NextInAEL = next;
    }
    else
    {
      var next = edge1.NextInAEL;
      var prev = edge1.PrevInAEL;
      edge1.NextInAEL = edge2.NextInAEL;
      if (edge1.NextInAEL !== null)
        edge1.NextInAEL.PrevInAEL = edge1;
      edge1.PrevInAEL = edge2.PrevInAEL;
      if (edge1.PrevInAEL !== null)
        edge1.PrevInAEL.NextInAEL = edge1;
      edge2.NextInAEL = next;
      if (edge2.NextInAEL !== null)
        edge2.NextInAEL.PrevInAEL = edge2;
      edge2.PrevInAEL = prev;
      if (edge2.PrevInAEL !== null)
        edge2.PrevInAEL.NextInAEL = edge2;
    }
    if (edge1.PrevInAEL === null)
      this.m_ActiveEdges = edge1;
    else if (edge2.PrevInAEL === null)
      this.m_ActiveEdges = edge2;
  };
  ClipperLib.Clipper.prototype.SwapPositionsInSEL = function (edge1, edge2)
  {
    if (edge1.NextInSEL === null && edge1.PrevInSEL === null)
      return;
    if (edge2.NextInSEL === null && edge2.PrevInSEL === null)
      return;
    if (edge1.NextInSEL == edge2)
    {
      var next = edge2.NextInSEL;
      if (next !== null)
        next.PrevInSEL = edge1;
      var prev = edge1.PrevInSEL;
      if (prev !== null)
        prev.NextInSEL = edge2;
      edge2.PrevInSEL = prev;
      edge2.NextInSEL = edge1;
      edge1.PrevInSEL = edge2;
      edge1.NextInSEL = next;
    }
    else if (edge2.NextInSEL == edge1)
    {
      var next = edge1.NextInSEL;
      if (next !== null)
        next.PrevInSEL = edge2;
      var prev = edge2.PrevInSEL;
      if (prev !== null)
        prev.NextInSEL = edge1;
      edge1.PrevInSEL = prev;
      edge1.NextInSEL = edge2;
      edge2.PrevInSEL = edge1;
      edge2.NextInSEL = next;
    }
    else
    {
      var next = edge1.NextInSEL;
      var prev = edge1.PrevInSEL;
      edge1.NextInSEL = edge2.NextInSEL;
      if (edge1.NextInSEL !== null)
        edge1.NextInSEL.PrevInSEL = edge1;
      edge1.PrevInSEL = edge2.PrevInSEL;
      if (edge1.PrevInSEL !== null)
        edge1.PrevInSEL.NextInSEL = edge1;
      edge2.NextInSEL = next;
      if (edge2.NextInSEL !== null)
        edge2.NextInSEL.PrevInSEL = edge2;
      edge2.PrevInSEL = prev;
      if (edge2.PrevInSEL !== null)
        edge2.PrevInSEL.NextInSEL = edge2;
    }
    if (edge1.PrevInSEL === null)
      this.m_SortedEdges = edge1;
    else if (edge2.PrevInSEL === null)
      this.m_SortedEdges = edge2;
  };
  ClipperLib.Clipper.prototype.AddLocalMaxPoly = function (e1, e2, pt)
  {
    this.AddOutPt(e1, pt);
    if (e2.WindDelta == 0) this.AddOutPt(e2, pt);
    if (e1.OutIdx == e2.OutIdx)
    {
      e1.OutIdx = -1;
      e2.OutIdx = -1;
    }
    else if (e1.OutIdx < e2.OutIdx)
      this.AppendPolygon(e1, e2);
    else
      this.AppendPolygon(e2, e1);
  };
  ClipperLib.Clipper.prototype.AddLocalMinPoly = function (e1, e2, pt)
  {
    var result;
    var e, prevE;
    if (ClipperLib.ClipperBase.IsHorizontal(e2) || (e1.Dx > e2.Dx))
    {
      result = this.AddOutPt(e1, pt);
      e2.OutIdx = e1.OutIdx;
      e1.Side = ClipperLib.EdgeSide.esLeft;
      e2.Side = ClipperLib.EdgeSide.esRight;
      e = e1;
      if (e.PrevInAEL == e2)
        prevE = e2.PrevInAEL;
      else
        prevE = e.PrevInAEL;
    }
    else
    {
      result = this.AddOutPt(e2, pt);
      e1.OutIdx = e2.OutIdx;
      e1.Side = ClipperLib.EdgeSide.esRight;
      e2.Side = ClipperLib.EdgeSide.esLeft;
      e = e2;
      if (e.PrevInAEL == e1)
        prevE = e1.PrevInAEL;
      else
        prevE = e.PrevInAEL;
    }
    if (prevE !== null && prevE.OutIdx >= 0 && (ClipperLib.Clipper.TopX(prevE, pt.Y) == ClipperLib.Clipper.TopX(e, pt.Y)) && ClipperLib.ClipperBase.SlopesEqual(e, prevE, this.m_UseFullRange) && (e.WindDelta !== 0) && (prevE.WindDelta !== 0))
    {
      var outPt = this.AddOutPt(prevE, pt);
      this.AddJoin(result, outPt, e.Top);
    }
    return result;
  };
  ClipperLib.Clipper.prototype.CreateOutRec = function ()
  {
    var result = new ClipperLib.OutRec();
    result.Idx = -1;
    result.IsHole = false;
    result.IsOpen = false;
    result.FirstLeft = null;
    result.Pts = null;
    result.BottomPt = null;
    result.PolyNode = null;
    this.m_PolyOuts.push(result);
    result.Idx = this.m_PolyOuts.length - 1;
    return result;
  };
  ClipperLib.Clipper.prototype.AddOutPt = function (e, pt)
  {
    var ToFront = (e.Side == ClipperLib.EdgeSide.esLeft);
    if (e.OutIdx < 0)
    {
      var outRec = this.CreateOutRec();
      outRec.IsOpen = (e.WindDelta === 0);
      var newOp = new ClipperLib.OutPt();
      outRec.Pts = newOp;
      newOp.Idx = outRec.Idx;
      //newOp.Pt = pt;
      newOp.Pt.X = pt.X;
      newOp.Pt.Y = pt.Y;
      newOp.Next = newOp;
      newOp.Prev = newOp;
      if (!outRec.IsOpen)
        this.SetHoleState(e, outRec);
      e.OutIdx = outRec.Idx;
      //nb: do this after SetZ !
      return newOp;
    }
    else
    {
      var outRec = this.m_PolyOuts[e.OutIdx];
      //OutRec.Pts is the 'Left-most' point & OutRec.Pts.Prev is the 'Right-most'
      var op = outRec.Pts;
      if (ToFront && ClipperLib.IntPoint.op_Equality(pt, op.Pt))
        return op;
      else if (!ToFront && ClipperLib.IntPoint.op_Equality(pt, op.Prev.Pt))
        return op.Prev;
      var newOp = new ClipperLib.OutPt();
      newOp.Idx = outRec.Idx;
      //newOp.Pt = pt;
      newOp.Pt.X = pt.X;
      newOp.Pt.Y = pt.Y;
      newOp.Next = op;
      newOp.Prev = op.Prev;
      newOp.Prev.Next = newOp;
      op.Prev = newOp;
      if (ToFront)
        outRec.Pts = newOp;
      return newOp;
    }
  };
  ClipperLib.Clipper.prototype.SwapPoints = function (pt1, pt2)
  {
    var tmp = new ClipperLib.IntPoint(pt1.Value);
    //pt1.Value = pt2.Value;
    pt1.Value.X = pt2.Value.X;
    pt1.Value.Y = pt2.Value.Y;
    //pt2.Value = tmp;
    pt2.Value.X = tmp.X;
    pt2.Value.Y = tmp.Y;
  };
  ClipperLib.Clipper.prototype.HorzSegmentsOverlap = function (seg1a, seg1b, seg2a, seg2b)
	{
		var tmp;
		if (seg1a > seg1b)
		{
			tmp = seg1a;
			seg1a = seg1b;
			seg1b = tmp;
		}
		if (seg2a > seg2b)
		{
			tmp = seg2a;
			seg2a = seg2b;
			seg2b = tmp;
		}
		return (seg1a < seg2b) && (seg2a < seg1b);
	}

  ClipperLib.Clipper.prototype.SetHoleState = function (e, outRec)
  {
    var isHole = false;
    var e2 = e.PrevInAEL;
    while (e2 !== null)
    {
      if (e2.OutIdx >= 0 && e2.WindDelta != 0)
      {
        isHole = !isHole;
        if (outRec.FirstLeft === null)
          outRec.FirstLeft = this.m_PolyOuts[e2.OutIdx];
      }
      e2 = e2.PrevInAEL;
    }
    if (isHole)
      outRec.IsHole = true;
  };
  ClipperLib.Clipper.prototype.GetDx = function (pt1, pt2)
  {
    if (pt1.Y == pt2.Y)
      return ClipperLib.ClipperBase.horizontal;
    else
      return (pt2.X - pt1.X) / (pt2.Y - pt1.Y);
  };
  ClipperLib.Clipper.prototype.FirstIsBottomPt = function (btmPt1, btmPt2)
  {
    var p = btmPt1.Prev;
    while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt1.Pt)) && (p != btmPt1))
      p = p.Prev;
    var dx1p = Math.abs(this.GetDx(btmPt1.Pt, p.Pt));
    p = btmPt1.Next;
    while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt1.Pt)) && (p != btmPt1))
      p = p.Next;
    var dx1n = Math.abs(this.GetDx(btmPt1.Pt, p.Pt));
    p = btmPt2.Prev;
    while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt2.Pt)) && (p != btmPt2))
      p = p.Prev;
    var dx2p = Math.abs(this.GetDx(btmPt2.Pt, p.Pt));
    p = btmPt2.Next;
    while ((ClipperLib.IntPoint.op_Equality(p.Pt, btmPt2.Pt)) && (p != btmPt2))
      p = p.Next;
    var dx2n = Math.abs(this.GetDx(btmPt2.Pt, p.Pt));
    return (dx1p >= dx2p && dx1p >= dx2n) || (dx1n >= dx2p && dx1n >= dx2n);
  };
  ClipperLib.Clipper.prototype.GetBottomPt = function (pp)
  {
    var dups = null;
    var p = pp.Next;
    while (p != pp)
    {
      if (p.Pt.Y > pp.Pt.Y)
      {
        pp = p;
        dups = null;
      }
      else if (p.Pt.Y == pp.Pt.Y && p.Pt.X <= pp.Pt.X)
      {
        if (p.Pt.X < pp.Pt.X)
        {
          dups = null;
          pp = p;
        }
        else
        {
          if (p.Next != pp && p.Prev != pp)
            dups = p;
        }
      }
      p = p.Next;
    }
    if (dups !== null)
    {
      //there appears to be at least 2 vertices at bottomPt so ...
      while (dups != p)
      {
        if (!this.FirstIsBottomPt(p, dups))
          pp = dups;
        dups = dups.Next;
        while (ClipperLib.IntPoint.op_Inequality(dups.Pt, pp.Pt))
          dups = dups.Next;
      }
    }
    return pp;
  };
  ClipperLib.Clipper.prototype.GetLowermostRec = function (outRec1, outRec2)
  {
    //work out which polygon fragment has the correct hole state ...
    if (outRec1.BottomPt === null)
      outRec1.BottomPt = this.GetBottomPt(outRec1.Pts);
    if (outRec2.BottomPt === null)
      outRec2.BottomPt = this.GetBottomPt(outRec2.Pts);
    var bPt1 = outRec1.BottomPt;
    var bPt2 = outRec2.BottomPt;
    if (bPt1.Pt.Y > bPt2.Pt.Y)
      return outRec1;
    else if (bPt1.Pt.Y < bPt2.Pt.Y)
      return outRec2;
    else if (bPt1.Pt.X < bPt2.Pt.X)
      return outRec1;
    else if (bPt1.Pt.X > bPt2.Pt.X)
      return outRec2;
    else if (bPt1.Next == bPt1)
      return outRec2;
    else if (bPt2.Next == bPt2)
      return outRec1;
    else if (this.FirstIsBottomPt(bPt1, bPt2))
      return outRec1;
    else
      return outRec2;
  };
  ClipperLib.Clipper.prototype.Param1RightOfParam2 = function (outRec1, outRec2)
  {
    do {
      outRec1 = outRec1.FirstLeft;
      if (outRec1 == outRec2)
        return true;
    }
    while (outRec1 !== null)
    return false;
  };
  ClipperLib.Clipper.prototype.GetOutRec = function (idx)
  {
    var outrec = this.m_PolyOuts[idx];
    while (outrec != this.m_PolyOuts[outrec.Idx])
      outrec = this.m_PolyOuts[outrec.Idx];
    return outrec;
  };
  ClipperLib.Clipper.prototype.AppendPolygon = function (e1, e2)
  {
    //get the start and ends of both output polygons ...
    var outRec1 = this.m_PolyOuts[e1.OutIdx];
    var outRec2 = this.m_PolyOuts[e2.OutIdx];
    var holeStateRec;
    if (this.Param1RightOfParam2(outRec1, outRec2))
      holeStateRec = outRec2;
    else if (this.Param1RightOfParam2(outRec2, outRec1))
      holeStateRec = outRec1;
    else
      holeStateRec = this.GetLowermostRec(outRec1, outRec2);
    var p1_lft = outRec1.Pts;
    var p1_rt = p1_lft.Prev;
    var p2_lft = outRec2.Pts;
    var p2_rt = p2_lft.Prev;
    var side;
    //join e2 poly onto e1 poly and delete pointers to e2 ...
    if (e1.Side == ClipperLib.EdgeSide.esLeft)
    {
      if (e2.Side == ClipperLib.EdgeSide.esLeft)
      {
        //z y x a b c
        this.ReversePolyPtLinks(p2_lft);
        p2_lft.Next = p1_lft;
        p1_lft.Prev = p2_lft;
        p1_rt.Next = p2_rt;
        p2_rt.Prev = p1_rt;
        outRec1.Pts = p2_rt;
      }
      else
      {
        //x y z a b c
        p2_rt.Next = p1_lft;
        p1_lft.Prev = p2_rt;
        p2_lft.Prev = p1_rt;
        p1_rt.Next = p2_lft;
        outRec1.Pts = p2_lft;
      }
      side = ClipperLib.EdgeSide.esLeft;
    }
    else
    {
      if (e2.Side == ClipperLib.EdgeSide.esRight)
      {
        //a b c z y x
        this.ReversePolyPtLinks(p2_lft);
        p1_rt.Next = p2_rt;
        p2_rt.Prev = p1_rt;
        p2_lft.Next = p1_lft;
        p1_lft.Prev = p2_lft;
      }
      else
      {
        //a b c x y z
        p1_rt.Next = p2_lft;
        p2_lft.Prev = p1_rt;
        p1_lft.Prev = p2_rt;
        p2_rt.Next = p1_lft;
      }
      side = ClipperLib.EdgeSide.esRight;
    }
    outRec1.BottomPt = null;
    if (holeStateRec == outRec2)
    {
      if (outRec2.FirstLeft != outRec1)
        outRec1.FirstLeft = outRec2.FirstLeft;
      outRec1.IsHole = outRec2.IsHole;
    }
    outRec2.Pts = null;
    outRec2.BottomPt = null;
    outRec2.FirstLeft = outRec1;
    var OKIdx = e1.OutIdx;
    var ObsoleteIdx = e2.OutIdx;
    e1.OutIdx = -1;
    //nb: safe because we only get here via AddLocalMaxPoly
    e2.OutIdx = -1;
    var e = this.m_ActiveEdges;
    while (e !== null)
    {
      if (e.OutIdx == ObsoleteIdx)
      {
        e.OutIdx = OKIdx;
        e.Side = side;
        break;
      }
      e = e.NextInAEL;
    }
    outRec2.Idx = outRec1.Idx;
  };
  ClipperLib.Clipper.prototype.ReversePolyPtLinks = function (pp)
  {
    if (pp === null)
      return;
    var pp1;
    var pp2;
    pp1 = pp;
    do {
      pp2 = pp1.Next;
      pp1.Next = pp1.Prev;
      pp1.Prev = pp2;
      pp1 = pp2;
    }
    while (pp1 != pp)
  };
  ClipperLib.Clipper.SwapSides = function (edge1, edge2)
  {
    var side = edge1.Side;
    edge1.Side = edge2.Side;
    edge2.Side = side;
  };
  ClipperLib.Clipper.SwapPolyIndexes = function (edge1, edge2)
  {
    var outIdx = edge1.OutIdx;
    edge1.OutIdx = edge2.OutIdx;
    edge2.OutIdx = outIdx;
  };
  ClipperLib.Clipper.prototype.IntersectEdges = function (e1, e2, pt)
  {
    //e1 will be to the left of e2 BELOW the intersection. Therefore e1 is before
    //e2 in AEL except when e1 is being inserted at the intersection point ...
    var e1Contributing = (e1.OutIdx >= 0);
    var e2Contributing = (e2.OutIdx >= 0);

    if (use_xyz)
    	this.SetZ(pt, e1, e2);

    if (use_lines)
    {
      //if either edge is on an OPEN path ...
      if (e1.WindDelta === 0 || e2.WindDelta === 0)
      {
        //ignore subject-subject open path intersections UNLESS they
        //are both open paths, AND they are both 'contributing maximas' ...
				if (e1.WindDelta == 0 && e2.WindDelta == 0) return;
        //if intersecting a subj line with a subj poly ...
        else if (e1.PolyTyp == e2.PolyTyp &&
          e1.WindDelta != e2.WindDelta && this.m_ClipType == ClipperLib.ClipType.ctUnion)
        {
          if (e1.WindDelta === 0)
          {
            if (e2Contributing)
            {
              this.AddOutPt(e1, pt);
              if (e1Contributing)
                e1.OutIdx = -1;
            }
          }
          else
          {
            if (e1Contributing)
            {
              this.AddOutPt(e2, pt);
              if (e2Contributing)
                e2.OutIdx = -1;
            }
          }
        }
        else if (e1.PolyTyp != e2.PolyTyp)
        {
          if ((e1.WindDelta === 0) && Math.abs(e2.WindCnt) == 1 &&
            (this.m_ClipType != ClipperLib.ClipType.ctUnion || e2.WindCnt2 === 0))
          {
            this.AddOutPt(e1, pt);
            if (e1Contributing)
              e1.OutIdx = -1;
          }
          else if ((e2.WindDelta === 0) && (Math.abs(e1.WindCnt) == 1) &&
            (this.m_ClipType != ClipperLib.ClipType.ctUnion || e1.WindCnt2 === 0))
          {
            this.AddOutPt(e2, pt);
            if (e2Contributing)
              e2.OutIdx = -1;
          }
        }
        return;
      }
    }
    //update winding counts...
    //assumes that e1 will be to the Right of e2 ABOVE the intersection
    if (e1.PolyTyp == e2.PolyTyp)
    {
      if (this.IsEvenOddFillType(e1))
      {
        var oldE1WindCnt = e1.WindCnt;
        e1.WindCnt = e2.WindCnt;
        e2.WindCnt = oldE1WindCnt;
      }
      else
      {
        if (e1.WindCnt + e2.WindDelta === 0)
          e1.WindCnt = -e1.WindCnt;
        else
          e1.WindCnt += e2.WindDelta;
        if (e2.WindCnt - e1.WindDelta === 0)
          e2.WindCnt = -e2.WindCnt;
        else
          e2.WindCnt -= e1.WindDelta;
      }
    }
    else
    {
      if (!this.IsEvenOddFillType(e2))
        e1.WindCnt2 += e2.WindDelta;
      else
        e1.WindCnt2 = (e1.WindCnt2 === 0) ? 1 : 0;
      if (!this.IsEvenOddFillType(e1))
        e2.WindCnt2 -= e1.WindDelta;
      else
        e2.WindCnt2 = (e2.WindCnt2 === 0) ? 1 : 0;
    }
    var e1FillType, e2FillType, e1FillType2, e2FillType2;
    if (e1.PolyTyp == ClipperLib.PolyType.ptSubject)
    {
      e1FillType = this.m_SubjFillType;
      e1FillType2 = this.m_ClipFillType;
    }
    else
    {
      e1FillType = this.m_ClipFillType;
      e1FillType2 = this.m_SubjFillType;
    }
    if (e2.PolyTyp == ClipperLib.PolyType.ptSubject)
    {
      e2FillType = this.m_SubjFillType;
      e2FillType2 = this.m_ClipFillType;
    }
    else
    {
      e2FillType = this.m_ClipFillType;
      e2FillType2 = this.m_SubjFillType;
    }
    var e1Wc, e2Wc;
    switch (e1FillType)
    {
    case ClipperLib.PolyFillType.pftPositive:
      e1Wc = e1.WindCnt;
      break;
    case ClipperLib.PolyFillType.pftNegative:
      e1Wc = -e1.WindCnt;
      break;
    default:
      e1Wc = Math.abs(e1.WindCnt);
      break;
    }
    switch (e2FillType)
    {
    case ClipperLib.PolyFillType.pftPositive:
      e2Wc = e2.WindCnt;
      break;
    case ClipperLib.PolyFillType.pftNegative:
      e2Wc = -e2.WindCnt;
      break;
    default:
      e2Wc = Math.abs(e2.WindCnt);
      break;
    }
    if (e1Contributing && e2Contributing)
    {
			if ((e1Wc != 0 && e1Wc != 1) || (e2Wc != 0 && e2Wc != 1) ||
			(e1.PolyTyp != e2.PolyTyp && this.m_ClipType != ClipperLib.ClipType.ctXor))
			{
				this.AddLocalMaxPoly(e1, e2, pt);
			}
      else
      {
        this.AddOutPt(e1, pt);
        this.AddOutPt(e2, pt);
        ClipperLib.Clipper.SwapSides(e1, e2);
        ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
      }
    }
    else if (e1Contributing)
    {
      if (e2Wc === 0 || e2Wc == 1)
      {
        this.AddOutPt(e1, pt);
        ClipperLib.Clipper.SwapSides(e1, e2);
        ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
      }
    }
    else if (e2Contributing)
    {
      if (e1Wc === 0 || e1Wc == 1)
      {
        this.AddOutPt(e2, pt);
        ClipperLib.Clipper.SwapSides(e1, e2);
        ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
      }
    }
		else if ( (e1Wc == 0 || e1Wc == 1) && (e2Wc == 0 || e2Wc == 1))
    {
      //neither edge is currently contributing ...
      var e1Wc2, e2Wc2;
      switch (e1FillType2)
      {
      case ClipperLib.PolyFillType.pftPositive:
        e1Wc2 = e1.WindCnt2;
        break;
      case ClipperLib.PolyFillType.pftNegative:
        e1Wc2 = -e1.WindCnt2;
        break;
      default:
        e1Wc2 = Math.abs(e1.WindCnt2);
        break;
      }
      switch (e2FillType2)
      {
      case ClipperLib.PolyFillType.pftPositive:
        e2Wc2 = e2.WindCnt2;
        break;
      case ClipperLib.PolyFillType.pftNegative:
        e2Wc2 = -e2.WindCnt2;
        break;
      default:
        e2Wc2 = Math.abs(e2.WindCnt2);
        break;
      }
      if (e1.PolyTyp != e2.PolyTyp)
      {
        this.AddLocalMinPoly(e1, e2, pt);
      }
      else if (e1Wc == 1 && e2Wc == 1)
        switch (this.m_ClipType)
        {
        case ClipperLib.ClipType.ctIntersection:
          if (e1Wc2 > 0 && e2Wc2 > 0)
            this.AddLocalMinPoly(e1, e2, pt);
          break;
        case ClipperLib.ClipType.ctUnion:
          if (e1Wc2 <= 0 && e2Wc2 <= 0)
            this.AddLocalMinPoly(e1, e2, pt);
          break;
        case ClipperLib.ClipType.ctDifference:
          if (((e1.PolyTyp == ClipperLib.PolyType.ptClip) && (e1Wc2 > 0) && (e2Wc2 > 0)) ||
            ((e1.PolyTyp == ClipperLib.PolyType.ptSubject) && (e1Wc2 <= 0) && (e2Wc2 <= 0)))
            this.AddLocalMinPoly(e1, e2, pt);
          break;
        case ClipperLib.ClipType.ctXor:
          this.AddLocalMinPoly(e1, e2, pt);
          break;
        }
      else
        ClipperLib.Clipper.SwapSides(e1, e2);
    }
  };
  ClipperLib.Clipper.prototype.DeleteFromAEL = function (e)
  {
    var AelPrev = e.PrevInAEL;
    var AelNext = e.NextInAEL;
    if (AelPrev === null && AelNext === null && (e != this.m_ActiveEdges))
      return;
    //already deleted
    if (AelPrev !== null)
      AelPrev.NextInAEL = AelNext;
    else
      this.m_ActiveEdges = AelNext;
    if (AelNext !== null)
      AelNext.PrevInAEL = AelPrev;
    e.NextInAEL = null;
    e.PrevInAEL = null;
  };
  ClipperLib.Clipper.prototype.DeleteFromSEL = function (e)
  {
    var SelPrev = e.PrevInSEL;
    var SelNext = e.NextInSEL;
    if (SelPrev === null && SelNext === null && (e != this.m_SortedEdges))
      return;
    //already deleted
    if (SelPrev !== null)
      SelPrev.NextInSEL = SelNext;
    else
      this.m_SortedEdges = SelNext;
    if (SelNext !== null)
      SelNext.PrevInSEL = SelPrev;
    e.NextInSEL = null;
    e.PrevInSEL = null;
  };
  ClipperLib.Clipper.prototype.UpdateEdgeIntoAEL = function (e)
  {
    if (e.NextInLML === null)
      ClipperLib.Error("UpdateEdgeIntoAEL: invalid call");
    var AelPrev = e.PrevInAEL;
    var AelNext = e.NextInAEL;
    e.NextInLML.OutIdx = e.OutIdx;
    if (AelPrev !== null)
      AelPrev.NextInAEL = e.NextInLML;
    else
      this.m_ActiveEdges = e.NextInLML;
    if (AelNext !== null)
      AelNext.PrevInAEL = e.NextInLML;
    e.NextInLML.Side = e.Side;
    e.NextInLML.WindDelta = e.WindDelta;
    e.NextInLML.WindCnt = e.WindCnt;
    e.NextInLML.WindCnt2 = e.WindCnt2;
    e = e.NextInLML;
    //    e.Curr = e.Bot;
    e.Curr.X = e.Bot.X;
    e.Curr.Y = e.Bot.Y;
    e.PrevInAEL = AelPrev;
    e.NextInAEL = AelNext;
    if (!ClipperLib.ClipperBase.IsHorizontal(e))
      this.InsertScanbeam(e.Top.Y);
    return e;
  };
  ClipperLib.Clipper.prototype.ProcessHorizontals = function (isTopOfScanbeam)
  {
    var horzEdge = this.m_SortedEdges;
    while (horzEdge !== null)
    {
      this.DeleteFromSEL(horzEdge);
      this.ProcessHorizontal(horzEdge, isTopOfScanbeam);
      horzEdge = this.m_SortedEdges;
    }
  };
  ClipperLib.Clipper.prototype.GetHorzDirection = function (HorzEdge, $var)
  {
    if (HorzEdge.Bot.X < HorzEdge.Top.X)
    {
        $var.Left = HorzEdge.Bot.X;
        $var.Right = HorzEdge.Top.X;
        $var.Dir = ClipperLib.Direction.dLeftToRight;
    }
    else
    {
        $var.Left = HorzEdge.Top.X;
        $var.Right = HorzEdge.Bot.X;
        $var.Dir = ClipperLib.Direction.dRightToLeft;
    }
  };
  ClipperLib.Clipper.prototype.ProcessHorizontal = function (horzEdge, isTopOfScanbeam)
  {
    var $var = {Dir: null, Left: null, Right: null};
    this.GetHorzDirection(horzEdge, $var);
    var dir = $var.Dir;
    var horzLeft = $var.Left;
    var horzRight = $var.Right;

    var eLastHorz = horzEdge,
      eMaxPair = null;
    while (eLastHorz.NextInLML !== null && ClipperLib.ClipperBase.IsHorizontal(eLastHorz.NextInLML))
      eLastHorz = eLastHorz.NextInLML;
    if (eLastHorz.NextInLML === null)
      eMaxPair = this.GetMaximaPair(eLastHorz);
    for (;;)
    {
      var IsLastHorz = (horzEdge == eLastHorz);
      var e = this.GetNextInAEL(horzEdge, dir);
      while (e !== null)
      {
        //Break if we've got to the end of an intermediate horizontal edge ...
        //nb: Smaller Dx's are to the right of larger Dx's ABOVE the horizontal.
        if (e.Curr.X == horzEdge.Top.X && horzEdge.NextInLML !== null && e.Dx < horzEdge.NextInLML.Dx)
          break;
        var eNext = this.GetNextInAEL(e, dir);
        //saves eNext for later
        if ((dir == ClipperLib.Direction.dLeftToRight && e.Curr.X <= horzRight) || (dir == ClipperLib.Direction.dRightToLeft && e.Curr.X >= horzLeft))
        {
          //so far we're still in range of the horizontal Edge  but make sure
          //we're at the last of consec. horizontals when matching with eMaxPair
          if (e == eMaxPair && IsLastHorz)
          {
						if (horzEdge.OutIdx >= 0)
						{
							var op1 = this.AddOutPt(horzEdge, horzEdge.Top);
							var eNextHorz = this.m_SortedEdges;
							while (eNextHorz !== null)
							{
								if (eNextHorz.OutIdx >= 0 &&
									this.HorzSegmentsOverlap(horzEdge.Bot.X,
									horzEdge.Top.X, eNextHorz.Bot.X, eNextHorz.Top.X))
								{
									var op2 = this.AddOutPt(eNextHorz, eNextHorz.Bot);
									this.AddJoin(op2, op1, eNextHorz.Top);
								}
								eNextHorz = eNextHorz.NextInSEL;
							}
							this.AddGhostJoin(op1, horzEdge.Bot);
							this.AddLocalMaxPoly(horzEdge, eMaxPair, horzEdge.Top);
						}
						this.DeleteFromAEL(horzEdge);
						this.DeleteFromAEL(eMaxPair);
            return;
          }
          else if (dir == ClipperLib.Direction.dLeftToRight)
          {
            var Pt = new ClipperLib.IntPoint(e.Curr.X, horzEdge.Curr.Y);
            this.IntersectEdges(horzEdge, e, Pt);
          }
          else
          {
            var Pt = new ClipperLib.IntPoint(e.Curr.X, horzEdge.Curr.Y);
            this.IntersectEdges(e, horzEdge, Pt);
          }
          this.SwapPositionsInAEL(horzEdge, e);
        }
        else if ((dir == ClipperLib.Direction.dLeftToRight && e.Curr.X >= horzRight) || (dir == ClipperLib.Direction.dRightToLeft && e.Curr.X <= horzLeft))
          break;
        e = eNext;
      }
      //end while
      if (horzEdge.NextInLML !== null && ClipperLib.ClipperBase.IsHorizontal(horzEdge.NextInLML))
      {
        horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
        if (horzEdge.OutIdx >= 0)
          this.AddOutPt(horzEdge, horzEdge.Bot);

          var $var = {Dir: dir, Left: horzLeft, Right: horzRight};
          this.GetHorzDirection(horzEdge, $var);
          dir = $var.Dir;
          horzLeft = $var.Left;
          horzRight = $var.Right;
      }
      else
        break;
    }
    //end for (;;)
    if (horzEdge.NextInLML !== null)
    {
      if (horzEdge.OutIdx >= 0)
      {
        var op1 = this.AddOutPt(horzEdge, horzEdge.Top);
				if (isTopOfScanbeam) this.AddGhostJoin(op1, horzEdge.Bot);
        horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
        if (horzEdge.WindDelta === 0)
          return;
        //nb: HorzEdge is no longer horizontal here
        var ePrev = horzEdge.PrevInAEL;
        var eNext = horzEdge.NextInAEL;
        if (ePrev !== null && ePrev.Curr.X == horzEdge.Bot.X &&
          ePrev.Curr.Y == horzEdge.Bot.Y && ePrev.WindDelta !== 0 &&
          (ePrev.OutIdx >= 0 && ePrev.Curr.Y > ePrev.Top.Y &&
            ClipperLib.ClipperBase.SlopesEqual(horzEdge, ePrev, this.m_UseFullRange)))
        {
          var op2 = this.AddOutPt(ePrev, horzEdge.Bot);
          this.AddJoin(op1, op2, horzEdge.Top);
        }
        else if (eNext !== null && eNext.Curr.X == horzEdge.Bot.X &&
          eNext.Curr.Y == horzEdge.Bot.Y && eNext.WindDelta !== 0 &&
          eNext.OutIdx >= 0 && eNext.Curr.Y > eNext.Top.Y &&
          ClipperLib.ClipperBase.SlopesEqual(horzEdge, eNext, this.m_UseFullRange))
        {
          var op2 = this.AddOutPt(eNext, horzEdge.Bot);
          this.AddJoin(op1, op2, horzEdge.Top);
        }
      }
      else horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
    }
  	else
    {
      if (horzEdge.OutIdx >= 0)
        this.AddOutPt(horzEdge, horzEdge.Top);
      this.DeleteFromAEL(horzEdge);
    }
  };
  ClipperLib.Clipper.prototype.GetNextInAEL = function (e, Direction)
  {
    return Direction == ClipperLib.Direction.dLeftToRight ? e.NextInAEL : e.PrevInAEL;
  };
  ClipperLib.Clipper.prototype.IsMinima = function (e)
  {
    return e !== null && (e.Prev.NextInLML != e) && (e.Next.NextInLML != e);
  };
  ClipperLib.Clipper.prototype.IsMaxima = function (e, Y)
  {
    return (e !== null && e.Top.Y == Y && e.NextInLML === null);
  };
  ClipperLib.Clipper.prototype.IsIntermediate = function (e, Y)
  {
    return (e.Top.Y == Y && e.NextInLML !== null);
  };
  ClipperLib.Clipper.prototype.GetMaximaPair = function (e)
  {
    var result = null;
    if ((ClipperLib.IntPoint.op_Equality(e.Next.Top, e.Top)) && e.Next.NextInLML === null)
      result = e.Next;
    else if ((ClipperLib.IntPoint.op_Equality(e.Prev.Top, e.Top)) && e.Prev.NextInLML === null)
      result = e.Prev;
    if (result !== null && (result.OutIdx == -2 || (result.NextInAEL == result.PrevInAEL && !ClipperLib.ClipperBase.IsHorizontal(result))))
      return null;
    return result;
  };

  ClipperLib.Clipper.prototype.ProcessIntersections = function (topY)
  {
    if (this.m_ActiveEdges == null)
      return true;
    try
    {
      this.BuildIntersectList(topY);
      if (this.m_IntersectList.length == 0)
        return true;
      if (this.m_IntersectList.length == 1 || this.FixupIntersectionOrder())
        this.ProcessIntersectList();
      else
        return false;
    }
    catch ($$e2)
    {
      this.m_SortedEdges = null;
      this.m_IntersectList.length = 0;
      ClipperLib.Error("ProcessIntersections error");
    }
    this.m_SortedEdges = null;
    return true;
  };
  ClipperLib.Clipper.prototype.BuildIntersectList = function (topY)
  {
    if (this.m_ActiveEdges === null)
      return;
    //prepare for sorting ...
    var e = this.m_ActiveEdges;
    //console.log(JSON.stringify(JSON.decycle( e )));
    this.m_SortedEdges = e;
    while (e !== null)
    {
      e.PrevInSEL = e.PrevInAEL;
      e.NextInSEL = e.NextInAEL;
      e.Curr.X = ClipperLib.Clipper.TopX(e, topY);
      e = e.NextInAEL;
    }
    //bubblesort ...
    var isModified = true;
    while (isModified && this.m_SortedEdges !== null)
    {
      isModified = false;
      e = this.m_SortedEdges;
      while (e.NextInSEL !== null)
      {
        var eNext = e.NextInSEL;
        var pt = new ClipperLib.IntPoint();
        //console.log("e.Curr.X: " + e.Curr.X + " eNext.Curr.X" + eNext.Curr.X);
        if (e.Curr.X > eNext.Curr.X)
        {
					this.IntersectPoint(e, eNext, pt);
          var newNode = new ClipperLib.IntersectNode();
          newNode.Edge1 = e;
          newNode.Edge2 = eNext;
          //newNode.Pt = pt;
          newNode.Pt.X = pt.X;
          newNode.Pt.Y = pt.Y;
          this.m_IntersectList.push(newNode);
          this.SwapPositionsInSEL(e, eNext);
          isModified = true;
        }
        else
          e = eNext;
      }
      if (e.PrevInSEL !== null)
        e.PrevInSEL.NextInSEL = null;
      else
        break;
    }
    this.m_SortedEdges = null;
  };
  ClipperLib.Clipper.prototype.EdgesAdjacent = function (inode)
  {
    return (inode.Edge1.NextInSEL == inode.Edge2) || (inode.Edge1.PrevInSEL == inode.Edge2);
  };
  ClipperLib.Clipper.IntersectNodeSort = function (node1, node2)
  {
    //the following typecast is safe because the differences in Pt.Y will
    //be limited to the height of the scanbeam.
    return (node2.Pt.Y - node1.Pt.Y);
  };
  ClipperLib.Clipper.prototype.FixupIntersectionOrder = function ()
  {
    //pre-condition: intersections are sorted bottom-most first.
    //Now it's crucial that intersections are made only between adjacent edges,
    //so to ensure this the order of intersections may need adjusting ...
    this.m_IntersectList.sort(this.m_IntersectNodeComparer);
    this.CopyAELToSEL();
    var cnt = this.m_IntersectList.length;
    for (var i = 0; i < cnt; i++)
    {
      if (!this.EdgesAdjacent(this.m_IntersectList[i]))
      {
        var j = i + 1;
        while (j < cnt && !this.EdgesAdjacent(this.m_IntersectList[j]))
          j++;
        if (j == cnt)
          return false;
        var tmp = this.m_IntersectList[i];
        this.m_IntersectList[i] = this.m_IntersectList[j];
        this.m_IntersectList[j] = tmp;
      }
      this.SwapPositionsInSEL(this.m_IntersectList[i].Edge1, this.m_IntersectList[i].Edge2);
    }
    return true;
  };
  ClipperLib.Clipper.prototype.ProcessIntersectList = function ()
  {
    for (var i = 0, ilen = this.m_IntersectList.length; i < ilen; i++)
    {
      var iNode = this.m_IntersectList[i];
      this.IntersectEdges(iNode.Edge1, iNode.Edge2, iNode.Pt);
      this.SwapPositionsInAEL(iNode.Edge1, iNode.Edge2);
    }
    this.m_IntersectList.length = 0;
  };
  /*
  --------------------------------
  Round speedtest: http://jsperf.com/fastest-round
  --------------------------------
  */
  var R1 = function (a)
  {
    return a < 0 ? Math.ceil(a - 0.5) : Math.round(a)
  };
  var R2 = function (a)
  {
    return a < 0 ? Math.ceil(a - 0.5) : Math.floor(a + 0.5)
  };
  var R3 = function (a)
  {
    return a < 0 ? -Math.round(Math.abs(a)) : Math.round(a)
  };
  var R4 = function (a)
  {
    if (a < 0)
    {
      a -= 0.5;
      return a < -2147483648 ? Math.ceil(a) : a | 0;
    }
    else
    {
      a += 0.5;
      return a > 2147483647 ? Math.floor(a) : a | 0;
    }
  };
  if (browser.msie) ClipperLib.Clipper.Round = R1;
  else if (browser.chromium) ClipperLib.Clipper.Round = R3;
  else if (browser.safari) ClipperLib.Clipper.Round = R4;
  else ClipperLib.Clipper.Round = R2; // eg. browser.chrome || browser.firefox || browser.opera
  ClipperLib.Clipper.TopX = function (edge, currentY)
  {
    //if (edge.Bot == edge.Curr) alert ("edge.Bot = edge.Curr");
    //if (edge.Bot == edge.Top) alert ("edge.Bot = edge.Top");
    if (currentY == edge.Top.Y)
      return edge.Top.X;
    return edge.Bot.X + ClipperLib.Clipper.Round(edge.Dx * (currentY - edge.Bot.Y));
  };
  ClipperLib.Clipper.prototype.IntersectPoint = function (edge1, edge2, ip)
  {
    ip.X = 0;
    ip.Y = 0;
    var b1, b2;
    //nb: with very large coordinate values, it's possible for SlopesEqual() to
    //return false but for the edge.Dx value be equal due to double precision rounding.
    if (edge1.Dx == edge2.Dx)
		{
			ip.Y = edge1.Curr.Y;
			ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
			return;
    }
    if (edge1.Delta.X === 0)
    {
      ip.X = edge1.Bot.X;
      if (ClipperLib.ClipperBase.IsHorizontal(edge2))
      {
        ip.Y = edge2.Bot.Y;
      }
      else
      {
        b2 = edge2.Bot.Y - (edge2.Bot.X / edge2.Dx);
        ip.Y = ClipperLib.Clipper.Round(ip.X / edge2.Dx + b2);
      }
    }
    else if (edge2.Delta.X === 0)
    {
      ip.X = edge2.Bot.X;
      if (ClipperLib.ClipperBase.IsHorizontal(edge1))
      {
        ip.Y = edge1.Bot.Y;
      }
      else
      {
        b1 = edge1.Bot.Y - (edge1.Bot.X / edge1.Dx);
        ip.Y = ClipperLib.Clipper.Round(ip.X / edge1.Dx + b1);
      }
    }
    else
    {
      b1 = edge1.Bot.X - edge1.Bot.Y * edge1.Dx;
      b2 = edge2.Bot.X - edge2.Bot.Y * edge2.Dx;
      var q = (b2 - b1) / (edge1.Dx - edge2.Dx);
      ip.Y = ClipperLib.Clipper.Round(q);
      if (Math.abs(edge1.Dx) < Math.abs(edge2.Dx))
        ip.X = ClipperLib.Clipper.Round(edge1.Dx * q + b1);
      else
        ip.X = ClipperLib.Clipper.Round(edge2.Dx * q + b2);
    }
    if (ip.Y < edge1.Top.Y || ip.Y < edge2.Top.Y)
    {
      if (edge1.Top.Y > edge2.Top.Y)
      {
        ip.Y = edge1.Top.Y;
        ip.X = ClipperLib.Clipper.TopX(edge2, edge1.Top.Y);
        return ip.X < edge1.Top.X;
      }
      else
        ip.Y = edge2.Top.Y;
      if (Math.abs(edge1.Dx) < Math.abs(edge2.Dx))
        ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
      else
        ip.X = ClipperLib.Clipper.TopX(edge2, ip.Y);
    }
		//finally, don't allow 'ip' to be BELOW curr.Y (ie bottom of scanbeam) ...
		if (ip.Y > edge1.Curr.Y)
		{
			ip.Y = edge1.Curr.Y;
			//better to use the more vertical edge to derive X ...
			if (Math.abs(edge1.Dx) > Math.abs(edge2.Dx))
				ip.X = ClipperLib.Clipper.TopX(edge2, ip.Y);
			else
				ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
		}
  };

  ClipperLib.Clipper.prototype.ProcessEdgesAtTopOfScanbeam = function (topY)
  {
    var e = this.m_ActiveEdges;
    while (e !== null)
    {
      //1. process maxima, treating them as if they're 'bent' horizontal edges,
      //   but exclude maxima with horizontal edges. nb: e can't be a horizontal.
      var IsMaximaEdge = this.IsMaxima(e, topY);
      if (IsMaximaEdge)
      {
        var eMaxPair = this.GetMaximaPair(e);
        IsMaximaEdge = (eMaxPair === null || !ClipperLib.ClipperBase.IsHorizontal(eMaxPair));
      }
      if (IsMaximaEdge)
      {
        var ePrev = e.PrevInAEL;
        this.DoMaxima(e);
        if (ePrev === null)
          e = this.m_ActiveEdges;
        else
          e = ePrev.NextInAEL;
      }
      else
      {
        //2. promote horizontal edges, otherwise update Curr.X and Curr.Y ...
        if (this.IsIntermediate(e, topY) && ClipperLib.ClipperBase.IsHorizontal(e.NextInLML))
        {
          e = this.UpdateEdgeIntoAEL(e);
          if (e.OutIdx >= 0)
            this.AddOutPt(e, e.Bot);
          this.AddEdgeToSEL(e);
        }
        else
        {
          e.Curr.X = ClipperLib.Clipper.TopX(e, topY);
          e.Curr.Y = topY;
        }
        if (this.StrictlySimple)
        {
          var ePrev = e.PrevInAEL;
          if ((e.OutIdx >= 0) && (e.WindDelta !== 0) && ePrev !== null &&
            (ePrev.OutIdx >= 0) && (ePrev.Curr.X == e.Curr.X) &&
            (ePrev.WindDelta !== 0))
          {
           	var ip = new ClipperLib.IntPoint(e.Curr);

						if(use_xyz)
						{
							this.SetZ(ip, ePrev, e);
						}

            var op = this.AddOutPt(ePrev, ip);
            var op2 = this.AddOutPt(e, ip);
            this.AddJoin(op, op2, ip);
            //StrictlySimple (type-3) join
          }
        }
        e = e.NextInAEL;
      }
    }
    //3. Process horizontals at the Top of the scanbeam ...
    this.ProcessHorizontals(true);
    //4. Promote intermediate vertices ...
    e = this.m_ActiveEdges;
    while (e !== null)
    {
      if (this.IsIntermediate(e, topY))
      {
        var op = null;
        if (e.OutIdx >= 0)
          op = this.AddOutPt(e, e.Top);
        e = this.UpdateEdgeIntoAEL(e);
        //if output polygons share an edge, they'll need joining later ...
        var ePrev = e.PrevInAEL;
        var eNext = e.NextInAEL;
        if (ePrev !== null && ePrev.Curr.X == e.Bot.X &&
          ePrev.Curr.Y == e.Bot.Y && op !== null &&
          ePrev.OutIdx >= 0 && ePrev.Curr.Y > ePrev.Top.Y &&
          ClipperLib.ClipperBase.SlopesEqual(e, ePrev, this.m_UseFullRange) &&
          (e.WindDelta !== 0) && (ePrev.WindDelta !== 0))
        {
          var op2 = this.AddOutPt(ePrev, e.Bot);
          this.AddJoin(op, op2, e.Top);
        }
        else if (eNext !== null && eNext.Curr.X == e.Bot.X &&
          eNext.Curr.Y == e.Bot.Y && op !== null &&
          eNext.OutIdx >= 0 && eNext.Curr.Y > eNext.Top.Y &&
          ClipperLib.ClipperBase.SlopesEqual(e, eNext, this.m_UseFullRange) &&
          (e.WindDelta !== 0) && (eNext.WindDelta !== 0))
        {
          var op2 = this.AddOutPt(eNext, e.Bot);
          this.AddJoin(op, op2, e.Top);
        }
      }
      e = e.NextInAEL;
    }
  };
  ClipperLib.Clipper.prototype.DoMaxima = function (e)
  {
    var eMaxPair = this.GetMaximaPair(e);
    if (eMaxPair === null)
    {
      if (e.OutIdx >= 0)
        this.AddOutPt(e, e.Top);
      this.DeleteFromAEL(e);
      return;
    }
    var eNext = e.NextInAEL;
    var use_lines = true;
    while (eNext !== null && eNext != eMaxPair)
    {
      this.IntersectEdges(e, eNext, e.Top);
      this.SwapPositionsInAEL(e, eNext);
      eNext = e.NextInAEL;
    }
    if (e.OutIdx == -1 && eMaxPair.OutIdx == -1)
    {
      this.DeleteFromAEL(e);
      this.DeleteFromAEL(eMaxPair);
    }
    else if (e.OutIdx >= 0 && eMaxPair.OutIdx >= 0)
    {
    	if (e.OutIdx >= 0) this.AddLocalMaxPoly(e, eMaxPair, e.Top);
      this.DeleteFromAEL(e);
      this.DeleteFromAEL(eMaxPair);
    }
    else if (use_lines && e.WindDelta === 0)
    {
      if (e.OutIdx >= 0)
      {
        this.AddOutPt(e, e.Top);
        e.OutIdx = -1;
      }
      this.DeleteFromAEL(e);
      if (eMaxPair.OutIdx >= 0)
      {
        this.AddOutPt(eMaxPair, e.Top);
        eMaxPair.OutIdx = -1;
      }
      this.DeleteFromAEL(eMaxPair);
    }
    else
      ClipperLib.Error("DoMaxima error");
  };
  ClipperLib.Clipper.ReversePaths = function (polys)
  {
    for (var i = 0, len = polys.length; i < len; i++)
      polys[i].reverse();
  };
  ClipperLib.Clipper.Orientation = function (poly)
  {
    return ClipperLib.Clipper.Area(poly) >= 0;
  };
  ClipperLib.Clipper.prototype.PointCount = function (pts)
  {
    if (pts === null)
      return 0;
    var result = 0;
    var p = pts;
    do {
      result++;
      p = p.Next;
    }
    while (p != pts)
    return result;
  };
  ClipperLib.Clipper.prototype.BuildResult = function (polyg)
  {
    ClipperLib.Clear(polyg);
    for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
    {
      var outRec = this.m_PolyOuts[i];
      if (outRec.Pts === null)
        continue;
      var p = outRec.Pts.Prev;
      var cnt = this.PointCount(p);
      if (cnt < 2)
        continue;
      var pg = new Array(cnt);
      for (var j = 0; j < cnt; j++)
      {
        pg[j] = p.Pt;
        p = p.Prev;
      }
      polyg.push(pg);
    }
  };
  ClipperLib.Clipper.prototype.BuildResult2 = function (polytree)
  {
    polytree.Clear();
    //add each output polygon/contour to polytree ...
    //polytree.m_AllPolys.set_Capacity(this.m_PolyOuts.length);
    for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
    {
      var outRec = this.m_PolyOuts[i];
      var cnt = this.PointCount(outRec.Pts);
      if ((outRec.IsOpen && cnt < 2) || (!outRec.IsOpen && cnt < 3))
        continue;
      this.FixHoleLinkage(outRec);
      var pn = new ClipperLib.PolyNode();
      polytree.m_AllPolys.push(pn);
      outRec.PolyNode = pn;
      pn.m_polygon.length = cnt;
      var op = outRec.Pts.Prev;
      for (var j = 0; j < cnt; j++)
      {
        pn.m_polygon[j] = op.Pt;
        op = op.Prev;
      }
    }
    //fixup PolyNode links etc ...
    //polytree.m_Childs.set_Capacity(this.m_PolyOuts.length);
    for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
    {
      var outRec = this.m_PolyOuts[i];
      if (outRec.PolyNode === null)
        continue;
      else if (outRec.IsOpen)
      {
        outRec.PolyNode.IsOpen = true;
        polytree.AddChild(outRec.PolyNode);
      }
      else if (outRec.FirstLeft !== null && outRec.FirstLeft.PolyNode != null)
        outRec.FirstLeft.PolyNode.AddChild(outRec.PolyNode);
      else
        polytree.AddChild(outRec.PolyNode);
    }
  };
  ClipperLib.Clipper.prototype.FixupOutPolygon = function (outRec)
  {
    //FixupOutPolygon() - removes duplicate points and simplifies consecutive
    //parallel edges by removing the middle vertex.
    var lastOK = null;
    outRec.BottomPt = null;
    var pp = outRec.Pts;
    for (;;)
    {
      if (pp.Prev == pp || pp.Prev == pp.Next)
      {
        outRec.Pts = null;
        return;
      }
      //test for duplicate points and collinear edges ...
      if ((ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Next.Pt)) || (ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Prev.Pt)) ||
        (ClipperLib.ClipperBase.SlopesEqual(pp.Prev.Pt, pp.Pt, pp.Next.Pt, this.m_UseFullRange) &&
          (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(pp.Prev.Pt, pp.Pt, pp.Next.Pt))))
      {
        lastOK = null;
        pp.Prev.Next = pp.Next;
        pp.Next.Prev = pp.Prev;
        pp = pp.Prev;
      }
      else if (pp == lastOK)
        break;
      else
      {
        if (lastOK === null)
          lastOK = pp;
        pp = pp.Next;
      }
    }
    outRec.Pts = pp;
  };
  ClipperLib.Clipper.prototype.DupOutPt = function (outPt, InsertAfter)
  {
    var result = new ClipperLib.OutPt();
    //result.Pt = outPt.Pt;
    result.Pt.X = outPt.Pt.X;
    result.Pt.Y = outPt.Pt.Y;
    result.Idx = outPt.Idx;
    if (InsertAfter)
    {
      result.Next = outPt.Next;
      result.Prev = outPt;
      outPt.Next.Prev = result;
      outPt.Next = result;
    }
    else
    {
      result.Prev = outPt.Prev;
      result.Next = outPt;
      outPt.Prev.Next = result;
      outPt.Prev = result;
    }
    return result;
  };
  ClipperLib.Clipper.prototype.GetOverlap = function (a1, a2, b1, b2, $val)
  {
    if (a1 < a2)
    {
      if (b1 < b2)
      {
        $val.Left = Math.max(a1, b1);
        $val.Right = Math.min(a2, b2);
      }
      else
      {
        $val.Left = Math.max(a1, b2);
        $val.Right = Math.min(a2, b1);
      }
    }
    else
    {
      if (b1 < b2)
      {
        $val.Left = Math.max(a2, b1);
        $val.Right = Math.min(a1, b2);
      }
      else
      {
        $val.Left = Math.max(a2, b2);
        $val.Right = Math.min(a1, b1);
      }
    }
    return $val.Left < $val.Right;
  };
  ClipperLib.Clipper.prototype.JoinHorz = function (op1, op1b, op2, op2b, Pt, DiscardLeft)
  {
    var Dir1 = (op1.Pt.X > op1b.Pt.X ? ClipperLib.Direction.dRightToLeft : ClipperLib.Direction.dLeftToRight);
    var Dir2 = (op2.Pt.X > op2b.Pt.X ? ClipperLib.Direction.dRightToLeft : ClipperLib.Direction.dLeftToRight);
    if (Dir1 == Dir2)
      return false;
    //When DiscardLeft, we want Op1b to be on the Left of Op1, otherwise we
    //want Op1b to be on the Right. (And likewise with Op2 and Op2b.)
    //So, to facilitate this while inserting Op1b and Op2b ...
    //when DiscardLeft, make sure we're AT or RIGHT of Pt before adding Op1b,
    //otherwise make sure we're AT or LEFT of Pt. (Likewise with Op2b.)
    if (Dir1 == ClipperLib.Direction.dLeftToRight)
    {
      while (op1.Next.Pt.X <= Pt.X &&
        op1.Next.Pt.X >= op1.Pt.X && op1.Next.Pt.Y == Pt.Y)
        op1 = op1.Next;
      if (DiscardLeft && (op1.Pt.X != Pt.X))
        op1 = op1.Next;
      op1b = this.DupOutPt(op1, !DiscardLeft);
      if (ClipperLib.IntPoint.op_Inequality(op1b.Pt, Pt))
      {
        op1 = op1b;
        //op1.Pt = Pt;
        op1.Pt.X = Pt.X;
        op1.Pt.Y = Pt.Y;
        op1b = this.DupOutPt(op1, !DiscardLeft);
      }
    }
    else
    {
      while (op1.Next.Pt.X >= Pt.X &&
        op1.Next.Pt.X <= op1.Pt.X && op1.Next.Pt.Y == Pt.Y)
        op1 = op1.Next;
      if (!DiscardLeft && (op1.Pt.X != Pt.X))
        op1 = op1.Next;
      op1b = this.DupOutPt(op1, DiscardLeft);
      if (ClipperLib.IntPoint.op_Inequality(op1b.Pt, Pt))
      {
        op1 = op1b;
        //op1.Pt = Pt;
        op1.Pt.X = Pt.X;
        op1.Pt.Y = Pt.Y;
        op1b = this.DupOutPt(op1, DiscardLeft);
      }
    }
    if (Dir2 == ClipperLib.Direction.dLeftToRight)
    {
      while (op2.Next.Pt.X <= Pt.X &&
        op2.Next.Pt.X >= op2.Pt.X && op2.Next.Pt.Y == Pt.Y)
        op2 = op2.Next;
      if (DiscardLeft && (op2.Pt.X != Pt.X))
        op2 = op2.Next;
      op2b = this.DupOutPt(op2, !DiscardLeft);
      if (ClipperLib.IntPoint.op_Inequality(op2b.Pt, Pt))
      {
        op2 = op2b;
        //op2.Pt = Pt;
        op2.Pt.X = Pt.X;
        op2.Pt.Y = Pt.Y;
        op2b = this.DupOutPt(op2, !DiscardLeft);
      }
    }
    else
    {
      while (op2.Next.Pt.X >= Pt.X &&
        op2.Next.Pt.X <= op2.Pt.X && op2.Next.Pt.Y == Pt.Y)
        op2 = op2.Next;
      if (!DiscardLeft && (op2.Pt.X != Pt.X))
        op2 = op2.Next;
      op2b = this.DupOutPt(op2, DiscardLeft);
      if (ClipperLib.IntPoint.op_Inequality(op2b.Pt, Pt))
      {
        op2 = op2b;
        //op2.Pt = Pt;
        op2.Pt.X = Pt.X;
        op2.Pt.Y = Pt.Y;
        op2b = this.DupOutPt(op2, DiscardLeft);
      }
    }
    if ((Dir1 == ClipperLib.Direction.dLeftToRight) == DiscardLeft)
    {
      op1.Prev = op2;
      op2.Next = op1;
      op1b.Next = op2b;
      op2b.Prev = op1b;
    }
    else
    {
      op1.Next = op2;
      op2.Prev = op1;
      op1b.Prev = op2b;
      op2b.Next = op1b;
    }
    return true;
  };
  ClipperLib.Clipper.prototype.JoinPoints = function (j, outRec1, outRec2)
  {
    var op1 = j.OutPt1,
      op1b = new ClipperLib.OutPt();
    var op2 = j.OutPt2,
      op2b = new ClipperLib.OutPt();
    //There are 3 kinds of joins for output polygons ...
    //1. Horizontal joins where Join.OutPt1 & Join.OutPt2 are a vertices anywhere
    //along (horizontal) collinear edges (& Join.OffPt is on the same horizontal).
    //2. Non-horizontal joins where Join.OutPt1 & Join.OutPt2 are at the same
    //location at the Bottom of the overlapping segment (& Join.OffPt is above).
    //3. StrictlySimple joins where edges touch but are not collinear and where
    //Join.OutPt1, Join.OutPt2 & Join.OffPt all share the same point.
    var isHorizontal = (j.OutPt1.Pt.Y == j.OffPt.Y);
    if (isHorizontal && (ClipperLib.IntPoint.op_Equality(j.OffPt, j.OutPt1.Pt)) && (ClipperLib.IntPoint.op_Equality(j.OffPt, j.OutPt2.Pt)))
    {
      //Strictly Simple join ...
			if (outRec1 != outRec2) return false;

      op1b = j.OutPt1.Next;
      while (op1b != op1 && (ClipperLib.IntPoint.op_Equality(op1b.Pt, j.OffPt)))
        op1b = op1b.Next;
      var reverse1 = (op1b.Pt.Y > j.OffPt.Y);
      op2b = j.OutPt2.Next;
      while (op2b != op2 && (ClipperLib.IntPoint.op_Equality(op2b.Pt, j.OffPt)))
        op2b = op2b.Next;
      var reverse2 = (op2b.Pt.Y > j.OffPt.Y);
      if (reverse1 == reverse2)
        return false;
      if (reverse1)
      {
        op1b = this.DupOutPt(op1, false);
        op2b = this.DupOutPt(op2, true);
        op1.Prev = op2;
        op2.Next = op1;
        op1b.Next = op2b;
        op2b.Prev = op1b;
        j.OutPt1 = op1;
        j.OutPt2 = op1b;
        return true;
      }
      else
      {
        op1b = this.DupOutPt(op1, true);
        op2b = this.DupOutPt(op2, false);
        op1.Next = op2;
        op2.Prev = op1;
        op1b.Prev = op2b;
        op2b.Next = op1b;
        j.OutPt1 = op1;
        j.OutPt2 = op1b;
        return true;
      }
    }
    else if (isHorizontal)
    {
      //treat horizontal joins differently to non-horizontal joins since with
      //them we're not yet sure where the overlapping is. OutPt1.Pt & OutPt2.Pt
      //may be anywhere along the horizontal edge.
      op1b = op1;
      while (op1.Prev.Pt.Y == op1.Pt.Y && op1.Prev != op1b && op1.Prev != op2)
        op1 = op1.Prev;
      while (op1b.Next.Pt.Y == op1b.Pt.Y && op1b.Next != op1 && op1b.Next != op2)
        op1b = op1b.Next;
      if (op1b.Next == op1 || op1b.Next == op2)
        return false;
      //a flat 'polygon'
      op2b = op2;
      while (op2.Prev.Pt.Y == op2.Pt.Y && op2.Prev != op2b && op2.Prev != op1b)
        op2 = op2.Prev;
      while (op2b.Next.Pt.Y == op2b.Pt.Y && op2b.Next != op2 && op2b.Next != op1)
        op2b = op2b.Next;
      if (op2b.Next == op2 || op2b.Next == op1)
        return false;
      //a flat 'polygon'
      //Op1 -. Op1b & Op2 -. Op2b are the extremites of the horizontal edges

      var $val = {Left: null, Right: null};
      if (!this.GetOverlap(op1.Pt.X, op1b.Pt.X, op2.Pt.X, op2b.Pt.X, $val))
        return false;
      var Left = $val.Left;
      var Right = $val.Right;

      //DiscardLeftSide: when overlapping edges are joined, a spike will created
      //which needs to be cleaned up. However, we don't want Op1 or Op2 caught up
      //on the discard Side as either may still be needed for other joins ...
      var Pt = new ClipperLib.IntPoint();
      var DiscardLeftSide;
      if (op1.Pt.X >= Left && op1.Pt.X <= Right)
      {
        //Pt = op1.Pt;
        Pt.X = op1.Pt.X;
        Pt.Y = op1.Pt.Y;
        DiscardLeftSide = (op1.Pt.X > op1b.Pt.X);
      }
      else if (op2.Pt.X >= Left && op2.Pt.X <= Right)
      {
        //Pt = op2.Pt;
        Pt.X = op2.Pt.X;
        Pt.Y = op2.Pt.Y;
        DiscardLeftSide = (op2.Pt.X > op2b.Pt.X);
      }
      else if (op1b.Pt.X >= Left && op1b.Pt.X <= Right)
      {
        //Pt = op1b.Pt;
        Pt.X = op1b.Pt.X;
        Pt.Y = op1b.Pt.Y;
        DiscardLeftSide = op1b.Pt.X > op1.Pt.X;
      }
      else
      {
        //Pt = op2b.Pt;
        Pt.X = op2b.Pt.X;
        Pt.Y = op2b.Pt.Y;
        DiscardLeftSide = (op2b.Pt.X > op2.Pt.X);
      }
      j.OutPt1 = op1;
      j.OutPt2 = op2;
      return this.JoinHorz(op1, op1b, op2, op2b, Pt, DiscardLeftSide);
    }
    else
    {
      //nb: For non-horizontal joins ...
      //    1. Jr.OutPt1.Pt.Y == Jr.OutPt2.Pt.Y
      //    2. Jr.OutPt1.Pt > Jr.OffPt.Y
      //make sure the polygons are correctly oriented ...
      op1b = op1.Next;
      while ((ClipperLib.IntPoint.op_Equality(op1b.Pt, op1.Pt)) && (op1b != op1))
        op1b = op1b.Next;
      var Reverse1 = ((op1b.Pt.Y > op1.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual(op1.Pt, op1b.Pt, j.OffPt, this.m_UseFullRange));
      if (Reverse1)
      {
        op1b = op1.Prev;
        while ((ClipperLib.IntPoint.op_Equality(op1b.Pt, op1.Pt)) && (op1b != op1))
          op1b = op1b.Prev;
        if ((op1b.Pt.Y > op1.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual(op1.Pt, op1b.Pt, j.OffPt, this.m_UseFullRange))
          return false;
      }
      op2b = op2.Next;
      while ((ClipperLib.IntPoint.op_Equality(op2b.Pt, op2.Pt)) && (op2b != op2))
        op2b = op2b.Next;
      var Reverse2 = ((op2b.Pt.Y > op2.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual(op2.Pt, op2b.Pt, j.OffPt, this.m_UseFullRange));
      if (Reverse2)
      {
        op2b = op2.Prev;
        while ((ClipperLib.IntPoint.op_Equality(op2b.Pt, op2.Pt)) && (op2b != op2))
          op2b = op2b.Prev;
        if ((op2b.Pt.Y > op2.Pt.Y) || !ClipperLib.ClipperBase.SlopesEqual(op2.Pt, op2b.Pt, j.OffPt, this.m_UseFullRange))
          return false;
      }
      if ((op1b == op1) || (op2b == op2) || (op1b == op2b) ||
        ((outRec1 == outRec2) && (Reverse1 == Reverse2)))
        return false;
      if (Reverse1)
      {
        op1b = this.DupOutPt(op1, false);
        op2b = this.DupOutPt(op2, true);
        op1.Prev = op2;
        op2.Next = op1;
        op1b.Next = op2b;
        op2b.Prev = op1b;
        j.OutPt1 = op1;
        j.OutPt2 = op1b;
        return true;
      }
      else
      {
        op1b = this.DupOutPt(op1, true);
        op2b = this.DupOutPt(op2, false);
        op1.Next = op2;
        op2.Prev = op1;
        op1b.Prev = op2b;
        op2b.Next = op1b;
        j.OutPt1 = op1;
        j.OutPt2 = op1b;
        return true;
      }
    }
  };
  ClipperLib.Clipper.GetBounds = function (paths)
  {
    var i = 0,
      cnt = paths.length;
    while (i < cnt && paths[i].length == 0) i++;
    if (i == cnt) return new ClipperLib.IntRect(0, 0, 0, 0);
    var result = new ClipperLib.IntRect();
    result.left = paths[i][0].X;
    result.right = result.left;
    result.top = paths[i][0].Y;
    result.bottom = result.top;
    for (; i < cnt; i++)
      for (var j = 0, jlen = paths[i].length; j < jlen; j++)
      {
        if (paths[i][j].X < result.left) result.left = paths[i][j].X;
        else if (paths[i][j].X > result.right) result.right = paths[i][j].X;
        if (paths[i][j].Y < result.top) result.top = paths[i][j].Y;
        else if (paths[i][j].Y > result.bottom) result.bottom = paths[i][j].Y;
      }
    return result;
  }
  ClipperLib.Clipper.prototype.GetBounds2 = function (ops)
  {
    var opStart = ops;
    var result = new ClipperLib.IntRect();
    result.left = ops.Pt.X;
    result.right = ops.Pt.X;
    result.top = ops.Pt.Y;
    result.bottom = ops.Pt.Y;
    ops = ops.Next;
    while (ops != opStart)
    {
      if (ops.Pt.X < result.left)
        result.left = ops.Pt.X;
      if (ops.Pt.X > result.right)
        result.right = ops.Pt.X;
      if (ops.Pt.Y < result.top)
        result.top = ops.Pt.Y;
      if (ops.Pt.Y > result.bottom)
        result.bottom = ops.Pt.Y;
      ops = ops.Next;
    }
    return result;
  };

  ClipperLib.Clipper.PointInPolygon = function (pt, path)
  {
    //returns 0 if false, +1 if true, -1 if pt ON polygon boundary
		//See "The Point in Polygon Problem for Arbitrary Polygons" by Hormann & Agathos
    //http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.88.5498&rep=rep1&type=pdf
    var result = 0,
      cnt = path.length;
    if (cnt < 3)
      return 0;
    var ip = path[0];
    for (var i = 1; i <= cnt; ++i)
    {
      var ipNext = (i == cnt ? path[0] : path[i]);
      if (ipNext.Y == pt.Y)
      {
        if ((ipNext.X == pt.X) || (ip.Y == pt.Y && ((ipNext.X > pt.X) == (ip.X < pt.X))))
          return -1;
      }
      if ((ip.Y < pt.Y) != (ipNext.Y < pt.Y))
      {
        if (ip.X >= pt.X)
        {
          if (ipNext.X > pt.X)
            result = 1 - result;
          else
          {
            var d = (ip.X - pt.X) * (ipNext.Y - pt.Y) - (ipNext.X - pt.X) * (ip.Y - pt.Y);
            if (d == 0)
              return -1;
            else if ((d > 0) == (ipNext.Y > ip.Y))
              result = 1 - result;
          }
        }
        else
        {
          if (ipNext.X > pt.X)
          {
            var d = (ip.X - pt.X) * (ipNext.Y - pt.Y) - (ipNext.X - pt.X) * (ip.Y - pt.Y);
            if (d == 0)
              return -1;
            else if ((d > 0) == (ipNext.Y > ip.Y))
              result = 1 - result;
          }
        }
      }
      ip = ipNext;
    }
    return result;
  };

  ClipperLib.Clipper.prototype.PointInPolygon = function (pt, op)
  {
    //returns 0 if false, +1 if true, -1 if pt ON polygon boundary
		//See "The Point in Polygon Problem for Arbitrary Polygons" by Hormann & Agathos
    //http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.88.5498&rep=rep1&type=pdf
    var result = 0;
    var startOp = op;
		var ptx = pt.X, pty = pt.Y;
    var poly0x = op.Pt.X, poly0y = op.Pt.Y;
    do
    {
			op = op.Next;
			var poly1x = op.Pt.X, poly1y = op.Pt.Y;
      if (poly1y == pty)
      {
        if ((poly1x == ptx) || (poly0y == pty && ((poly1x > ptx) == (poly0x < ptx))))
          return -1;
      }
      if ((poly0y < pty) != (poly1y < pty))
      {
        if (poly0x >= ptx)
        {
          if (poly1x > ptx)
            result = 1 - result;
          else
          {
            var d = (poly0x - ptx) * (poly1y - pty) - (poly1x - ptx) * (poly0y - pty);
            if (d == 0)
              return -1;
            if ((d > 0) == (poly1y > poly0y))
              result = 1 - result;
          }
        }
        else
        {
          if (poly1x > ptx)
          {
            var d = (poly0x - ptx) * (poly1y - pty) - (poly1x - ptx) * (poly0y - pty);
            if (d == 0)
              return -1;
            if ((d > 0) == (poly1y > poly0y))
              result = 1 - result;
          }
        }
      }
      poly0x = poly1x;
      poly0y = poly1y;
    } while (startOp != op);

    return result;
  };

  ClipperLib.Clipper.prototype.Poly2ContainsPoly1 = function (outPt1, outPt2)
  {
    var op = outPt1;
    do
    {
			//nb: PointInPolygon returns 0 if false, +1 if true, -1 if pt on polygon
      var res = this.PointInPolygon(op.Pt, outPt2);
      if (res >= 0)
        return res > 0;
      op = op.Next;
    }
    while (op != outPt1)
    return true;
  };
  ClipperLib.Clipper.prototype.FixupFirstLefts1 = function (OldOutRec, NewOutRec)
  {
    for (var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++)
    {
			var outRec = this.m_PolyOuts[i];
			if (outRec.Pts == null || outRec.FirstLeft == null)
				continue;
			var firstLeft = this.ParseFirstLeft(outRec.FirstLeft);
			if (firstLeft == OldOutRec)
			{
        if (this.Poly2ContainsPoly1(outRec.Pts, NewOutRec.Pts))
          outRec.FirstLeft = NewOutRec;
      }
    }
  };
  ClipperLib.Clipper.prototype.FixupFirstLefts2 = function (OldOutRec, NewOutRec)
  {
    for (var $i2 = 0, $t2 = this.m_PolyOuts, $l2 = $t2.length, outRec = $t2[$i2]; $i2 < $l2; $i2++, outRec = $t2[$i2])
      if (outRec.FirstLeft == OldOutRec)
        outRec.FirstLeft = NewOutRec;
  };
  ClipperLib.Clipper.ParseFirstLeft = function (FirstLeft)
  {
    while (FirstLeft != null && FirstLeft.Pts == null)
      FirstLeft = FirstLeft.FirstLeft;
    return FirstLeft;
  };
  ClipperLib.Clipper.prototype.JoinCommonEdges = function ()
  {
    for (var i = 0, ilen = this.m_Joins.length; i < ilen; i++)
    {
      var join = this.m_Joins[i];
      var outRec1 = this.GetOutRec(join.OutPt1.Idx);
      var outRec2 = this.GetOutRec(join.OutPt2.Idx);
      if (outRec1.Pts == null || outRec2.Pts == null)
        continue;
      //get the polygon fragment with the correct hole state (FirstLeft)
      //before calling JoinPoints() ...
      var holeStateRec;
      if (outRec1 == outRec2)
        holeStateRec = outRec1;
      else if (this.Param1RightOfParam2(outRec1, outRec2))
        holeStateRec = outRec2;
      else if (this.Param1RightOfParam2(outRec2, outRec1))
        holeStateRec = outRec1;
      else
        holeStateRec = this.GetLowermostRec(outRec1, outRec2);

      if (!this.JoinPoints(join, outRec1, outRec2)) continue;

      if (outRec1 == outRec2)
      {
        //instead of joining two polygons, we've just created a new one by
        //splitting one polygon into two.
        outRec1.Pts = join.OutPt1;
        outRec1.BottomPt = null;
        outRec2 = this.CreateOutRec();
        outRec2.Pts = join.OutPt2;
        //update all OutRec2.Pts Idx's ...
        this.UpdateOutPtIdxs(outRec2);
        //We now need to check every OutRec.FirstLeft pointer. If it points
        //to OutRec1 it may need to point to OutRec2 instead ...
        if (this.m_UsingPolyTree)
          for (var j = 0, jlen = this.m_PolyOuts.length; j < jlen - 1; j++)
          {
            var oRec = this.m_PolyOuts[j];
            if (oRec.Pts == null || ClipperLib.Clipper.ParseFirstLeft(oRec.FirstLeft) != outRec1 || oRec.IsHole == outRec1.IsHole)
              continue;
            if (this.Poly2ContainsPoly1(oRec.Pts, join.OutPt2))
              oRec.FirstLeft = outRec2;
          }
        if (this.Poly2ContainsPoly1(outRec2.Pts, outRec1.Pts))
        {
          //outRec2 is contained by outRec1 ...
          outRec2.IsHole = !outRec1.IsHole;
          outRec2.FirstLeft = outRec1;
          //fixup FirstLeft pointers that may need reassigning to OutRec1
          if (this.m_UsingPolyTree)
            this.FixupFirstLefts2(outRec2, outRec1);
          if ((outRec2.IsHole ^ this.ReverseSolution) == (this.Area(outRec2) > 0))
            this.ReversePolyPtLinks(outRec2.Pts);
        }
        else if (this.Poly2ContainsPoly1(outRec1.Pts, outRec2.Pts))
        {
          //outRec1 is contained by outRec2 ...
          outRec2.IsHole = outRec1.IsHole;
          outRec1.IsHole = !outRec2.IsHole;
          outRec2.FirstLeft = outRec1.FirstLeft;
          outRec1.FirstLeft = outRec2;
          //fixup FirstLeft pointers that may need reassigning to OutRec1
          if (this.m_UsingPolyTree)
            this.FixupFirstLefts2(outRec1, outRec2);
          if ((outRec1.IsHole ^ this.ReverseSolution) == (this.Area(outRec1) > 0))
            this.ReversePolyPtLinks(outRec1.Pts);
        }
        else
        {
          //the 2 polygons are completely separate ...
          outRec2.IsHole = outRec1.IsHole;
          outRec2.FirstLeft = outRec1.FirstLeft;
          //fixup FirstLeft pointers that may need reassigning to OutRec2
          if (this.m_UsingPolyTree)
            this.FixupFirstLefts1(outRec1, outRec2);
        }
      }
      else
      {
        //joined 2 polygons together ...
        outRec2.Pts = null;
        outRec2.BottomPt = null;
        outRec2.Idx = outRec1.Idx;
        outRec1.IsHole = holeStateRec.IsHole;
        if (holeStateRec == outRec2)
          outRec1.FirstLeft = outRec2.FirstLeft;
        outRec2.FirstLeft = outRec1;
        //fixup FirstLeft pointers that may need reassigning to OutRec1
        if (this.m_UsingPolyTree)
          this.FixupFirstLefts2(outRec2, outRec1);
      }
    }
  };
  ClipperLib.Clipper.prototype.UpdateOutPtIdxs = function (outrec)
  {
    var op = outrec.Pts;
    do {
      op.Idx = outrec.Idx;
      op = op.Prev;
    }
    while (op != outrec.Pts)
  };
  ClipperLib.Clipper.prototype.DoSimplePolygons = function ()
  {
    var i = 0;
    while (i < this.m_PolyOuts.length)
    {
      var outrec = this.m_PolyOuts[i++];
      var op = outrec.Pts;
			if (op == null || outrec.IsOpen)
				continue;
      do //for each Pt in Polygon until duplicate found do ...
      {
        var op2 = op.Next;
        while (op2 != outrec.Pts)
        {
          if ((ClipperLib.IntPoint.op_Equality(op.Pt, op2.Pt)) && op2.Next != op && op2.Prev != op)
          {
            //split the polygon into two ...
            var op3 = op.Prev;
            var op4 = op2.Prev;
            op.Prev = op4;
            op4.Next = op;
            op2.Prev = op3;
            op3.Next = op2;
            outrec.Pts = op;
            var outrec2 = this.CreateOutRec();
            outrec2.Pts = op2;
            this.UpdateOutPtIdxs(outrec2);
            if (this.Poly2ContainsPoly1(outrec2.Pts, outrec.Pts))
            {
              //OutRec2 is contained by OutRec1 ...
              outrec2.IsHole = !outrec.IsHole;
              outrec2.FirstLeft = outrec;
							if (this.m_UsingPolyTree) this.FixupFirstLefts2(outrec2, outrec);

            }
            else if (this.Poly2ContainsPoly1(outrec.Pts, outrec2.Pts))
            {
              //OutRec1 is contained by OutRec2 ...
              outrec2.IsHole = outrec.IsHole;
              outrec.IsHole = !outrec2.IsHole;
              outrec2.FirstLeft = outrec.FirstLeft;
              outrec.FirstLeft = outrec2;
              if (this.m_UsingPolyTree) this.FixupFirstLefts2(outrec, outrec2);
            }
            else
            {
              //the 2 polygons are separate ...
              outrec2.IsHole = outrec.IsHole;
              outrec2.FirstLeft = outrec.FirstLeft;
							if (this.m_UsingPolyTree) this.FixupFirstLefts1(outrec, outrec2);
            }
            op2 = op;
            //ie get ready for the next iteration
          }
          op2 = op2.Next;
        }
        op = op.Next;
      }
      while (op != outrec.Pts)
    }
  };
  ClipperLib.Clipper.Area = function (poly)
  {
    var cnt = poly.length;
    if (cnt < 3)
      return 0;
    var a = 0;
    for (var i = 0, j = cnt - 1; i < cnt; ++i)
    {
      a += (poly[j].X + poly[i].X) * (poly[j].Y - poly[i].Y);
      j = i;
    }
    return -a * 0.5;
  };
  ClipperLib.Clipper.prototype.Area = function (outRec)
  {
    var op = outRec.Pts;
    if (op == null)
      return 0;
    var a = 0;
    do {
      a = a + (op.Prev.Pt.X + op.Pt.X) * (op.Prev.Pt.Y - op.Pt.Y);
      op = op.Next;
    }
    while (op != outRec.Pts)
    return a * 0.5;
  };
  ClipperLib.Clipper.SimplifyPolygon = function (poly, fillType)
  {
    var result = new Array();
    var c = new ClipperLib.Clipper(0);
    c.StrictlySimple = true;
    c.AddPath(poly, ClipperLib.PolyType.ptSubject, true);
    c.Execute(ClipperLib.ClipType.ctUnion, result, fillType, fillType);
    return result;
  };
  ClipperLib.Clipper.SimplifyPolygons = function (polys, fillType)
  {
    if (typeof (fillType) == "undefined") fillType = ClipperLib.PolyFillType.pftEvenOdd;
    var result = new Array();
    var c = new ClipperLib.Clipper(0);
    c.StrictlySimple = true;
    c.AddPaths(polys, ClipperLib.PolyType.ptSubject, true);
    c.Execute(ClipperLib.ClipType.ctUnion, result, fillType, fillType);
    return result;
  };
  ClipperLib.Clipper.DistanceSqrd = function (pt1, pt2)
  {
    var dx = (pt1.X - pt2.X);
    var dy = (pt1.Y - pt2.Y);
    return (dx * dx + dy * dy);
  };
  ClipperLib.Clipper.DistanceFromLineSqrd = function (pt, ln1, ln2)
  {
    //The equation of a line in general form (Ax + By + C = 0)
    //given 2 points (x¹,y¹) & (x²,y²) is ...
    //(y¹ - y²)x + (x² - x¹)y + (y² - y¹)x¹ - (x² - x¹)y¹ = 0
    //A = (y¹ - y²); B = (x² - x¹); C = (y² - y¹)x¹ - (x² - x¹)y¹
    //perpendicular distance of point (x³,y³) = (Ax³ + By³ + C)/Sqrt(A² + B²)
    //see http://en.wikipedia.org/wiki/Perpendicular_distance
    var A = ln1.Y - ln2.Y;
    var B = ln2.X - ln1.X;
    var C = A * ln1.X + B * ln1.Y;
    C = A * pt.X + B * pt.Y - C;
    return (C * C) / (A * A + B * B);
  };

	ClipperLib.Clipper.SlopesNearCollinear = function(pt1, pt2, pt3, distSqrd)
	{
		//this function is more accurate when the point that's GEOMETRICALLY
		//between the other 2 points is the one that's tested for distance.
		//nb: with 'spikes', either pt1 or pt3 is geometrically between the other pts
		if (Math.abs(pt1.X - pt2.X) > Math.abs(pt1.Y - pt2.Y))
		{
		if ((pt1.X > pt2.X) == (pt1.X < pt3.X))
			return ClipperLib.Clipper.DistanceFromLineSqrd(pt1, pt2, pt3) < distSqrd;
		else if ((pt2.X > pt1.X) == (pt2.X < pt3.X))
			return ClipperLib.Clipper.DistanceFromLineSqrd(pt2, pt1, pt3) < distSqrd;
				else
				return ClipperLib.Clipper.DistanceFromLineSqrd(pt3, pt1, pt2) < distSqrd;
		}
		else
		{
		if ((pt1.Y > pt2.Y) == (pt1.Y < pt3.Y))
			return ClipperLib.Clipper.DistanceFromLineSqrd(pt1, pt2, pt3) < distSqrd;
		else if ((pt2.Y > pt1.Y) == (pt2.Y < pt3.Y))
			return ClipperLib.Clipper.DistanceFromLineSqrd(pt2, pt1, pt3) < distSqrd;
				else
			return ClipperLib.Clipper.DistanceFromLineSqrd(pt3, pt1, pt2) < distSqrd;
		}
	}

  ClipperLib.Clipper.PointsAreClose = function (pt1, pt2, distSqrd)
  {
    var dx = pt1.X - pt2.X;
    var dy = pt1.Y - pt2.Y;
    return ((dx * dx) + (dy * dy) <= distSqrd);
  };
  //------------------------------------------------------------------------------
  ClipperLib.Clipper.ExcludeOp = function (op)
  {
    var result = op.Prev;
    result.Next = op.Next;
    op.Next.Prev = result;
    result.Idx = 0;
    return result;
  };
  ClipperLib.Clipper.CleanPolygon = function (path, distance)
  {
    if (typeof (distance) == "undefined") distance = 1.415;
    //distance = proximity in units/pixels below which vertices will be stripped.
    //Default ~= sqrt(2) so when adjacent vertices or semi-adjacent vertices have
    //both x & y coords within 1 unit, then the second vertex will be stripped.
    var cnt = path.length;
    if (cnt == 0)
      return new Array();
    var outPts = new Array(cnt);
    for (var i = 0; i < cnt; ++i)
      outPts[i] = new ClipperLib.OutPt();
    for (var i = 0; i < cnt; ++i)
    {
      outPts[i].Pt = path[i];
      outPts[i].Next = outPts[(i + 1) % cnt];
      outPts[i].Next.Prev = outPts[i];
      outPts[i].Idx = 0;
    }
    var distSqrd = distance * distance;
    var op = outPts[0];
    while (op.Idx == 0 && op.Next != op.Prev)
    {
      if (ClipperLib.Clipper.PointsAreClose(op.Pt, op.Prev.Pt, distSqrd))
      {
        op = ClipperLib.Clipper.ExcludeOp(op);
        cnt--;
      }
      else if (ClipperLib.Clipper.PointsAreClose(op.Prev.Pt, op.Next.Pt, distSqrd))
      {
        ClipperLib.Clipper.ExcludeOp(op.Next);
        op = ClipperLib.Clipper.ExcludeOp(op);
        cnt -= 2;
      }
      else if (ClipperLib.Clipper.SlopesNearCollinear(op.Prev.Pt, op.Pt, op.Next.Pt, distSqrd))
      {
        op = ClipperLib.Clipper.ExcludeOp(op);
        cnt--;
      }
      else
      {
        op.Idx = 1;
        op = op.Next;
      }
    }
    if (cnt < 3)
      cnt = 0;
    var result = new Array(cnt);
    for (var i = 0; i < cnt; ++i)
    {
      result[i] = new ClipperLib.IntPoint(op.Pt);
      op = op.Next;
    }
    outPts = null;
    return result;
  };
  ClipperLib.Clipper.CleanPolygons = function (polys, distance)
  {
    var result = new Array(polys.length);
    for (var i = 0, ilen = polys.length; i < ilen; i++)
      result[i] = ClipperLib.Clipper.CleanPolygon(polys[i], distance);
    return result;
  };
  ClipperLib.Clipper.Minkowski = function (pattern, path, IsSum, IsClosed)
  {
    var delta = (IsClosed ? 1 : 0);
    var polyCnt = pattern.length;
    var pathCnt = path.length;
    var result = new Array();
    if (IsSum)
      for (var i = 0; i < pathCnt; i++)
      {
        var p = new Array(polyCnt);
        for (var j = 0, jlen = pattern.length, ip = pattern[j]; j < jlen; j++, ip = pattern[j])
          p[j] = new ClipperLib.IntPoint(path[i].X + ip.X, path[i].Y + ip.Y);
        result.push(p);
      }
    else
      for (var i = 0; i < pathCnt; i++)
      {
        var p = new Array(polyCnt);
        for (var j = 0, jlen = pattern.length, ip = pattern[j]; j < jlen; j++, ip = pattern[j])
          p[j] = new ClipperLib.IntPoint(path[i].X - ip.X, path[i].Y - ip.Y);
        result.push(p);
      }
    var quads = new Array();
    for (var i = 0; i < pathCnt - 1 + delta; i++)
      for (var j = 0; j < polyCnt; j++)
      {
        var quad = new Array();
        quad.push(result[i % pathCnt][j % polyCnt]);
        quad.push(result[(i + 1) % pathCnt][j % polyCnt]);
        quad.push(result[(i + 1) % pathCnt][(j + 1) % polyCnt]);
        quad.push(result[i % pathCnt][(j + 1) % polyCnt]);
        if (!ClipperLib.Clipper.Orientation(quad))
          quad.reverse();
        quads.push(quad);
      }
			return quads;
  };

	ClipperLib.Clipper.MinkowskiSum = function(pattern, path_or_paths, pathIsClosed)
	{
		if(!(path_or_paths[0] instanceof Array))
		{
			var path = path_or_paths;
			var paths = ClipperLib.Clipper.Minkowski(pattern, path, true, pathIsClosed);
			var c = new ClipperLib.Clipper();
			c.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
			c.Execute(ClipperLib.ClipType.ctUnion, paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
			return paths;
		}
		else
		{
 			var paths = path_or_paths;
			var solution = new ClipperLib.Paths();
			var c = new ClipperLib.Clipper();
			for (var i = 0; i < paths.length; ++i)
			{
				var tmp = ClipperLib.Clipper.Minkowski(pattern, paths[i], true, pathIsClosed);
				c.AddPaths(tmp, ClipperLib.PolyType.ptSubject, true);
				if (pathIsClosed)
				{
					var path = ClipperLib.Clipper.TranslatePath(paths[i], pattern[0]);
					c.AddPath(path, ClipperLib.PolyType.ptClip, true);
				}
			}
			c.Execute(ClipperLib.ClipType.ctUnion, solution,
				ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
			return solution;
		}
	}
	//------------------------------------------------------------------------------

	ClipperLib.Clipper.TranslatePath = function (path, delta)
	{
		var outPath = new ClipperLib.Path();
		for (var i = 0; i < path.length; i++)
			outPath.push(new ClipperLib.IntPoint(path[i].X + delta.X, path[i].Y + delta.Y));
		return outPath;
	}
	//------------------------------------------------------------------------------

	ClipperLib.Clipper.MinkowskiDiff = function (poly1, poly2)
	{
		var paths = ClipperLib.Clipper.Minkowski(poly1, poly2, false, true);
		var c = new ClipperLib.Clipper();
		c.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
		c.Execute(ClipperLib.ClipType.ctUnion, paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
		return paths;
	}

  ClipperLib.Clipper.PolyTreeToPaths = function (polytree)
  {
    var result = new Array();
    //result.set_Capacity(polytree.get_Total());
    ClipperLib.Clipper.AddPolyNodeToPaths(polytree, ClipperLib.Clipper.NodeType.ntAny, result);
    return result;
  };
  ClipperLib.Clipper.AddPolyNodeToPaths = function (polynode, nt, paths)
  {
    var match = true;
    switch (nt)
    {
    case ClipperLib.Clipper.NodeType.ntOpen:
      return;
    case ClipperLib.Clipper.NodeType.ntClosed:
      match = !polynode.IsOpen;
      break;
    default:
      break;
    }
    if (polynode.m_polygon.length > 0 && match)
      paths.push(polynode.m_polygon);
    for (var $i3 = 0, $t3 = polynode.Childs(), $l3 = $t3.length, pn = $t3[$i3]; $i3 < $l3; $i3++, pn = $t3[$i3])
      ClipperLib.Clipper.AddPolyNodeToPaths(pn, nt, paths);
  };
  ClipperLib.Clipper.OpenPathsFromPolyTree = function (polytree)
  {
    var result = new ClipperLib.Paths();
    //result.set_Capacity(polytree.ChildCount());
    for (var i = 0, ilen = polytree.ChildCount(); i < ilen; i++)
      if (polytree.Childs()[i].IsOpen)
        result.push(polytree.Childs()[i].m_polygon);
    return result;
  };
  ClipperLib.Clipper.ClosedPathsFromPolyTree = function (polytree)
  {
    var result = new ClipperLib.Paths();
    //result.set_Capacity(polytree.Total());
    ClipperLib.Clipper.AddPolyNodeToPaths(polytree, ClipperLib.Clipper.NodeType.ntClosed, result);
    return result;
  };
  Inherit(ClipperLib.Clipper, ClipperLib.ClipperBase);
  ClipperLib.Clipper.NodeType = {
    ntAny: 0,
    ntOpen: 1,
    ntClosed: 2
  };
  ClipperLib.ClipperOffset = function (miterLimit, arcTolerance)
  {
    if (typeof (miterLimit) == "undefined") miterLimit = 2;
    if (typeof (arcTolerance) == "undefined") arcTolerance = ClipperLib.ClipperOffset.def_arc_tolerance;
    this.m_destPolys = new ClipperLib.Paths();
    this.m_srcPoly = new ClipperLib.Path();
    this.m_destPoly = new ClipperLib.Path();
    this.m_normals = new Array();
    this.m_delta = 0;
    this.m_sinA = 0;
    this.m_sin = 0;
    this.m_cos = 0;
    this.m_miterLim = 0;
    this.m_StepsPerRad = 0;
    this.m_lowest = new ClipperLib.IntPoint();
    this.m_polyNodes = new ClipperLib.PolyNode();
    this.MiterLimit = miterLimit;
    this.ArcTolerance = arcTolerance;
    this.m_lowest.X = -1;
  };
  ClipperLib.ClipperOffset.two_pi = 6.28318530717959;
  ClipperLib.ClipperOffset.def_arc_tolerance = 0.25;
  ClipperLib.ClipperOffset.prototype.Clear = function ()
  {
    ClipperLib.Clear(this.m_polyNodes.Childs());
    this.m_lowest.X = -1;
  };
  ClipperLib.ClipperOffset.Round = ClipperLib.Clipper.Round;
  ClipperLib.ClipperOffset.prototype.AddPath = function (path, joinType, endType)
  {
    var highI = path.length - 1;
    if (highI < 0)
      return;
    var newNode = new ClipperLib.PolyNode();
    newNode.m_jointype = joinType;
    newNode.m_endtype = endType;
    //strip duplicate points from path and also get index to the lowest point ...
    if (endType == ClipperLib.EndType.etClosedLine || endType == ClipperLib.EndType.etClosedPolygon)
      while (highI > 0 && ClipperLib.IntPoint.op_Equality(path[0], path[highI]))
        highI--;
    //newNode.m_polygon.set_Capacity(highI + 1);
    newNode.m_polygon.push(path[0]);
    var j = 0,
      k = 0;
    for (var i = 1; i <= highI; i++)
      if (ClipperLib.IntPoint.op_Inequality(newNode.m_polygon[j], path[i]))
      {
        j++;
        newNode.m_polygon.push(path[i]);
        if (path[i].Y > newNode.m_polygon[k].Y || (path[i].Y == newNode.m_polygon[k].Y && path[i].X < newNode.m_polygon[k].X))
          k = j;
      }
    if (endType == ClipperLib.EndType.etClosedPolygon && j < 2) return;

    this.m_polyNodes.AddChild(newNode);
    //if this path's lowest pt is lower than all the others then update m_lowest
    if (endType != ClipperLib.EndType.etClosedPolygon)
      return;
    if (this.m_lowest.X < 0)
      this.m_lowest = new ClipperLib.IntPoint(this.m_polyNodes.ChildCount() - 1, k);
    else
    {
      var ip = this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y];
      if (newNode.m_polygon[k].Y > ip.Y || (newNode.m_polygon[k].Y == ip.Y && newNode.m_polygon[k].X < ip.X))
        this.m_lowest = new ClipperLib.IntPoint(this.m_polyNodes.ChildCount() - 1, k);
    }
  };
  ClipperLib.ClipperOffset.prototype.AddPaths = function (paths, joinType, endType)
  {
    for (var i = 0, ilen = paths.length; i < ilen; i++)
      this.AddPath(paths[i], joinType, endType);
  };
  ClipperLib.ClipperOffset.prototype.FixOrientations = function ()
  {
    //fixup orientations of all closed paths if the orientation of the
    //closed path with the lowermost vertex is wrong ...
    if (this.m_lowest.X >= 0 && !ClipperLib.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))
    {
      for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
      {
        var node = this.m_polyNodes.Childs()[i];
        if (node.m_endtype == ClipperLib.EndType.etClosedPolygon || (node.m_endtype == ClipperLib.EndType.etClosedLine && ClipperLib.Clipper.Orientation(node.m_polygon)))
          node.m_polygon.reverse();
      }
    }
    else
    {
      for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
      {
        var node = this.m_polyNodes.Childs()[i];
        if (node.m_endtype == ClipperLib.EndType.etClosedLine && !ClipperLib.Clipper.Orientation(node.m_polygon))
          node.m_polygon.reverse();
      }
    }
  };
  ClipperLib.ClipperOffset.GetUnitNormal = function (pt1, pt2)
  {
    var dx = (pt2.X - pt1.X);
    var dy = (pt2.Y - pt1.Y);
    if ((dx == 0) && (dy == 0))
      return new ClipperLib.DoublePoint(0, 0);
    var f = 1 / Math.sqrt(dx * dx + dy * dy);
    dx *= f;
    dy *= f;
    return new ClipperLib.DoublePoint(dy, -dx);
  };
  ClipperLib.ClipperOffset.prototype.DoOffset = function (delta)
  {
    this.m_destPolys = new Array();
    this.m_delta = delta;
    //if Zero offset, just copy any CLOSED polygons to m_p and return ...
    if (ClipperLib.ClipperBase.near_zero(delta))
    {
      //this.m_destPolys.set_Capacity(this.m_polyNodes.ChildCount);
      for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
      {
        var node = this.m_polyNodes.Childs()[i];
        if (node.m_endtype == ClipperLib.EndType.etClosedPolygon)
          this.m_destPolys.push(node.m_polygon);
      }
      return;
    }
    //see offset_triginometry3.svg in the documentation folder ...
    if (this.MiterLimit > 2)
      this.m_miterLim = 2 / (this.MiterLimit * this.MiterLimit);
    else
      this.m_miterLim = 0.5;
    var y;
    if (this.ArcTolerance <= 0)
      y = ClipperLib.ClipperOffset.def_arc_tolerance;
    else if (this.ArcTolerance > Math.abs(delta) * ClipperLib.ClipperOffset.def_arc_tolerance)
      y = Math.abs(delta) * ClipperLib.ClipperOffset.def_arc_tolerance;
    else
      y = this.ArcTolerance;
    //see offset_triginometry2.svg in the documentation folder ...
    var steps = 3.14159265358979 / Math.acos(1 - y / Math.abs(delta));
    this.m_sin = Math.sin(ClipperLib.ClipperOffset.two_pi / steps);
    this.m_cos = Math.cos(ClipperLib.ClipperOffset.two_pi / steps);
    this.m_StepsPerRad = steps / ClipperLib.ClipperOffset.two_pi;
    if (delta < 0)
      this.m_sin = -this.m_sin;
    //this.m_destPolys.set_Capacity(this.m_polyNodes.ChildCount * 2);
    for (var i = 0; i < this.m_polyNodes.ChildCount(); i++)
    {
      var node = this.m_polyNodes.Childs()[i];
      this.m_srcPoly = node.m_polygon;
      var len = this.m_srcPoly.length;
      if (len == 0 || (delta <= 0 && (len < 3 || node.m_endtype != ClipperLib.EndType.etClosedPolygon)))
        continue;
      this.m_destPoly = new Array();
      if (len == 1)
      {
        if (node.m_jointype == ClipperLib.JoinType.jtRound)
        {
          var X = 1,
            Y = 0;
          for (var j = 1; j <= steps; j++)
          {
            this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + Y * delta)));
            var X2 = X;
            X = X * this.m_cos - this.m_sin * Y;
            Y = X2 * this.m_sin + Y * this.m_cos;
          }
        }
        else
        {
          var X = -1,
            Y = -1;
          for (var j = 0; j < 4; ++j)
          {
            this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + Y * delta)));
            if (X < 0)
              X = 1;
            else if (Y < 0)
              Y = 1;
            else
              X = -1;
          }
        }
        this.m_destPolys.push(this.m_destPoly);
        continue;
      }
      //build m_normals ...
      this.m_normals.length = 0;
      //this.m_normals.set_Capacity(len);
      for (var j = 0; j < len - 1; j++)
        this.m_normals.push(ClipperLib.ClipperOffset.GetUnitNormal(this.m_srcPoly[j], this.m_srcPoly[j + 1]));
      if (node.m_endtype == ClipperLib.EndType.etClosedLine || node.m_endtype == ClipperLib.EndType.etClosedPolygon)
        this.m_normals.push(ClipperLib.ClipperOffset.GetUnitNormal(this.m_srcPoly[len - 1], this.m_srcPoly[0]));
      else
        this.m_normals.push(new ClipperLib.DoublePoint(this.m_normals[len - 2]));
      if (node.m_endtype == ClipperLib.EndType.etClosedPolygon)
      {
        var k = len - 1;
        for (var j = 0; j < len; j++)
          k = this.OffsetPoint(j, k, node.m_jointype);
        this.m_destPolys.push(this.m_destPoly);
      }
      else if (node.m_endtype == ClipperLib.EndType.etClosedLine)
      {
        var k = len - 1;
        for (var j = 0; j < len; j++)
          k = this.OffsetPoint(j, k, node.m_jointype);
        this.m_destPolys.push(this.m_destPoly);
        this.m_destPoly = new Array();
        //re-build m_normals ...
        var n = this.m_normals[len - 1];
        for (var j = len - 1; j > 0; j--)
          this.m_normals[j] = new ClipperLib.DoublePoint(-this.m_normals[j - 1].X, -this.m_normals[j - 1].Y);
        this.m_normals[0] = new ClipperLib.DoublePoint(-n.X, -n.Y);
        k = 0;
        for (var j = len - 1; j >= 0; j--)
          k = this.OffsetPoint(j, k, node.m_jointype);
        this.m_destPolys.push(this.m_destPoly);
      }
      else
      {
        var k = 0;
        for (var j = 1; j < len - 1; ++j)
          k = this.OffsetPoint(j, k, node.m_jointype);
        var pt1;
        if (node.m_endtype == ClipperLib.EndType.etOpenButt)
        {
          var j = len - 1;
          pt1 = new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * delta));
          this.m_destPoly.push(pt1);
          pt1 = new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X - this.m_normals[j].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y - this.m_normals[j].Y * delta));
          this.m_destPoly.push(pt1);
        }
        else
        {
          var j = len - 1;
          k = len - 2;
          this.m_sinA = 0;
          this.m_normals[j] = new ClipperLib.DoublePoint(-this.m_normals[j].X, -this.m_normals[j].Y);
          if (node.m_endtype == ClipperLib.EndType.etOpenSquare)
            this.DoSquare(j, k);
          else
            this.DoRound(j, k);
        }
        //re-build m_normals ...
        for (var j = len - 1; j > 0; j--)
          this.m_normals[j] = new ClipperLib.DoublePoint(-this.m_normals[j - 1].X, -this.m_normals[j - 1].Y);
        this.m_normals[0] = new ClipperLib.DoublePoint(-this.m_normals[1].X, -this.m_normals[1].Y);
        k = len - 1;
        for (var j = k - 1; j > 0; --j)
          k = this.OffsetPoint(j, k, node.m_jointype);
        if (node.m_endtype == ClipperLib.EndType.etOpenButt)
        {
          pt1 = new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X - this.m_normals[0].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y - this.m_normals[0].Y * delta));
          this.m_destPoly.push(pt1);
          pt1 = new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + this.m_normals[0].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + this.m_normals[0].Y * delta));
          this.m_destPoly.push(pt1);
        }
        else
        {
          k = 1;
          this.m_sinA = 0;
          if (node.m_endtype == ClipperLib.EndType.etOpenSquare)
            this.DoSquare(0, 1);
          else
            this.DoRound(0, 1);
        }
        this.m_destPolys.push(this.m_destPoly);
      }
    }
  };
  ClipperLib.ClipperOffset.prototype.Execute = function ()
  {
    var a = arguments,
      ispolytree = a[0] instanceof ClipperLib.PolyTree;
    if (!ispolytree) // function (solution, delta)
    {
      var solution = a[0],
        delta = a[1];
      ClipperLib.Clear(solution);
      this.FixOrientations();
      this.DoOffset(delta);
      //now clean up 'corners' ...
      var clpr = new ClipperLib.Clipper(0);
      clpr.AddPaths(this.m_destPolys, ClipperLib.PolyType.ptSubject, true);
      if (delta > 0)
      {
        clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
      }
      else
      {
        var r = ClipperLib.Clipper.GetBounds(this.m_destPolys);
        var outer = new ClipperLib.Path();
        outer.push(new ClipperLib.IntPoint(r.left - 10, r.bottom + 10));
        outer.push(new ClipperLib.IntPoint(r.right + 10, r.bottom + 10));
        outer.push(new ClipperLib.IntPoint(r.right + 10, r.top - 10));
        outer.push(new ClipperLib.IntPoint(r.left - 10, r.top - 10));
        clpr.AddPath(outer, ClipperLib.PolyType.ptSubject, true);
        clpr.ReverseSolution = true;
        clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNegative, ClipperLib.PolyFillType.pftNegative);
        if (solution.length > 0)
          solution.splice(0, 1);
      }
      //console.log(JSON.stringify(solution));
    }
    else // function (polytree, delta)
    {
      var solution = a[0],
        delta = a[1];
      solution.Clear();
      this.FixOrientations();
      this.DoOffset(delta);
      //now clean up 'corners' ...
      var clpr = new ClipperLib.Clipper(0);
      clpr.AddPaths(this.m_destPolys, ClipperLib.PolyType.ptSubject, true);
      if (delta > 0)
      {
        clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
      }
      else
      {
        var r = ClipperLib.Clipper.GetBounds(this.m_destPolys);
        var outer = new ClipperLib.Path();
        outer.push(new ClipperLib.IntPoint(r.left - 10, r.bottom + 10));
        outer.push(new ClipperLib.IntPoint(r.right + 10, r.bottom + 10));
        outer.push(new ClipperLib.IntPoint(r.right + 10, r.top - 10));
        outer.push(new ClipperLib.IntPoint(r.left - 10, r.top - 10));
        clpr.AddPath(outer, ClipperLib.PolyType.ptSubject, true);
        clpr.ReverseSolution = true;
        clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNegative, ClipperLib.PolyFillType.pftNegative);
        //remove the outer PolyNode rectangle ...
        if (solution.ChildCount() == 1 && solution.Childs()[0].ChildCount() > 0)
        {
          var outerNode = solution.Childs()[0];
          //solution.Childs.set_Capacity(outerNode.ChildCount);
          solution.Childs()[0] = outerNode.Childs()[0];
          solution.Childs()[0].m_Parent = solution;
          for (var i = 1; i < outerNode.ChildCount(); i++)
            solution.AddChild(outerNode.Childs()[i]);
        }
        else
          solution.Clear();
      }
    }
  };
  ClipperLib.ClipperOffset.prototype.OffsetPoint = function (j, k, jointype)
  {
		//cross product ...
		this.m_sinA = (this.m_normals[k].X * this.m_normals[j].Y - this.m_normals[j].X * this.m_normals[k].Y);

		if (Math.abs(this.m_sinA * this.m_delta) < 1.0)
		{
			//dot product ...
			var cosA = (this.m_normals[k].X * this.m_normals[j].X + this.m_normals[j].Y * this.m_normals[k].Y);
			if (cosA > 0) // angle ==> 0 degrees
			{
				this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[k].X * this.m_delta),
					ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[k].Y * this.m_delta)));
				return k;
			}
			//else angle ==> 180 degrees
		}
    else if (this.m_sinA > 1)
      this.m_sinA = 1.0;
    else if (this.m_sinA < -1)
      this.m_sinA = -1.0;
    if (this.m_sinA * this.m_delta < 0)
    {
      this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[k].X * this.m_delta),
        ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[k].Y * this.m_delta)));
      this.m_destPoly.push(new ClipperLib.IntPoint(this.m_srcPoly[j]));
      this.m_destPoly.push(new ClipperLib.IntPoint(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * this.m_delta),
        ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * this.m_delta)));
    }
    else
      switch (jointype)
      {
      case ClipperLib.JoinType.jtMiter:
        {
          var r = 1 + (this.m_normals[j].X * this.m_normals[k].X + this.m_normals[j].Y * this.m_normals[k].Y);
          if (r >= this.m_miterLim)
            this.DoMiter(j, k, r);
          else
            this.DoSquare(j, k);
          break;
        }
      case ClipperLib.JoinType.jtSquare:
        this.DoSquare(j, k);
        break;
      case ClipperLib.JoinType.jtRound:
        this.DoRound(j, k);
        break;
      }
    k = j;
    return k;
  };
  ClipperLib.ClipperOffset.prototype.DoSquare = function (j, k)
  {
    var dx = Math.tan(Math.atan2(this.m_sinA,
      this.m_normals[k].X * this.m_normals[j].X + this.m_normals[k].Y * this.m_normals[j].Y) / 4);
    this.m_destPoly.push(new ClipperLib.IntPoint(
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_delta * (this.m_normals[k].X - this.m_normals[k].Y * dx)),
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_delta * (this.m_normals[k].Y + this.m_normals[k].X * dx))));
    this.m_destPoly.push(new ClipperLib.IntPoint(
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_delta * (this.m_normals[j].X + this.m_normals[j].Y * dx)),
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_delta * (this.m_normals[j].Y - this.m_normals[j].X * dx))));
  };
  ClipperLib.ClipperOffset.prototype.DoMiter = function (j, k, r)
  {
    var q = this.m_delta / r;
    this.m_destPoly.push(new ClipperLib.IntPoint(
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + (this.m_normals[k].X + this.m_normals[j].X) * q),
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + (this.m_normals[k].Y + this.m_normals[j].Y) * q)));
  };
  ClipperLib.ClipperOffset.prototype.DoRound = function (j, k)
  {
    var a = Math.atan2(this.m_sinA,
      this.m_normals[k].X * this.m_normals[j].X + this.m_normals[k].Y * this.m_normals[j].Y);

    	var steps = Math.max(ClipperLib.Cast_Int32(ClipperLib.ClipperOffset.Round(this.m_StepsPerRad * Math.abs(a))), 1);

    var X = this.m_normals[k].X,
      Y = this.m_normals[k].Y,
      X2;
    for (var i = 0; i < steps; ++i)
    {
      this.m_destPoly.push(new ClipperLib.IntPoint(
        ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + X * this.m_delta),
        ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + Y * this.m_delta)));
      X2 = X;
      X = X * this.m_cos - this.m_sin * Y;
      Y = X2 * this.m_sin + Y * this.m_cos;
    }
    this.m_destPoly.push(new ClipperLib.IntPoint(
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * this.m_delta),
      ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * this.m_delta)));
  };
  ClipperLib.Error = function (message)
  {
    try
    {
      throw new Error(message);
    }
    catch (err)
    {
      alert(err.message);
    }
  };
  // ---------------------------------
  // JS extension by Timo 2013
  ClipperLib.JS = {};
  ClipperLib.JS.AreaOfPolygon = function (poly, scale)
  {
    if (!scale) scale = 1;
    return ClipperLib.Clipper.Area(poly) / (scale * scale);
  };
  ClipperLib.JS.AreaOfPolygons = function (poly, scale)
  {
    if (!scale) scale = 1;
    var area = 0;
    for (var i = 0; i < poly.length; i++)
    {
      area += ClipperLib.Clipper.Area(poly[i]);
    }
    return area / (scale * scale);
  };
  ClipperLib.JS.BoundsOfPath = function (path, scale)
  {
    return ClipperLib.JS.BoundsOfPaths([path], scale);
  };
  ClipperLib.JS.BoundsOfPaths = function (paths, scale)
  {
    if (!scale) scale = 1;
    var bounds = ClipperLib.Clipper.GetBounds(paths);
    bounds.left /= scale;
    bounds.bottom /= scale;
    bounds.right /= scale;
    bounds.top /= scale;
    return bounds;
  };
  // Clean() joins vertices that are too near each other
  // and causes distortion to offsetted polygons without cleaning
  ClipperLib.JS.Clean = function (polygon, delta)
  {
    if (!(polygon instanceof Array)) return [];
    var isPolygons = polygon[0] instanceof Array;
    var polygon = ClipperLib.JS.Clone(polygon);
    if (typeof delta != "number" || delta === null)
    {
      ClipperLib.Error("Delta is not a number in Clean().");
      return polygon;
    }
    if (polygon.length === 0 || (polygon.length == 1 && polygon[0].length === 0) || delta < 0) return polygon;
    if (!isPolygons) polygon = [polygon];
    var k_length = polygon.length;
    var len, poly, result, d, p, j, i;
    var results = [];
    for (var k = 0; k < k_length; k++)
    {
      poly = polygon[k];
      len = poly.length;
      if (len === 0) continue;
      else if (len < 3)
      {
        result = poly;
        results.push(result);
        continue;
      }
      result = poly;
      d = delta * delta;
      //d = Math.floor(c_delta * c_delta);
      p = poly[0];
      j = 1;
      for (i = 1; i < len; i++)
      {
        if ((poly[i].X - p.X) * (poly[i].X - p.X) +
          (poly[i].Y - p.Y) * (poly[i].Y - p.Y) <= d)
          continue;
        result[j] = poly[i];
        p = poly[i];
        j++;
      }
      p = poly[j - 1];
      if ((poly[0].X - p.X) * (poly[0].X - p.X) +
        (poly[0].Y - p.Y) * (poly[0].Y - p.Y) <= d)
        j--;
      if (j < len)
        result.splice(j, len - j);
      if (result.length) results.push(result);
    }
    if (!isPolygons && results.length) results = results[0];
    else if (!isPolygons && results.length === 0) results = [];
    else if (isPolygons && results.length === 0) results = [
      []
    ];
    return results;
  }
  // Make deep copy of Polygons or Polygon
  // so that also IntPoint objects are cloned and not only referenced
  // This should be the fastest way
  ClipperLib.JS.Clone = function (polygon)
  {
    if (!(polygon instanceof Array)) return [];
    if (polygon.length === 0) return [];
    else if (polygon.length == 1 && polygon[0].length === 0) return [[]];
    var isPolygons = polygon[0] instanceof Array;
    if (!isPolygons) polygon = [polygon];
    var len = polygon.length,
      plen, i, j, result;
    var results = new Array(len);
    for (i = 0; i < len; i++)
    {
      plen = polygon[i].length;
      result = new Array(plen);
      for (j = 0; j < plen; j++)
      {
        result[j] = {
          X: polygon[i][j].X,
          Y: polygon[i][j].Y
        };
      }
      results[i] = result;
    }
    if (!isPolygons) results = results[0];
    return results;
  };
  // Removes points that doesn't affect much to the visual appearance.
  // If middle point is at or under certain distance (tolerance) of the line segment between
  // start and end point, the middle point is removed.
  ClipperLib.JS.Lighten = function (polygon, tolerance)
  {
    if (!(polygon instanceof Array)) return [];
    if (typeof tolerance != "number" || tolerance === null)
    {
      ClipperLib.Error("Tolerance is not a number in Lighten().")
      return ClipperLib.JS.Clone(polygon);
    }
    if (polygon.length === 0 || (polygon.length == 1 && polygon[0].length === 0) || tolerance < 0)
    {
      return ClipperLib.JS.Clone(polygon);
    }
    if (!(polygon[0] instanceof Array)) polygon = [polygon];
    var i, j, poly, k, poly2, plen, A, B, P, d, rem, addlast;
    var bxax, byay, l, ax, ay;
    var len = polygon.length;
    var toleranceSq = tolerance * tolerance;
    var results = [];
    for (i = 0; i < len; i++)
    {
      poly = polygon[i];
      plen = poly.length;
      if (plen == 0) continue;
      for (k = 0; k < 1000000; k++) // could be forever loop, but wiser to restrict max repeat count
      {
        poly2 = [];
        plen = poly.length;
        // the first have to added to the end, if first and last are not the same
        // this way we ensure that also the actual last point can be removed if needed
        if (poly[plen - 1].X != poly[0].X || poly[plen - 1].Y != poly[0].Y)
        {
          addlast = 1;
          poly.push(
          {
            X: poly[0].X,
            Y: poly[0].Y
          });
          plen = poly.length;
        }
        else addlast = 0;
        rem = []; // Indexes of removed points
        for (j = 0; j < plen - 2; j++)
        {
          A = poly[j]; // Start point of line segment
          P = poly[j + 1]; // Middle point. This is the one to be removed.
          B = poly[j + 2]; // End point of line segment
          ax = A.X;
          ay = A.Y;
          bxax = B.X - ax;
          byay = B.Y - ay;
          if (bxax !== 0 || byay !== 0) // To avoid Nan, when A==P && P==B. And to avoid peaks (A==B && A!=P), which have lenght, but not area.
          {
            l = ((P.X - ax) * bxax + (P.Y - ay) * byay) / (bxax * bxax + byay * byay);
            if (l > 1)
            {
              ax = B.X;
              ay = B.Y;
            }
            else if (l > 0)
            {
              ax += bxax * l;
              ay += byay * l;
            }
          }
          bxax = P.X - ax;
          byay = P.Y - ay;
          d = bxax * bxax + byay * byay;
          if (d <= toleranceSq)
          {
            rem[j + 1] = 1;
            j++; // when removed, transfer the pointer to the next one
          }
        }
        // add all unremoved points to poly2
        poly2.push(
        {
          X: poly[0].X,
          Y: poly[0].Y
        });
        for (j = 1; j < plen - 1; j++)
          if (!rem[j]) poly2.push(
          {
            X: poly[j].X,
            Y: poly[j].Y
          });
        poly2.push(
        {
          X: poly[plen - 1].X,
          Y: poly[plen - 1].Y
        });
        // if the first point was added to the end, remove it
        if (addlast) poly.pop();
        // break, if there was not anymore removed points
        if (!rem.length) break;
        // else continue looping using poly2, to check if there are points to remove
        else poly = poly2;
      }
      plen = poly2.length;
      // remove duplicate from end, if needed
      if (poly2[plen - 1].X == poly2[0].X && poly2[plen - 1].Y == poly2[0].Y)
      {
        poly2.pop();
      }
      if (poly2.length > 2) // to avoid two-point-polygons
        results.push(poly2);
    }
    if (!(polygon[0] instanceof Array)) results = results[0];
    if (typeof (results) == "undefined") results = [
      []
    ];
    return results;
  }
  ClipperLib.JS.PerimeterOfPath = function (path, closed, scale)
  {
    if (typeof (path) == "undefined") return 0;
    var sqrt = Math.sqrt;
    var perimeter = 0.0;
    var p1, p2, p1x = 0.0,
      p1y = 0.0,
      p2x = 0.0,
      p2y = 0.0;
    var j = path.length;
    if (j < 2) return 0;
    if (closed)
    {
      path[j] = path[0];
      j++;
    }
    while (--j)
    {
      p1 = path[j];
      p1x = p1.X;
      p1y = p1.Y;
      p2 = path[j - 1];
      p2x = p2.X;
      p2y = p2.Y;
      perimeter += sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));
    }
    if (closed) path.pop();
    return perimeter / scale;
  };
  ClipperLib.JS.PerimeterOfPaths = function (paths, closed, scale)
  {
    if (!scale) scale = 1;
    var perimeter = 0;
    for (var i = 0; i < paths.length; i++)
    {
      perimeter += ClipperLib.JS.PerimeterOfPath(paths[i], closed, scale);
    }
    return perimeter;
  };
  ClipperLib.JS.ScaleDownPath = function (path, scale)
  {
    var i, p;
    if (!scale) scale = 1;
    i = path.length;
    while (i--)
    {
      p = path[i];
      p.X = p.X / scale;
      p.Y = p.Y / scale;
    }
  };
  ClipperLib.JS.ScaleDownPaths = function (paths, scale)
  {
    var i, j, p;
    if (!scale) scale = 1;
    i = paths.length;
    while (i--)
    {
      j = paths[i].length;
      while (j--)
      {
        p = paths[i][j];
        p.X = p.X / scale;
        p.Y = p.Y / scale;
      }
    }
  };
  ClipperLib.JS.ScaleUpPath = function (path, scale)
  {
    var i, p, round = Math.round;
    if (!scale) scale = 1;
    i = path.length;
    while (i--)
    {
      p = path[i];
      p.X = round(p.X * scale);
      p.Y = round(p.Y * scale);
    }
  };
  ClipperLib.JS.ScaleUpPaths = function (paths, scale)
  {
    var i, j, p, round = Math.round;
    if (!scale) scale = 1;
    i = paths.length;
    while (i--)
    {
      j = paths[i].length;
      while (j--)
      {
        p = paths[i][j];
        p.X = round(p.X * scale);
        p.Y = round(p.Y * scale);
      }
    }
  };
  ClipperLib.ExPolygons = function ()
  {
    return [];
  }
  ClipperLib.ExPolygon = function ()
  {
    this.outer = null;
    this.holes = null;
  };
  ClipperLib.JS.AddOuterPolyNodeToExPolygons = function (polynode, expolygons)
  {
    var ep = new ClipperLib.ExPolygon();
    ep.outer = polynode.Contour();
    var childs = polynode.Childs();
    var ilen = childs.length;
    ep.holes = new Array(ilen);
    var node, n, i, j, childs2, jlen;
    for (i = 0; i < ilen; i++)
    {
      node = childs[i];
      ep.holes[i] = node.Contour();
      //Add outer polygons contained by (nested within) holes ...
      for (j = 0, childs2 = node.Childs(), jlen = childs2.length; j < jlen; j++)
      {
        n = childs2[j];
        ClipperLib.JS.AddOuterPolyNodeToExPolygons(n, expolygons);
      }
    }
    expolygons.push(ep);
  };
  ClipperLib.JS.ExPolygonsToPaths = function (expolygons)
  {
    var a, i, alen, ilen;
    var paths = new ClipperLib.Paths();
    for (a = 0, alen = expolygons.length; a < alen; a++)
    {
      paths.push(expolygons[a].outer);
      for (i = 0, ilen = expolygons[a].holes.length; i < ilen; i++)
      {
        paths.push(expolygons[a].holes[i]);
      }
    }
    return paths;
  }
  ClipperLib.JS.PolyTreeToExPolygons = function (polytree)
  {
    var expolygons = new ClipperLib.ExPolygons();
    var node, i, childs, ilen;
    for (i = 0, childs = polytree.Childs(), ilen = childs.length; i < ilen; i++)
    {
      node = childs[i];
      ClipperLib.JS.AddOuterPolyNodeToExPolygons(node, expolygons);
    }
    return expolygons;
  };
})();


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(18);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(43)
  , toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(48);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(11)
  , toObject  = __webpack_require__(9)
  , IObject   = __webpack_require__(54)
  , toLength  = __webpack_require__(8);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(11)
  , isObject   = __webpack_require__(4)
  , invoke     = __webpack_require__(68)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(7).f
  , create      = __webpack_require__(38)
  , redefineAll = __webpack_require__(41)
  , ctx         = __webpack_require__(27)
  , anInstance  = __webpack_require__(36)
  , defined     = __webpack_require__(19)
  , forOf       = __webpack_require__(48)
  , $iterDefine = __webpack_require__(91)
  , step        = __webpack_require__(136)
  , setSpecies  = __webpack_require__(42)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(31).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(53)
  , from    = __webpack_require__(127);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(41)
  , getWeak           = __webpack_require__(31).getWeak
  , anObject          = __webpack_require__(1)
  , isObject          = __webpack_require__(4)
  , anInstance        = __webpack_require__(36)
  , forOf             = __webpack_require__(48)
  , createArrayMethod = __webpack_require__(22)
  , $has              = __webpack_require__(10)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(83)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 137 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(40)
  , gOPS     = __webpack_require__(72)
  , pIE      = __webpack_require__(55)
  , toObject = __webpack_require__(9)
  , IObject  = __webpack_require__(54)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(1)
  , getKeys  = __webpack_require__(40);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15)
  , gOPN      = __webpack_require__(39).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(10)
  , toIObject    = __webpack_require__(15)
  , arrayIndexOf = __webpack_require__(64)(false)
  , IE_PROTO     = __webpack_require__(96)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(40)
  , toIObject = __webpack_require__(15)
  , isEnum    = __webpack_require__(55).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(39)
  , gOPS     = __webpack_require__(72)
  , anObject = __webpack_require__(1)
  , Reflect  = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat
  , $trim       = __webpack_require__(51).trim;

module.exports = 1 / $parseFloat(__webpack_require__(101) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt
  , $trim     = __webpack_require__(51).trim
  , ws        = __webpack_require__(101)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 146 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8)
  , repeat   = __webpack_require__(100)
  , defined  = __webpack_require__(19);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(130);

// 23.1 Map Objects
module.exports = __webpack_require__(65)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(6) && /./g.flags != 'g')__webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(67)
});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(130);

// 23.2 Set Objects
module.exports = __webpack_require__(65)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(22)(0)
  , redefine     = __webpack_require__(13)
  , meta         = __webpack_require__(31)
  , assign       = __webpack_require__(138)
  , weak         = __webpack_require__(132)
  , isObject     = __webpack_require__(4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(65)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!element.matches) {
    var vendorMatches = element.webkitMatchesSelector
        || element.msMatchesSelector
        || element.mozMatchesSelector
        || element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (matcher);


/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = EnterNode;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sparse__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(21);



/* harmony default export */ __webpack_exports__["a"] = (function() {
  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Selection */](this._enter || this._groups.map(__WEBPACK_IMPORTED_MODULE_0__sparse__["a" /* default */]), this._parents);
});

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};


/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(update) {
  return new Array(update.length);
});


/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = styleValue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(114);


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ __webpack_exports__["b"] = (function(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
});

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__window__["a" /* default */])(node).getComputedStyle(node, null).getPropertyValue(name);
}


/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function empty() {
  return [];
}

/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
});


/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__curve_linear__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__line__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__point__ = __webpack_require__(118);






/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x0 = __WEBPACK_IMPORTED_MODULE_4__point__["a" /* x */],
      x1 = null,
      y0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(0),
      y1 = __WEBPACK_IMPORTED_MODULE_4__point__["b" /* y */],
      defined = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(true),
      context = null,
      curve = __WEBPACK_IMPORTED_MODULE_2__curve_linear__["a" /* default */],
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__line__["a" /* default */])().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
});


/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slice; });
var slice = Array.prototype.slice;


/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = CardinalClosed;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cardinal__ = __webpack_require__(76);



function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__cardinal__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = CardinalOpen;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinal__ = __webpack_require__(76);


function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__cardinal__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return curveRadialLinear; });
/* harmony export (immutable) */ __webpack_exports__["a"] = curveRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__linear__ = __webpack_require__(77);


var curveRadialLinear = curveRadial(__WEBPACK_IMPORTED_MODULE_0__linear__["a" /* default */]);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}


/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = lineRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__curve_radial__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line__ = __webpack_require__(116);



function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["a" /* default */])(_)) : c()._curve;
  };

  return l;
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return lineRadial(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__line__["a" /* default */])().curve(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["b" /* curveRadialLinear */]));
});


/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
});


/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(57);


/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / __WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */]);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, __WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */]);
  }
});


/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
});


/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
});


/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
});


/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(57);


var ka = 0.89081309152928522810,
    kr = Math.sin(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */] / 10) / Math.sin(7 * __WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */] / 10),
    kx = Math.sin(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] / 10) * kr,
    ky = -Math.cos(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] / 10) * kr;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = __WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
});


/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var sqrt3 = Math.sqrt(3);

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
});


/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var c = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __webpack_require__(25);

module.exports = function () {
	value(this).length = 0;
	return this;
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(438)

  , max = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = { 'function': true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject      = __webpack_require__(174)
  , value         = __webpack_require__(25)

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if ((prototype === null) || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}())));

__webpack_require__(443);


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(79)
  , callable    = __webpack_require__(30)
  , isString    = __webpack_require__(80)
  , get         = __webpack_require__(179)

  , isArray = Array.isArray, call = Function.prototype.call
  , some = Array.prototype.some;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(79)
  , isString       = __webpack_require__(80)
  , ArrayIterator  = __webpack_require__(454)
  , StringIterator = __webpack_require__(456)
  , iterable       = __webpack_require__(180)
  , iteratorSymbol = __webpack_require__(35).iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIterable = __webpack_require__(455);

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var _isPlaceholder = __webpack_require__(473);


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};


/***/ }),
/* 182 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(367);

__webpack_require__(477);

__webpack_require__(187);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(182)))

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concavehull = __webpack_require__(186);

var _concavehull2 = _interopRequireDefault(_concavehull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @return {LatLng[]}
 */
exports.default = function (map, latLngs) {
  return new _concavehull2.default([].concat(_toConsumableArray(latLngs), [latLngs[0]])).getLatLngs();
};

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createEdges;

var _leaflet = __webpack_require__(46);

var _FreeDraw = __webpack_require__(52);

var _Polygon = __webpack_require__(63);

var _Layer = __webpack_require__(62);

var _Flags = __webpack_require__(61);

var _Merge = __webpack_require__(122);

var _Merge2 = _interopRequireDefault(_Merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method createEdges
 * @param {Object} map
 * @param {L.Polygon} polygon
 * @param {Object} options
 * @return {Array}
 */
function createEdges(map, polygon, options) {

    /**
     * @method fetchLayerPoints
     * @param polygon {Object}
     * @return {Array}
     */
    var fetchLayerPoints = function fetchLayerPoints(polygon) {

        return polygon.getLatLngs()[0].map(function (latLng) {
            return map.latLngToLayerPoint(latLng);
        });
    };

    var markers = fetchLayerPoints(polygon).map(function (point) {

        var mode = map[_FreeDraw.modesKey];
        var icon = new _leaflet.DivIcon({ className: ('leaflet-edge ' + (mode & _Flags.EDIT ? '' : 'disabled')).trim() });
        var latLng = map.layerPointToLatLng(point);
        var marker = new _leaflet.Marker(latLng, { icon: icon }).addTo(map);

        // Disable the propagation when you click on the marker.
        _leaflet.DomEvent.disableClickPropagation(marker);

        marker.on('mousedown', function mouseDown() {

            if (!(map[_FreeDraw.modesKey] & _Flags.EDIT)) {

                // Polygons can only be created when the mode includes edit.
                map.off('mousedown', mouseDown);
                return;
            }

            // Disable the map dragging as otherwise it's difficult to reposition the edge.
            map.dragging.disable();

            /**
             * @method mouseMove
             * @param {Object} event
             * @return {void}
             */
            var mouseMove = function mouseMove(event) {

                // Determine where to move the marker to from the mouse move event.
                var containerPoint = map.latLngToContainerPoint(event.latlng);
                var latLng = map.containerPointToLatLng(containerPoint);

                // Update the marker with the new lat long.
                marker.setLatLng(latLng);

                // ...And finally update the polygon to match the current markers.
                var latLngs = markers.map(function (marker) {
                    return marker.getLatLng();
                });
                polygon.setLatLngs(latLngs);
                polygon.redraw();
            };

            // Listen for the mouse move events to determine where to move the marker to.
            map.on('mousemove', mouseMove);

            /**
             * @method mouseUp
             * @return {void}
             */
            function mouseUp() {

                if (!(map[_FreeDraw.modesKey] & _Flags.CREATE)) {

                    // Re-enable the dragging of the map only if created mode is not enabled.
                    map.dragging.enable();
                }

                // Stop listening to the events.
                map.off('mouseup', mouseUp);
                map.off('mousedown', mouseDown);
                map.off('mousemove', mouseMove);

                // We can optionally recreate the polygon after modifying its shape, as sometimes edges/
                // become "detached" and thus if we choose to re-render the polygon afterwards, those edges
                // will disappear, otherwise they will remain and look somewhat detached, yet still active.
                if (options.recreateAfterEdit) {

                    // Remove all of the existing markers for the current polygon.
                    markers.forEach(function (marker) {
                        return map.removeLayer(marker);
                    });

                    // As well as the polygon itself.
                    map.removeLayer(polygon);

                    // ...And then recreate the polygon using the updated lat longs.
                    var latLngs = markers.map(function (marker) {
                        return marker.getLatLng();
                    });
                    (0, _Polygon.createFor)(map, latLngs, options);
                }

                // Merge the polygons if the options allow using a two-pass approach as this yields the better results.
                var merge = function merge() {
                    return (0, _Merge2.default)(map, Array.from(_FreeDraw.polygons.get(map)), options);
                };
                options.mergePolygons && merge() && merge();

                // Trigger the event for having modified the edges of a polygon, unless the `notifyAfterEditExit`
                // option is equal to `true`, in which case we'll defer the notification.
                options.notifyAfterEditExit ? function () {

                    // Deferred function that will be invoked by `modeFor` when the `EDIT` mode is exited.
                    map[_FreeDraw.notifyDeferredKey] = function () {
                        return (0, _Layer.updateFor)(map, 'edit');
                    };
                }() : (0, _Layer.updateFor)(map, 'edit');
            }

            // Cleanup the mouse events when the user releases the mouse button.
            // We need to listen on both map and marker, because if the user moves the edge too quickly then
            // the mouse up will occur on the map layer.
            map.on('mouseup', mouseUp);
            marker.on('mouseup', mouseUp);
        });

        return marker;
    });

    return markers;
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! concavehull by Adam Timberlake <adam.timberlake@gmail.com> created on 2015-01-23 */
!function(a){"use strict";var b=function(a,b){var c=this.convertLatLngs(a);this.points=c.points,this.maxDistance=isFinite(b)?b:c.maxDistance+1};b.prototype={points:[],maxDistance:0,convertLatLngs:function(a){var b=0,c=a.map(function(c,d){if(c.x=c.lng,c.y=this.lat2y(c),a[d-1]){var e=this.distanceTo(c,a[d-1]);e>b&&(b=e)}return c}.bind(this));return{points:c,maxDistance:b}},distanceTo:function(b,c){var d=6378137,e=a.PI/180,f=(c.lat-b.lat)*e,g=(c.lng-b.lng)*e,h=b.lat*e,i=c.lat*e,j=a.sin(f/2),k=a.sin(g/2),l=j*j+k*k*a.cos(h)*a.cos(i);return 2*d*a.atan2(a.sqrt(l),a.sqrt(1-l))},getLatLngs:function(){if(this.length<=3)return this.points;var a=this.points.slice().sort(function(a,b){return a.y-b.y}),b=[],c=a[0],d=c,e={x:d.x,y:d.y-1};b.push(c);for(var f,g=0,h=function(a,b){return this.getAngle(d,e,b)-this.getAngle(d,e,a)}.bind(this);;){g++;for(var i=this.points.slice().sort(h),j=0,k=i.length;k>j;j++)if(this.distanceTo(d,i[j])<this.maxDistance&&!this.isIntersecting(b,i[j])){f=i[j];break}if(!f)return this.points;if(f===d)return this.points;if(b.push(f),f===c)return b;if(e=d,d=f,f=void 0,g>1e3)return this.points}},isIntersecting:function(a,b){for(var c=1,d=a.length-1;d>c;c++)if(this.intersect(a[c-1],a[c],a[d],b))return!0;return!1},intersect:function(a,b,c,d){return a.x===c.x&&a.y===c.y||b.x===d.x&&b.y===d.y||a.x===d.x&&a.y===d.y||b.x===c.x&&b.y===c.y?!1:this.ccw(a,b,c)*this.ccw(a,b,d)<=0&&this.ccw(c,d,a)*this.ccw(c,d,b)<=0},lat2y:function(b){return 180/a.PI*a.log(a.tan(a.PI/4+b.lat*(a.PI/180)/2))},ccw:function(a,b,c){var d=1e-13,e=b.x-a.x,f=b.y-a.y,g=c.x-a.x,h=c.y-a.y,i=e*h-f*g;return i>d?1:-d>i?-1:-d>e*g||-d>f*h?-1:g*g+h*h+d>e*e+f*f?1:0},getAngle:function(b,c,d){if(d.x===b.x&&d.y===b.y)return-9e3;if(d.x===c.x&&d.y===c.y)return-360;var e,f={x:b.x-c.x,y:b.y-c.y},g={x:d.x-b.x,y:d.y-b.y},h=f.x*g.y-g.x*f.y,i=f.x*g.x+f.y*g.y;return 0===i?(h>0&&(e=90),0>h&&(e=-90)):(e=180*a.atan(h/i)/a.PI,0>i&&(h>=0&&(e+=180),0>h&&(e-=180))),360===e&&(e=0),180-e}},function(){return"undefined"!=typeof module&&module.exports?void(module.exports=b): true?void !(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return b}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):void(window.ConcaveHull=b)}()}(Math);

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(196);
module.exports = __webpack_require__(26).RegExp.escape;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , isArray  = __webpack_require__(89)
  , SPECIES  = __webpack_require__(5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(188);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(24)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(40)
  , gOPS    = __webpack_require__(72)
  , pIE     = __webpack_require__(55);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(40)
  , toIObject = __webpack_require__(15);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(194)
  , invoke    = __webpack_require__(68)
  , aFunction = __webpack_require__(11);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(195)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(126)});

__webpack_require__(47)('copyWithin');

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(22)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(81)});

__webpack_require__(47)('fill');

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(22)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(22)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(47)(KEY);

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(22)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(47)(KEY);

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(22)(0)
  , STRICT   = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(27)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(9)
  , call           = __webpack_require__(135)
  , isArrayIter    = __webpack_require__(88)
  , toLength       = __webpack_require__(8)
  , createProperty = __webpack_require__(82)
  , getIterFn      = __webpack_require__(105);

$export($export.S + $export.F * !__webpack_require__(70)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(64)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(89)});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(15)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(54) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(15)
  , toInteger     = __webpack_require__(33)
  , toLength      = __webpack_require__(8)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(22)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(82);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(128);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(128);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(86)
  , cof        = __webpack_require__(18)
  , toIndex    = __webpack_require__(43)
  , toLength   = __webpack_require__(8)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(22)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(11)
  , toObject  = __webpack_require__(9)
  , fails     = __webpack_require__(3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)('Array');

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(9)
  , toPrimitive = __webpack_require__(24);

$export($export.P + $export.F * __webpack_require__(3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(190));

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(13)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(129)});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(4)
  , getPrototypeOf = __webpack_require__(17)
  , HAS_INSTANCE   = __webpack_require__(5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7).f
  , createDesc = __webpack_require__(32)
  , has        = __webpack_require__(10)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(137)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(93);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(92);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(93)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(137)});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(93)});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(92)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(92)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , has               = __webpack_require__(10)
  , cof               = __webpack_require__(18)
  , inheritIfRequired = __webpack_require__(87)
  , toPrimitive       = __webpack_require__(24)
  , fails             = __webpack_require__(3)
  , gOPN              = __webpack_require__(39).f
  , gOPD              = __webpack_require__(16).f
  , dP                = __webpack_require__(7).f
  , $trim             = __webpack_require__(51).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(38)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(134)});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(134)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(144);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(145);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , toInteger    = __webpack_require__(33)
  , aNumberValue = __webpack_require__(125)
  , repeat       = __webpack_require__(100)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(3)
  , aNumberValue = __webpack_require__(125)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(138)});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(38)});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(139)});

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(23)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(15)
  , $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(23)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(23)('getOwnPropertyNames', function(){
  return __webpack_require__(140).f;
});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(9)
  , $getPrototypeOf = __webpack_require__(17);

__webpack_require__(23)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(23)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(23)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(23)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(146)});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9)
  , $keys    = __webpack_require__(40);

__webpack_require__(23)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(23)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(23)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(95).set});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(53)
  , test    = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(13)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(144);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(145);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(37)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(27)
  , classof            = __webpack_require__(53)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(4)
  , aFunction          = __webpack_require__(11)
  , anInstance         = __webpack_require__(36)
  , forOf              = __webpack_require__(48)
  , speciesConstructor = __webpack_require__(97)
  , task               = __webpack_require__(102).set
  , microtask          = __webpack_require__(94)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(50)($Promise, PROMISE);
__webpack_require__(42)(PROMISE);
Wrapper = __webpack_require__(26)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(70)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(11)
  , anObject  = __webpack_require__(1)
  , rApply    = (__webpack_require__(2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(0)
  , create     = __webpack_require__(38)
  , aFunction  = __webpack_require__(11)
  , anObject   = __webpack_require__(1)
  , isObject   = __webpack_require__(4)
  , fails      = __webpack_require__(3)
  , bind       = __webpack_require__(129)
  , rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(7)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(24);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(16).f
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(90)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(16)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(17)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(10)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(4)
  , anObject       = __webpack_require__(1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(143)});

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(95);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(7)
  , gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(10)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(32)
  , anObject       = __webpack_require__(1)
  , isObject       = __webpack_require__(4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(2)
  , inheritIfRequired = __webpack_require__(87)
  , dP                = __webpack_require__(7).f
  , gOPN              = __webpack_require__(39).f
  , isRegExp          = __webpack_require__(69)
  , $flags            = __webpack_require__(67)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function(){
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(42)('RegExp');

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(66)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(66)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(66)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(66)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(69)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(150);
var anObject    = __webpack_require__(1)
  , $flags      = __webpack_require__(67)
  , DESCRIPTORS = __webpack_require__(6)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(14)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(14)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(14)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(14)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(98)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(8)
  , context   = __webpack_require__(99)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(85)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(14)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(14)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(14)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(43)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(99)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(85)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(14)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(98)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(91)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(14)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(15)
  , toLength  = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(100)
});

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(14)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(8)
  , context     = __webpack_require__(99)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(85)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(14)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(14)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(14)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(51)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(10)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(13)
  , META           = __webpack_require__(31).KEY
  , $fails         = __webpack_require__(3)
  , shared         = __webpack_require__(73)
  , setToStringTag = __webpack_require__(50)
  , uid            = __webpack_require__(44)
  , wks            = __webpack_require__(5)
  , wksExt         = __webpack_require__(148)
  , wksDefine      = __webpack_require__(104)
  , keyOf          = __webpack_require__(192)
  , enumKeys       = __webpack_require__(191)
  , isArray        = __webpack_require__(89)
  , anObject       = __webpack_require__(1)
  , toIObject      = __webpack_require__(15)
  , toPrimitive    = __webpack_require__(24)
  , createDesc     = __webpack_require__(32)
  , _create        = __webpack_require__(38)
  , gOPNExt        = __webpack_require__(140)
  , $GOPD          = __webpack_require__(16)
  , $DP            = __webpack_require__(7)
  , $keys          = __webpack_require__(40)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(39).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(55).f  = $propertyIsEnumerable;
  __webpack_require__(72).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(37)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(74)
  , buffer       = __webpack_require__(103)
  , anObject     = __webpack_require__(1)
  , toIndex      = __webpack_require__(43)
  , toLength     = __webpack_require__(8)
  , isObject     = __webpack_require__(4)
  , ArrayBuffer  = __webpack_require__(2).ArrayBuffer
  , speciesConstructor = __webpack_require__(97)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(42)(ARRAY_BUFFER);

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(74).ABV, {
  DataView: __webpack_require__(103).DataView
});

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(132);

// 23.4 WeakSet Objects
__webpack_require__(65)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(64)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(47)('includes');

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(94)()
  , process   = __webpack_require__(2).process
  , isNode    = __webpack_require__(18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(18);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(131)('Map')});

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(11)
  , $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(71), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(11)
  , $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(71), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(142)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(143)
  , toIObject      = __webpack_require__(15)
  , gOPD           = __webpack_require__(16)
  , createProperty = __webpack_require__(82);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(24)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(71), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(24)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(71), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(142)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(2)
  , core        = __webpack_require__(26)
  , microtask   = __webpack_require__(94)()
  , OBSERVABLE  = __webpack_require__(5)('observable')
  , aFunction   = __webpack_require__(11)
  , anObject    = __webpack_require__(1)
  , anInstance  = __webpack_require__(36)
  , redefineAll = __webpack_require__(41)
  , hide        = __webpack_require__(12)
  , forOf       = __webpack_require__(48)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(42)('Observable');

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(28)
  , anObject                  = __webpack_require__(1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(151)
  , from                    = __webpack_require__(127)
  , metadata                = __webpack_require__(28)
  , anObject                = __webpack_require__(1)
  , getPrototypeOf          = __webpack_require__(17)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(28)
  , anObject                = __webpack_require__(1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(28)
  , anObject                  = __webpack_require__(1)
  , aFunction                 = __webpack_require__(11)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(131)('Set')});

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(98)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(19)
  , toLength    = __webpack_require__(8)
  , isRegExp    = __webpack_require__(69)
  , getFlags    = __webpack_require__(67)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(90)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(147);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(147);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(51)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(51)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104)('asyncIterator');

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104)('observable');

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(2)});

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(106)
  , redefine      = __webpack_require__(13)
  , global        = __webpack_require__(2)
  , hide          = __webpack_require__(12)
  , Iterators     = __webpack_require__(49)
  , wks           = __webpack_require__(5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(102);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(2)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(68)
  , partial    = __webpack_require__(193)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(316);
__webpack_require__(255);
__webpack_require__(257);
__webpack_require__(256);
__webpack_require__(259);
__webpack_require__(261);
__webpack_require__(266);
__webpack_require__(260);
__webpack_require__(258);
__webpack_require__(268);
__webpack_require__(267);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(262);
__webpack_require__(254);
__webpack_require__(265);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(222);
__webpack_require__(224);
__webpack_require__(223);
__webpack_require__(272);
__webpack_require__(271);
__webpack_require__(242);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(303);
__webpack_require__(308);
__webpack_require__(315);
__webpack_require__(306);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(304);
__webpack_require__(309);
__webpack_require__(311);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(305);
__webpack_require__(307);
__webpack_require__(310);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(217);
__webpack_require__(219);
__webpack_require__(218);
__webpack_require__(221);
__webpack_require__(220);
__webpack_require__(206);
__webpack_require__(204);
__webpack_require__(210);
__webpack_require__(207);
__webpack_require__(213);
__webpack_require__(215);
__webpack_require__(203);
__webpack_require__(209);
__webpack_require__(200);
__webpack_require__(214);
__webpack_require__(198);
__webpack_require__(212);
__webpack_require__(211);
__webpack_require__(205);
__webpack_require__(208);
__webpack_require__(197);
__webpack_require__(199);
__webpack_require__(202);
__webpack_require__(201);
__webpack_require__(216);
__webpack_require__(106);
__webpack_require__(288);
__webpack_require__(293);
__webpack_require__(150);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(273);
__webpack_require__(149);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(328);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(323);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(321);
__webpack_require__(324);
__webpack_require__(322);
__webpack_require__(325);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(281);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(287);
__webpack_require__(286);
__webpack_require__(329);
__webpack_require__(355);
__webpack_require__(358);
__webpack_require__(357);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(356);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(340);
__webpack_require__(343);
__webpack_require__(339);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(332);
__webpack_require__(354);
__webpack_require__(363);
__webpack_require__(331);
__webpack_require__(333);
__webpack_require__(335);
__webpack_require__(334);
__webpack_require__(336);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(348);
__webpack_require__(347);
__webpack_require__(350);
__webpack_require__(349);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(330);
__webpack_require__(344);
__webpack_require__(366);
__webpack_require__(365);
__webpack_require__(364);
module.exports = __webpack_require__(26);

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copy             = __webpack_require__(442)
  , normalizeOptions = __webpack_require__(175)
  , ensureCallable   = __webpack_require__(30)
  , map              = __webpack_require__(449)
  , callable         = __webpack_require__(30)
  , validValue       = __webpack_require__(25)

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (options.resolveContext != null) ensureCallable(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};


/***/ }),
/* 369 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (path);


/***/ }),
/* 370 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_creator__ = __webpack_require__(107);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "creator", function() { return __WEBPACK_IMPORTED_MODULE_0__src_creator__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_local__ = __webpack_require__(372);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "local", function() { return __WEBPACK_IMPORTED_MODULE_1__src_local__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_matcher__ = __webpack_require__(153);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "matcher", function() { return __WEBPACK_IMPORTED_MODULE_2__src_matcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mouse__ = __webpack_require__(373);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return __WEBPACK_IMPORTED_MODULE_3__src_mouse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_namespace__ = __webpack_require__(108);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return __WEBPACK_IMPORTED_MODULE_4__src_namespace__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_namespaces__ = __webpack_require__(109);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "namespaces", function() { return __WEBPACK_IMPORTED_MODULE_5__src_namespaces__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_select__ = __webpack_require__(374);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_6__src_select__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_selectAll__ = __webpack_require__(375);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selectAll", function() { return __WEBPACK_IMPORTED_MODULE_7__src_selectAll__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_selection_index__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selection", function() { return __WEBPACK_IMPORTED_MODULE_8__src_selection_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_selector__ = __webpack_require__(112);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selector", function() { return __WEBPACK_IMPORTED_MODULE_9__src_selector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_selectorAll__ = __webpack_require__(157);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selectorAll", function() { return __WEBPACK_IMPORTED_MODULE_10__src_selectorAll__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_selection_style__ = __webpack_require__(156);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "style", function() { return __WEBPACK_IMPORTED_MODULE_11__src_selection_style__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_touch__ = __webpack_require__(402);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "touch", function() { return __WEBPACK_IMPORTED_MODULE_12__src_touch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_touches__ = __webpack_require__(403);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "touches", function() { return __WEBPACK_IMPORTED_MODULE_13__src_touches__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_window__ = __webpack_require__(114);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "window", function() { return __WEBPACK_IMPORTED_MODULE_14__src_window__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_selection_on__ = __webpack_require__(111);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "event", function() { return __WEBPACK_IMPORTED_MODULE_15__src_selection_on__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "customEvent", function() { return __WEBPACK_IMPORTED_MODULE_15__src_selection_on__["b"]; });


















/***/ }),
/* 371 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),
/* 372 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = local;
var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};


/***/ }),
/* 373 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(110);



/* harmony default export */ __webpack_exports__["a"] = (function(node) {
  var event = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])();
  if (event.changedTouches) event = event.changedTouches[0];
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, event);
});


/***/ }),
/* 374 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_index__ = __webpack_require__(21);


/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return typeof selector === "string"
      ? new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([[document.querySelector(selector)]], [document.documentElement])
      : new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([[selector]], __WEBPACK_IMPORTED_MODULE_0__selection_index__["c" /* root */]);
});


/***/ }),
/* 375 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_index__ = __webpack_require__(21);


/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return typeof selector === "string"
      ? new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([document.querySelectorAll(selector)], [document.documentElement])
      : new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([selector == null ? [] : selector], __WEBPACK_IMPORTED_MODULE_0__selection_index__["c" /* root */]);
});


/***/ }),
/* 376 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__creator__ = __webpack_require__(107);


/* harmony default export */ __webpack_exports__["a"] = (function(name) {
  var create = typeof name === "function" ? name : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__creator__["a" /* default */])(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
});


/***/ }),
/* 377 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespace__ = __webpack_require__(108);


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, value) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__namespace__["a" /* default */])(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
});


/***/ }),
/* 378 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
});


/***/ }),
/* 379 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
});


/***/ }),
/* 380 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enter__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(371);




var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new __WEBPACK_IMPORTED_MODULE_1__enter__["b" /* EnterNode */](parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new __WEBPACK_IMPORTED_MODULE_1__enter__["b" /* EnterNode */](parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (function(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
});


/***/ }),
/* 381 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
});


/***/ }),
/* 382 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(114);


function dispatchEvent(node, type, params) {
  var window = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__window__["a" /* default */])(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
});


/***/ }),
/* 383 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
});


/***/ }),
/* 384 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  return !this.node();
});


/***/ }),
/* 385 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sparse__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(21);



/* harmony default export */ __webpack_exports__["a"] = (function() {
  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Selection */](this._exit || this._groups.map(__WEBPACK_IMPORTED_MODULE_0__sparse__["a" /* default */]), this._parents);
});


/***/ }),
/* 386 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matcher__ = __webpack_require__(153);



/* harmony default export */ __webpack_exports__["a"] = (function(match) {
  if (typeof match !== "function") match = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__matcher__["a" /* default */])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, this._parents);
});


/***/ }),
/* 387 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
});


/***/ }),
/* 388 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__creator__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(112);



function constantNull() {
  return null;
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, before) {
  var create = typeof name === "function" ? name : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__creator__["a" /* default */])(name),
      select = before == null ? constantNull : typeof before === "function" ? before : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */])(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
});


/***/ }),
/* 389 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return this.each(lower);
});


/***/ }),
/* 390 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(21);


/* harmony default export */ __webpack_exports__["a"] = (function(selection) {

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](merges, this._parents);
});


/***/ }),
/* 391 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
});


/***/ }),
/* 392 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
});


/***/ }),
/* 393 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
});


/***/ }),
/* 394 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
});


/***/ }),
/* 395 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return this.each(raise);
});


/***/ }),
/* 396 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return this.each(remove);
});


/***/ }),
/* 397 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(112);



/* harmony default export */ __webpack_exports__["a"] = (function(select) {
  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, this._parents);
});


/***/ }),
/* 398 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectorAll__ = __webpack_require__(157);



/* harmony default export */ __webpack_exports__["a"] = (function(select) {
  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selectorAll__["a" /* default */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, parents);
});


/***/ }),
/* 399 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
});


/***/ }),
/* 400 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(21);


/* harmony default export */ __webpack_exports__["a"] = (function(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](sortgroups, this._parents).order();
});

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),
/* 401 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
});


/***/ }),
/* 402 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(110);



/* harmony default export */ __webpack_exports__["a"] = (function(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, touch);
    }
  }

  return null;
});


/***/ }),
/* 403 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(110);



/* harmony default export */ __webpack_exports__["a"] = (function(node, touches) {
  if (touches == null) touches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, touches[i]);
  }

  return points;
});


/***/ }),
/* 404 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_arc__ = __webpack_require__(405);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "arc", function() { return __WEBPACK_IMPORTED_MODULE_0__src_arc__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_area__ = __webpack_require__(158);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "area", function() { return __WEBPACK_IMPORTED_MODULE_1__src_area__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_line__ = __webpack_require__(116);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return __WEBPACK_IMPORTED_MODULE_2__src_line__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_pie__ = __webpack_require__(426);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pie", function() { return __WEBPACK_IMPORTED_MODULE_3__src_pie__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__ = __webpack_require__(406);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "areaRadial", function() { return __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "radialArea", function() { return __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__ = __webpack_require__(163);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "lineRadial", function() { return __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "radialLine", function() { return __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_pointRadial__ = __webpack_require__(164);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pointRadial", function() { return __WEBPACK_IMPORTED_MODULE_6__src_pointRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_link_index__ = __webpack_require__(418);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkHorizontal", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkVertical", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkRadial", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_symbol__ = __webpack_require__(428);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbol", function() { return __WEBPACK_IMPORTED_MODULE_8__src_symbol__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbols", function() { return __WEBPACK_IMPORTED_MODULE_8__src_symbol__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_symbol_circle__ = __webpack_require__(165);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolCircle", function() { return __WEBPACK_IMPORTED_MODULE_9__src_symbol_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_symbol_cross__ = __webpack_require__(166);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolCross", function() { return __WEBPACK_IMPORTED_MODULE_10__src_symbol_cross__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_symbol_diamond__ = __webpack_require__(167);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolDiamond", function() { return __WEBPACK_IMPORTED_MODULE_11__src_symbol_diamond__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_symbol_square__ = __webpack_require__(168);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolSquare", function() { return __WEBPACK_IMPORTED_MODULE_12__src_symbol_square__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_symbol_star__ = __webpack_require__(169);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolStar", function() { return __WEBPACK_IMPORTED_MODULE_13__src_symbol_star__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_symbol_triangle__ = __webpack_require__(170);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolTriangle", function() { return __WEBPACK_IMPORTED_MODULE_14__src_symbol_triangle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_symbol_wye__ = __webpack_require__(171);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolWye", function() { return __WEBPACK_IMPORTED_MODULE_15__src_symbol_wye__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_curve_basisClosed__ = __webpack_require__(407);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasisClosed", function() { return __WEBPACK_IMPORTED_MODULE_16__src_curve_basisClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_curve_basisOpen__ = __webpack_require__(408);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasisOpen", function() { return __WEBPACK_IMPORTED_MODULE_17__src_curve_basisOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__src_curve_basis__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasis", function() { return __WEBPACK_IMPORTED_MODULE_18__src_curve_basis__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__src_curve_bundle__ = __webpack_require__(409);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBundle", function() { return __WEBPACK_IMPORTED_MODULE_19__src_curve_bundle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__src_curve_cardinalClosed__ = __webpack_require__(160);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinalClosed", function() { return __WEBPACK_IMPORTED_MODULE_20__src_curve_cardinalClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__src_curve_cardinalOpen__ = __webpack_require__(161);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinalOpen", function() { return __WEBPACK_IMPORTED_MODULE_21__src_curve_cardinalOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__src_curve_cardinal__ = __webpack_require__(76);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinal", function() { return __WEBPACK_IMPORTED_MODULE_22__src_curve_cardinal__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__src_curve_catmullRomClosed__ = __webpack_require__(410);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRomClosed", function() { return __WEBPACK_IMPORTED_MODULE_23__src_curve_catmullRomClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__src_curve_catmullRomOpen__ = __webpack_require__(411);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRomOpen", function() { return __WEBPACK_IMPORTED_MODULE_24__src_curve_catmullRomOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__src_curve_catmullRom__ = __webpack_require__(115);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRom", function() { return __WEBPACK_IMPORTED_MODULE_25__src_curve_catmullRom__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__src_curve_linearClosed__ = __webpack_require__(412);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveLinearClosed", function() { return __WEBPACK_IMPORTED_MODULE_26__src_curve_linearClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__src_curve_linear__ = __webpack_require__(77);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveLinear", function() { return __WEBPACK_IMPORTED_MODULE_27__src_curve_linear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__ = __webpack_require__(413);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneX", function() { return __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneY", function() { return __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__src_curve_natural__ = __webpack_require__(414);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveNatural", function() { return __WEBPACK_IMPORTED_MODULE_29__src_curve_natural__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__src_curve_step__ = __webpack_require__(415);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStep", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStepAfter", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStepBefore", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__src_stack__ = __webpack_require__(427);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stack", function() { return __WEBPACK_IMPORTED_MODULE_31__src_stack__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__src_offset_expand__ = __webpack_require__(420);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetExpand", function() { return __WEBPACK_IMPORTED_MODULE_32__src_offset_expand__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__src_offset_diverging__ = __webpack_require__(419);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetDiverging", function() { return __WEBPACK_IMPORTED_MODULE_33__src_offset_diverging__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__src_offset_none__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetNone", function() { return __WEBPACK_IMPORTED_MODULE_34__src_offset_none__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__src_offset_silhouette__ = __webpack_require__(421);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetSilhouette", function() { return __WEBPACK_IMPORTED_MODULE_35__src_offset_silhouette__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__src_offset_wiggle__ = __webpack_require__(422);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetWiggle", function() { return __WEBPACK_IMPORTED_MODULE_36__src_offset_wiggle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__src_order_ascending__ = __webpack_require__(117);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderAscending", function() { return __WEBPACK_IMPORTED_MODULE_37__src_order_ascending__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__src_order_descending__ = __webpack_require__(423);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderDescending", function() { return __WEBPACK_IMPORTED_MODULE_38__src_order_descending__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__src_order_insideOut__ = __webpack_require__(424);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderInsideOut", function() { return __WEBPACK_IMPORTED_MODULE_39__src_order_insideOut__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__src_order_none__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderNone", function() { return __WEBPACK_IMPORTED_MODULE_40__src_order_none__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__src_order_reverse__ = __webpack_require__(425);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderReverse", function() { return __WEBPACK_IMPORTED_MODULE_41__src_order_reverse__["a"]; });




 // Note: radialArea is deprecated!
 // Note: radialLine is deprecated!









































/***/ }),
/* 405 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(57);




function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["e" /* max */])(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - __WEBPACK_IMPORTED_MODULE_2__math__["f" /* halfPi */],
        a1 = endAngle.apply(this, arguments) - __WEBPACK_IMPORTED_MODULE_2__math__["f" /* halfPi */],
        da = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* abs */])(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > __WEBPACK_IMPORTED_MODULE_2__math__["c" /* tau */] - __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
      context.moveTo(r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a0), r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        context.moveTo(r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a1), r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) && (padRadius ? +padRadius.apply(this, arguments) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(r0 * r0 + r1 * r1)),
          rc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* abs */])(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        var p0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["k" /* asin */])(rp / r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(ap)),
            p1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["k" /* asin */])(rp / r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(ap));
        if ((da0 -= p0 * 2) > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a01),
          y01 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a01),
          x10 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a10),
          y10 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a10);

      // Apply rounded corners?
      if (rc > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        var x11 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a11),
            y11 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a11),
            x00 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a00),
            y00 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < __WEBPACK_IMPORTED_MODULE_2__math__["b" /* pi */]) {
          var oc = da0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */] ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["l" /* acos */])((ax * bx + ay * by) / (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(ax * ax + ay * ay) * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(bx * bx + by * by))) / 2),
              lc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(rc, (r0 - lc) / (kc - 1));
          rc1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.cy + t0.y11, t0.cx + t0.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y11, t1.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) || !(da0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.cy + t0.y11, t0.cx + t0.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y11, t1.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - __WEBPACK_IMPORTED_MODULE_2__math__["b" /* pi */] / 2;
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a) * r, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
});


/***/ }),
/* 406 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__curve_radial__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__area__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lineRadial__ = __webpack_require__(163);




/* harmony default export */ __webpack_exports__["a"] = (function() {
  var a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__area__["a" /* default */])().curve(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["b" /* curveRadialLinear */]),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["a" /* default */])(_)) : c()._curve;
  };

  return a;
});


/***/ }),
/* 407 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basis__ = __webpack_require__(75);



function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__basis__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new BasisClosed(context);
});


/***/ }),
/* 408 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basis__ = __webpack_require__(75);


function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__basis__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new BasisOpen(context);
});


/***/ }),
/* 409 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basis__ = __webpack_require__(75);


function Bundle(context, beta) {
  this._basis = new __WEBPACK_IMPORTED_MODULE_0__basis__["b" /* Basis */](context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new __WEBPACK_IMPORTED_MODULE_0__basis__["b" /* Basis */](context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85));


/***/ }),
/* 410 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinalClosed__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__noop__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__catmullRom__ = __webpack_require__(115);




function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_1__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_1__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__catmullRom__["b" /* point */])(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new __WEBPACK_IMPORTED_MODULE_0__cardinalClosed__["b" /* CardinalClosed */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 411 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinalOpen__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__catmullRom__ = __webpack_require__(115);



function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__catmullRom__["b" /* point */])(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new __WEBPACK_IMPORTED_MODULE_0__cardinalOpen__["b" /* CardinalOpen */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 412 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(78);


function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new LinearClosed(context);
});


/***/ }),
/* 413 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = monotoneX;
/* harmony export (immutable) */ __webpack_exports__["b"] = monotoneY;
function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
}

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}


/***/ }),
/* 414 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Natural(context);
});


/***/ }),
/* 415 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = stepBefore;
/* harmony export (immutable) */ __webpack_exports__["b"] = stepAfter;
function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Step(context, 0.5);
});

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}


/***/ }),
/* 416 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
});


/***/ }),
/* 417 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(d) {
  return d;
});


/***/ }),
/* 418 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = linkHorizontal;
/* harmony export (immutable) */ __webpack_exports__["b"] = linkVertical;
/* harmony export (immutable) */ __webpack_exports__["c"] = linkRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pointRadial__ = __webpack_require__(164);






function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = __WEBPACK_IMPORTED_MODULE_3__point__["a" /* x */],
      y = __WEBPACK_IMPORTED_MODULE_3__point__["b" /* y */],
      context = null;

  function link() {
    var buffer, argv = __WEBPACK_IMPORTED_MODULE_1__array__["a" /* slice */].call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x0, y0),
      p1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x0, y0 = (y0 + y1) / 2),
      p2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x1, y0),
      p3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}


/***/ }),
/* 419 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
});


/***/ }),
/* 420 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(58);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 421 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(58);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 422 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(58);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 423 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ascending__ = __webpack_require__(117);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ascending__["a" /* default */])(series).reverse();
});


/***/ }),
/* 424 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ascending__ = __webpack_require__(117);



/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(__WEBPACK_IMPORTED_MODULE_1__ascending__["b" /* sum */]),
      order = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).sort(function(a, b) { return sums[b] - sums[a]; }),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
});


/***/ }),
/* 425 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(59);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).reverse();
});


/***/ }),
/* 426 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__descending__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__identity__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__math__ = __webpack_require__(57);





/* harmony default export */ __webpack_exports__["a"] = (function() {
  var value = __WEBPACK_IMPORTED_MODULE_2__identity__["a" /* default */],
      sortValues = __WEBPACK_IMPORTED_MODULE_1__descending__["a" /* default */],
      sort = null,
      startAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(0),
      endAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */]),
      padAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */], Math.max(-__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */], endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : padAngle;
  };

  return pie;
});


/***/ }),
/* 427 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offset_none__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_none__ = __webpack_require__(59);





function stackValue(d, key) {
  return d[key];
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var keys = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])([]),
      order = __WEBPACK_IMPORTED_MODULE_3__order_none__["a" /* default */],
      offset = __WEBPACK_IMPORTED_MODULE_2__offset_none__["a" /* default */],
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__array__["a" /* slice */].call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? __WEBPACK_IMPORTED_MODULE_3__order_none__["a" /* default */] : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__array__["a" /* slice */].call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? __WEBPACK_IMPORTED_MODULE_2__offset_none__["a" /* default */] : _, stack) : offset;
  };

  return stack;
});


/***/ }),
/* 428 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return symbols; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbol_circle__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbol_cross__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbol_diamond__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__symbol_star__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__symbol_square__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__symbol_triangle__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__symbol_wye__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constant__ = __webpack_require__(45);










var symbols = [
  __WEBPACK_IMPORTED_MODULE_1__symbol_circle__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_2__symbol_cross__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__symbol_diamond__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_5__symbol_square__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_4__symbol_star__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_6__symbol_triangle__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_7__symbol_wye__["a" /* default */]
];

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__symbol_circle__["a" /* default */]),
      size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
});


/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPosInt = __webpack_require__(173)
  , value    = __webpack_require__(25)

  , indexOf = Array.prototype.indexOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , abs = Math.abs, floor = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, l, fromIndex, val;
	if (searchElement === searchElement) { //jslint: ignore
		return indexOf.apply(this, arguments);
	}

	l = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < l; ++i) {
		if (hasOwnProperty.call(this, i)) {
			val = this[i];
			if (val !== val) return i; //jslint: ignore
		}
	}
	return -1;
};


/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(431)()
	? Array.from
	: __webpack_require__(432);


/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== 'function') return false;
	arr = ['raz', 'dwa'];
	result = from(arr);
	return Boolean(result && (result !== arr) && (result[1] === 'dwa'));
};


/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iteratorSymbol = __webpack_require__(35).iterator
  , isArguments    = __webpack_require__(79)
  , isFunction     = __webpack_require__(433)
  , toPosInt       = __webpack_require__(173)
  , callable       = __webpack_require__(30)
  , validValue     = __webpack_require__(25)
  , isString       = __webpack_require__(80)

  , isArray = Array.isArray, call = Function.prototype.call
  , desc = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

module.exports = function (arrayLike/*, mapFn, thisArg*/) {
	var mapFn = arguments[1], thisArg = arguments[2], Constructor, i, j, arr, l, code, iterator
	  , result, getIterator, value;

	arrayLike = Object(validValue(arrayLike));

	if (mapFn != null) callable(mapFn);
	if (!this || (this === Array) || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				l = arrayLike.length;
				if (l !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array(l = arrayLike.length);
				for (i = 0; i < l; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Constructor = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Constructor) arr = new Constructor();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (!Constructor) {
					arr[i] = value;
				} else {
					desc.value = value;
					defineProperty(arr, i, desc);
				}
				result = iterator.next();
				++i;
			}
			l = i;
		} else if (isString(arrayLike)) {
			// Source: String
			l = arrayLike.length;
			if (Constructor) arr = new Constructor();
			for (i = 0, j = 0; i < l; ++i) {
				value = arrayLike[i];
				if ((i + 1) < l) {
					code = value.charCodeAt(0);
					if ((code >= 0xD800) && (code <= 0xDBFF)) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (!Constructor) {
					arr[j] = value;
				} else {
					desc.value = value;
					defineProperty(arr, j, desc);
				}
				++j;
			}
			l = j;
		}
	}
	if (l === undefined) {
		// Source: array or array-like
		l = toPosInt(arrayLike.length);
		if (Constructor) arr = new Constructor(l);
		for (i = 0; i < l; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (!Constructor) {
				arr[i] = value;
			} else {
				desc.value = value;
				defineProperty(arr, i, desc);
			}
		}
	}
	if (Constructor) {
		desc.value = null;
		arr.length = l;
	}
	return arr;
};


/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call(__webpack_require__(434));

module.exports = function (f) {
	return (typeof f === "function") && (toString.call(f) === id);
};


/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {};


/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(436)()
	? Math.sign
	: __webpack_require__(437);


/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== 'function') return false;
	return ((sign(10) === 1) && (sign(-20) === -1));
};


/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return (value > 0) ? 1 : -1;
};


/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sign = __webpack_require__(435)

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};


/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable = __webpack_require__(30)
  , value    = __webpack_require__(25)

  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== 'function') method = list[method];
		return call.call(method, list, function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};


/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};


/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(446)
  , value = __webpack_require__(25)

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFrom  = __webpack_require__(430)
  , assign = __webpack_require__(119)
  , value  = __webpack_require__(25);

module.exports = function (obj/*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};


/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create, shim;

if (!__webpack_require__(176)()) {
	shim = __webpack_require__(177);
}

module.exports = (function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create((prototype === null) ? nullObject : prototype, props);
	};
}());


/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(439)('forEach');


/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) { return typeof obj === 'function'; };


/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(447)()
	? Object.keys
	: __webpack_require__(448);


/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};


/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};


/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callable = __webpack_require__(30)
  , forEach  = __webpack_require__(444)

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};


/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(174);

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};


/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};


/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generated = Object.create(null)

  , random = Math.random;

module.exports = function () {
	var str;
	do { str = random().toString(36).slice(2); } while (generated[str]);
	return str;
};


/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(60)
  , contains       = __webpack_require__(120)
  , d              = __webpack_require__(34)
  , Iterator       = __webpack_require__(121)

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});


/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(79)
  , isString       = __webpack_require__(80)
  , iteratorSymbol = __webpack_require__(35).iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};


/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __webpack_require__(60)
  , d              = __webpack_require__(34)
  , Iterator       = __webpack_require__(121)

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});


/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(458)() ? Set : __webpack_require__(461);


/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var set, iterator, result;
	if (typeof Set !== 'function') return false;
	set = new Set(['raz', 'dwa', 'trzy']);
	if (String(set) !== '[object Set]') return false;
	if (set.size !== 3) return false;
	if (typeof set.add !== 'function') return false;
	if (typeof set.clear !== 'function') return false;
	if (typeof set.delete !== 'function') return false;
	if (typeof set.entries !== 'function') return false;
	if (typeof set.forEach !== 'function') return false;
	if (typeof set.has !== 'function') return false;
	if (typeof set.keys !== 'function') return false;
	if (typeof set.values !== 'function') return false;

	iterator = set.values();
	result = iterator.next();
	if (result.done !== false) return false;
	if (result.value !== 'raz') return false;

	return true;
};


/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `Set` implementation,
// whatever that is.



module.exports = (function () {
	if (typeof Set === 'undefined') return false;
	return (Object.prototype.toString.call(Set.prototype) === '[object Set]');
}());


/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf    = __webpack_require__(60)
  , contains          = __webpack_require__(120)
  , d                 = __webpack_require__(34)
  , Iterator          = __webpack_require__(121)
  , toStringTagSymbol = __webpack_require__(35).toStringTag

  , defineProperty = Object.defineProperty
  , SetIterator;

SetIterator = module.exports = function (set, kind) {
	if (!(this instanceof SetIterator)) return new SetIterator(set, kind);
	Iterator.call(this, set.__setData__, set);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(SetIterator, Iterator);

SetIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(SetIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		return [this.__list__[i], this.__list__[i]];
	}),
	toString: d(function () { return '[object Set Iterator]'; })
});
defineProperty(SetIterator.prototype, toStringTagSymbol, d('c', 'Set Iterator'));


/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear          = __webpack_require__(172)
  , eIndexOf       = __webpack_require__(429)
  , setPrototypeOf = __webpack_require__(60)
  , callable       = __webpack_require__(30)
  , d              = __webpack_require__(34)
  , ee             = __webpack_require__(470)
  , Symbol         = __webpack_require__(35)
  , iterator       = __webpack_require__(180)
  , forOf          = __webpack_require__(178)
  , Iterator       = __webpack_require__(460)
  , isNative       = __webpack_require__(459)

  , call = Function.prototype.call
  , defineProperty = Object.defineProperty, getPrototypeOf = Object.getPrototypeOf
  , SetPoly, getValues, NativeSet;

if (isNative) NativeSet = Set;

module.exports = SetPoly = function Set(/*iterable*/) {
	var iterable = arguments[0], self;
	if (!(this instanceof SetPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf) self = setPrototypeOf(new NativeSet(), getPrototypeOf(this));
	else self = this;
	if (iterable != null) iterator(iterable);
	defineProperty(self, '__setData__', d('c', []));
	if (!iterable) return self;
	forOf(iterable, function (value) {
		if (eIndexOf.call(this, value) !== -1) return;
		this.push(value);
	}, self.__setData__);
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(SetPoly, NativeSet);
	SetPoly.prototype = Object.create(NativeSet.prototype, { constructor: d(SetPoly) });
}

ee(Object.defineProperties(SetPoly.prototype, {
	add: d(function (value) {
		if (this.has(value)) return this;
		this.emit('_add', this.__setData__.push(value) - 1, value);
		return this;
	}),
	clear: d(function () {
		if (!this.__setData__.length) return;
		clear.call(this.__setData__);
		this.emit('_clear');
	}),
	delete: d(function (value) {
		var index = eIndexOf.call(this.__setData__, value);
		if (index === -1) return false;
		this.__setData__.splice(index, 1);
		this.emit('_delete', index, value);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result, value;
		callable(cb);
		iterator = this.values();
		result = iterator._next();
		while (result !== undefined) {
			value = iterator._resolve(result);
			call.call(cb, thisArg, value, value, this);
			result = iterator._next();
		}
	}),
	has: d(function (value) {
		return (eIndexOf.call(this.__setData__, value) !== -1);
	}),
	keys: d(getValues = function () { return this.values(); }),
	size: d.gs(function () { return this.__setData__.length; }),
	values: d(function () { return new Iterator(this); }),
	toString: d(function () { return '[object Set]'; })
}));
defineProperty(SetPoly.prototype, Symbol.iterator, d(getValues));
defineProperty(SetPoly.prototype, Symbol.toStringTag, d('c', 'Set'));


/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d              = __webpack_require__(34)
  , validateSymbol = __webpack_require__(465)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(463);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(467)() ? WeakMap : __webpack_require__(469);


/***/ }),
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var weakMap, x;
	if (typeof WeakMap !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		weakMap = new WeakMap([[x = {}, 'one'], [{}, 'two'], [{}, 'three']]);
	} catch (e) {
		return false;
	}
	if (String(weakMap) !== '[object WeakMap]') return false;
	if (typeof weakMap.set !== 'function') return false;
	if (weakMap.set({}, 1) !== weakMap) return false;
	if (typeof weakMap.delete !== 'function') return false;
	if (typeof weakMap.has !== 'function') return false;
	if (weakMap.get(x) !== 'one') return false;

	return true;
};


/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `WeakMap` implementation, whatever that is.



module.exports = (function () {
	if (typeof WeakMap !== 'function') return false;
	return (Object.prototype.toString.call(new WeakMap()) === '[object WeakMap]');
}());


/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf    = __webpack_require__(60)
  , object            = __webpack_require__(450)
  , value             = __webpack_require__(25)
  , randomUniq        = __webpack_require__(453)
  , d                 = __webpack_require__(34)
  , getIterator       = __webpack_require__(179)
  , forOf             = __webpack_require__(178)
  , toStringTagSymbol = __webpack_require__(35).toStringTag
  , isNative          = __webpack_require__(468)

  , isArray = Array.isArray, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf
  , WeakMapPoly;

module.exports = WeakMapPoly = function (/*iterable*/) {
	var iterable = arguments[0], self;
	if (!(this instanceof WeakMapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && (WeakMap !== WeakMapPoly)) {
		self = setPrototypeOf(new WeakMap(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) {
		if (!isArray(iterable)) iterable = getIterator(iterable);
	}
	defineProperty(self, '__weakMapData__', d('c', '$weakMap$' + randomUniq()));
	if (!iterable) return self;
	forOf(iterable, function (val) {
		value(val);
		self.set(val[0], val[1]);
	});
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
	WeakMapPoly.prototype = Object.create(WeakMap.prototype, {
		constructor: d(WeakMapPoly)
	});
}

Object.defineProperties(WeakMapPoly.prototype, {
	delete: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			delete key[this.__weakMapData__];
			return true;
		}
		return false;
	}),
	get: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			return key[this.__weakMapData__];
		}
	}),
	has: d(function (key) {
		return hasOwnProperty.call(object(key), this.__weakMapData__);
	}),
	set: d(function (key, value) {
		defineProperty(object(key), this.__weakMapData__, d('c', value));
		return this;
	}),
	toString: d(function () { return '[object WeakMap]'; })
});
defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d('c', 'WeakMap'));


/***/ }),
/* 470 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(34)
  , callable = __webpack_require__(30)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(181);
var _makeFlat = __webpack_require__(475);


/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
module.exports = _curry1(_makeFlat(true));


/***/ }),
/* 472 */
/***/ (function(module, exports) {

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};


/***/ }),
/* 473 */
/***/ (function(module, exports) {

module.exports = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};


/***/ }),
/* 474 */
/***/ (function(module, exports) {

module.exports = function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
};


/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(476);


/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */
module.exports = function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
};


/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(181);
var _isArray = __webpack_require__(472);
var _isString = __webpack_require__(474);


/**
 * Tests whether or not an object is similar to an array.
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      R.isArrayLike([]); //=> true
 *      R.isArrayLike(true); //=> false
 *      R.isArrayLike({}); //=> false
 *      R.isArrayLike({length: 10}); //=> false
 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
module.exports = _curry1(function isArrayLike(x) {
  if (_isArray(x)) { return true; }
  if (!x) { return false; }
  if (typeof x !== 'object') { return false; }
  if (_isString(x)) { return false; }
  if (x.nodeType === 1) { return !!x.length; }
  if (x.length === 0) { return true; }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});


/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(182)))

/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(183);
module.exports = __webpack_require__(52);


/***/ })
/******/ ]);