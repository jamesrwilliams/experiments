/**
 * Hermes.js
 *
 * Spyglass' storefront sniffer.
 */

    if (typeof type === 'undefined') {
        let type;
    }

    type = (window.location !== window.parent.location ? 'iframe' : 'standalone');

    if (typeof storefront !== 'undefined') {
        console.log(`[spyglass.hermes.js] We have a storefront in ${type} mode!`);
        let payload = buildPayload(type, storefront.info());
        window.postMessage(payload, '*');

    } else {
        let payload = buildPayload(type);
        window.postMessage(payload, '*');
    }

    function buildPayload(storeFrontType = 'standalone', input = false) {
        if (input) {
            let offer = input.offer.offer;

            if(typeof offer.validity !== "undefined") {

            };

            return {
                offer: storeFrontType,
                payload: {
                    consoleURL: offer.links.self.href,
                    name: offer.name,
                    description: (offer.description ? offer.description : ''),
                    startDate: (offer.validity.startDate ? offer.validity.startDate : '' ),
                    endDate: offer.validity.endDate,
                    priority: offer.priority
                }
            }
        } else {
            return {
                offer: storeFrontType,
                payload: false
            }
        }
    }
