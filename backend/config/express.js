/**
 * Module dependencies.
 */

const express = require('express')
    , path = require('path')
    , bodyParser = require('body-parser')
    , cors = require('cors');

const jwt = require('../helpers/jwt');
const errorHandler = require('../helpers/error-handler');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use JWT auth to secure the api
app.use(jwt());

app.use('/users', require('../routes/users/user.controller'));
app.use('/payment', require('../routes/payment/payment.controller'));

// global error handler
app.use(errorHandler);

module.exports = app;
