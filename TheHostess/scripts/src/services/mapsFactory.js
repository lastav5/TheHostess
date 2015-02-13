angular.module('thehostess.services', ['ngResource'])
    .factory('mapsFactory', function ($resource) {
        var mapsData = [];
        //if (mapsData == []) {
            mapsData = $resource("http://thehostess.herokuapp.com/api/maps/:id",
                        {
                            id: "@map_id"
                        },
                        {
                            //get: {method:'GET', isArray:false}
                            //query:  {method:'GET', isArray:true},
                            //getAllEvents: {method:'GET'}
                        }
            );
        //}
        return mapsData;
    });