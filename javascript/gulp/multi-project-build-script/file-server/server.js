const express = require('express');
const path = require('path');

const app = express();
const port = 4242;
const location = path.resolve(__dirname + '/../');

const config = require('./scripts/readConfig');
const stats = require('./scripts/project-stats');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/static/', express.static(location));
app.use('/api/partners', (req, res) => {

    const data = stats.partners();
    console.log(data);

    res.json(data);
});
app.use('/api/', (req, res) => {

    let pathName = req.originalUrl;
    let pathArray = pathName.split('/');

    let partner_name = pathArray[2];
    let project_key = pathArray[3];

    if ( project_key && partner_name ) {
        let debug = config.debug(partner_name, project_key);

        res.json({
            partner_name,
            project_key,
            debug
        });
    } else {
        res.json({
            'hello': 'world'
        });
    }
});

app.use(function (error, req, res, next) {
    res.status(500).json(error);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
