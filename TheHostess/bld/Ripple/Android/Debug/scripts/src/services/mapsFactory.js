angular.module('thehostess.services', ['ngResource'])
    .factory('mapsFactory', function ($resource,$q) {
        var mapsData;
        debugger;
        var mapsResource = $resource("http://thehostess.herokuapp.com/api/maps/:id",
                            {
                                id: "@map_id"
                            },
                            {
                                //get: {method:'GET', isArray:false}
                                //query:  {method:'GET', isArray:true},
                                //getAllEvents: {method:'GET'}
                            }
                );

        return {
            mapsResource: function() {
                return mapsResource;
            },
            getMapsData: function () {//returns promise
                var defer = $q.defer();
                if (!mapsData) {
                    mapsResource.query().then(function (result) {
                        mapsData = result;
                        defer.resolve(result);
                    }, function (error) {
                        defer.reject(error);
                    });
                }
                else {
                    defer.resolve(mapsData);
                }
                
                return defer.promise;
            }
        }
           
    });