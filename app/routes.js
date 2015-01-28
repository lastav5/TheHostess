//'use strict';
var db = require('../config/database');
var connectionString = db.url;

module.exports = function(app) {

//routes ==================================================
// app.get('/events', function(request,response){
//   var connection =  mysql.createConnection(dbDetails);
//   connection.query("select event_id,event_name,DATE_FORMAT(event_date, '%d-%m-%Y') AS event_date,place_name,placeXCoordinate,placeYCoordinate from events", function(err, rows){
//     if(err) {
//       response.write("Could not connect to DB: " + err);
//       response.end();
//     }else{
//       response.json(rows);
//       response.end();
//       connection.end(function(err){//partialy working with this line
//         // Do something after the connection is gracefully terminated.
//       });
//     }
//   });
// });


};

