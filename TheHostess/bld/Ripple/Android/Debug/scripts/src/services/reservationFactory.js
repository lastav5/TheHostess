angular.module('thehostess.services')
    .factory('reservationFactory', function ($resource, $q) {

        var reservationResource = $resource("http://localhost:4407/api/reservations/:action/:id:date/", { action: "@action" ,id: "@id", date:"@date" },
            {
                'save': { method: 'POST', isArray: true },
                'get': { method: 'GET', isArray: true },
                'delete': { method: 'DELETE', isArray: true }
            });
        var reservationsData;
        return {
            getReservationsByDate: function (date) {
                var defer = $q.defer();
                reservationResource.get({ action: "bydate", date: date }, function (result) {
                    reservationsData = result;
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
        }

    });