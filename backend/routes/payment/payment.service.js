const Payment = require('./payment.model');
const User = require('../users/user.model');
const app = require("express")();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(require("body-parser").text());

module.exports = {
    chargeAmount,
		getPaymentInfo,
		buyInStacke
};

async function chargeAmount(body) {
	if (!body.id) {
			throw 'Require User Id';
	}
	const user = await User.findById(body.id);
	if (user) {
		const paymentInfo = await Payment.findOne({ email: user.email });
		if (!paymentInfo) throw "Can not find the paymentUser";
		const chargeParam = {
			amount: body.amount,
			userToken: paymentInfo.paymentTokenID,
			customerID: paymentInfo.customerID,
			description: paymentInfo.name
		};
		const chargeResult = await chargeAmountStripe(chargeParam);
		if (chargeResult.success) {
			Object.assign(paymentInfo, {amount: paymentInfo.amount + (chargeResult.amount/100)});
			return await paymentInfo.save();
		} else throw 'Can not charge Amount';
	} else throw 'Can not find user';
};

async function buyInStacke(body) {
	const paymentInfo = await Payment.findById(body.id);
	if (paymentInfo) {
		if (paymentInfo.amount >= body.buyInAmount) {
			const updatePaymentInfoParam = {
				amount: paymentInfo.amount - body.buyInAmount,
				betCoin: body.buyInAmount
			};
			Object.assign(paymentInfo, updatePaymentInfoParam);
			return await paymentInfo.save();
		} else throw "Not enough your buyed amount.";
	} else throw "PaymentInfo not found.";
};

async function getPaymentInfo(id) {
	const userInfo = await User.findById(id).select('-hash');
	if (userInfo) {
		return await Payment.findOne({ email: userInfo.email });
	} else throw "Can not find the User"
};

/* Stripe API Call Functions */
async function chargeAmountStripe({amount, userToken, customerID, description}) {
	let result = await stripe.charges.create({
		amount: (amount*100),
		currency: "usd",
		customer: customerID,
		description: `${description}: charged`,
		source: userToken
	});
	const response = {
		success: result.status === 'succeeded',
		amount: result.amount
	}
	return response
};
