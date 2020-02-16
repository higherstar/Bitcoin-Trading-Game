const Room = require('./room.model');
const app = require("express")();
app.use(require("body-parser").text());

module.exports = {
    createRoom,
    getActiveRoom,
    joinRoom
}

async function createRoom(body) {
    const room = new Room({
      jackPot: body.betCoin
    })
    return await room.save();
}

async function getActiveRoom() {
  const rooms = await Room.find({status: "pending"});
  if (rooms) {
    let activeRoom={};
    rooms.forEach(async(room)=> {
      if ((Date.now() - room.createdDate.getTime())/1000 > 30) {
        Object.assign(room, {status: 'rejected'});
        await room.save();
      } else activeRoom = room;
    });
    if(activeRoom._id) {
      return activeRoom
    }
  }
  throw "There is no active room";
}

async function joinRoom(body) {
  const room = await Room.findById(body.roomId);
  if (room && room.members < 11 && room.status === "pending") {
    Object.assign(room, {
      members: room.members + 1,
      status: room.members >= 9 ? "playing" : room.status,
      jackPot: room.jackPot + body.betCoin
    });
    return await room.save();
  }
  throw 'Full Members'
    
}