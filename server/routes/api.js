/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const UserController = require('../controllers/UserController'),
    ReferralController = require('../controllers/ReferralController'),
    SubscriptionController = require('../controllers/SubscriptionController'),
    CouponController = require('../controllers/CouponController'),
    PlanController = require('../controllers/PlanController'),
    passport = require('passport'); // import passport

module.exports = function(app, express){
    const api = express.Router();
	
    api.post('/signup', UserController.signup);
    api.post('/user/password/forgot', UserController.forgotPassword);
    api.post('/user/password/reset', UserController.resetPassword);
    api.post('/user/password/update', UserController.authorize, UserController.updatePassword);
    api.post('/login', UserController.login);
    api.get('/me', UserController.authorize, UserController.getUserDetails);

    // routes for social login
    api.route('/auth/linkedin').get(passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] })); // route to trigger linkedin login, scope to define what data to fetch
    api.route('/auth/linkedin/callback').get(UserController.oauthCallback('linkedin')); // route to which linkedin data is returned

    return api;

};
