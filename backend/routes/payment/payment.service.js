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
        amount: chargeParam.amount
    });

    const paymentUser = await Payment.findOne({ email: user.email });
    if (paymentUser) {
        Object.assign(paymentUser, {amount: chargeParam.amount});
        return await paymentUser.save();
    } else {
        await userPayment.save();
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user._id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }    
}