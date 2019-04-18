/**
 * content.js
 *
 * Content scripts are files that run in the context of web pages.
 * By using the standard Document Object Model (DOM), they are able
 * to read details of the web pages the browser visits, make changes
 * to them and pass information to their parent extension.
 *
 * @link https://developer.chrome.com/extensions/content_scripts
 */

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {

        if ( request.element && request.content ) {

            const element = document.querySelector( request.element );

            if ( element ) {
                element.innerHTML = request.content;
            } else {
                console.warn(`Element ${request.element} cannot be found in the current page.`);
            }

        } else {
            console.error('Missing content');
        }
    }
);
