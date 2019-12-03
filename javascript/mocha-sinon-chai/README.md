# Javascript Testing With Mocha, Chai, and Sinon

## The Problem

I have a method that I need to test. I am trying to do the following:

- Stub the function to block it's usual behaviour,
- To pass/fail tests based on it's arguments when called,
- Do the above whenever this import is used in a myriad of other files.

Example import and usage:
```js
const utility = require('../../foo');
// ...
utility.foo('spoons');
```

## Usage
Run the test suite via:
```js
npm test
```

## Using
- [Mocha](https://mochajs.org/) - Test framework
- [Sinon](https://sinonjs.org/) - Standalone test spies, stubs and mocks for JavaScript.
- [Chai](https://www.chaijs.com/) - Assertion Library


