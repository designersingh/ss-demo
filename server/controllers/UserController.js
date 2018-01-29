/**
 * Created by MrSingh on 2/15/16.
 */

'use strict';

const randomstring = require("randomstring"),
    User = require('../models/user'),
    config = require('../../config')[process.env.NODE_ENV || 'dev'],
    secret = config.secret,
    HttpStatus = require('http-status-codes'),
    jwt = require('jsonwebtoken'),
    SubscriptionPlan = require('../models/subscriptionPlan'),
    SubscriptionController = require('../controllers/SubscriptionController'),
    EmailController = require('../shared/email/EmailController'),
    EmailTemplateController = require('../shared/email/EmailTemplateController'),
	EmailTemplateEnum = require('../enums/allEnums').emailTemplate,
    stripe = require('stripe')(config.stripe.secretKey),
    voucherCodeGenerator = require('voucher-code-generator'),
    passport = require('passport'); // import passport



const UserController = function() {};

UserController.prototype.createUserResponseObj = function (user){
	return {
		firstName           : user.firstName,
		lastName            : user.lastName,
		email               : user.email,
		hasPaymentMethod    : user.email,
		referralCode        : user.referralCode
	};
};

UserController.prototype.signup         = function(req, res, next) {

	const reqObj = req.body;
	
	const newUserObj = {
		firstName           : reqObj.firstName,
		lastName            : reqObj.lastName,
		email               : reqObj.email,
		password            : reqObj.password,
		paymentCusId        : '',
		passwordResetToken  : '',
		referralCode        : voucherCodeGenerator.generate({
			prefix      : reqObj.firstName.charAt(0) + reqObj.lastName.charAt(0),
			pattern     : '-#####'
		}).join()
	};
	
    const newUser = new User(newUserObj);
	
    newUser.save((err, userObj) => {
        if(err){
            console.log(err);
            if(err.code === 11000){
                return res.status(HttpStatus.CONFLICT).send({errCode:11000, success:false, message:'User already exists.'});
            }
            return res.status(HttpStatus.BAD_REQUEST).send(err);
        } else{
            console.log(userObj);
	
	        let userDetails = UserController.prototype.createUserResponseObj(userObj);
	        const authToken = createToken(userDetails);
	        
            return res.status(HttpStatus.OK).send({
	            success: true,
	            user: userDetails,
	            authToken: authToken
            });
        }
    });
};

UserController.prototype.updatePassword     = function(req, res, next) {
    let reqObj      = req.body;
    let userToken   = req.decoded;
    
    User.findOneAndUpdate({email:userToken.email},{password:reqObj.password},function(err,user){
	    if(err){
		    return res.status(HttpStatus.BAD_REQUEST).send({success:false, error:err});
	    } else{
	    	return res.status(HttpStatus.OK).send({success:true, message: "Password Updated Successfully."})
	    }
    });
};

UserController.prototype.forgotPassword     = function(req, res, next) {
    let reqObj      = req.body;
    console.log(reqObj);
    
    User.findOne({email:reqObj.email},function(err,user){
	    if(err){
		    return res.status(HttpStatus.BAD_REQUEST).send({success:false, error:err});
	    } else{
	    	const ResetToken = randomstring.generate({
			    length: 36,
			    charset: 'alphanumeric'
		    });
	    	
	    	User.findOneAndUpdate({email:user.email},{
	    	    passwordResetToken: ResetToken
		    }, function (updatedErr,updatedUser) {
			    if(updatedUser){
				    const emailTemplateData = {
					    resetToken  : ResetToken,
					    email       : user.email
				    };
				    
				    const emailData = {
					    subject     : "Reset Password - NatureCare Box",
					    from_name   : "NatureCare Box",
					    from_email  : "info@naturecarebox.com",
					    to          : user.email,
					    html        : EmailTemplateController.getEmailTemplate(EmailTemplateEnum.EMAIL_FORGOT_PASSWORD, emailTemplateData)
				    };
				    
				    EmailController.sendEmail(emailData);
				    return res.status(HttpStatus.OK).send({success:true, message: "Reset password email sent successfully."})
			    }else{
		            return res.status(HttpStatus.BAD_REQUEST).send({success:false, error:updatedErr});
			    }
		    })
	    }
    });
};

