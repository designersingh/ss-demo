/**
 * Created by MrSingh on 2/15/16.
 */

'use strict';

const User = require('../models/user'),
    SubscriptionPlan = require('../models/subscriptionPlan'),
    SubscriptionTransaction = require('../models/subscriptionTransaction'),
    ReferralController = require('./ReferralController'),
	EmailController = require('../shared/email/EmailController'),
	EmailTemplateController = require('../shared/email/EmailTemplateController'),
    config = require('../../config')[process.env.NODE_ENV || 'dev'],
    HttpStatus = require('http-status-codes'),
    stripe = require('stripe')(config.stripe.secretKey),
    PlanProductEnum = require('../enums/allEnums').planPeriodEnum,
    EmailTemplateEnum = require('../enums/allEnums').emailTemplate,
	moment = require('moment');


const SubscriptionController = function() {};

SubscriptionController.prototype.createOnsiteSubscription = function(req, res) {

	
};

module.exports = new SubscriptionController();