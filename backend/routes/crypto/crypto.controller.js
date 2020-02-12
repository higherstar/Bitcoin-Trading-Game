const express = require('express');
const router = express.Router();
const cryptoService = require('./crypto.service');

// routes
router.get('/getcryptodata', getCryptoData);
module.exports = router;

function getCryptoData(req, res, next) {
	cryptoService.getData()
		.then(cryptoData => cryptoData ? res.json(cryptoData) : res.sendStatus(404))
		.catch(err => next(err));
};
