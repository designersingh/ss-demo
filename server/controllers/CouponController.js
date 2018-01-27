/**
 * Created by MrSingh on 2/15/16.
 */

'use strict';

const Coupon    = require('../models/coupon'),
    config      = require('../../config')[process.env.NODE_ENV || 'dev'],
    moment      = require('moment'),
    stripe      = require('stripe')(config.stripe.secretKey),
    HttpStatus  = require('http-status-codes');


const CouponController = function() {};

CouponController.prototype.createCoupon = function(req, res, next) {
    console.log(req.body);
    const $json = req.body;
    
    $json.code = $json.code.toLowerCase();
    
	const couponCodeObj = {
		code            : $json.code,
		stripeCode      : $json.code,
		description     : $json.description,
		type            : $json.type,
		plans           : $json.plans || [1,2,3,4,5,6,7,8,9,10,11,12],
		discount        : $json.discount,
		minBoxes        : $json.minBoxes,
		maxBoxes        : $json.maxBoxes,
        maxRedemptions  : $json.maxRedemptions,
        expiration      : moment.utc().add(25,'M')
	};
    
    let stripeCouponObj = {
        id              : $json.code,
        duration        : 'once',
        metadata        : {
            description : $json.description
        }
    };
    
    if($json.expiration !== -1){
        couponCodeObj.expiration    = moment.utc().add($json.expiration,'d');
    }
    
    if($json.type === 1){
        stripeCouponObj.percent_off = $json.discount;
    }else if($json.type === 2){
        stripeCouponObj.amount_off = $json.discount * 100;
        stripeCouponObj.currency = 'USD';
    }
    
    if($json.maxRedemptions !== -1){
	    stripeCouponObj.max_redemptions = $json.maxRedemptions;
    }
    
    console.log(stripeCouponObj);
	
	stripe.coupons.create(stripeCouponObj, function(err, coupon) {
		// asynchronously called
        if(err){
	        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }else{
            console.log(coupon);
            
            const newCoupon = new Coupon(couponCodeObj);
	        newCoupon.save(function(err, coupon){
		        if(err){
			        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		        } else{
			        res.status(HttpStatus.OK).send({success: true, coupon:coupon});
		        }
	        });
        }
	});
};

module.exports = new CouponController();
