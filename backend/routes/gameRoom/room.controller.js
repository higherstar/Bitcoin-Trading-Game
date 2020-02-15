const express = require('express');
const router = express.Router();
const roomService = require('./room.service');

router.post('/createRoom', createRoom);
router.get('/getActiveRoom', getActiveRoom)
router.post('/joinRoom', joinRoom)
module.exports = router;

function createRoom(req, res, next) {
	roomService.createRoom()
	.then(room => room ? res.json(room) : res.sendStatus(404))
	.catch(err => next(err));
}

function getActiveRoom(req, res, next) {
	roomService.getActiveRoom()
	.then(room => room ? res.json(room) : res.sendStatus(404))
	.catch(err => next(err));
}

function joinRoom(req, res, next) {
	roomService.joinRoom(req.body)
	.then(room => room ? res.json(room) : res.sendStatus(404))
	.catch(err => next(err));
}
