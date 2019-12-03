const helpers = require('../src/helpers');
const chai = require('chai');
const sinon = require('sinon');
const fake = require('sinon').fake;

const expect = chai.expect;
const assert = chai.assert;

describe('Helpers', function() {
   describe('#logger()', function() {
       it('should ensure helper is called once', function() {

           const consoleFake = sinon.fake();

           sinon.replace(console, 'log', consoleFake);

           helpers.helper('James');

           expect(consoleFake.lastArg).to.equal('Logger: James, thank you.');

           sinon.restore();

       });

       it('should mock logger()', function() {
          const loggerFake = sinon.fake();

          const helperSpy = sinon.spy(helpers, 'helper');
          const loggerSpy = sinon.spy(helpers, 'logger');

          sinon.replace(helpers, 'logger', loggerFake);

          helpers.helper('foo');
          helpers.helper('bar');

          console.log(helperSpy.args);
          console.log('---');
          console.log(helperSpy.getCalls());
          console.log(loggerSpy.getCalls());

          console.log({helperSpy});
          console.log({loggerSpy});
          // console.log('---');
          // console.log(loggerFake);

       });

   });

   describe('#helper()', function() {
       it('should ensure console.log() is called', function () {
           // Ensure calls console.log() with arguments.
           expect(true).to.be.true;
       });
   });
});
