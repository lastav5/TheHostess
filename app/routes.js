//'use strict';

var pg = require('pg');
var db = require('../config/database');
var conString = db.url;

module.exports = function(app) {

// If the Node process ends
process.on('SIGINT', function() {
 
});


//routes ==================================================

app.post('/api/tables',function(request,response){
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      console.log(request.params.mapId);//undefined
      client.query('insert into public.tables ("mapId") values(0)', function(err, result) {//'+request.params.mapId+'
        //call `done()` to release the client back to the pool 
        done();
        
        if(err) {
            response.status(500).send('Something broke!');
          return console.error('error running query', err);
        }
        response.json(result.rows);
        console.log(result.rows);
      });
    });
});

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
            'shape': 'circle',
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
            'shape': 'rectangle',
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
            'shape': 'rectangle',
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

};

