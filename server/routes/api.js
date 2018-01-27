/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const UserController = require('../controllers/UserController'),
    ReferralController = require('../controllers/ReferralController'),
    SubscriptionController = require('../controllers/SubscriptionController'),
    CouponController = require('../controllers/CouponController'),
    PlanController = require('../controllers/PlanController');

module.exports = function(app, express){
    const api = express.Router();
	
    api.post('/signup', UserController.signup);
    api.post('/user/password/forgot', UserController.forgotPassword);
    api.post('/user/password/reset', UserController.resetPassword);
    api.post('/user/password/update', UserController.authorize, UserController.updatePassword);
    api.post('/login', UserController.login);
    api.get('/me', UserController.authorize, UserController.getUserDetails);

    return api;

};
