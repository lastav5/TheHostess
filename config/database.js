var url;
try {
    url = require('../config/herokuDatabase.js');
}
catch (err) {}

module.exports = {
    url: process.env.HEROKU_DB_CONNECTION_STRING || url // local db: process.env.LOCAL_DB_CONNECTION_STRING
};