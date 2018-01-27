/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const referralSchema = new schema({
	userId          : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	invitedEmail    : {type: String,    required : true, unique : true},
    lastApproached  : {type: Date,      required : true},
    hasJoined       : {type: Boolean,   default  : false},
});

module.exports = mongoose.model('Referral', referralSchema);