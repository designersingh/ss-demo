/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const SubscriptionPlanSchema = new schema({
	userId              : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productId           : {
        type        : Number,
        required    : true
    },
    paymentPlanId       : {
        type        : Number,
        required    : true
    },
    stripePlanId        : {
        type        : Number,
        required    : true
    },
    paymentSubId        : {
        type        : String,
        required    : true,
        trim        : true
    },
	status              : {
		type        : Number,
		required    : true
	},
	isAutoRenew         : {
		type        : Boolean,
		required    : true
	},
	couponUsed          : {
        type    : String,
        default : ''
    },
    autoRenewStopsAt    : {
	    type: Date
    },
    cancelAt            : {
        type: Date
    },
	cancelSource        : {
		type:String
	},
	createdAt           : {
		type: Date
	},
	updatedAt           : {
		type: Date
	},
	nextChargeAt        : {
		type            : Date
	}
});

module.exports = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);