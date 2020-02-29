const express = require('express');
const router = express.Router();
const paymentService = require('./payment.service');

// routes
router.post('/charge', chargeAmount);
router.post('/buyin', buyInStacke);
router.post('/leaderBoardList', getLeaderBoardList);
router.get('/getInfo/:id', getPaymentInfo);
module.exports = router;

function chargeAmount(req, res, next) {
	paymentService.chargeAmount(req.body)
		.then(paymentInfo => paymentInfo ? res.json(paymentInfo) : res.sendStatus(404))
		.catch(err => next(err));
};

function buyInStacke (req, res, next) {
	paymentService.buyInStacke(req.body)
		.then(paymentInfo => paymentInfo ? res.json(paymentInfo) : res.sendStatus(404))
		.catch(err => next(err));
};

function getPaymentInfo(req, res, next) {
	paymentService.getPaymentInfo(req.params.id)
		.then(paymentInfo => paymentInfo ? res.json(paymentInfo) : res.sendStatus(404))
		.catch(err => next(err));
};

function getLeaderBoardList(req, res, next) {
	paymentService.getLeaderBoardList()
		.then(scores => scores ? res.json(scores) : res.sendStatus(404))
		.catch(err => next(err));
}
