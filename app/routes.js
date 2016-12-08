//'use strict';

var pg = require('pg');
var db = require('../config/database');
var conString = db.url;

module.exports = function(app) {

// If the Node process ends
process.on('SIGINT', function() {
 
});
console.log("in routes");

//routes ==================================================

app.post('/api/tables',function(request,response){
    //pg.defaults.ssl = true;
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      console.log("heY");
      console.log(request.body);//undefined
      
      client.query("insert into tables (mapid,posx,posy,width,height,tablenumber,occupied,shape) values("+ request.body.mapid+","+request.body.posx+","+request.body.posy+","+request.body.width+","+request.body.height+","+request.body.tablenumber+","+request.body.occupied+",'"+request.body.shape+"') RETURNING *", function(err, result) {//'+request.params.mapId+'
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

app.delete('/api/tables/:id',function(request,response){
    //pg.defaults.ssl = true;
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      console.log("in delete");
      
      client.query("update tables set isdeleted=true where tableid="+request.params.id+"; select * from tables where tableid="+ request.params.id, function(err, result) {//'+request.params.mapId+'
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

app.get('/api/tables/:id',function(request,response){
  //pg.defaults.ssl = true;
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
  console.log("get with id");
      client.query("select * from tables where tableid="+ request.params.id +" and isdeleted=false", function(err, result) {
        //call `done()` to release the client back to the pool 
        done();
        
        if(err) {
            response.status(500).send('Something broke!');
          return console.error('error running query', err);
        }
          console.log(result.rows);
        response.json(result.rows);

      });
    });
});

app.put('/api/maps',function(request,response){
    //pg.defaults.ssl = true;
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }

      var _maps= request.body;
      var _mapsStr = "";
      var _tablesStr="";
      var _reservations=[];

 
      for (var i=0;i<_maps.length;i++)
      {
          _mapsStr += "update maps set name='"+ _maps[i].name + "' where mapId="+_maps[i].mapid+";";
          console.log("maps:"+ _mapsStr);
          for (var j=0; typeof(_maps[i].tables) !='undefined' && j<_maps[i].tables.length ;j++)
          {
              _tablesStr +="update tables set posx="+_maps[i].tables[j].posx+", posy="+_maps[i].tables[j].posy+",width="+_maps[i].tables[j].width+",height="+_maps[i].tables[j].height+",tablenumber="+_maps[i].tables[j].tablenumber+",shape='"+_maps[i].tables[j].shape+"' where tableid="+_maps[i].tables[j].tableid+";";
          }
      }
console.log(_tablesStr);
      client.query(_mapsStr, function(err, result) {
        //call `done()` to release the client back to the pool 
        done();
        
        if(err) {
            response.status(500).send('Something broke!');
          return console.error('error running query', err);
        }

      });


      client.query(_tablesStr, function(err, result) {
        //call `done()` to release the client back to the pool 
        done();
        
        if(err) {
            response.status(500).send('Something broke!');
          return console.error('error running query', err);
        }

      });
    });
});

app.get('/api/maps/:selectedDate', function (request, response) {
  //pg.defaults.ssl = true;
     pg.connect(conString, function(err, client, done) {
       if(err) {
         return console.error('error fetching client from pool', err);
       }
       //client.query('SELECT $1::int AS number', ['1'], function(err, result)
       var _maps, _tables, _reservations, _reservationsWithoutTable;

        console.log(request.params.selectedDate);
         client.query('SELECT * from maps where isdeleted=false', function(err, result) {
             _maps= result.rows;
            
             client.query('SELECT * from tables where isdeleted=false', function(err, result) {
                 _tables= result.rows;
                 
                 client.query("SELECT * from reservations inner join reservationstables on reservations.reservationid=reservationstables.reservationid where reservations.isdeleted=false and date=to_date('"+request.params.selectedDate+"', 'DD/MM/YYYY')", function (err, result) {
                     _reservations = result.rows;

                     client.query("SELECT * from reservations where (tablenumbers is null or tablenumbers='') and isdeleted=false and date=to_date('"+request.params.selectedDate+"', 'DD/MM/YYYY')", function (err, result) {
                         _reservationsWithoutTable = result.rows;
                             //call `done()` to release the client back to the pool 
                             done();

                             if (_tables != null) {
                                 var _tablesLength= _tables.length;
                                 for (var i = 0; i < _tablesLength; i++) {
                                     var _mapsLength = _maps.length;
                                     for (var j = 0; j < _mapsLength; j++) {
                                         if (typeof (_maps[j].tables) == 'undefined')
                                             _maps[j].tables = [];
                                         if (_maps[j].mapid == _tables[i].mapid)
                                             _maps[j].tables.push(_tables[i]);
                                     }
                                 }

                                 if (_reservations != null) {
                                     var _reservationsLength = _reservations.length;
                                     for (var i = 0; i < _reservationsLength; i++) {
                                         var _mapsLength= _maps.length;
                                         for (var j = 0; j < _mapsLength; j++) {
                                             var _mapsTablesLength= _maps[j].tables.length;
                                             for (var k = 0; k < _mapsTablesLength; k++) {
                                                 if (typeof (_maps[j].tables[k].reservations) == 'undefined')
                                                     _maps[j].tables[k].reservations = [];
                                                 if (_maps[j].tables[k].tableid == _reservations[i].tableid)
                                                     _maps[j].tables[k].reservations.push(_reservations[i]);
                                             }
                                         }
                                     }
                                 }

                                 if (_reservationsWithoutTable != null) {
                                     var _reservationsWithoutTableLength = _reservationsWithoutTable.length;
                                     for (var i = 0; i < _reservationsWithoutTableLength; i++) {
                                         for (var j = 0; j < _maps.length; j++) {
                                             if (typeof (_maps[j].reservationsNoTable) == 'undefined')
                                                 _maps[j].reservationsNoTable = [];
                                             _maps[j].reservationsNoTable.push(_reservationsWithoutTable[i]);
                                            
                                         }
                                     }

                                 }

                             }

                             console.log(JSON.stringify(_maps));
                             response.json(_maps);
                        });
                     });
            });
         });


        
         if(err) {
           return console.error('error running query', err);
         }
         //console.log(result.rows[0].number);
    
 
     });
//console.log('getting mapsData');
 /*   var data = [
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
    */
    
  });

app.post('/api/maps',function(request,response){
    //pg.defaults.ssl = true;
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      //console.log(request.params.mapId);//undefined
      client.query('insert into "maps" ("userId") values(1)', function(err, result) {
        console.log('success in inserting new map');
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


app.post('/api/reservations', function (request, response) {
    //pg.defaults.ssl = true;
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log(request.body);
        console.log("insert into reservations (name,guestcount,date,starthour,endhour,notes,phone,createdate,alldayres,tablenumbers) values('" + request.body.name + "'," + request.body.guestcount + ",to_date('" + request.body.date + "','DD/MM/YYYY')," + request.body.starthour + "," + request.body.endhour + ",'" + request.body.notes + "','" + request.body.phone + "',current_date," + request.body.alldayres + ",'" + request.body.tablenumbers + "') RETURNING *")
        var reservationId;
        var tables = request.body.tablenumbers.split(".");
        var query;
        if (request.body.starthour != null)
            query ="insert into reservations (name,guestcount,date,starthour,endhour,notes,phone,createdate,alldayres,tablenumbers) values('" + request.body.name + "'," + request.body.guestcount + ",to_date('" + request.body.date + "','DD/MM/YYYY'),'" + request.body.starthour + "','" +request.body.endhour+ "','" +request.body.notes + "','" + request.body.phone + "',current_date,"+ request.body.alldayres+",'"+request.body.tablenumbers+"') RETURNING *";
        else
            query= "insert into reservations (name,guestcount,date,starthour,endhour,notes,phone,createdate,alldayres,tablenumbers) values('" + request.body.name + "'," + request.body.guestcount + ",to_date('" + request.body.date + "','DD/MM/YYYY')," + request.body.starthour + "," +request.body.endhour+ ",'" +request.body.notes + "','" + request.body.phone + "',current_date,"+ request.body.alldayres+",'"+request.body.tablenumbers+"') RETURNING *";
        client.query(query, function (err, result) {

            if (err) {
                response.status(500).send('Something broke!');
                return console.error('error running query', err);
            }
            response.json(result.rows);
            console.log(result.rows[0].reservationid);
            reservationId = result.rows[0].reservationid;

            var strQuery = "";
            for (var i = 0; i < tables.length - 1; i++) {
                strQuery += "insert into reservationstables (reservationId,tableId) values(" + reservationId + "," + tables[i] + ");";
            }
            console.log("strQuery: " + strQuery);

            client.query(strQuery, function (err, result) {
                done();

                if (err) {
                    response.status(500).send('Something broke!');
                    return console.error('error running query', err);
                }
            });
        });

    });
});


app.get('/api/reservations/:name/:selectedDate', function (request, response) {
    //pg.defaults.ssl = true;
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }

        console.log(request.params.selectedDate);
        
        query= "select reservationstables.tableId from reservations inner join reservationstables on reservations.reservationid= reservationstables.reservationid where isdeleted!=true and reservations.name like '%"+request.params.name+"%' and reservations.date =to_date('"+request.params.selectedDate+"', 'DD/MM/YYYY')";
        client.query(query, function (err, result) {
            done();
            if (err) {
                response.status(500).send('Something broke!');
                return console.error('error running query', err);
            }
            response.json(result.rows);
            console.log("--------- reservationsByName----------"+result.rows);
        });

    });
});


};


