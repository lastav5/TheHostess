angular.module('thehostess.services', ['ngResource'])
    .factory('mapsFactory', function ($resource,$q) {
        var mapsData;
        
        //var mapsResource = $resource("http://thehostess.herokuapp.com/api/maps/:id", { id: "@map_id" },{} );
        var mapsResource = $resource("http://localhost:4407/api/maps/:selectedDate", { selectedDate: "@selectedDate" }, { 'saveAll': { method: 'PUT', isArray: true } });
        return {
            //mapsResource: function() {
            //    return mapsResource;
            //},
            saveMapsData: function (mapsData) {
                mapsResource.saveAll(mapsData,function(result)
                {

                }, function (error) {
                    alert("Error on save maps");
                });
                
            },
            getMapsData: function (selectedDate1) {//returns promise
                var defer = $q.defer();
                //if (!mapsData) {
                    mapsResource.query({selectedDate:selectedDate1},function (result) {
                        mapsData = result;
                           var map;
                           //map.userId =1;
                           //mapsResource.save(map, function() {

                           //});
                        defer.resolve(result);
                    }, function (error) {
                        defer.reject(error);
                    });
                //}
                //else {
                //    defer.resolve(mapsData);
                //}

                return defer.promise;
            }
        };
           
    });