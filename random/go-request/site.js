document.getElementById('journeyLookUp').addEventListener('click', (event) => {
    const origin = document.getElementById('origin');
    const destination = document.getElementById('destination');

    let today = new Date();
    let dateString = `${pad(today.getMonth() + 1)}${pad(today.getDate())}${today.getFullYear()}`;

    let origCode = origin.value;
    let destCode = destination.value;

    if(origCode !== 'Select Station/Stop' && destCode !== 'Select Station/Stop') {
        let endpoint = getJourneyEndpoint(dateString, origCode, destCode);
        let response = makeRequest(endpoint);
        console.log(response);
    } else {
        console.log('Please Select a station');
    }

});

function getJourneyEndpoint(dateString, origin, destination) {
    return `https://secure.gotransit.com/service/EligibilityService.svc/GetTrips?dateString=${dateString}&fromStation=${origin}&tostation=${destination}`;
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function makeRequest(requestURL) {
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', requestURL);

    xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.0");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept","application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "8dab21d2-a247-45c2-81c9-74886e973a1b,12d3f517-3010-4e18-a9a4-201c153877ac");
    xhr.setRequestHeader("cache-control", "no-cache");

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function() {
        if (xhr.status != 200) { // analyze HTTP status of the response
            alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
        }
    };

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            alert(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
            alert(`Received ${event.loaded} bytes`); // no Content-Length
        }

    };

    xhr.onerror = function() {
        alert("Request failed");
    };
}
