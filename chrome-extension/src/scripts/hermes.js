/**
 * Hermes.js
 *
 * Chrome extensions injected messenger.
 */

if(storefront !== undefined) {

    sendMessage(storefront.info());

    function sendMessage(input) {

        let payload = { offer: false };

        if(input.offer !== undefined) {

            let offer = input.offer.offer;

            payload = {
                offer: true,
                data: {
                    consoleURL: offer.links.self.href,
                    name: offer.name,
                    description: offer.description,
                    startDate: offer.validity.startDate,
                    endDate: offer.validity.endDate,
                    priority: offer.priority
                }
            };

        }

        window.postMessage(payload, '*');

    }

}


