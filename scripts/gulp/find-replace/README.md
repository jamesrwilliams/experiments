# Find & replace email template tokens

- [Quick Start](#quick-start)
- [HTML Templates](#html-templates)
- [Tokens](#tokens)
- [Example](#example)

## Quick Start

1. Install dependencies using `npm install`,
2. Add source HTML files to the src directory
3. Run `gulp dev` for automatic reload on HTML file change.
4. HTML files with tokens replaced will be placed in the dist directory. 

N.B - Please note if you add any tokens to the `tokens.js` file you will need to restart this command.

## Options

A configuration object can be found in `gulpfile.js` with basic settings for how the replacement script should work.

- input: String - The input directory path.
- output: String - The destination path for processed files.
- elm: String - The element used for the `data-token`.

## HTML Templates

Wrap any default text in a span with the `data-token` attribute set to the key of the token you want replaced when running parse. For example:

```html
<span data-token="customer_first_name">John Smith</span>
```

### Utility CSS

Add the following CSS rules to the HTML to easily distinguish what elements have the token elements wrapped around them.

```css
span[data-token] { background: #ff0000; }

/* This will append the data-attribute next to the default value. */
span[data-token]:after { content: " [" attr(data-token) "]"; }
```

## Tokens

The tokens.js file is an exported array of token objects with the following structure:

```js
{
    token: 'foo', /* This is the data-token attribute. */
    replacement: 'bar' // This is the text that will replace the token foo.
}
```

## Example

*Example template:*
```html
<span data-token="action">Default Value</span>
```
*Example token.js*
```js
module.exports = [
    { target: 'action', replacement: '<p>Hello World!</p>', },
];
```
*Results in*
```html
<p>Hello World!</p>
```
