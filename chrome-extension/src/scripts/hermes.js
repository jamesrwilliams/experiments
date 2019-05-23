/**
 * Hermes.js
 *
 * Chrome extensions injected messenger.
 */

sendMessage(storefront.info().offer.offer);

function sendMessage(offer) {
    window.postMessage({
        consoleURL: offer.links.offer.href,
        name: offer.name,
        description: offer.description,
        startDate: offer.validity.startDate,
        endDate: offer.validity.endDate,
        priority: offer.priority
    }, "*");
}

// TODO get payload back to the popup using the Chrome storage API.








