angular.module('thehostess.services')
    .factory('mapsFactory',function (reservationFactory, $resource, $q) {
        var mapsData;
        
        //var mapsResource = $resource("http://thehostess.herokuapp.com/api/maps/:id", { id: "@map_id" },{} );
        var mapsResource = $resource("http://localhost:4407/api/maps/:selectedDate", { selectedDate: "@selectedDate" },
            { 'saveAll': { method: 'PUT', isArray: true } });
        return {
            saveMapsData: function (mapsData) {
                mapsResource.saveAll(mapsData,function(result)
                {

                }, function (error) {
                    alert("Error on save maps");
                });
                
            },
            getMapsData: function (selectedDate1) {//returns promise
                var defer = $q.defer();
                mapsResource.query({ selectedDate: selectedDate1 }, function (result) {
                    reservationFactory.getReservationsByDate(selectedDate1).then(function (reservationsData) {
                            mapsData = mergeMapsDataReservations(result, reservationsData[0]);
                            defer.resolve(mapsData);
                        }, function (error) {
                            defer.reject(error);
                    });
                }, function (error) {
                    alert("error in factory");
                        defer.reject(error);
                    });
                return defer.promise;
            }
        };

        function splitTableNumbers(tableNumbersString) {
            if (tableNumbersString == "" || tableNumbersString == "0") {
                return [];
            } else {
                tableNumbersString = tableNumbersString.substring(0, tableNumbersString.length - 1);
                var arr = tableNumbersString.split(".");
                return arr;
            }
        }
        function mergeMapsDataReservations(mapsData, reservationsData) {
            //reset reservations' array in every table
            angular.forEach(mapsData, function (map) {
                angular.forEach(map.tables, function (table) {
                    table.reservations = [];
                });
            });
            //merge
            angular.forEach(reservationsData, function (res) {
                var tableNumbers = splitTableNumbers(res.tablenumbers);
                angular.forEach(tableNumbers, function (tableid) {
                    angular.forEach(mapsData, function (map) {
                        angular.forEach(map.tables, function (table) {
                            if (table.tableid == tableid) {
                                table.reservations.push(res);
                            }
                        });
                    });
                });
            });
            return mapsData;
        }
    });