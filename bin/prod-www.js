/**
 * Module dependencies.
 */

var fs = require('fs');
var app = require('../prod-app.js');
var debug = require('debug')('llotan:server');
var http = require('http');
var https = require('https');

/**
 * Get port from environment and store in Express.
 */

const privateKey = fs.readFileSync('/etc/letsencrypt/live/llotan.de/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/llotan.de/cert.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate
};

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
        console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
});
