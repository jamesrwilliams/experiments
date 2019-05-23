/**
 * popup.js
 *
 *
 */

const result = null;
const textarea = document.getElementById('clip');
const button_clipboard = document.getElementById('btn_load_clipboard');
const button_replace = document.getElementById('btn_replace');

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
 * Message router.
 *
 * For the popup. Handles actions passed back from the content.js script.
 */

chrome.extension.onMessage.addListener((request, sender) => {

    console.log({request, sender});

    if (request.action !== '' && request.payload !== null) {

        switch (request.action) {
            case 'edit':
                handleEdit(request.payload);
                break;
            case 'debug':
                console.log(request.payload);
                break;
            case 'feedback':

                const data = request.payload;

                for (let k in data){

                    let target = document.getElementById(`offer_${k}`);

                    if(k === 'consoleURL') {
                        target.href = data[k];
                    } else {
                        target.innerText = data[k];
                    }

                }

                break;
            default:
                console.log(`Unmapped action: "${request.action}"`);
        }

    } else {
        console.error('Missing action');
    }
});
