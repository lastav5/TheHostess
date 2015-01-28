//'use strict';

var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var fs = require('fs');
var path = require('path');

 // pass our application into our routes -- must

//app.use(busboy());

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/TheHostess')); 

require('./app/routes')(app); // pass our application into our routes -- must

// middleware to use for all requests
router.use(function(req, res, next) {
  // do validations etc here
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

//app.use('/', router);

var port = process.env.PORT || 5432;
app.listen(port, function() {
  console.log("Listening on " + port);
});
exports = module.exports = app;   // expose app
