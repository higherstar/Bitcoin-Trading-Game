var http = require('http');
var https = require('https');


const webSocketsServerPort = 3933;
const webSocketServer = require('websocket').server;
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

var PORT = process.env.PORT || 4000;

const app = require('./config/express');
const mongoose = require('./config/mongoose');
// open mongoose connection
mongoose.connect();
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

/// Websocket Functions

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = [];
// User activity history.
let userActivity = [];

const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
}

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = { type: dataFromClient.type };
      if (dataFromClient.type === typesDef.USER_EVENT) {
        users[userID] = dataFromClient;
        if (dataFromClient.username)
          userActivity.push(`${dataFromClient.username} joined to edit the document`);
        json.data = { editorContent, users, userActivity };
      } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
        editorContent.push(dataFromClient.content);
        json.data = { editorContent, userActivity, users };
      }
      sendMessage(JSON.stringify(json));
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    if (users[userID] && users[userID].username) {
      userActivity.push(`${users[userID].username} left the document`);
      editorContent = editorContent.filter(item => JSON.parse(item).name !== users[userID].username)
    }

    if (users.length === 0) {
      userActivity = [];
    }
    json.data = { editorContent, users, userActivity };
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });
});



