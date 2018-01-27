/**
 * Created by MrSingh on 2/15/16.
 */

'use strict';

const UserPlan = require('../shared/models/userPlan'),
    HttpStatus = require('http-status-codes');


const PlanController = function() {};

PlanController.prototype.getPlans = function(req, res, next) {
	console.log(req.params);
	let planId = '';
	if(req.params.planId){
		planId = req.params.planId;
	}
	
	UserPlan.find({productCategory:planId}).select('-_id -__v -isEnabled -created').exec(function(err, plans){
		if(err){
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({success:false,message:'Error Retrieving plans', error:err});
		}else{
			return res.status(HttpStatus.OK).send({success:true, plans:plans});
		}
	});
};

PlanController.prototype.getAllPlans = function(req, res, next) {
	
	UserPlan.find({}).select('-_id -__v -isEnabled -created').exec(function(err, plans){
		if(err){
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({success:false,message:'Error Retrieving plans', error:err});
		}else{
			return res.status(HttpStatus.OK).send({success:true, plans:plans});
		}
	});
};


module.exports = new PlanController();