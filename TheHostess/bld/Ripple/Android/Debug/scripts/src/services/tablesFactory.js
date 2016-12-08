angular.module('thehostess.services')
    .factory('tablesFactory', function ($resource, $q) {
        
        var tablesResource = $resource("http://localhost:4407/api/tables/:id", { id: "@table_id" }, { 'save': { method: 'POST', isArray: true }, 'get': {method: 'GET', isArray:true},'delete':{method:'DELETE', isArray:true} });

        return {
            tablesResource: function() {
                return tablesResource;
            }
        }

    });