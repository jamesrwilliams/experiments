var assert = require('assert');
var Countdown = require('../dist/countdown');

describe('Countdown', function() {
    it('should return -1 when the value is not present', function() {

        const exports = {};
        const countdown = new Countdown();

        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});
