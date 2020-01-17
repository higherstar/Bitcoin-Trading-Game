const express = require('express');
const router = express.Router();
const paymentService = require('./payment.service');

// routes
router.post('/charge', chargeAmount);
// test URL
router.post('/createCustomer', createCustomer);
module.exports = router;

function chargeAmount(req, res, next) {
    paymentService.chargeAmount(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function createCustomer(req, res, next) {
  paymentService.createCustomer(req.body)
  .then(user => res.json(user))
  .catch(err => next(err));
}