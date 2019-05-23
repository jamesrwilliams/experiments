(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nexports.__esModule = true;\nvar Countdown = (function () {\n    function Countdown(args) {\n        this.defaults = {\n            endDate: '',\n            elm: '#clock',\n            hideOnCompletion: false,\n            startDate: '',\n            classPrefix: 'cc',\n            debug: false,\n            callback: null\n        };\n        this.elements = [];\n        this.ticking = false;\n        this.options = __assign({}, this.defaults, args);\n        if (this.options.endDate === '') {\n            this.log('Config missing end date.');\n        }\n        else {\n            this.initializeClock(this.options);\n        }\n    }\n    Countdown.prototype.initializeClock = function (options) {\n        var _this = this;\n        if (document === undefined) {\n            return false;\n        }\n        this.clock = document.querySelector(options.elm);\n        if (!this.clock) {\n            this.log(\"Element \\\"\" + options.elm + \"\\\" not found.\", 1);\n        }\n        else {\n            var prefix_1 = (this.options.classPrefix !== '' ? this.options.classPrefix + '-' : '');\n            this.clock.classList.add(prefix_1 + \"clock\");\n            var targets = ['days', 'hours', 'minutes', 'seconds'];\n            targets.forEach(function (target) {\n                var element = _this.clock.querySelector(target);\n                if (element) {\n                    _this.elements[target] = element;\n                }\n                else {\n                    var span = document.createElement('span');\n                    span.classList.add(prefix_1 + \"digit\");\n                    span.classList.add(prefix_1 + \"digit-\" + target);\n                    _this.clock.appendChild(span);\n                    _this.elements[target] = span;\n                }\n            });\n            this.updateClock();\n            this.ticker = setInterval(function () { return _this.updateClock(); }, 1000);\n        }\n    };\n    Countdown.prototype.updateClock = function () {\n        var time = this.getTimeRemaining();\n        if (time === false) {\n            this.ticking = false;\n            clearInterval(this.ticker);\n            this.log('Error getting remaining time.');\n        }\n        else {\n            if (time.total <= 0) {\n                this.elements['days'].innerHTML = 0;\n                this.elements['hours'].innerHTML = 0;\n                this.elements['minutes'].innerHTML = 0;\n                this.elements['seconds'].innerHTML = 0;\n                clearInterval(this.ticker);\n                if (this.options.hideOnCompletion) {\n                    var parent_1 = this.clock.parentElement;\n                    parent_1.removeChild(this.clock);\n                    this.log(\"The clock \\\"\" + this.options.elm + \"\\\" has expired and has been removed.\");\n                }\n            }\n            else {\n                this.elements['days'].innerHTML = ('0' + time.days).slice(-2);\n                this.elements['hours'].innerHTML = ('0' + time.hours).slice(-2);\n                this.elements['minutes'].innerHTML = ('0' + time.minutes).slice(-2);\n                this.elements['seconds'].innerHTML = ('0' + time.seconds).slice(-2);\n            }\n        }\n    };\n    Countdown.prototype.getTimeRemaining = function () {\n        var target = this.options.endDate;\n        var t = Date.parse(target) - Date.now();\n        var seconds = Math.floor(t / 1000 % 60);\n        var minutes = Math.floor(t / 1000 / 60 % 60);\n        var days = Math.floor(t / (1000 * 60 * 60 * 24));\n        var hours = Math.floor(t / (1000 * 60 * 60) % 24);\n        if (t !== t) {\n            return false;\n        }\n        else {\n            return {\n                'total': t,\n                'days': days,\n                'hours': hours,\n                'minutes': minutes,\n                'seconds': seconds\n            };\n        }\n    };\n    Countdown.prototype.log = function (message, level) {\n        if (level === void 0) { level = 0; }\n        if (this.options.debug) {\n            var log_message = \"[countdown.js] \" + message;\n            if (level === 0) {\n                console.log(log_message);\n            }\n            else if (level === 1) {\n                console.warn(log_message);\n            }\n            else if (level > 1) {\n                console.error(log_message);\n            }\n        }\n    };\n    return Countdown;\n}());\nexports.Countdown = Countdown;\n\n\n//# sourceURL=webpack:///./src/countdown.ts?");

/***/ })

/******/ });
});