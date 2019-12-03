const helpers = require('../src/helpers');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;
const assert = chai.assert;

describe('Helpers', function() {
   describe('#logger()', function() {
       it('should ensure helper is called once', function() {
           // Ensure called helpers.helper() once.
           helpers.helper();
           // helpers.logger() should be spied

           assert(callback.calledWith(1, 2, 3));
           expect(true).to.be.true;
       });
   });

   describe('#helper()', function() {
       it('should ensure console.log() is called', function () {
           // Ensure calls console.log() with arguments.
           expect(true).to.be.true;
       });
   });
});
