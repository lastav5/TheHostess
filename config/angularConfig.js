var configVars = require('./config.js');

module.exports = {
	angularConfig: {
		apiUrl : configVars.apiUrl,
		debug : configVars.debug,
		env : configVars.debug
	}
};