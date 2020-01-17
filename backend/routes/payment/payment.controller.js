const express = require('express');
const router = express.Router();
const paymentService = require('./payment.service');

// routes
router.post('/charge', chargeAmount);

module.exports = router;

function chargeAmount(req, res, next) {
	paymentService.chargeAmount(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}