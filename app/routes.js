//'use strict';

var pg = require('pg');
var db = require('../config/database');
var conString = db.url;

module.exports = function(app) {

// If the Node process ends
process.on('SIGINT', function() {
  process.exit();
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

app.get('/api/reservations/bydate/:selectedDate', function (request, response) {
  pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query("SELECT * from reservations where tablenumbers is not null and tablenumbers!='' and reservations.isdeleted=false and reservations.date=to_date('"+request.params.selectedDate+"', 'DD/MM/YYYY')", function (err, resultRes) {
            if(err) {
              response.status(500).send('failed getting reservations from db');
              return console.error('error running query', err);
            }
            _reservations = resultRes.rows;

            client.query("SELECT * from reservations where (tablenumbers is null or tablenumbers='') and isdeleted=false and reservations.date=to_date('"+request.params.selectedDate+"', 'DD/MM/YYYY')", function(err, resultRWT) {
              done();

              if(err) {
                response.status(500).send('failed getting reservationsnotable from db');
                return console.error('error running query', err);
              }

              var _reservationsWithoutTable = resultRWT.rows;
              var reservationsData = {};

               if (_reservations == null) {
                   _reservations=[];
               }
               if (_reservationsWithoutTable == null) {
                   _reservationsWithoutTable=[];
               }
               reservationsData={"reservations":_reservations, "reservationsWithoutTable": _reservationsWithoutTable};
              
              response.json(reservationsData);
              console.log(JSON.stringify(reservationsData));
            });
      });
  });
});

app.get('/api/maps/:selectedDate', function (request, response) {
     pg.connect(conString, function(err, client, done) {
         if(err) {
           res.status(500).send({ error: "failed getting maps from db" });
           return console.error('failed getting maps from db', err);
         }
       
        console.log(request.params.selectedDate);
         client.query('SELECT * from maps where isdeleted=false', function(err, resultMaps) {
             if(err) {
                res.status(500).send({ error: "failed getting maps from db" });
                return console.error('failed getting maps from db', err);
             }
             var _maps= resultMaps.rows;
             client.query('SELECT * from tables where isdeleted=false', function(err, resultTables) {
                     done();

                     if(err) {
                        res.status(500).send({ error: "failed getting maps from db" });
                        return console.error('failed getting maps from db', err);
                     }
                     _tables = resultTables.rows;

                     if (_tables != null) {

                          //reset maps.tables to []
                         var _mapsLength = _maps.length;
                         for (var j = 0; j < _mapsLength; j++) {
                            _maps[j].tables = [];
                         }
                         //insert tables into maps
                         var _tablesLength= _tables.length;
                         for (var i = 0; i < _tablesLength; i++) {
                             var _mapsLength = _maps.length;
                             for (var j = 0; j < _mapsLength; j++) {
                                 if (_maps[j].mapid == _tables[i].mapid)
                                     _maps[j].tables.push(_tables[i]);
                             }
                         }

                     }

                     console.log(JSON.stringify(_maps));
                     response.json(_maps);
                });
                     
         });
     });
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
        
        var query= "select reservationstables.tableId from reservations inner join reservationstables on reservations.reservationid= reservationstables.reservationid where isdeleted!=true and reservations.name like '%"+request.params.name+"%' and reservations.date =to_date('"+request.params.selectedDate+"', 'DD/MM/YYYY')";
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

app.delete('/api/reservations/:id', function (request, response) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }

        console.log(request.params.reservationid);
        
        var query= "UPDATE reservations SET isdeleted=TRUE WHERE reservationid="+request.params.id+";"+
                    " DELETE FROM reservationstables WHERE reservationsid="+request.params.id+";";
        client.query(query, function (err, result) {
            done();
            if (err) {
                response.status(500).send('error deleting reservation from db: '+err);
                return console.error('error running query', err);
            }
            response.json("deleted reservation with reservation id "+request.params.id);
        });

    });
});


};


