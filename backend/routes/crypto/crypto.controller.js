const express = require('express');
const router = express.Router();
const cryptoService = require('./crypto.service');

// routes
router.get('/getcryptodata', getCryptoData);
router.post('/gameResult', resultWinner);
router.post('/recordGameInfo', setGamePlayInfo);
router.post('/setPlayerScore', setGameScore)
module.exports = router;

function getCryptoData(req, res, next) {
	cryptoService.getData()
		.then(cryptoData => cryptoData ? res.json(cryptoData) : res.sendStatus(404))
		.catch(err => next(err));
};

function setGamePlayInfo (req, res, next) {
	cryptoService.setGamePlayInfo(req.body)
		.then(cryptoData => res.json(cryptoData))
		.catch(err => next(err));
}

function setGameScore (req, res, next) {
	cryptoService.setGameScore(req.body)
		.then(cryptoData => res.json(cryptoData))
		.catch(err => next(err));
}

function resultWinner(req, res, next) {
	cryptoService.resultWinner(req.body)
		.then(cryptoData => cryptoData ? res.json(cryptoData) : res.sendStatus(404))
		.catch(err => next(err));
};