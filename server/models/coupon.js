/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const couponSchema = new schema({
    code: {
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    stripeCode: {
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type:Number,
        required: true,
        trim:true
    },
    discount: {
        type:Number,
        required: true,
        trim:true
    },
    plans: [Number],
    minBoxes: {
        type:Number,
        required: true
    },
    maxBoxes: {
        type:Number,
        required: true
    },
    redemptions: {
        type        : Number,
        required    : true,
        default     : 0
    },
    maxRedemptions: {
        type:Number,
        required: true
    },
    maxRedemptionsPerUser: {
        type        : Number,
        required    : true,
        default     : 1
    },
    expiration: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    isEnabled: {
        type:Boolean,
        default: true
    }
});

module.exports = mongoose.model('Coupon', couponSchema);