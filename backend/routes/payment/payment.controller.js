const express = require('express');
const router = express.Router();
const paymentService = require('./payment.service');

// routes
router.post('/charge', chargeAmount);
router.get('/getInfo/:id', getPaymentInfo);
module.exports = router;

function chargeAmount(req, res, next) {
    paymentService.chargeAmount(req.body)
    .then(paymentInfo => paymentInfo ? res.json(paymentInfo) : res.sendStatus(404))
    .catch(err => next(err));
}

function getPaymentInfo(req, res, next) {
  paymentService.getPaymentInfo(req.params.id)
      .then(paymentInfo => paymentInfo ? res.json(paymentInfo) : res.sendStatus(404))
      .catch(err => next(err));
}
