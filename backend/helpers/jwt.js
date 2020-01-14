const expressJwt = require('express-jwt');
const { secret } = require('../config/vars');
const userService = require('../routes/users/user.service');

module.exports = jwt;

function jwt() {
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/users/getByEmail',
            '/users/google'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
