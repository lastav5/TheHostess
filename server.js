//'use strict';

var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var fs = require('fs');
var path = require('path');
 
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use(express.static(__dirname + '/TheHostess')); 

// middleware to use for all requests

console.log("start server.js");
app.use(function (req, res, next) {
	console.log('in middleware');
	
    res.setHeader('Access-Control-Allow-Origin', '*');//allowing ripple's localhost get access to node's localhost(5432).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',"X-Requested-With,Content-Type");
    //res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(JSON.stringify(res.headers));
    console.log("end of header set");
    // Pass to next layer of middleware
    next();
});

require('./app/routes')(app); // pass our application into our routes -- must
app.use('/api', router);//put this line beofre passing app to routes.js for it to take effect.

var port = process.env.PORT || 4407;

app.listen(port, function() {
  console.log("Listening on " + port);
});

exports = module.exports = app;   // expose app
