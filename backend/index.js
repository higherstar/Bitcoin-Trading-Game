var http = require('http');
var https = require('https');

var PORT = process.env.PORT || 4000;

const app = require('./config/express');
const mongoose = require('./config/mongoose');
const WebSocket = require('ws');
// open mongoose connection
mongoose.connect();

const wss = new WebSocket.Server({ port: 3933 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

if (process.env.NODE_ENV === 'development') {
    http.createServer(app).listen(PORT, function(){
        console.log("Express server listening on port " + PORT);
    });
} else if (process.env.NODE_ENV === 'local'){
    http.createServer(app).listen(PORT, function(){
        console.log("Express server listening on port " + PORT);
    });
} else {
    const fs = require('fs');
    const httpsPort = 4443;

    const httpsOptions = {
        cert: fs.readFileSync('./tls/__pocketplanner_io.crt'),
        ca: fs.readFileSync('./tls/__pocketplanner_io.ca-bundle'),
        key: fs.readFileSync('./tls/pocketplanner.key')
    };

    https.createServer(httpsOptions, app).listen(httpsPort, function(){
        console.log("Express server listening on port " + httpsPort);
    });
}



