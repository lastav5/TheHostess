var details,url;
try {
    details = require('../config/herokuDatabase.js');
}
catch (err) {}

module.exports = {
    url: process.env.DATABASE_URL || details.url /* local db: process.env.LOCAL_DB_CONNECTION_STRING*/
};