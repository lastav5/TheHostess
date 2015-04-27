angular.module('hostess.directives')
    .directive('styleTable', ['$document','tablesFactory', function ($document,tablesFactory) {
        return {
            restrict: "A",
            scope: { mapsdata:"=mapsdata",styledetails:"=", carouselIndex:"=" },
            link: function (scope, element, attr) {
                //smaller,bigger,width,height,clone,add rect, add circle, remove table, add map,remove map
                
                var bigger = document.getElementById('bigger');
                var smaller = document.getElementById('smaller');
                var wider = document.getElementById('wider');
                var taller = document.getElementById('taller');
                var clone = document.getElementById('clone');
                var addCircle = document.getElementById('addCircle');
                var addRect = document.getElementById('addRect');
                var remove = document.getElementById('remove');

                bigger.addEventListener('click', function () {
                    
                    var table = scope.styledetails.selectedTable;
                    var mapsData = scope.mapsdata;
                    for(var i=0;i<mapsData.length;i++)
                    {
                        if(table.mapId == mapsData[i].mapId)
                        {
                            for(var j=0;i<mapsData[i].tables.length;j++)
                            {
                                if(mapsData[i].tables[j].tableId == table.tableId)
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
                        if (table.mapId == mapsData[i].mapId) {
                            for (var j = 0; i < mapsData[i].tables.length; j++) {
                                if (mapsData[i].tables[j].tableId == table.tableId) {
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
                        if (table.mapId == mapsData[i].mapId) {
                            for (var j = 0; i < mapsData[i].tables.length; j++) {
                                if (mapsData[i].tables[j].tableId == table.tableId) {
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
                        if (table.mapId == mapsData[i].mapId) {
                            for (var j = 0; i < mapsData[i].tables.length; j++) {
                                if (mapsData[i].tables[j].tableId == table.tableId) {
                                    scope.mapsdata[i].tables[j].height = (table.height) * 1 + 2;
                                    scope.$apply();
                                    break;
                                }

                            }
                        }
                    }
                });
                clone.addEventListener('click', function () {//update factory mapsData??
                    //add table to mapsdata //get id from db. //update tables when saved
                    var mapsData = scope.mapsdata;
                    var currentMapId = mapsData[scope.carouselIndex - 1].mapId;
                    //post new table
                    
                    var table = new tablesFactory.tablesResource();
                    table.mapId = currentMapId;
                    //show loading
                    table.$save(
                        function (tableData) {
                            for (var i = 0; i < mapsData.length; i++) {
                                if (table.mapId == mapsData[i].mapId) {
                                    scope.mapsdata[i].tables.push(tableData);
                                    scope.$apply();
                                    //stop loading
                                }
                            }
                        }, function (error) {
                            alert("cloning failed "+error);
                        });
                });
                addCircle.addEventListener('click', function () {

                });
                addRect.addEventListener('click', function () {

                });
                remove.addEventListener('click', function () {

                });
            }
        }
    }]);