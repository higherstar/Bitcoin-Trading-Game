const config = require('../../config/vars');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Payment = require('./payment.model');
const User = require('../users/user.model');
const app = require("express")();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(require("body-parser").text());

module.exports = {
    chargeAmount
};

async function chargeAmount(chargeParam) {
    if (!chargeParam.id) {
        throw 'Require User Id';
    }
    const user = await User.findById(chargeParam.id);
    console.log('venus-----charge User', user);
    // validate
    // if (await Payment.findOne({ email: chargeParam.email })) {
    //     throw 'Email "' + chargeParam.email + '" is already taken';
    // }

    const userPayment = new Payment({
        name: user.name,
        email: user.email,
        amount: chargeParam.amount,
        paymentToken: user.paymentTokenID
    });

    const paymentUser = await Payment.findOne({ email: user.email });
    if (paymentUser) {
        if (paymentUser.amount < chargeParam.amount) {
            chargeAmountStripe(chargeParam.amount - paymentUser.amount, user.paymentTokenID, user.name);
        }
        
        Object.assign(paymentUser, {amount: chargeParam.amount});
        return await paymentUser.save();
    } else {
        return await userPayment.save();
    }    
}

async function chargeAmountStripe(amount, userToken, description) {
    let {status} = await stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: `${description}: charged`,
        source: userToken
    });
    console.log('venus--->status-charge',status);
}