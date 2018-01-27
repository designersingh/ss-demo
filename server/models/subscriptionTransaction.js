/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User   = require('./user');

const SubscriptionTransactionSchema = new schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	paymentInvoiceId    : {
		type        : String,
		required    : true,
		trim        : true
	},
    amount          : {
        type        : Number,
        required    : true
    },
    paymentMethodId    : {
        type        : String,
        required    : true,
        trim        : true
    },
    paymentTransactionId    : {
        type        : String,
        required    : true,
        trim        : true
    },
    transactionAt   : {
	    type        : Date
    },
	createdAt       : {
		type        : Date,
        default     : Date.now
	},
	updatedAt       : {
		type        : Date
	}
});

module.exports = mongoose.model('SubscriptionTransaction', SubscriptionTransactionSchema);