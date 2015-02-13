//'use strict';

var pg = require('pg');
var db = require('../config/database');
var connectionString = db.url;

module.exports = function(app) {

// If the Node process ends
process.on('SIGINT', function() {
 
});


//routes ==================================================

app.get('/api/maps',function(request,response){
    // pg.connect(conString, function(err, client, done) {
    //   if(err) {
    //     return console.error('error fetching client from pool', err);
    //   }
    //   client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //     //call `done()` to release the client back to the pool 
    //     done();
        
    //     if(err) {
    //       return console.error('error running query', err);
    //     }
    //     console.log(result.rows[0].number);
    //     //output: 1 
    //   });
    // });
console.log('getting mapsData');
    var data = [
    {
        'mapId': 0,
        'userId': 0,
        'name': 'myFirstMap',
        'tables': [
          {
            'tableId': 0,
            'posX': 10.0,
            'posY': 10.0,
            'width': 10.0,
            'height': 10.0,
            'number': 0,
            'mapId': 0,
            'occupied': false,
            'reservations': [
              {
                'reservationId': 0,
                'name': '',
                'guestCount': 0,
                'date': '08-02-2015',
                'time': '21:30',
                'notes': '',
                'phone': '',
                'tableId': 0,
                'createdAt': ''
              }
            ]
          },
          {
            'tableId': 1,
            'posX': 20.0,
            'posY': 20.0,
            'width': 20.0,
            'height': 10.0,
            'number': 0,
            'mapId': 0,
            'occupied': false,
            'reservations': []
          }
        ]
    },
    {
        'mapId': 1,
        'userId': 0,
        'name':'mySecondMap',
        'tables': [
          {
            'tableId': 2,
            'posX': 10.0,
            'posY': 10.0,
            'width': 10.0,
            'height': 10.0,
            'number': 0,
            'mapId': 1,
            'occupied': false,
            'reservations': []
          }
        ]
    }
    ];
    response.json(data);
  });

app.post('/api/tables',function(request,response){
    
  });

};

