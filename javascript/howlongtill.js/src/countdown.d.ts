import { Options } from "./models/options.interface";
export declare class Countdown {
    private readonly options;
    private readonly defaults;
    elements: any;
    ticker: any;
    ticking: boolean;
    clock: any;
    constructor(args: Options);
    initializeClock(options: Options): void;
    updateClock(): void;
    getTimeRemaining(target: string): false | {
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
    private log;
}
