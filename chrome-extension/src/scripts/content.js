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

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {

        if ( request.document && request.content ) {

            const element = document.querySelector( request.document );

            if ( element ) {

                element.innerHTML = request.content;

                const scripts = element.querySelectorAll('script');

                for (let i = 0; i < scripts.length; i ++) {

                    const currentScriptElement = scripts[i];

                    let js = currentScriptElement.text;

                        currentScriptElement.remove();

                    let newScriptElement = document.createElement('script');
                        newScriptElement.text = js;

                    element.append(newScriptElement);

                }

            } else {
                console.warn(`Element ${request.document} cannot be found in the current page.`);
            }

        } else {
            console.error('Missing content');
        }
    }
);
