const express = require('express');
const router = express.Router();
const cryptoService = require('./crypto.service');

// routes
router.get('/getcryptodata', getCryptoData);
router.post('/recordscore', setGameStatus);
module.exports = router;

function getCryptoData(req, res, next) {
	cryptoService.getData()
		.then(cryptoData => cryptoData ? res.json(cryptoData) : res.sendStatus(404))
		.catch(err => next(err));
};

function setGameStatus (req, res, next) {
	cryptoService.setGameStatus(req.body)
		.then(cryptoData => res.json(cryptoData))
		.catch(err => next(err));
}