const express = require('express');
const router = express.Router();
const paymentService = require('./payment.service');

// routes
router.post('/charge', chargeAmount);
router.get('/getInfo/:id', getPaymentInfo);
// test URL
router.post('/createCustomer', createCustomer);
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

// test
function createCustomer(req, res, next) {
  paymentService.createCustomer(req.body)
  .then(user => res.json(user))
  .catch(err => next(err));
}