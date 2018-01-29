const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    config = require("./config")[process.env.NODE_ENV || "dev"],
    helmet = require("helmet"),
    cors = require("cors"),
    cronJobs = require('./server/cronjob/cron-jobs'),
	httpsRedirect = require('express-https-redirect'),
    mongoose = require("mongoose"),
    mongooseOptions = {useMongoClient: true};
    mongoose.Promise = require("bluebird"),
    passport = require("passport"),
    session = require('express-session');

// passport strategies init
require('./server/config/passport')(passport);

mongoose.connect(config.db, mongooseOptions, err => {
    if(err){console.log(err)}
    console.log("Connected to the database");
});

// created to serve login page, use angular dist index instead
app.get('/login', function(req, res, next) {
    res.sendFile(__dirname + '/index.html')
});

app.use('/', httpsRedirect());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// session init (required for oauth)
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/*const WebhooksApi = require("./server/webhooks/routes/webhookApi")(app, express);
app.use("/webhook/v1/", WebhooksApi);*/


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const api = require("./server/routes/api")(app, express);
app.use("/api/v1", api);


// This route enables HTML5Mode by forwarding missing files to the index.html
app.all("*", function(req, res) {
    res.send({
        code:0,
        message: "Invalid Endpoint/Unauthorized Access"
    });
});

app.listen(config.port, function (err) {
    if(err){
        console.log(err);
    }else{
        console.log("Listening on port " + config.port);
    }
});