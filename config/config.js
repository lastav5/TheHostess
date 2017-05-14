var dev;
try {
	dev = require('./dev.js');
}
catch(err){
	console.log('in config.js. could not require dev.js');
}

module.exports = {
	conString : process.env.DATABASE_URL || dev.conString,
	apiUrl : process.env.API_URL || dev.apiUrl,
	debug : true,
	env : process.env.ENV || dev.env
}