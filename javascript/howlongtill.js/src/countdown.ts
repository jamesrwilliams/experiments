import {Options} from "./models/options.interface";
import type = Mocha.utils.type;

/**
 * Countdown Clock class.
 *
 */
export class Countdown {

    private defaults: Options = {
        endDate: '',
        elm: '#clock',
        hideOnCompletion: false,
        classPrefix: '',
    };

    clock: any;
    options: Options;
    elements: any = [];
    ticker: any;
    ticking = false;

    constructor(args: Options) {

        this.options = {...this.defaults, ...args};

        if ( ! this.options.endDate || this.options.endDate === '') {
            console.warn('[countdown.js] Config missing end date.');
        } else {
            this.initializeClock(this.options);
        }
    }

    initializeClock(options: Options) {

        this.clock = document.querySelector(options.elm) as HTMLElement;

        if (! this.clock ) {
            console.warn(`[countdown.js] Element "${options.elm}" not found.`);
        } else {

            let targets = ['days', 'hours', 'minutes', 'seconds'];

            targets.forEach(target => {

                let element = this.clock.querySelector(target);

                if (element) {
                    this.elements[target] = element;
                } else {

                    const span = document.createElement('span');
                    const prefix = ( this.options.classPrefix !== '' ? this.options.classPrefix + '-' : '' );

                    // Setup injected element.
                    span.setAttribute("class", `${prefix}digit-${target}`);
                    this.clock.appendChild(span);
                    this.elements[target] = span;

                }

            });

            if ( this.ticking ) {
                this.ticker = setInterval(() => this.updateClock(), 1000);
            } else {
                this.ticking = true;
                this.updateClock();
            }

        }
    }

    updateClock() {

        const time = this.getTimeRemaining();

        if ( time === false ) {
            this.ticking = false;
            clearInterval(this.ticker);
            console.error('[countdown.js] Error getting remaining time.');
        } else {

            if (time.total <= 0) {

                this.elements['days'].innerHTML = 0;
                this.elements['hours'].innerHTML = 0;
                this.elements['minutes'].innerHTML = 0;
                this.elements['seconds'].innerHTML = 0;

                clearInterval(this.ticker);

                if(this.options.hideOnCompletion) {
                    const parent = this.clock.parentElement;
                    parent.removeChild(this.clock);
                    console.log(`[countdown.js] The clock "${this.options.elm}" has expired and has been removed.`);
                }

            } else {
                this.elements['days'].innerHTML = ('0' + time.days).slice(-2);
                this.elements['hours'].innerHTML = ('0' + time.hours).slice(-2);
                this.elements['minutes'].innerHTML = ('0' + time.minutes).slice(-2);
                this.elements['seconds'].innerHTML = ('0' + time.seconds).slice(-2);
            }


        }
    }

    getTimeRemaining() {

        const endTime = this.options.endDate;
        const t = Date.parse(endTime) - Date.now();
        const seconds = Math.floor(t / 1000 % 60);
        const minutes = Math.floor(t / 1000 / 60 % 60);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor(t / (1000 * 60 * 60) % 24);

        if ( t !== t) {
            return false;
        } else {
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }


    }

    getCurrentTime() {
        return this.getTimeRemaining();
    }
}
