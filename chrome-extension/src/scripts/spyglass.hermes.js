/**
 * Hermes.js
 *
 * Spyglass' storefront sniffer.
 */

if(typeof storefront !== 'undefined') {

    console.log(`We have a storefront in the main window!`);
    let payload = buildPayload(storefront.info());
    window.postMessage(payload, '*');

} else {

    // Check for iframe
    let iframeWindow = document.getElementById('points-frame');

    if(iframeWindow) {

        console.log(iframeWindow.contentWindow);

        // Insert into the iframe instead.

        let iframeStorefront = iframeWindow.contentWindow.storefront;

        if(typeof iframeStorefront !== 'undefined') {
            let payload = buildPayload(iframeStorefront.info());
            window.postMessage(payload, '*');
        } else {
            window.postMessage({offer: false}, '*');
        }

    } else {
        console.log(`We don't have an iframe`);
        window.postMessage({offer: false}, '*');
    }
}

function buildPayload(input) {

    let offer = input.offer.offer;

    return {
        offer: true,
        data: {
            consoleURL: offer.links.self.href,
            name: offer.name,
            description: offer.description,
            startDate: offer.validity.startDate,
            endDate: offer.validity.endDate,
            priority: offer.priority
        }
    }
}
