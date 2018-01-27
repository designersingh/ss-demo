/**
 * Created by MrSingh on 2/15/16.
 */

'use strict';

const config = require('../../../config')[process.env.NODE_ENV || 'dev'],
    mailgun = require('mailgun-js')({apiKey: config.mailgun.key, domain: config.mailgun.domain}),
    nodemailer = require('nodemailer'),
    q = require('q');


const EmailController = function() {};

EmailController.prototype.sendEmail = function(message) {
    let fromEmail =  message.from_name +" <"+ message.from_email +">";
    let response = q.defer();

    if(config.name === 'dev'){
	    console.log('local called');
	    let messageConfig = {
		    from        : fromEmail,
		    to          : message.to,
		    subject     : message.subject,
		    html        : message.html,
		    important   : message.important
	    };
	
	    let transporter = nodemailer.createTransport({
		    host: "smtp.mailtrap.io",
		    port: 2525,
		    auth: {
			    user: "bd205de30bf29c",
			    pass: "d5d4fa3b58f1d9"
		    }
	    });
	
	    transporter.sendMail(messageConfig, function(error, body){
		    if (error) {
			    console.log('Email Failed ' + error);
			    response.reject({success:false, message:"Error sending email.", error:error});
		    }else{
			    console.log('Email Success ' + body);
			    response.resolve({success:true,message:"Email sent successfully.", result:body});
		    }
	    });
	    
    }else{
	    console.log('production called');
	    message.from = fromEmail;
	    mailgun.messages().send(message, function (error, body) {
		    if(error){
			    response.reject({success:false, message:"Error sending email.", error:error});
		    }else{
			    response.resolve({success:true,message:"Email sent successfully.", result:body});
		    }
	    });
    }

    return response.promise;
};

module.exports = new EmailController();