/**
 * spyglass.popup.js
 *
 *
 */

const result = null;
const textarea = document.getElementById('clip');
const button_clipboard = document.getElementById('btn_load_clipboard');
const button_replace = document.getElementById('btn_replace');
const $popupContainer = document.querySelector('.pts-spyglass');

/**
 * Message router.
 *
 * For the popup. Handles actions passed back from the spyglass.content.js script.
 */

chrome.extension.onMessage.addListener((request, sender) => {

    if (request.action !== '' && request.payload !== null) {

        switch (request.action) {
            case 'iframeEmpty':

                const link = document.createElement('a');
                      link.href = request.payload;
                      link.target = '_blank';
                      link.innerText = 'Click here to view offer in a new window';

                document.querySelector(`.iframeEmpty`).append(link);

                revealSection('iframeEmpty');

                break;
            case 'edit':
                handleEdit(request.payload);
                break;
            case 'debug':
                console.log(request.payload);
                break;
            case 'offerDataFound':

                const data = request.payload;

                if(data) {

                    // Manipulate the data.

                    for (let k in data){

                        let target = document.getElementById(`offer_${k}`);

                        if(target){
                            if(k === 'consoleURL') {
                                target.href = buildConsoleLink(data[k]);
                            } else if(k === 'endDate' || k === 'startDate') {

                                let date = reformatDateString(data[k]);

                                target.innerText = date.toISOString();

                            } else if(k === 'description') {
                                target.innerHTML = data[k].replace(
                                    /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
                                    '<a target="_blank" href="$1">$1</a>'
                                );
                            } else {
                                target.innerText = data[k];
                            }


                        } else {
                            console.log(`Element #offer_${k} cannot be found in the popup.`);
                        }
                    }

                    console.log('Reveal information');
                    revealSection('information');

                }

                break;
            default:
                console.log(`Unmapped action: "${request.action}"`);
        }

    } else {
        console.error('Missing action');
    }

});

button_clipboard.addEventListener('click', () => {

    const clipboard = getClipboard();

    if (clipboard !== '') {
        // Set contents of editor to the clipboard value.
        editor.setValue(clipboard, 0);
    }

});

button_replace.addEventListener('click', () => {

    const target = document.getElementById('target');

    sendExtensionMessage('replace', {
        document: target.value,
        content: editor.getValue()
    });
});

sendExtensionMessage('fetchStorefront');

/**
 * Send message wrapper for sending messages between the popup and content scripts.
 * @param action
 * @param payload
 * @return {boolean}
 */
function sendExtensionMessage(action, payload = false) {

    if (!action) {
        return false;
    }

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action,
            payload
        });
    });
}

/**
 * Get the content of the clipboard.
 *
 * @return {string}
 */
function getClipboard() {
    let result = '';
    const textarea = document.getElementById('clip');
    textarea.value = '';
    textarea.select();

    if (document.execCommand('paste')) {
        result = textarea.value;
    } else {
        console.error('failed to get clipboard content');
    }

    textarea.value = '';
    return result;
}

/**
 * Utility function to render data to the popup window.
 *
 * @param content {string} The HTML to add to the popup.
 * @param json {boolean} Is the message json?
 */
function debug(content, json = false) {

    let debugMessage = document.querySelector('.debug');
    let popupWindow = document.querySelector('.pts-spyglass');

    if(!debugMessage) {
        let debugElement = document.createElement('section');
            debugElement.classList.add('debug');
            debugElement.classList.add('active');

        popupWindow.prepend(debugElement);
    }

    if(json) {
        popupWindow.querySelector('.debug').innerHTML = '<pre>' + JSON.stringify(content, null, 4) + '</pre>';
    } else {
        popupWindow.querySelector('.debug').innerHTML = content;
    }
}

/**
 * Reformat the URL provided by the API to a usable link for the offer in the console.
 * @param url
 * @return {string|boolean}
 */
function buildConsoleLink(url) {

    let urlParts = url.split("/v1");

    if(urlParts.length !== 2) {
        return false;
    } else {
        let prod = (urlParts[0].indexOf('staging') === -1 ? true : false );
        return (prod ? 'https://console.points.com' : 'https://console-staging.lxc.points.com' ) + urlParts[1];
    }

}

function reformatDateString(dateString) {
    const split = dateString.split('T');
    const correctDateString = split[1].length > 13 ? split[0] + 'T' + split[1].substring(0, 12) + 'Z' : '';

    return new Date(correctDateString);

}

function revealSection(section) {

    if(section === '') return;

    const sectionElement = document.querySelector(`.${section}`);

    sectionElement.classList.toggle('active');
}
