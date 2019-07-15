var request = require("request");

var options = { method: 'GET',
    url: 'https://secure.gotransit.com/service/EligibilityService.svc/GetTrips',
    qs: { dateString: '07092019', fromStation: 'BE', tostation: 'UN' },
    headers:
        { 'Postman-Token': 'c030ab9e-4e86-43d8-9a90-7584632a8820',
            'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
