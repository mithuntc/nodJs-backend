const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
const customer_service = require('../customer/cust.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/customer',
            '/users'

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
async function isRevoked(req, payload, done) {
    const cust = await customer_service.getById(payload.sub);

    // revoke token if user no longer exists
    if (!cust) {
        return done(null, true);
    }

    done();
};