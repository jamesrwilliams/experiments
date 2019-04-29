(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/countdown.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/countdown.ts":
/*!**************************!*\
  !*** ./src/countdown.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Countdown {\n    constructor(args) {\n        this.defaults = {\n            endDate: '',\n            elm: '#clock',\n            hideOnCompletion: false\n        };\n        this.elements = [];\n        this.options = Object.assign({}, this.defaults, args);\n        if (!this.options.endDate) {\n            console.warn('[HowLongUntil.js] Config missing end date.');\n        }\n        else {\n            this.initializeClock(this.options);\n        }\n    }\n    initializeClock(options) {\n        const clock = document.querySelector(options.elm);\n        if (!clock) {\n            console.warn(`[HowLongUntil.js] Element \"${options.elm}\" not found.`);\n        }\n        else {\n            let targets = ['days', 'hours', 'minutes', 'seconds'];\n            targets.forEach(target => {\n                let element = clock.querySelector(target);\n                if (element) {\n                    this.elements[target] = element;\n                }\n                else {\n                    const span = document.createElement('span');\n                    span.setAttribute(\"class\", `digit-${target}`);\n                    span.innerText = target;\n                    clock.appendChild(span);\n                    this.elements[target] = span;\n                }\n            });\n            this.updateClock();\n            setInterval(() => this.updateClock(), 1000);\n        }\n    }\n    updateClock() {\n        const time = this.getTimeRemaining();\n        if (time.total <= 0) {\n            this.elements['days'].innerHTML = 0;\n            this.elements['hours'].innerHTML = 0;\n            this.elements['minutes'].innerHTML = 0;\n            this.elements['seconds'].innerHTML = 0;\n        }\n        else {\n            this.elements['days'].innerHTML = ('0' + time.days).slice(-2);\n            this.elements['hours'].innerHTML = ('0' + time.hours).slice(-2);\n            this.elements['minutes'].innerHTML = ('0' + time.minutes).slice(-2);\n            this.elements['seconds'].innerHTML = ('0' + time.seconds).slice(-2);\n        }\n    }\n    getTimeRemaining() {\n        const endTime = this.options.endDate;\n        const t = Date.parse(endTime) - Date.now();\n        const seconds = Math.floor(t / 1000 % 60);\n        const minutes = Math.floor(t / 1000 / 60 % 60);\n        const days = Math.floor(t / (1000 * 60 * 60 * 24));\n        const hours = Math.floor(t / (1000 * 60 * 60) % 24);\n        return {\n            'total': t,\n            'days': days,\n            'hours': hours,\n            'minutes': minutes,\n            'seconds': seconds\n        };\n    }\n    getCurrentTime() {\n        return this.getTimeRemaining();\n    }\n}\nexports.Countdown = Countdown;\n\n\n//# sourceURL=webpack:///./src/countdown.ts?");

/***/ })

/******/ });
});