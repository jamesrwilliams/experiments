console.log('Hello from popup.js');

document.getElementById('send_message').addEventListener('click', () => {

    const targetElement = document.getElementById('target');
    const replacementHTML = document.getElementById('replacement');

    sendExtentionMessage({
        element: targetElement.value,
        content: replacementHTML.value
    })
});

function sendExtentionMessage(message) {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}
