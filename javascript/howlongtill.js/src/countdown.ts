import {Options} from "./models/options.interface";

/**
 * Countdown Clock class.
 *
 */
export class Countdown {

    private defaults: Options = {
        endDate: '',
        elm: '#clock',
        hideOnCompletion: false
    };

    options: Options;
    elements: any = [];

    constructor(args: Options) {

        this.options = {...this.defaults, ...args};

        if (!this.options.endDate) {
            console.warn('[HowLongUntil.js] Config missing end date.');
        } else {
            this.initializeClock(this.options);
        }
    }

    initializeClock(options: Options) {

        const clock = document.querySelector(options.elm) as HTMLElement;

        if (!clock) {
            console.warn(`[HowLongUntil.js] Element "${options.elm}" not found.`);
        } else {

            let targets = ['days', 'hours', 'minutes', 'seconds'];

            targets.forEach(target => {

                let element = clock.querySelector(target);

                if (element) {
                    this.elements[target] = element;
                } else {

                    const span = document.createElement('span');

                    // Setup injected element.
                    span.setAttribute("class", `digit-${target}`);
                    span.innerText = target;
                    clock.appendChild(span);
                    this.elements[target] = span;

                }

            });

            this.updateClock();
            setInterval(() => this.updateClock(), 1000);

        }
    }

    updateClock() {

        const time = this.getTimeRemaining();

        if (time.total <= 0) {
            this.elements['days'].innerHTML = 0;
            this.elements['hours'].innerHTML = 0;
            this.elements['minutes'].innerHTML = 0;
            this.elements['seconds'].innerHTML = 0;
        } else {
            this.elements['days'].innerHTML = ('0' + time.days).slice(-2);
            this.elements['hours'].innerHTML = ('0' + time.hours).slice(-2);
            this.elements['minutes'].innerHTML = ('0' + time.minutes).slice(-2);
            this.elements['seconds'].innerHTML = ('0' + time.seconds).slice(-2);
        }
    }

    getTimeRemaining() {

        const endTime = this.options.endDate;
        const t = Date.parse(endTime) - Date.now();
        const seconds = Math.floor(t / 1000 % 60);
        const minutes = Math.floor(t / 1000 / 60 % 60);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor(t / (1000 * 60 * 60) % 24);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    getCurrentTime() {
        return this.getTimeRemaining();
    }
}
