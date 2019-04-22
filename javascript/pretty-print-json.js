/*
Using JSON.stringify and adding a number of spaces to the third arguments
pretty prints JSON!

@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 */

let exampleJSON = {"foo": "bar" };
JSON.stringify(exampleJSON, null, 4);
