module.exports = {
    'dev'               : {
        name            : 'dev',
        feEndPoint      : 'http://localhost:4200', // changed as i am using webpack
        db              : 'mongodb://slickslotDev:vLZRfNkV0qSNMq9P@slickslot-dev-shard-00-00-gt9vy.mongodb.net:27017,slickslot-dev-shard-00-01-gt9vy.mongodb.net:27017,slickslot-dev-shard-00-02-gt9vy.mongodb.net:27017/test?ssl=true&replicaSet=slickslot-dev-shard-0&authSource=admin',
        port            : 8081,
        secret          : "ncbamazingunicorns",
        easyPostKey     : "ZZ0ZUbxkT1AUG3mj4P6YgA",
        mailgun         : {
            name        : 'naturecarebox',
            domain      : 'mg.naturecarebox.com',
            key         : 'key-aac0c8642f1d214f267767a0ed12decf',
            apiBaseUrl  : 'https://api.mailgun.net/v3/mg.naturecarebox.com'
        },
        linkedIn        : {
            clientId        : '784j2g9vjk3lke',
            clientSecret    : 'Ojw8uDtP4yZjby7T',
            callbackURL     : 'http://localhost:8081/api/v1/auth/linkedin/callback' // callback url where linkedin data is received
        },
        stripe          : {
            publishable     : '',
            secretKey       : '',
            webhookSigning  : ''
        }
    },
    'staging'           : {
        name            : 'staging',
        feEndPoint      : 'https://dev.slickslot.com',
        db              : 'mongodb://slickslotDev:vLZRfNkV0qSNMq9P@slickslot-dev-shard-00-00-gt9vy.mongodb.net:27017,slickslot-dev-shard-00-01-gt9vy.mongodb.net:27017,slickslot-dev-shard-00-02-gt9vy.mongodb.net:27017/test?ssl=true&replicaSet=slickslot-dev-shard-0&authSource=admin',
        port            : 8081,
        secret          : "ncbamazingunicorns",
        easyPostKey     : "ZZ0ZUbxkT1AUG3mj4P6YgA",
        mailgun         : {
            name        : 'naturecarebox',
            domain      : 'mg.naturecarebox.com',
            key         : 'key-aac0c8642f1d214f267767a0ed12decf',
            apiBaseUrl  : 'https://api.mailgun.net/v3/mg.naturecarebox.com'
        },
        linkedIn        : {
            clientId        : '784j2g9vjk3lke',
            clientSecret    : 'Ojw8uDtP4yZjby7T'
        },
        stripe          : {
	        publishable     : '',
	        secretKey       : '',
	        webhookSigning  : ''
        }
    },
    'prod'        : {
        name            : 'prod',
        feEndPoint      : 'https://www.slickslot.com',
        db              : '',
        port            : 8081,
        secret          : "amazingncbunicorns",
        easyPostKey     : "i2HLVah9O7VMZ3miVL0k3A",
        mailgun         : {
            name        : 'naturecarebox',
            domain      : 'mg.naturecarebox.com',
            key         : 'key-aac0c8642f1d214f267767a0ed12decf',
            apiBaseUrl  : 'https://api.mailgun.net/v3/mg.naturecarebox.com'
        },
        stripe          : {
	        publishable     : '',
	        secretKey       : '',
	        webhookSigning  : ''
        }
    }
};