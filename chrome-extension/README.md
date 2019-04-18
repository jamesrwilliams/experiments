# Chrome Extension - HTML Reload Utility

An example of a Chrome extension for reloading HTML within a particular element on a page. The goal of this experiment is as follows:

> Add a number of selectors to a page to look for VIA configuration. Then when the page is active the buttons become active via the browser button that opens a popup to replace the HTML with.

## Workflow

1. *User adds a "zone" to their config* - A zone is a CSS selector for an element the plugin looks for. A user can add any number of these and they are just separated in the menu. Can domain lock selectors also.
2. *Plugin detects presence of elements on page* - the plugin then detects these elements with this selector on page load enabling a button in the banner for each instance that it has found.
3. *Users use the enabled buttons* - These activate a UI element (popup or window) that replaces that elements `innerHTML` property with the content the user just pasted.
