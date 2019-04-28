const express = require('express');
const path = require('path');

const app = express();
const port = 4242;
const location = path.resolve(__dirname + '/../');

const stats = require('./scripts/project-stats');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/static/', express.static(location));

// Get specific project from partner.
app.use('/api/partners/**/projects/**', (req, res) => {
    res.json(stats.getProject(req.params[0], req.params[2]));
});

// Get specific partners projects.
app.use('/api/partners/**/projects', (req, res) => {
    res.json(stats.getProjects(req.params[0]));
});

// Get specific partner.
app.use('/api/partners/**', (req, res) => {
    const query = req.params[0];
    if( query !== '' ) {
        const partner = stats.getPartner(query);
        res.json(partner);
    } else {
        res.json('Error: Please provide a partner string.');
    }
});

// Get all partners
app.use('/api/partners', (req, res) => {
    res.json(stats.getPartners());
});

app.use('/debug/', (req, res) => {
   res.json(stats.getProjectHTMLFiles('acme', 'ACME-001'));
});

// JSON Errors
app.use(function (error, req, res, next) {
    res.status(500).json(error);
});

app.listen(port);
