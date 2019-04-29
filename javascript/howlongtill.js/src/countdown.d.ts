import { Options } from "./models/options.interface";
export declare class Countdown {
    private defaults;
    clock: any;
    options: Options;
    elements: any;
    ticker: any;
    ticking: boolean;
    constructor(args: Options);
    initializeClock(options: Options): void;
    updateClock(): void;
    getTimeRemaining(): false | {
        'total': number;
        'days': number;
        'hours': number;
        'minutes': number;
        'seconds': number;
    };
    getCurrentTime(): false | {
        'total': number;
        'days': number;
        'hours': number;
        'minutes': number;
        'seconds': number;
    };
}
