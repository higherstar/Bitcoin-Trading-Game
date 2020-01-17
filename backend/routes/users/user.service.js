const config = require('../../config/vars');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./user.model');

module.exports = {
    authenticate,
    googleLogin,
    getAll,
    getById,
    getByEmail,
    create,
    update,
    delete: _delete
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
    return await await User.findOne({ email: email }).select('-hash');
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

    return await user.save();
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
