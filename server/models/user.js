/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const mongoose  = require('mongoose'),
    schema      = mongoose.Schema,
	validator   = require('validator'),
    bcrypt      = require('bcryptjs');

const userSchema = new schema({
    firstName           : {
        type        : String,
        required    : true,
        trim        : true
    },
    lastName            : {
        type        : String,
        required    : true,
        trim        : true
    },
    email               : {
        type        : String,
        required    : true,
        trim        : true,
        unique      : true,
	    validate    : {
        	validator   :  validator.isEmail,
		    message     : '{VALUE} is not a valid email'
	    }
    },
    password            : {
        type        : String,
        trim        : true,
        required    : true
    },
    paymentCusId        : {
        type        : String,
        trim        : true
    },
    paymentMethod       : [{
        cardId      : {
	        type    : String,
	        default : false
        },
        brand      : {
	        type    : String
        },
        last4      : {
	        type    : String
        },
        expMonth      : {
	        type    : Number
        },
        expYear     : {
	        type    : Number
        },
	    isDefault   : {
        	type    : Boolean
	    }
    }],
	passwordResetToken  : {
		type:String
	},
	invitationCode      : {
		type        : String
	},
	referralCode        : {
		type        : String,
		required    : true,
		unique      : true
	},
	isPaidUser          : {
		type        : Boolean,
		default     : false
	},
	hasPaymentMethod    : {
		type        : Boolean,
		default     : false
	},
    isVerified          : {
        type        : Boolean,
        default     : false
    },
    isEnabled           : {
        type        : Boolean,
        default     : false
    },
	created             : {
		type        : Date,
		default     : Date.now
	}
});

userSchema.pre('update', function (next) {
    let user = this._update;
	
	user.$set.password = bcrypt.hashSync(user.$set.password, 10);
	next();
});

// methods ======================

// Saves the user's password hashed (plain text password storage is not good)
userSchema.pre('save', function (next) {
	let user = this;
	if (this.isModified('password') || this.isNew) {
		user.password = bcrypt.hashSync(user.password, 10);
		next();
	} else {
		return next();
	}
});

// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, 10);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.comparePassword = function(password){
	let user = this;
	return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('User', userSchema);