/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

//@Param: UserType


const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const planSchema = new schema({
    planName: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    productId: {
        type:Number,
        required:true
    },
    productCategory: {
        type:Number,
        required:true
    },
    planId: {
        type:Number,
        required:true,
        trim:true
    },
    stripePlanId: {
        type:Number,
        required:true,
        trim:true
    },
    unitPrice: {
        type:Number,
        required:true,
        trim:true
    },
    shippingPrice: {
        type:Number,
        required:true,
        trim:true
    },
    total: {
        type:Number,
        required:true,
        trim:true
    },
    period: {
        type:Number,
        required:true
    },
    renewalPeriod: {
        type:Number,
        required:true
    },
    periodUnit: {
        type:String,
        required:true,
        trim:true
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


module.exports = mongoose.model('UserPlan', planSchema);