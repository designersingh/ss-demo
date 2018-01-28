const LinkedInStrategy = require('passport-linkedin').Strategy,
    User = require('../models/user'),
    config = require('../../config')[process.env.NODE_ENV || 'dev'];

module.exports = function(passport) {

    /**
     * LinkedIn Passport handler
     * 
     * @param {String} token oauth token from linkedin
     * @param {String} tokenSecret oauth secret from linkedin
     * @param {Object} profile Linkedin profile object
     * @param {Function} done callback
     */
    passport.use('linkedin', new LinkedInStrategy({
        consumerKey: config.linkedIn.clientId,
        consumerSecret: config.linkedIn.clientSecret,
        callbackURL: config.linkedIn.callbackURL,
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']        
      },
      function(token, tokenSecret, profile, done) {
        // Currently passing entire user object through without saving it
        // The save to mongo will occur here
        user = {};
        user.oauth_token = token;
        user.oauth_secret = tokenSecret;
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user.socialId = profile.name.id;
        user.email = profile.emails[0];
        // user.email =
        done(null, user);
      }
    ));

    /**
     * Subsequent passport strategies go here
     */
};