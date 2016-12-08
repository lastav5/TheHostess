angular.module('hostess.directives')
    .directive('styleTable', ['$document','tablesFactory', 'mapsFactory',function ($document,tablesFactory,mapsFactory) {
        return {
            restrict: "A",
            scope: { mapsdata:"=mapsdata",styledetails:"=", carouselIndex:"=" },
            link: function (scope, element, attr) {
                //smaller,bigger,width,height,clone,add rect, add circle, remove table, add map,remove map
                
                var bigger = document.getElementById('bigger');
                var smaller = document.getElementById('smaller');
                var wider = document.getElementById('wider');
                var taller = document.getElementById('taller');
                
                var addCircle = document.getElementById('addCircle');
                var addRect = document.getElementById('addRect');
                var remove = document.getElementById('remove');
                var save = document.getElementById('save');
                var clone = document.getElementById('clone');

                bigger.addEventListener('click', function () {
                   
                    var table = scope.styledetails.selectedTable;
                    var mapsData = scope.mapsdata;
                    var mapsDataLength= mapsData.length;
                    for (var i = 0; i < mapsDataLength; i++)
                    {
                        if (table.mapid == mapsData[i].mapid)
                        {
                            var tablesLength= mapsData[i].tables.length;
                            for (var j = 0; i < tablesLength; j++)
                            {
                                if(mapsData[i].tables[j].tableid == table.tableid)
                                {
                                    scope.mapsdata[i].tables[j].width = (table.width) * 1 + 2;
                                    scope.mapsdata[i].tables[j].height = (table.height) * 1 + 2;
                                    scope.$apply();
                                    break;
                                }
                                
                            }
                        }
                    }
                   
                });
                smaller.addEventListener('click', function () {
                    var table = scope.styledetails.selectedTable;
                    var mapsData = scope.mapsdata;
                    for (var i = 0; i < mapsData.length; i++) {
                        if (table.mapid == mapsData[i].mapid) {
                            for (var j = 0; i < mapsData[i].tables.length; j++) {
                                if (mapsData[i].tables[j].tableid == table.tableid) {
                                    scope.mapsdata[i].tables[j].width = (table.width) * 1 - 2;
                                    scope.mapsdata[i].tables[j].height = (table.height) * 1 - 2;
                                    scope.$apply();
                                    break;
                                }

                            }
                        }
                    }
                });
                wider.addEventListener('click', function () {
                    var table = scope.styledetails.selectedTable;
                    var mapsData = scope.mapsdata;
                    for (var i = 0; i < mapsData.length; i++) {
                        if (table.mapid == mapsData[i].mapid) {
                            for (var j = 0; i < mapsData[i].tables.length; j++) {
                                if (mapsData[i].tables[j].tableid == table.tableid) {
                                    scope.mapsdata[i].tables[j].width = (table.width) * 1+2;
                                    scope.$apply();
                                    break;
                                }

                            }
                        }
                    }
                });
                taller.addEventListener('click', function () {
                    var table = scope.styledetails.selectedTable;
                    var mapsData = scope.mapsdata;
                    for (var i = 0; i < mapsData.length; i++) {
                        if (table.mapid == mapsData[i].mapid) {
                            for (var j = 0; i < mapsData[i].tables.length; j++) {
                                if (mapsData[i].tables[j].tableid == table.tableid) {
                                    scope.mapsdata[i].tables[j].height = (table.height) * 1 + 2;
                                    scope.$apply();
                                    break;
                                }

                            }
                        }
                    }
                });

                scope.addTable = function (shape) {
                    scope.disabledTables = true;
                    var mapsData = scope.mapsdata;
                    var currentMapId = mapsData[scope.carouselIndex].mapid;
                    var table = new tablesFactory.tablesResource();
                    var tableObject = {};
                    tableObject.mapid = currentMapId;
                    tableObject.shape = shape;
                    tableObject.posx = null;
                    tableObject.posy = null;
                    tableObject.width = null;
                    tableObject.height = null;
                    tableObject.occupied = null;
                    tableObject.tablenumber = null;
                    //show loading
                    table.save(tableObject,
                        function (tableData) {

                            for (var i = 0; i < scope.mapsdata.length; i++) {
                                if (tableObject.mapid == scope.mapsdata[i].mapid) {
                                    scope.mapsdata[i].tables.push(tableData[0]);
                                    scope.$apply();
                                    //stop loading
                                }
                            }
                            scope.disabledTables = false;
                        }, function (error) {
                            alert("adding failed " + error);
                        });
                };

                addRect.addEventListener('click', function () {//update factory mapsData??
                    scope.addTable('rectangle');
           
                });
                addCircle.addEventListener('click', function () {
                    scope.addTable('circle');
                });
     
                remove.addEventListener('click', function () {
                    var table = new tablesFactory.tablesResource();
                    var currentTableId= scope.styledetails.selectedTable.tableid;
                    table.delete({ id: currentTableId }, function (result) {
                        var mapsDataLength = scope.mapsdata.length;
                        for (var i = 0; i < mapsDataLength; i++) {
                            if (result[0].mapid == scope.mapsdata[i].mapid) {
                                var tablesLength = scope.mapsdata[i].tables.length;
                                for (var j = 0; j < tablesLength; j++)
                                    if (scope.mapsdata[i].tables[j].tableid == result[0].tableid) {
                                        scope.mapsdata[i].tables.splice(j, 1);
                                        scope.$apply();
                                        break;
                                    }
                            }
                        }
                        scope.disabledTables = false;
                    }, function (error) {
                        alert("removing failed " + error);
                    });
                });

                save.addEventListener('click', function () {
                    scope.disabledTables = true;
                    mapsFactory.saveMapsData(scope.mapsdata);        
                });

                clone.addEventListener('click', function (tableid) {
                    scope.disabledTables = true;
                    var table = new tablesFactory.tablesResource();
                    var maps= scope.mapsdata;
                    var tableObject = {};
                    for (var i = 0; i < maps.length; i++)
                    {
                        for(var j=0;j<maps[i].tables.length;j++)
                        {
                            if (maps[i].tables[j].tableid == scope.styledetails.selectedTable.tableid) {
                                tableObject = maps[i].tables[j];
                                break;
                            }
                        }
                    }
          
                    table.save(tableObject, function (result) {
                        for (var i = 0; i < scope.mapsdata.length; i++) {
                            if (result[0].mapid == scope.mapsdata[i].mapid) {
                                scope.mapsdata[i].tables.push(result[0]);
                                scope.$apply();
                            }
                        }
                        scope.disabledTables = false;
                    }, function (error) {
                        alert("adding failed " + error);
                    });
                        
                });
            }
        }
    }]);