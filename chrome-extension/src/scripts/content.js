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
                /*
                 * Need to dynamically create scripts to preserve execution
                 * @link https://blog.dareboost.com/en/2016/09/avoid-using-document-write-scripts-injection/
                 */
                /*
                const sNew = document.createElement("script");
                      sNew.async = true;
                      sNew.src = "https://example.com/script.min.js";
                const s0 = document.getElementsByTagName('script')[0];
                      s0.parentNode.insertBefore(sNew, s0);
                /* */
                console.log('Content replaced!');
            } else {
                console.warn(`Element ${request.element} cannot be found in the current page.`);
            }

        } else {
            console.error('Missing content');
        }
    }
);
