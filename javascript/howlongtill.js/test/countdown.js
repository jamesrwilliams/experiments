// Assertion Library.
const expect = require('chai').expect;
const jsdom = require('jsdom').JSDOM;

// The Library
const Countdown = require('../src/countdown').Countdown;


describe('countdown.js', () => {

    context('Initialises correctly', () => {
        it('it should error if an empty string is passed as the end date.', () => {

            const clock = new Countdown({
                endDate: ''
            });
            expect(clock).to.not.equal(false);
        });
    });

    context('getCurrentTime() returns the current time difference', () => {

        const dom = new jsdom(`<!DOCTYPE html><p>Hello world</p>`);

        const clock = new Countdown();

        let check = clock.getTimeRemaining();

        it('the response should be numerical in type', () => {
            expect(clock).to.be.a('number');
        });

    });

});
