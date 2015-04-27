angular.module('thehostess.services')
    .factory('tablesFactory', function ($resource, $q) {
        
        var tablesResource = $resource("http://thehostess.herokuapp.com/api/tables/:id", { id: "@table_id" }, {});

        return {
            tablesResource: function() {
                return tablesResource;
            }
        }

    });