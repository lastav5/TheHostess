angular.module('thehostess.services')
    .factory('reservationFactory', function (nodeConst,$resource, $q) {

        var reservationResource = $resource(nodeConst.apiUrl+"/api/reservations/:action/:id:date/", { action: "@action" ,id: "@id", date:"@date" },
            {
                'save': { method: 'POST', isArray: true },
                'get': { method: 'GET', isArray: false },
                'delete': { method: 'DELETE', isArray: false }
            });
        var reservationsData;
        return {
            getReservationsByDate: function (date) {//returns Object with 2 arrays - reservations, reservations without table
                var defer = $q.defer();
                reservationResource.get({ action: "bydate", date: date }, function (result) {
                    reservationsData = result;
                    console.log(JSON.stringify(result));
                    defer.resolve(result);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            },
            deleteReservation: function (reservationId) {
                var defer = $q.defer();
                reservationResource.delete({ id: reservationId }, function (result) {
                    console.log(result);
                    defer.resolve(result);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            },
            getCurrentReservationsData: function () {
                return reservationsData;
            },
            reservationResource: function () {
                return reservationResource;
            }
        };

    });