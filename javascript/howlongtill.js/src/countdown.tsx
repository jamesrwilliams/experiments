import { Options } from "./models/options.interface";

class Countdown {

    private defaults: Options = {
        startDate: '',
        elm: '#parent',
        hideOnCompletion: false
    };

    options: Options;

    constructor(args: Options) {

        this.options = { ...this.defaults, ...args };

        this.render();

    }

    render() {
        const page = document.getElementById('example');
        console.log(page);
    }
}
