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
const button_clipboard = document.getElementById('btn_load_clipboard');
const button_replace = document.getElementById('btn_replace');

button_clipboard.addEventListener('click', () => {

    const clipboard = getClipboard();

    if(clipboard !== '' ) {
        // Set contents of editor to the clipboard value.
        editor.setValue(clipboard, 0);
    }

});

button_replace.addEventListener('click', () => {

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
