var express = require('express');
var path = require('path');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');
//var process = require('process');

// Router
var router = require('./routes.js');

// For seeding database*******************************
// var helpers = require('./helpers.js');
// var util = require('./db/utils');
// ***************************************************

// process.env.nodeEnv = 'production';
// //process.env.OPENSHIFT_NODEJS_IP ||
//            process.env.IP ||
//            undefined;

console.log("running", process.env.nodeEnv);

//Port
var port = process.env.PORT || 3000;

console.log("port", port);

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", port);

//Taking care of cross-origin requests
app.use(cors());

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/", router);

//Have to think about whether static serving is necessary in this context.

var whereTo = path.join(__dirname, "../public"); //path to static content

// Serve the client files
app.use(express.static(whereTo));


app.listen(app.get("port"));
console.log("Listening on", app.get("port"));

// Uncomment what you want to seed to the db **************
//*********************************************************
// helpers.getRecipes(util.addListOfRecipes);
// util.addUser('Bob','Saget', console.log);
