const config = require('../../config/vars');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./user.model');
const Payment = require('../payment/payment.model');
const app = require("express")();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(require("body-parser").text());

module.exports = {
    authenticate,
    googleLogin,
    getAll,
    getById,
    getByEmail,
    create,
    update,
    delete: _delete,
    getUserInfo,
    updateProfileInfo
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function getByEmail(email) {
    return await User.findOne({ email: email }).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

    console.log(user);

    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user._id }, config.secret);
    return {
        ...userWithoutHash,
        token
    };
}

async function update(userParam) {
	const user = await User.findById(userParam.id);

	// validate
	if (!user) throw 'User not found';
	// if (user.username !== userParam.email && await User.findOne({ email: userParam.email })) {
	//     throw 'Email "' + userParam.email + '" is already taken';.
	// }

	// hash password if it was entered
	if (userParam.password) {
			userParam.hash = bcrypt.hashSync(userParam.password, 10);
	}

	// copy userParam properties to user
	Object.assign(user, userParam);
	const customer = await stripe.customers
		.create({
				email: user.email,
				name: user.name
		});
	if(customer.id){
		const status = await stripe.customers.createSource(customer.id, {
      source: user.paymentTokenID,
		});
		if(!status) throw 'Customer CreateSource Failed'
	} else throw 'Can not Create Customer';
	const userPayment = new Payment({
		name: user.name,
		email: user.email,
		amount: 0,
		paymentToken: user.paymentTokenID,
		customerID: customer.id
	});
	await user.save();
	return await userPayment.save();
	// return await getById(userParam.id);
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function googleLogin(userParam) {

    let user = await User.findOne({ email: userParam.email });

    if (!user) {
        if (!userParam.role)
            throw 'There is no user role selected.';

        user = new User(userParam);
        user.hash = bcrypt.hashSync('googlepassword', 10);

        console.log(user);

        // save user
        await user.save();
    }

    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user._id }, config.secret);
    return {
        ...userWithoutHash,
        token
    };
}

async function getUserInfo(id) {
	return await User.findById(id).select('-hash');
}

async function updateProfileInfo(newUser) {
    const user = await User.findById(newUser._id);
    Object.assign(user, newUser);
    return user.save()
}