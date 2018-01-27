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
    mongoose.Promise = require("bluebird");

mongoose.connect(config.db, mongooseOptions, err => {
    if(err){console.log(err)}
    console.log("Connected to the database");
});

app.use('/', httpsRedirect());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

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