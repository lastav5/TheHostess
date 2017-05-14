angular.module('thehostess.services')
    .factory('tablesFactory', function (nodeConst,$resource, $q) {
        
        var tablesResource = $resource(nodeConst.apiUrl+"/api/tables/:id", { id: "@table_id" }, { 'save': { method: 'POST', isArray: true }, 'get': {method: 'GET', isArray:true},'delete':{method:'DELETE', isArray:true} });

        return {
            tablesResource: function() {
                return tablesResource;
            }
        }

    });