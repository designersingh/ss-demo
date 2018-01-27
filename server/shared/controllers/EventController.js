/**
 * Created by MrSingh on 2/15/16.
 */

'use strict';

const config = require('../../../config')[process.env.NODE_ENV || 'dev'],
    HttpStatus = require('http-status-codes'),
    SubscriptionController = require('../../controllers/SubscriptionController'),
    stripe = require('stripe')(config.stripe.secretKey);

const EventController = function() {};

EventController.prototype.listen = function(req, res, next) {
	let sig = req.headers["stripe-signature"];
	let event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webhookSigning);
	
	console.log('---------Stripe Event---------');
	console.log(event.type);
	
	switch (event.type) {
		case "invoice.payment_succeeded":
			console.log('Processed payment creating Subscription Transaction');
			break;
		default:
			console.log('default response to Stripe Call');
			res.status(HttpStatus.OK).send({success:true});
			break;
	}
};


module.exports = new EventController();