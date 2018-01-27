/**
 * Created by MrSingh on 2/15/16.
 */

'use strict';

const User = require('../models/user'),
	Referral = require('../models/referral'),
	EmailController = require('../shared/email/EmailController'),
	EmailTemplateController = require('../shared/email/EmailTemplateController'),
    config = require('../../config')[process.env.NODE_ENV || 'dev'],
    HttpStatus = require('http-status-codes'),
    stripe = require('stripe')(config.stripe.secretKey),
    PlanProductEnum = require('../enums/allEnums').planPeriodEnum,
    EmailTemplateEnum = require('../enums/allEnums').emailTemplate,
	moment = require('moment'),
	voucherCodeGenerator = require('voucher-code-generator');


let ReferralController = function() {};

ReferralController.prototype.referFriends = function(req, res) {
    let referFriends = req.body;
	console.log(referFriends);
	console.log(req.decoded);
	
	User.findOne({email:req.decoded.email}, function(err, user){
		if(err){ return res.status(HttpStatus.FORBIDDEN).send({success:false, message:'User Doesn\'t exist' });}
		
		let referrals = [];
		
		for(let i=0; i<referFriends.invitedFriends.length; i++){
			const referralObj = {
				userId          : user._id,
				invitedEmail    : referFriends.invitedFriends[i],
				hasJoined       : false,
				lastApproached  : moment.utc()
			};
			
			console.log(referralObj);
			
			referrals.push(referralObj);
			
			let emailData = {
				subject     : "You're Invited! ",
				from_name   : "NatureCare Box",
				from_email  : "info@naturecarebox.com",
				to          : referFriends.invitedFriends[i],
			};
			
			const emailDataObj = {
				inviteUrl   : config.feEndPoint + '/invite/' + user.referralCode,
				userName    : user.firstName
			};
			
			emailData.html = EmailTemplateController.getEmailTemplate(EmailTemplateEnum.EMAIL_INVITE_FRIEND, emailDataObj);
			EmailController.sendEmail(emailData);
		}
		
		//console.log(referrals);
		
		Referral.create(referrals,(updatedErr,docs)=>{
			return res.status(HttpStatus.OK).send({success:true, updated:docs})
		});
		
	});
	
};

ReferralController.prototype.sendReminderEmail = function(req, res) {
    let referFriends = req.body;
	console.log(referFriends);
	console.log(req.decoded);
	
	User.findOne({email:req.decoded.email}, function(err, user){
		if(err){ return res.status(HttpStatus.FORBIDDEN).send({success:false, message:'User Doesn\'t exist' });}
			
			let emailData = {
				subject     : "You're Invited! ",
				from_name   : "NatureCare Box",
				from_email  : "info@naturecarebox.com",
				to          : referFriends.invitedEmail,
			};
		
			
			const emailDataObj = {
				inviteUrl   : config.feEndPoint + '/invite/' + user.referralCode,
				userName    : user.firstName
			};
			
			emailData.html = EmailTemplateController.getEmailTemplate(EmailTemplateEnum.EMAIL_INVITE_FRIEND, emailDataObj);
		
			Referral.findOneAndUpdate({invitedEmail: referFriends.invitedEmail},
				{ lastApproached: moment.utc() },
				(refError, referrals) => {
				if(refError){
					return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
						success:false, message: "error Sending Email",
						error: refError
					});
				}else{
					EmailController.sendEmail(emailData);
					return res.status(HttpStatus.OK).send({success:true, referrals:referrals});
				}
			});
	});
	
};

ReferralController.prototype.getUserReferrals = function(req, res) {
	User.findOne({email : req.decoded.email}, (err,user)=>{
		if(err){
			return res.status(HttpStatus.FORBIDDEN).send({success:false, message:'User Doesn\'t exist' });
		}else{
			Referral.find({userId : user._id}, (refError, referrals)=>{
				return res.status(HttpStatus.OK).send({success:true, referrals:referrals});
			});
		}
	});
};

ReferralController.prototype.validateReferralCode = function(req, res) {
	const referralCode = req.params.referralCode;
	if(!referralCode){
		return res.status(HttpStatus.FORBIDDEN).send({success:false, message:'Invalid Referral Code.' });
	}
	
	User.findOne({referralCode : referralCode}, (err,user)=>{
		if(err){
			return res.status(HttpStatus.FORBIDDEN).send({success:false, message:'Invalid Referral Code.' });
		}else{
			return res.status(HttpStatus.OK).send({success:true, user: {
				email       : user.email,
				firstName   : user.firstName,
				lastName    : user.lastName,
			}});
		}
	});
};

ReferralController.prototype.addReferralCode = function () {
	
	User.find({referralCode:{ $exists: false }}, (err, user)=>{
		if(user.length >0){
			for(let i =0; i<user.length; i++){
				console.log(user[i].email);
				const code = voucherCodeGenerator.generate({
					prefix      : user[i].firstName.charAt(0) + user[i].lastName.charAt(0),
					pattern     : '-#####'
				}).join();
				
				console.log(code);
				
				User.findOneAndUpdate({email:user[i].email},{referralCode:code}, function(updateErr, updatedUser){
					if(updatedUser){
						console.log('Successfully added referralCode to user');
					}
				});
			}
		}
		
	});
};

ReferralController.prototype.rewardInviter = function(referralCode, amount) {
	
	User.findOne({referralCode: referralCode}, (err, user)=>{
		if(user){
			stripe.customers.findOneAndUpdate(user.paymentCusId, {
				account_balance : -((user.cashBalance + amount)*100)
			}, function(err, customer) {
				// asynchronously called
				if(err){
					console.log('error adding reward to customer');
				}else{
					User.findOneAndUpdate({email:user.email},{
						cashBalance: Math.abs(customer.account_balance/100)
						}, function(updateErr, updatedUser){
						if(updatedUser){
							console.log('Successfully added balance to user');
						}else {
							console.log('error adding reward to customer');
						}
					});
				}
			});
		}
	});
};

module.exports = new ReferralController();