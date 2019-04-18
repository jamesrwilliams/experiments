/**
 * popup.js
 */

const editor = ace.edit("editor");
    editor.setOptions({
        theme: 'ace/theme/monokai',
        mode: 'ace/mode/html',
    });

const result = null;
const textarea = document.getElementById('clip');
const use_clipboard_btn = document.getElementById('use_clipboard');

use_clipboard_btn.addEventListener('click', () => {

    const clipboard = getClipboard();

    if(clipboard !== '' ) {
        sendExtensionMessage({
            element: target.value,
            content: clipboard
        });
    }

});

document.getElementById('send_message').addEventListener('click', () => {

    const target = document.getElementById('target');

    sendExtensionMessage({
        element: target.value,
        content: editor.getValue()
    });
});

function sendExtensionMessage(message) {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

function getClipboard() {
    let result = null;
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