UserController.prototype.resetPassword      = function(req, res, next) {
    let reqObj      = req.body;
    
    User.findOne({
	    email               : reqObj.email,
	    passwordResetToken  : reqObj.token,
    },function(err,user){
    	console.log(err);
    	console.log(user);
	    if(user){
		    User.findOneAndUpdate({email:reqObj.email},{
			    password    : reqObj.password,
			    passwordResetToken : ""
		    },function ( updateErr,updatedUser ) {
			    if(updateErr){
				    return res.status(HttpStatus.BAD_REQUEST).send({success:false, error:err});
			    }else{
				    return res.status(HttpStatus.OK).send({success:true, message: "Password Updated Successfully."})
			    }
		    });
	    } else{
		    return res.status(HttpStatus.BAD_REQUEST).send({success:false, error:err});
	    }
    });
};

UserController.prototype.login              = function(req, res) {
    let userData = {
        email       : req.body.email,
        password    : req.body.password
    };

    User.findOne({
        email: userData.email
    },function (err, user) {
        if(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).send({success:false, message:'Invalid email', error:err});
        }

        if(!user) {
            res.status(HttpStatus.FORBIDDEN).send({success:false, message:'User Doesn\'t exist' });
        }else if(user){
            let validPassword = user.validPassword(userData.password, user.password);
            console.log('user exist');
            console.log(validPassword);
            
            if(!validPassword){
                res.status(HttpStatus.FORBIDDEN).send({success:false, message:'Invalid Password'});
            } else{
                let userDetails = UserController.prototype.createUserResponseObj(user);
                
                const token = createToken(userDetails);
                
	            res.status(HttpStatus.OK).json({
		            success     : true,
		            message     : 'Login Successfully',
		            authToken   : token,
		            user        : userDetails
	            });
            }
        }
    });
};

UserController.prototype.authorize          = function(req, res, next) {
    console.log('Validating Token');
    let token = req.headers['Authorization'] || req.body.token || req.params.token;

    if(token){
        jwt.verify(token, secret,{}, function (err, decoded) {
            if(err){
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                    success:false,
                    errCode:9999,
                    error:err,
                    message:'False or expired token'
                });
                console.log("False or expired token.");
            }else{
                req.decoded = decoded;
                console.log("Valid token.");
                next();
            }
        });
    }else{
        res.status(417).send({
            success:false,
            errCode:9999,
            message:'No token provided'
        });
        console.log("No token provided.");
    }
};

UserController.prototype.getUserDetails     = function(req, res, next) {
    User.findOne({email:req.decoded.email})
        .select('-password -paymentCusId -passwordResetToken -verificationToken -__v -isEnabled -isVerified -created')
	    .exec(function (err, user){
        if(err){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        } else{
            if(!user){
                return res.status(417).send({error:'User Doesn\'t exist.'});
            }
            
	        let userDetails = UserController.prototype.createUserResponseObj(user);
	
	        res.status(HttpStatus.OK).json({
		        success             : true,
		        user                : userDetails
	        });
        }
    });
};

/**
 * oauth callback handler
 * 
 * @param {String} strategy the social auth passport strategy to use e.g. linkedin, facebook, twitter
 * 
 */
UserController.prototype.oauthCallback     = function(strategy) {
    return function(req, res, next) {
        passport.authenticate(strategy, { failureRedirect: '/login' }, function(err, user){
            if (err || !user) {
                return res.status(HttpStatus.BAD_REQUEST).send({success:false, error:err});
            } else {
                let userDetails = UserController.prototype.createUserResponseObj(user);
                
                const token = createToken(userDetails);

	            let userObject = {
		            success     : true,
		            message     : 'Login Successfully',
		            authToken   : token,
		            user        : user // currently sending entire linked in user object
                }

                // json cannot be sent in a redirect so the token is sent as a url parameter
                var urlToken = encodeURIComponent(token);
                return res.redirect(config.feEndPoint + '?token=' + urlToken);
                // using passport to add user data to headers
                /* req.login(userObject, function(err) {
                    if (err) {
                        return res.redirect(config.feEndPoint);
                    }
                    var urlToken = encodeURIComponent(token);
                    return res.redirect(config.feEndPoint + '?token=' + urlToken);
                }); */
            }
        })(req, res, next)
    };
};

module.exports = new UserController();

function createToken(user){
    return jwt.sign({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }, secret, {
        expiresIn: 60*60*240
    });

}