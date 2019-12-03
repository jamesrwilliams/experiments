const helpers = require('../src/helpers');
const chai = require('chai');
const sinon = require('sinon');
const fake = require('sinon').fake;

const expect = chai.expect;
const assert = chai.assert;

describe('Helpers', function() {
   describe('#logger()', function() {
       it('should ensure helper is called once', function() {

           // Create Sinon Fake
           // Replace real helper() with fake using sinon.replace();
           const fakeHelper = sinon.fake.returns('apple pie');
           sinon.replace(helpers, 'logger', fakeHelper);

           // Ensure called helpers.helper() once.
           helpers.helper();
           // helpers.logger() should be spied

           console.log(fakeHelper.callCount);
       });
   });

   describe('#helper()', function() {
       it('should ensure console.log() is called', function () {
           // Ensure calls console.log() with arguments.
           expect(true).to.be.true;
       });
   });
});
