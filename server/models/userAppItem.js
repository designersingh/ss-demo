/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const userAppItemSchema = new schema({
    userId          : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    profile         : {
        name        : {type : String, trim : true},
        email       : {type : String, trim : true},
        phone       : {type : String, trim : true},
        location    : {type : String, trim : true},
        title       : {type : String, trim : true},
        websiteOne  : {type : String, trim : true},
        websiteTwo  : {type : String, trim : true},
	    images      : {
		    name        : { type: String},
		    location    : { type: String},
		    key         : { type: String}
	    },
        position    : {type : Number}
    },
    skills          : [{
        name        : {type : String, trim : true},
        description : {type : String, trim : true},
        strength    : {type : Number},
        position    : {type : Number}
    }],
    summary         : {
        title        : {type : String, trim : true},
        description  : {type : String, trim : true},
        position     : {type : Number}
    },
    textSection     : [{
        title        : {type : String, trim : true},
        description  : {type : String, trim : true},
        position     : {type : Number}
    }],
    portfolio       : [{
        description : {type : String, trim : true},
        position    : {type : Number},
        videoUrl    : {type : String, trim : true},
        images      : [{
            name        : { type: String},
            location    : { type: String},
            key         : { type: String}
        }]
    }],
    experience      : [{
        title       : {type : String, trim : true},
        type        : {type : String, trim : true},
        website     : {type : String, trim : true},
        organization: {type : String, trim : true},
        description : {type : String, trim : true},
        startDate   : {type : String, trim : true},
        endDate     : {type : String, trim : true},
        videoUrl    : {type : String, trim : true},
        images      : [{
            name        : { type: String},
            location    : { type: String},
            key         : { type: String}
        }],
        position    : {type : Number}
    }],
    isEnabled       : {type: Boolean, default: false},
    isVerified      : {type: Boolean, default: false}
});


module.exports = mongoose.model('UserOrder', userOrderSchema);