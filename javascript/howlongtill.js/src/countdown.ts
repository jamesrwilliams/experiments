import { Options } from "./models/options.interface";

/**
 * Countdown Clock class.
 */
export class Countdown {

    // Our options object.
    private readonly options: Options;

    // Default configuration options.
    private readonly defaults: Options = {
        endDate: '',
        elm: '#clock',
        hideOnCompletion: false,
        startDate: '',
        classPrefix: 'cc',
        debug: false,
        callback: null
    };

    elements: any = [];     // Array of elements used for the clock digits.
    ticker: any;            // Reference used to dismiss our timeout if required
    ticking = false;        // Current status of the clock.
    clock: any;             // Our clock container element.

    constructor(args: Options) {

        // Merge provided options with the defaults.
        this.options = {...this.defaults, ...args};

        // Throw an error if the end date is missing.
        if ( this.options.endDate === '') {
            this.log('Config missing end date.');
        } else {
            this.initializeClock(this.options);
        }
    }

    /**
     * Initialize the countdown clock.
     *
     * @param options Configuration object.
     */
    private initializeClock(options: Options) {

        if(document === undefined) {
            return false;
        }

        this.clock = document.querySelector(options.elm) as HTMLElement;

        if (! this.clock ) {
            this.log(`Element "${options.elm}" not found.`, 1);
        } else {

            // Generate a class prefix from the options
            const prefix = ( this.options.classPrefix !== '' ? this.options.classPrefix + '-' : '' );

            // Add clock class to element.
            this.clock.classList.add(`${prefix}clock`);

            // These are the names for eac of the output blocks.
            let targets = ['days', 'hours', 'minutes', 'seconds'];

            targets.forEach(target => {

                let element = this.clock.querySelector(target);

                if (element) {
                    this.elements[target] = element;
                } else {

                    const span = document.createElement('span');
                    span.classList.add(`${prefix}digit`);
                    span.classList.add(`${prefix}digit-${target}`);

                    this.clock.appendChild(span);

                    this.elements[target] = span;

                }

            });

            this.updateClock();
            this.ticker = setInterval(() => this.updateClock(), 1000);

        }
    }

    private updateClock() {

        const time = this.getTimeRemaining();

        if ( time === false ) {
            this.ticking = false;
            clearInterval(this.ticker);
            this.log('Error getting remaining time.');
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
                    this.log(`The clock "${this.options.elm}" has expired and has been removed.`);
                }

            } else {
                this.elements['days'].innerHTML = ('0' + time.days).slice(-2);
                this.elements['hours'].innerHTML = ('0' + time.hours).slice(-2);
                this.elements['minutes'].innerHTML = ('0' + time.minutes).slice(-2);
                this.elements['seconds'].innerHTML = ('0' + time.seconds).slice(-2);
            }


        }
    }

    private getTimeRemaining() {

        let target = this.options.endDate;

        const t = Date.parse(target) - Date.now();
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

    private log(message: string, level = 0) {

        if( this.options.debug ) {

            const log_message = `[countdown.js] ${message}`;

            if( level === 0 ) {
                console.log(log_message);
            } else if(level === 1) {
                console.warn(log_message);
            } else if(level > 1) {
                console.error(log_message);
            }

        }
    }
}
