angular.module('thehostess.services')
    .factory('reservationFactory', function ($resource, $q) {

        var reservationResource = $resource("http://localhost:4407/api/reservations:id/", { id: "@id"}, { 'save': { method: 'POST', isArray: true }, 'get': { method: 'GET', isArray: true }, 'delete': { method: 'DELETE', isArray: true } });

        return {
            reservationResource: function () {
                return reservationResource;
                
            }
        }

    });