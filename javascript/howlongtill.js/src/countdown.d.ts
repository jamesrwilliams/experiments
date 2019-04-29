import { Options } from "./models/options.interface";
export declare class Countdown {
    private defaults;
    options: Options;
    elements: any;
    constructor(args: Options);
    initializeClock(options: Options): void;
    updateClock(): void;
    getTimeRemaining(): {
        'total': number;
        'days': number;
        'hours': number;
        'minutes': number;
        'seconds': number;
    };
    getCurrentTime(): {
        'total': number;
        'days': number;
        'hours': number;
        'minutes': number;
        'seconds': number;
    };
}
