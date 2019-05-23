import { Options } from "./models/options.interface";
export declare class Countdown {
    private readonly options;
    private readonly defaults;
    elements: any;
    ticker: any;
    ticking: boolean;
    clock: any;
    constructor(args: Options);
    private initializeClock;
    private updateClock;
    private getTimeRemaining;
    private log;
}
