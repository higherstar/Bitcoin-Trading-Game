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


const rooms = {}
const clients = {};

const sendMessage = (json) => {
  const sendData = JSON.stringify(json);
  const mapData = json.data.roomPlayers;
  // We are sending the current data to all connected clients
  Object.keys(mapData).forEach((client) => {
    if (client !== 'jackPot') clients[client].sendUTF(sendData);
  });
}

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
}


/*Set Socket Connect*/

/*Temp Object */
/*
rooms = {
  roomId:{
    jackPot: 0,
    userID: {
      roomId: "",
      username: "",
      type: "userevent",
      tokenTimes: [],
      betCoin: 0
    },
    userID1: {
      roomId: "",
      username: "",
      type: "userevent",
      tokenTimes: [],
      betCoin: 0
    }
  }
}

*/

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
        /* Join the game */
        if (!rooms[dataFromClient.roomId]) {
          rooms[dataFromClient.roomId] = {};
          rooms[dataFromClient.roomId]["jackPot"] = 0;
        }
        rooms[dataFromClient.roomId]["jackPot"] = rooms[dataFromClient.roomId]["jackPot"] + dataFromClient.betCoin;
        rooms[dataFromClient.roomId][userID] = dataFromClient;
        json.data = { roomPlayers: rooms[dataFromClient.roomId] };
        sendMessage(json);
      } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
        /*
        dataFromClient Data Object
        {
          type: "contentchange",
          roomId : playRoom.id,
          userName: userInfo.name,
          tokenTime: chooseTime
        }
       */
        Object.keys(rooms[dataFromClient.roomId]).forEach(userId=> {
          if(userId !== 'jackPot' && rooms[dataFromClient.roomId][userId].username === dataFromClient.userName) {
            rooms[dataFromClient.roomId][userId].tokenTimes.push(dataFromClient.tokenTime);
          }
        })
        json.data = { roomPlayers: rooms[dataFromClient.roomId] };
        sendMessage(json);
      }
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
    delete clients[userID];
    Object.keys(rooms).forEach((roomId) => {
      Object.keys(rooms[roomId]).forEach(userId => {
        if (userId === userID) {
          delete rooms[roomId][userID];
        }
      })
      if (Object.keys(rooms[roomId]).length < 2) {
        delete rooms[roomId];
      }
    })
    console.log('rooms>>>>>', rooms)
    // const json = { type: typesDef.USER_EVENT };
    // if (users[userID] && users[userID].username) {
    //   userActivity.push(`${users[userID].username} left the document`);
    //   editorContent = editorContent.filter(item => JSON.parse(item).name !== users[userID].username)
    // }

    // if (Object.keys(users).length === 0) {
    //   userActivity = [];
    //   totalBetCoin = 0;
    // }
    // json.data = { editorContent, users, userActivity, startGameTime, totalBetCoin };
    // delete clients[userID];
    // delete users[userID];
    // sendMessage(JSON.stringify(json));
  });
});