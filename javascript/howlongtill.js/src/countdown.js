"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/**
 * Countdown Clock class.
 *
 */
var Countdown = /** @class */ (function () {
    function Countdown(args) {
        // Default configuration options.
        this.defaults = {
            endDate: '',
            elm: '#clock',
            hideOnCompletion: false,
            startDate: '',
            classPrefix: 'cc',
            debug: false
        };
        this.elements = []; // Array of elements used for the clock digits.
        this.ticking = false; // Current status of the clock.
        // Merge provided options with the defaults.
        this.options = __assign({}, this.defaults, args);
        // Throw an error if the end date is missing.
        if (this.options.endDate === '') {
            this.log('Config missing end date.');
        }
        else {
            this.initializeClock(this.options);
        }
    }
    /**
     * Initialize the countdown clock.
     *
     * @param options Configuration object.
     */
    Countdown.prototype.initializeClock = function (options) {
        var _this = this;
        this.clock = document.querySelector(options.elm);
        if (!this.clock) {
            this.log("Element \"" + options.elm + "\" not found.", 1);
        }
        else {
            // Generate a class prefix from the options
            var prefix_1 = (this.options.classPrefix !== '' ? this.options.classPrefix + '-' : '');
            // Add clock class to element.
            this.clock.classList.add(prefix_1 + "clock");
            // These are the names for eac of the output blocks.
            var targets = ['days', 'hours', 'minutes', 'seconds'];
            targets.forEach(function (target) {
                var element = _this.clock.querySelector(target);
                if (element) {
                    _this.elements[target] = element;
                }
                else {
                    var span = document.createElement('span');
                    span.classList.add(prefix_1 + "digit");
                    span.classList.add(prefix_1 + "digit-" + target);
                    _this.clock.appendChild(span);
                    _this.elements[target] = span;
                }
            });
            this.ticker = setInterval(function () { return _this.updateClock(); }, 1000);
        }
    };
    Countdown.prototype.updateClock = function () {
        var time = this.getTimeRemaining();
        if (time === false) {
            this.ticking = false;
            clearInterval(this.ticker);
            this.log('Error getting remaining time.');
        }
        else {
            if (time.total <= 0) {
                this.elements['days'].innerHTML = 0;
                this.elements['hours'].innerHTML = 0;
                this.elements['minutes'].innerHTML = 0;
                this.elements['seconds'].innerHTML = 0;
                clearInterval(this.ticker);
                if (this.options.hideOnCompletion) {
                    var parent_1 = this.clock.parentElement;
                    parent_1.removeChild(this.clock);
                    this.log("The clock \"" + this.options.elm + "\" has expired and has been removed.");
                }
            }
            else {
                this.elements['days'].innerHTML = ('0' + time.days).slice(-2);
                this.elements['hours'].innerHTML = ('0' + time.hours).slice(-2);
                this.elements['minutes'].innerHTML = ('0' + time.minutes).slice(-2);
                this.elements['seconds'].innerHTML = ('0' + time.seconds).slice(-2);
            }
        }
    };
    Countdown.prototype.getTimeRemaining = function () {
        var target = this.options.endDate;
        var t = Date.parse(target) - Date.now();
        var seconds = Math.floor(t / 1000 % 60);
        var minutes = Math.floor(t / 1000 / 60 % 60);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor(t / (1000 * 60 * 60) % 24);
        if (t !== t) {
            return false;
        }
        else {
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    };
    Countdown.prototype.getCurrentTime = function () {
        return this.getTimeRemaining();
    };
    Countdown.prototype.log = function (message, level) {
        if (level === void 0) { level = 0; }
        if (this.options.debug) {
            var log_message = "[countdown.js] " + message;
            if (level === 0) {
                console.log(log_message);
            }
            else if (level === 1) {
                console.warn(log_message);
            }
            else if (level > 1) {
                console.error(log_message);
            }
        }
    };
    return Countdown;
}());
exports.Countdown = Countdown;
