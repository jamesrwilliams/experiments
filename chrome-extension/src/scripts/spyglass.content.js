/**
 * spyglass.content.js
 *
 * Content scripts are files that run in the context of web pages.
 * By using the standard Document Object Model (DOM), they are able
 * to read details of the web pages the browser visits, make changes
 * to them and pass information to their parent extension.
 *
 * @link https://developer.chrome.com/extensions/content_scripts
 */

window.addEventListener("message", function(event) {

    if(event.data.offer !== undefined) {

        let storefrontType = event.data.offer;
        let offerPayload = event.data.payload;

        if (storefrontType === 'standalone' && offerPayload === false ) {
            fetchStorefront(true);
        }

        if(storefrontType === 'iframe' ) {

            // We have an iFrame but due to X-Origin we need to prompt users to open the frame separably.

            chrome.runtime.sendMessage({
                action: 'iframeEmpty',
                payload: offerPayload
            });
        }

        if(storefrontType !== '' && typeof offerPayload !== 'string' ) {

            console.log('[spyglass.content.js] Send message to spyglass.popup.js');

            chrome.runtime.sendMessage({
                action: 'offerDataFound',
                payload: offerPayload,
            });
        }
    }
});

chrome.extension.onMessage.addListener((request, sender) => {

        if ( request.action !== '' ) {

            switch( request.action ) {
                case 'edit':
                    handleEdit(request.payload);
                    break;
                case 'debug':
                    console.log(request.payload);
                    break;
                case 'fetchStorefront':
                    fetchStorefront();
                    break;
                default:
                    console.log(`Unmapped action: "${request.action}"`);
            }
        } else {
            console.error('Missing action');
        }
    }
);

function fetchStorefront(iframe = false) {
    let scriptID = 'spyglass-hermes-script';

    let scripRef = document.getElementById(scriptID);

    if(scripRef) {
        //  We already have a script tag on the page. Removing it and proceeding.
        scripRef.remove();
    }

    let s = document.createElement('script');
        s.id = scriptID;
        s.src = chrome.extension.getURL('scripts/spyglass.hermes.js');

    let iframeElement = document.getElementById('points-frame');

    if(iframe) {

        if(iframeElement) {
            // iframe storefronts are currently unsupported due to security issues.
            window.postMessage({offer: 'iframe', payload: iframeElement.src }, '*');
        } else {
            console.log(`[spyglass.content.js] We don't have an iframe element to append too!`);
        }

    } else {
        document.head.appendChild(s);
    }

}

function handleEdit(payload) {

    const element = document.querySelector(request.document);

    if (element) {

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

}
